import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pickImage } from '../../pickImage';
import Video from 'react-native-video';
import { Container, Input, Button, Text, Heading } from '../../components/base';
import theme from '../../config/theme';
import { FileUpload, AddCauses } from '../../service/handler';
import { showToast } from '../../utils/toast';

const AddCause = () => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    title: '',
    description: '',
    media: null as {
      uri: string;
      type: 'image' | 'video';
    } | null,
    uploadedMediaUrl: null as string | null,
  });
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (key: 'title' | 'description', value: string) => {
    setPayload(prev => ({ ...prev, [key]: value }));
  };

  const resetMedia = () => {
    setPayload(prev => ({
      ...prev,
      media: null,
      uploadedMediaUrl: null,
    }));
  };

  const pickAndSetMedia = async () => {
    // Reset previous media first
    resetMedia();
    setLoading(true);
    
    try {
      const result = await pickImage({
        cropping: false,
        mediaType: 'any',
      });

      if (result && !Array.isArray(result) && result.path) {
        const isVideo = result.mime && result.mime.startsWith('video');
        const mediaData = {
          uri: result.path,
          type: (isVideo ? 'video' : 'image') as 'image' | 'video',
        };
        setPayload(prev => ({ ...prev, media: mediaData }));

        // Upload media to server
        await uploadMedia(result);
      } else {
        showToast('error', 'No media selected');
      }
    } catch (error) {
      console.error('Error picking media:', error);
      showToast('error', 'Failed to pick media. Please try again.');
      resetMedia();
    } finally {
      setLoading(false);
    }
  };

  const uploadMedia = async (mediaResult: any) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: mediaResult.path,
        type: mediaResult.mime || 'image/jpeg',
        name: mediaResult.fileName || 'media.jpg',
      });
      console.log('Form Data:', formData);

      const response = (await FileUpload(formData)) as any;
      console.log('Upload response:', response);
      
      // Handle different possible response structures
      let mediaUrl = null;
      if (response?.data?.url) {
        mediaUrl = response.data.url;
      } else if (response?.url) {
        mediaUrl = response.url;
      } else if (response?.data?.file?.url) {
        mediaUrl = response.data.file.url;
      }

      if (mediaUrl) {
        setPayload(prev => ({
          ...prev,
          uploadedMediaUrl: mediaUrl,
        }));
        showToast('success', 'Media uploaded successfully');
      } else {
        console.error('No URL found in response:', response);
        showToast('error', 'Failed to get media URL from server response');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      showToast('error', 'Failed to upload media. Please try again.');
    }
  };

  const validateForm = () => {
    if (!payload.title.trim()) {
      showToast('error', 'Please enter a title for the cause.');
      return false;
    }
    if (!payload.description.trim()) {
      showToast('error', 'Please enter a description for the cause.');
      return false;
    }
    if (!payload.media) {
      showToast('error', 'Please upload an image or video for the cause.');
      return false;
    }
    if (!payload.uploadedMediaUrl) {
      showToast(
        'error',
        'Media is still uploading. Please wait and try again.',
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const causeData = {
        name: payload.title.trim(),
        description: payload.description.trim(),
        media: payload.uploadedMediaUrl,
        media_type: payload.media?.type === 'video' ? 'VIDEO' : 'IMAGE',
      };

      const response = await AddCauses(causeData);
      showToast('success', 'Cause has been created successfully!');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error creating cause:', error);
      showToast(
        'error',
        error.message || 'Failed to create cause. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container scrollable contentContainerStyle={styles.root} padding="large">
      <Heading level={4} style={styles.title}>
        Add New Cause
      </Heading>
      <View style={styles.formContainer}>
        <Input
          label="Title"
          placeholder="Enter title"
          value={payload.title}
          onChangeText={text => handleInputChange('title', text)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
        />
        <Input
          label="Description"
          placeholder="Enter description"
          value={payload.description}
          onChangeText={text => handleInputChange('description', text)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          multiline
          numberOfLines={4}
        />
        <View style={styles.uploadSection}>
          <Button
            onPress={pickAndSetMedia}
            loading={loading}
            style={styles.uploadButton}
            variant="outlined"
            color="primary"
          >
            {loading
              ? 'Uploading...'
              : payload.uploadedMediaUrl
              ? 'Media Uploaded ✓'
              : 'Upload Image or Video'}
          </Button>
          {payload.media && !payload.uploadedMediaUrl && !loading && (
            <Button
              onPress={() => uploadMedia(payload.media)}
              style={styles.retryButton}
              variant="outlined"
              color="secondary"
            >
              Retry Upload
            </Button>
          )}
        </View>
        {payload.media && payload.media.type === 'image' && (
          <View style={styles.mediaContainer}>
            <Image
              source={{ uri: payload.media.uri }}
              style={styles.imagePreview}
            />
            {loading && (
              <Text style={styles.uploadStatus}>Uploading...</Text>
            )}
            {!loading && !payload.uploadedMediaUrl && payload.media && (
              <Text style={styles.uploadError}>Upload failed - Try again</Text>
            )}
            {payload.uploadedMediaUrl && (
              <Text style={styles.uploadSuccess}>✓ Uploaded Successfully</Text>
            )}
          </View>
        )}
        {payload.media && payload.media.type === 'video' && (
          <View style={styles.mediaContainer}>
            <View style={styles.videoPreview}>
              <TouchableOpacity
                onPress={() => setShowVideo(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Video
                fullscreen={showVideo}
                source={{ uri: payload.media.uri }}
                style={{ width: '100%', height: '100%' }}
                controls={showVideo}
                resizeMode="cover"
                paused={!showVideo}
              />
            </View>
            {loading && (
              <Text style={styles.uploadStatus}>Uploading...</Text>
            )}
            {!loading && !payload.uploadedMediaUrl && payload.media && (
              <Text style={styles.uploadError}>Upload failed - Try again</Text>
            )}
            {payload.uploadedMediaUrl && (
              <Text style={styles.uploadSuccess}>✓ Uploaded Successfully</Text>
            )}
          </View>
        )}
        <Button
          onPress={handleSubmit}
          loading={submitting}
          style={styles.submitButton}
          variant="contained"
          color="primary"
          size="large"
        >
          {submitting ? 'Creating Cause...' : 'Submit'}
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginTop: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 24,
  },
  formContainer: {
    gap: 12,
    width: '100%',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  uploadSection: {
    width: '100%',
    marginTop: 12,
    gap: 8,
  },
  uploadButton: {
    width: '100%',
    borderRadius: 15,
  },
  retryButton: {
    width: '100%',
    borderRadius: 15,
  },
  mediaContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
  },
  videoPreview: {
    width: '100%',
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  uploadStatus: {
    color: theme.colors.warning[600],
    fontSize: 14,
    fontWeight: '500',
  },
  uploadError: {
    color: theme.colors.error[600],
    fontSize: 14,
    fontWeight: '500',
  },
  uploadSuccess: {
    color: theme.colors.success[600],
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    marginTop: 12,
    borderRadius: 15,
    backgroundColor: theme.colors.primary[500],
  },
});

export default AddCause;
