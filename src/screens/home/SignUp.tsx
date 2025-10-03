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

// Placeholder PNGs (replace with actual PNGs as needed)
import logoPng from '../../assets/images/logoWihtoutText.png';
import facebookPng from '../../assets/icons/facebookIcon.png';
import googlePng from '../../assets/icons/googleIcon.png';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [zakatDate, setZakatDate] = useState('');
  const [reminders, setReminders] = useState(false);
  const [campaigns, setCampaigns] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('Home');
    // TODO: Implement sign up logic
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
              value={fullName}
              onChangeText={setFullName}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
              secureTextEntry
            />
            <Input
              label="City"
              placeholder="Enter your city"
              value={city}
              onChangeText={setCity}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Input
              label="Last Zakat Date (Optional)"
              placeholder="Select date"
              value={zakatDate}
              onChangeText={setZakatDate}
              variant="outlined"
              style={styles.input}
              inputStyle={{ fontSize: 16 }}
            />
            <Text variant="body1" style={styles.prefTitle}>
              Preferences (Optional)
            </Text>
            <View style={styles.checkRow}>
              <CheckBox
                checked={reminders}
                onPress={() => setReminders(!reminders)}
                label="Receive Zakat reminders"
              />
            </View>
            <View style={styles.checkRow}>
              <CheckBox
                checked={campaigns}
                onPress={() => setCampaigns(!campaigns)}
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
