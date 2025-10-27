import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import Container from '../../components/base/Container';
import Section from '../../components/base/Section';
import Text from '../../components/base/Text';
import Input from '../../components/base/Input';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../config/theme';
import Loader from '../../components/base/Loader';
import { GetProfile, UpdateProfile, FileUpload } from '../../service/handler';
import { clearProfile } from '../../store/reducers/profile';
import { persistor } from '../../store';

interface UserData {
  fullName: string;
  memberSince: string;
  email: string;
  phone: string;
  image: string;
  role: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  image: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  
  const [user, setUser] = useState<UserData>({
    fullName: '',
    memberSince: '',
    email: '',
    phone: '',
    image: '',
    role: '',
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    image: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res: any = await GetProfile();
      const data = res?.data?.user ?? res;
      if (data) {
        setUser(data);
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          image: data.image || '',
        });
      }
    } catch (e) {
      console.error('Failed to fetch profile:', e);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
      setUploading(true);

      const formDataUpload = new FormData();
      formDataUpload.append('image', {
        uri: image.path,
        type: image.mime || 'image/jpeg',
        name: image.filename || `profile_${Date.now()}.jpg`,
      });
      console.log('Form Data:', formDataUpload);

      const response = (await FileUpload(formDataUpload)) as any;
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
        setFormData(prev => ({ ...prev, image: mediaUrl }));
        Alert.alert('Success', 'Profile picture uploaded successfully');
      } else {
        console.error('No URL found in response:', response);
        Alert.alert('Error', 'Failed to get media URL from server response');
      }
    } catch (error: any) {
      console.error('Image upload error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
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
      setSaving(true);

      const updatePayload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
      };

      const response: any = await UpdateProfile(updatePayload);

      if (response.status || response.data) {
        const updatedData = response?.data?.user ?? response;
        setUser({
          ...user,
          fullName: updatedData.fullName || formData.fullName,
          email: updatedData.email || formData.email,
          phone: updatedData.phone || formData.phone,
          image: updatedData.image || formData.image,
        });
        
        setEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      const errorMessage = error?.data?.message || error?.message || 'Failed to update profile';
      Alert.alert('Error', errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      image: user.image,
    });
    setErrors({});
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
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
              dispatch(clearProfile());
              await persistor.purge();
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

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <Container
        padding="small"
        style={{
          backgroundColor: theme.colors.background.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader size="large" />
      </Container>
    );
  }

  return (
    <Container
      scrollable
      padding="none"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      {/* Profile Header */}
      <View
        style={[
          styles.topBg,
          {
            backgroundColor: theme.colors.primary[50],
            borderBottomLeftRadius: theme.borderRadius['2xl'],
            borderBottomRightRadius: theme.borderRadius['2xl'],
          },
        ]}
      >
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.xl,
            },
          ]}
        >
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              onPress={editing ? handleImagePick : undefined}
              disabled={!editing || uploading}
              activeOpacity={editing ? 0.7 : 1}
            >
              {formData.image ? (
                <Image
                  source={{ uri: formData.image }}
                  style={[
                    styles.avatar,
                    { borderColor: theme.colors.primary[500] },
                  ]}
                />
              ) : (
                <View
                  style={[
                    styles.avatarFallback,
                    { backgroundColor: theme.colors.primary[500] },
                  ]}
                >
                  <Text style={styles.avatarInitials}>
                    {getInitials(formData.fullName || 'U')}
                  </Text>
                </View>
              )}
              {editing && (
                <View
                  style={[
                    styles.editIconBtn,
                    { backgroundColor: theme.colors.primary[500] },
                  ]}
                >
                  {uploading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Feather
                      name="camera"
                      size={16}
                      color={theme.colors.text.inverse}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>

          {editing ? (
            <View style={{ width: '100%', marginTop: 8 }}>
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={text => {
                  setFormData(prev => ({ ...prev, fullName: text }));
                  if (errors.fullName) {
                    setErrors(prev => ({ ...prev, fullName: undefined }));
                  }
                }}
                error={errors.fullName}
                style={styles.input}
              />
            </View>
          ) : (
            <>
              <Text style={styles.name}>{user.fullName || 'User'}</Text>
              <Text variant="caption" color="secondary" style={styles.memberSince}>
                Member since {user.memberSince}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Personal Info Section */}
      <Container variant="card" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          {!editing && (
            <TouchableOpacity onPress={handleEdit}>
              <Feather name="edit-2" size={18} color={theme.colors.primary[500]} />
            </TouchableOpacity>
          )}
        </View>
        <Section title=""  style={{ marginTop: 0 }}>
          {editing ? (
            <View style={styles.formContainer}>
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
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
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
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Feather
                  name="mail"
                  size={16}
                  color={theme.colors.primary[500]}
                  style={styles.infoIcon}
                />
                <Text variant="body2" color="secondary" style={styles.infoLabel}>
                  Email
                </Text>
                <Text variant="body2" style={styles.infoValue}>
                  {user.email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Feather
                  name="phone"
                  size={16}
                  color={theme.colors.primary[500]}
                  style={styles.infoIcon}
                />
                <Text variant="body2" color="secondary" style={styles.infoLabel}>
                  Phone
                </Text>
                <Text variant="body2" style={styles.infoValue}>
                  {user.phone}
                </Text>
              </View>
            </>
          )}

          {/* Action Buttons for Edit Mode */}
          {editing && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  saving && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Section>
      </Container>

      {/* History Section */}
      {!editing && (
        <Container variant="card" style={styles.sectionCard}>
          <Section style={{ marginVertical: 0 }} title="History">
            <TouchableOpacity
              style={styles.listRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('DonationHistory' as never)}
            >
              <Text variant="body2" style={styles.listRowText}>
                Donation History
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.primary[500]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RequestDetails' as never)}
            >
              <Text variant="body2" style={styles.listRowText}>
                View Your Help Requests
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.primary[500]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ViewVolunteer' as never)}
            >
              <Text variant="body2" style={styles.listRowText}>
                View Your Volunteer Form
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.primary[500]}
              />
            </TouchableOpacity>
          </Section>
        </Container>
      )}

      {/* Logout Button */}
      {!editing && (
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: theme.colors.error[500] },
            ]}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  topBg: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    marginBottom: 4,
  },
  profileCard: {
    alignItems: 'center',
    padding: 16,
    width: '90%',
    marginTop: 0,
    marginBottom: 0,
  },
  avatarWrapper: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    zIndex: 2,
  },
  avatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarInitials: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  editIconBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 12,
    padding: 6,
    zIndex: 3,
  },
  name: {
    marginBottom: 0,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.2,
  },
  memberSince: {
    marginBottom: 0,
    fontSize: 12,
  },
  sectionCard: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  infoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    minWidth: 60,
    marginRight: 0,
    fontSize: 13,
  },
  infoValue: {
    flex: 1,
    textAlign: 'left',
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
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
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginTop: 2,
    marginBottom: 2,
  },
  listRowText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
  },
  logoutContainer: {
    padding: 16,
    marginTop: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
});

export default Profile;
