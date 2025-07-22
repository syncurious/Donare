import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { pickImage } from '../../pickImage';
import Header from '../../components/base/Header';
import { Container, Input, Button, Text } from '../../components/base';
import theme from '../../config/theme';

const AddCause = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickAndSetImage = async () => {
    setLoading(true);
    const result = await pickImage({
      cropping: true,
      width: 300,
      height: 300,
      mediaType: 'photo',
    });
    setLoading(false);
    if (result && !Array.isArray(result) && result.path) {
      setImage(result.path);
    }
  };

  return (
    <Container style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          onPress={pickAndSetImage}
          loading={loading}
          style={styles.uploadButton}
          variant="outlined"
          color="primary"
        >
          Upload Image
        </Button>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>
      <Button
        onPress={() => {}}
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
  submitButton: {
    marginTop: 16,
  },
});

export default AddCause;
