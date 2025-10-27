import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Input from '../../../components/base/Input';
import theme from '../../../config/theme';
import {
  GetUserProfile,
  UpdateUserProfile,
  type UserProfile,
  type UpdateProfilePayload,
} from '../../../service/admin';
import { FileUpload } from '../../../service/handler';
import { setProfile, clearProfile } from '../../../store/reducers/profile';
import { persistor } from '../../../store';
import Loader from '../../../components/base/Loader';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  saving: boolean;
  editing: boolean;
  uploading: boolean;
  error: string | null;
}

interface FormData {
  email: string;
  full_name: string;
  phone: string;
  profile_picture: string;
}

const AdminProfile = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState<ProfileState>({
    profile: null,
    loading: true,
    saving: false,
    editing: false,
    uploading: false,
    error: null,
  });

  const [formData, setFormData] = useState<FormData>({
    email: '',
    full_name: '',
    phone: '',
    profile_picture: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await GetUserProfile();
      console.log('Profile API Response:', JSON.stringify(response, null, 2));

      if (response.status && response.data && response.data.user) {
        const profileData = response.data.user;
        
        console.log('Extracted Profile Data:', JSON.stringify(profileData, null, 2));
        
        setState(prev => ({
          ...prev,
          profile: profileData,
          loading: false,
        }));
        setFormData({
          email: profileData.email || '',
          full_name: profileData.fullName || '',
          phone: profileData.phone || '',
          profile_picture: profileData.profilePicture || '',
        });
      } else {
        throw new Error(response.message || 'Failed to fetch profile - no user data returned');
      }
    } catch (error: any) {
      console.error('Profile fetch error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      const errorMessage = error?.data?.message || error?.message || 'Failed to load profile';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      if (image) {
        await uploadImage(image);
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('Image picker error:', error);
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const uploadImage = async (image: any) => {
    try {
      setState(prev => ({ ...prev, uploading: true }));

      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime || 'image/jpeg',
        name: image.filename || `profile_${Date.now()}.jpg`,
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
        setFormData(prev => ({ ...prev, profile_picture: mediaUrl }));
        Alert.alert('Success', 'Profile picture uploaded successfully');
      } else {
        console.error('No URL found in response:', response);
        Alert.alert('Error', 'Failed to get media URL from server response');
      }
    } catch (error: any) {
      console.error('Image upload error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setState(prev => ({ ...prev, uploading: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setState(prev => ({ ...prev, saving: true, error: null }));

      const updatePayload: UpdateProfilePayload = {
        email: formData.email,
        full_name: formData.full_name,
        phone: formData.phone,
        profile_picture: formData.profile_picture,
      };

      const response = await UpdateUserProfile(updatePayload);

      if (response.status && response.data && response.data.user) {
        const updatedProfile = response.data.user;
        
        setState(prev => ({
          ...prev,
          profile: updatedProfile,
          saving: false,
          editing: false,
        }));
        
        // Update form data with the response to ensure consistency
        setFormData({
          email: updatedProfile.email || '',
          full_name: updatedProfile.fullName || '',
          phone: updatedProfile.phone || '',
          profile_picture: updatedProfile.profilePicture || '',
        });
        
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update profile - no user data returned');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Failed to update profile';
      setState(prev => ({
        ...prev,
        saving: false,
      }));
      Alert.alert('Error', errorMessage);
    }
  };

  const handleCancel = () => {
    if (state.profile) {
      setFormData({
        email: state.profile.email || '',
        full_name: state.profile.fullName || '',
        phone: state.profile.phone || '',
        profile_picture: state.profile.profilePicture || '',
      });
    }
    setErrors({});
    setState(prev => ({ ...prev, editing: false }));
  };

  const handleEdit = () => {
    setState(prev => ({ ...prev, editing: true }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear Redux state
              dispatch(clearProfile());
              
              // Clear persisted storage
              await persistor.purge();
              
              // The navigation will automatically redirect to AuthNavigation
              // because isAuth will be false after clearing the profile
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (state.loading) {
    return (
      <Container
        padding="small"
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </Container>
    );
  }

  if (state.error && !state.profile) {
    return (
      <Container
        padding="small"
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.colors.error[500],
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {state.error}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary[500],
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={fetchProfile}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  return (
    <Container scrollable padding="small" style={{ backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Heading level={2} style={{ marginBottom: 8 }}>
          Admin Profile
        </Heading>
        {!state.editing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
            disabled={state.saving}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity
            onPress={handleImagePick}
            disabled={!state.editing || state.uploading}
            activeOpacity={0.8}
          >
            {formData.profile_picture ? (
              <Image
                source={{ uri: formData.profile_picture }}
                style={styles.profilePicture}
              />
            ) : (
              <View style={styles.profilePicturePlaceholder}>
                <Text style={styles.profilePicturePlaceholderText}>
                  {formData.full_name
                    ? formData.full_name.charAt(0).toUpperCase()
                    : 'A'}
                </Text>
              </View>
            )}
            {state.editing && (
              <View style={styles.cameraIconContainer}>
                {state.uploading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.cameraIcon}>📷</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
          {state.editing && (
            <Text style={styles.uploadHint}>Tap to change photo</Text>
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, full_name: text }));
              if (errors.full_name) {
                setErrors(prev => ({ ...prev, full_name: undefined }));
              }
            }}
            error={errors.full_name}
            editable={state.editing}
            style={styles.input}
            required
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, email: text }));
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
            error={errors.email}
            editable={state.editing}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            required
          />

          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={text => {
              setFormData(prev => ({ ...prev, phone: text }));
              if (errors.phone) {
                setErrors(prev => ({ ...prev, phone: undefined }));
              }
            }}
            error={errors.phone}
            editable={state.editing}
            keyboardType="phone-pad"
            style={styles.input}
            required
          />
        </View>

        {/* Action Buttons */}
        {state.editing && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={state.saving}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                state.saving && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={state.saving}
            >
              {state.saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        {!state.editing && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              disabled={state.saving}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  editButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  profileContainer: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary[500],
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.primary[500],
  },
  profilePicturePlaceholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary[500],
  },
  formContainer: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
  },
  cancelButtonText: {
    color: theme.colors.neutral[700],
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: theme.colors.primary[500],
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary[500],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIcon: {
    fontSize: 20,
  },
  uploadHint: {
    marginTop: 8,
    fontSize: 12,
    color: theme.colors.neutral[500],
    textAlign: 'center',
  },
  logoutContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: theme.colors.error[500],
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AdminProfile;
