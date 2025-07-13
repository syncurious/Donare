import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/images/logo.png';
import Loader from '../../components/base/Loader';

const SplashScreen = ({ isLoading }: { isLoading: boolean }) => (
  <View style={styles.container}>
    {/* Optional: Modern accent background */}
    <View style={styles.accentCircle} />
    <Image source={Logo} style={styles.logo} resizeMode="contain" />
    <Text style={styles.appName}>Donare</Text>
    {isLoading && (
      <View style={styles.loaderContainer}>
        <Loader size="large" />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or a very light accent
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#e6f0fa', // soft accent
    top: -80,
    left: -80,
    opacity: 0.3,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: -1,
    marginBottom: 32,
  },
  loaderContainer: {
    marginTop: 16,
  },
});

export default SplashScreen;
