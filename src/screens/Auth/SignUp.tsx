import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import CheckBox from '../../components/base/CheckBox';
import theme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Signup } from '../../service/handler';
import logoPng from '../../assets/images/logoWihtoutText.png';
import facebookPng from '../../assets/icons/facebookIcon.png';
import googlePng from '../../assets/icons/googleIcon.png';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../store/reducers/profile';
import { showToast } from '../../utils/toast';

type SignUpPayload = {
  email: string;
  password: string;
  full_name: string;
  city: string;
  role: 'user' | 'admin' | string;
  userPreferences: {
    last_zakat_date: string; // ISO string
    zakat_reminders_enabled: boolean;
    campaign_updates_enabled: boolean;
  };
  // UI-only field (not sent to API)
  confirmPassword?: string;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [payload, setPayload] = useState<SignUpPayload>({
    email: 'aqib@gmail.com',
    password: '123456',
    full_name: 'Aqib',
    city: 'Karachi',
    role: 'user',
    userPreferences: {
      last_zakat_date: '2025-01-01',
      zakat_reminders_enabled: false,
      campaign_updates_enabled: false,
    },
    confirmPassword: '123456',
  });

  const handleSignUp = async () => {
    const { confirmPassword, ...apiPayload } = payload;

    if (!payload.email || !payload.password || !payload.full_name) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    if (payload.password !== confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }

    try {
      const response = (await Signup(apiPayload)) as any;
      dispatch(setProfile(response?.data));
      showToast('error', 'Signup Toast Succesfully !');
    } catch (error: any) {
      console.log('error', error);
      const message =
        error?.data?.message ||
        error?.message ||
        'Signup failed. Please try again.';
      showToast('error', String(message));
    }
  };

  return (
    <Container style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.root}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo and Title */}
          <View style={styles.logoRow}>
            <Image source={logoPng} style={styles.logo} resizeMode="contain" />
            <Heading level={2} style={styles.logoText}>
              Donare
            </Heading>
          </View>
          <Heading level={4} style={styles.welcome}>
            Create your account
          </Heading>
          <View style={{ gap: 12, width: '100%' }}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={payload.full_name}
              onChangeText={text =>
                setPayload(prev => ({ ...prev, full_name: text }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={payload.email}
              onChangeText={text =>
                setPayload(prev => ({ ...prev, email: text }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={payload.password}
              onChangeText={text =>
                setPayload(prev => ({ ...prev, password: text }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={payload.confirmPassword}
              onChangeText={text =>
                setPayload(prev => ({ ...prev, confirmPassword: text }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              secureTextEntry
            />
            <Input
              label="City"
              placeholder="Enter your city"
              value={payload.city}
              onChangeText={text =>
                setPayload(prev => ({ ...prev, city: text }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Input
              label="Last Zakat Date (Optional)"
              placeholder="Select date"
              value={payload.userPreferences.last_zakat_date}
              onChangeText={text =>
                setPayload(prev => ({
                  ...prev,
                  userPreferences: {
                    ...prev.userPreferences,
                    last_zakat_date: text,
                  },
                }))
              }
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Text variant="body1" style={styles.prefTitle}>
              Preferences (Optional)
            </Text>
            <View style={styles.checkRow}>
              <CheckBox
                checked={payload.userPreferences.zakat_reminders_enabled}
                onPress={() =>
                  setPayload(prev => ({
                    ...prev,
                    userPreferences: {
                      ...prev.userPreferences,
                      zakat_reminders_enabled:
                        !prev.userPreferences.zakat_reminders_enabled,
                    },
                  }))
                }
                label="Receive Zakat reminders"
              />
            </View>
            <View style={styles.checkRow}>
              <CheckBox
                checked={payload.userPreferences.campaign_updates_enabled}
                onPress={() =>
                  setPayload(prev => ({
                    ...prev,
                    userPreferences: {
                      ...prev.userPreferences,
                      campaign_updates_enabled:
                        !prev.userPreferences.campaign_updates_enabled,
                    },
                  }))
                }
                label="Stay updated on new campaigns"
              />
            </View>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              Sign Up
            </Button>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={facebookPng}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={googlePng}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginRow}>
            <Text variant="body2" color="secondary">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text variant="body2" color="primary" style={styles.loginText}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    gap: 12,
    paddingBottom: 32, // Added paddingBottom to ensure content doesn't hide behind keyboard
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
  },
  logoText: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 36,
    // marginTop: 12,
    marginVertical: 12,
    paddingVertical: 12,
    minHeight: 60,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    // marginBottom: 8,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  prefTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: theme.colors.text.primary,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  signUpButton: {
    width: '100%',
    marginTop: 12,
    borderRadius: 15,
    backgroundColor: theme.colors.primary[500],
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  loginText: {
    marginLeft: 4,
    color: theme.colors.primary[600],
    fontWeight: 'bold',
  },
});

export default SignUp;
