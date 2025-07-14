import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Button from '../../components/base/Button';
import Divider from '../../components/base/Divider';
import logoPng from '../../assets/images/logoWihtoutText.png';
import getStartedIllustrationPng from '../../assets/images/get_started_illustration.png';
import theme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GetStarted = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleToNavigate = (route: string) => {
    navigation.navigate(route);
  };
  return (
    <Container
      contentContainerStyle={[{ flex: 1 }, styles.root]}
      padding="large"
      scrollable
    >
      <View style={styles.logoContainer}>
        <Image
          source={logoPng}
          style={{ width: 48, height: 48 }}
          resizeMode="contain"
        />
        <Heading level={2} style={styles.logoText}>
          Donare
        </Heading>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={getStartedIllustrationPng}
          style={{ width: 260, height: 220 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Heading level={3} style={styles.title}>
          Easy way To Donate
        </Heading>
        <Text variant="body1" color="secondary" style={styles.subtitle}>
          Join us to make a difference. Donate easily and securely to causes you
          care about.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={[
            { backgroundColor: theme.colors.primary[500] },
            styles.button,
          ]}
          onPress={() => handleToNavigate('Login')}
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onPress={() => handleToNavigate('Login')}
          textStyle={{
            color: theme.colors.secondary[600],
          }}
          style={[
            { backgroundColor: theme.colors.secondary[200] },
            styles.button,
          ]}
        >
          Sign In
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  illustrationContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  button: {
    borderRadius: 15,
  },
});

export default GetStarted;
