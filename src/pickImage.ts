import ImageCropPicker, { Options, ImageOrVideo } from 'react-native-image-crop-picker';

export const pickImage = async (
  config: Options = {},
): Promise<ImageOrVideo | ImageOrVideo[] | undefined> => {
  try {
    const result = await ImageCropPicker.openPicker({
      ...config,
    });
    return result;
  } catch (error) {
    console.log('Error picking image: ', error);
  }
}; 