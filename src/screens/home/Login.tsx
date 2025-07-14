import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import theme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Placeholder PNGs (replace with actual PNGs as needed)
import logoPng from '../../assets/images/logoWihtoutText.png';
import facebookPng from '../../assets/images/facebookIcon.png';
import googlePng from '../../assets/images/googleIcon.png';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
    // TODO: Implement login logic
  };

  return (
    <Container scrollable contentContainerStyle={styles.root} padding="large">
      {/* Logo and Title */}
      <View style={styles.logoRow}>
        <Image source={logoPng} style={styles.logo} resizeMode="contain" />
        <Heading level={2} style={styles.logoText}>
          Donare
        </Heading>
      </View>
      <Heading level={4} style={styles.welcome}>
        Welcome Back
      </Heading>
      <View style={{ gap: 12, width: '100%' }}>
        {/* Email Input */}
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
        {/* Password Input */}
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
        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotRow}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text variant="body2" color="secondary" style={styles.forgotText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          Login
        </Button>
        {/* Social Login */}
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
      {/* Sign Up Prompt */}
      <View style={styles.signupRow}>
        <Text variant="body2" color="secondary">
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text variant="body2" color="primary" style={styles.signupText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
  titleRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcome: {
    fontSize: 36,
    marginTop: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  input: {
    width: '100%',
    // marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  forgotRow: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: theme.colors.secondary[600],
    fontSize: 14,
  },
  loginButton: {
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
    gap: 0,
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
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    marginLeft: 4,
    color: theme.colors.primary[600],
    fontWeight: 'bold',
  },
});

export default Login;