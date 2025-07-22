import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pickImage } from '../../pickImage';
import Video from 'react-native-video';
import Header from '../../components/base/Header';
import { Container, Input, Button, Text } from '../../components/base';
import theme from '../../config/theme';

const AddCause = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [media, setMedia] = useState<{
    uri: string;
    type: 'image' | 'video';
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const pickAndSetMedia = async () => {
    setLoading(true);
    const result = await pickImage({
      cropping: false,
      mediaType: 'any',
    });
    setLoading(false);
    if (result && !Array.isArray(result) && result.path) {
      const isVideo = result.mime && result.mime.startsWith('video');
      setMedia({ uri: result.path, type: isVideo ? 'video' : 'image' });
    }
  };

  return (
    <Container
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.formContainer}>
        <Input
          label="Title"
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          required
        />
        <Input
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          numberOfLines={4}
          required
        />
        <Button
          onPress={pickAndSetMedia}
          loading={loading}
          style={styles.uploadButton}
          variant="outlined"
          color="primary"
        >
          Upload Image or Video
        </Button>
        {media && media.type === 'image' && (
          <Image source={{ uri: media.uri }} style={styles.imagePreview} />
        )}
        {media && media.type === 'video' && (
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
              source={{ uri: media.uri }}
              style={{ width: '100%', height: '100%' }}
              controls={showVideo}
              resizeMode="cover"
              paused={!showVideo}
            />
          </View>
        )}
      </View>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.submitButton}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    paddingTop: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 16,
    marginTop: 32,
  },
  input: {
    marginBottom: 16,
  },
  uploadButton: {
    marginBottom: 12,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  videoPreview: {
    width: '100%',
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default AddCause;
