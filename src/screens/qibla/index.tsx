import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CompassHeading from 'react-native-compass-heading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import { useTheme } from '../../config/theme';

const QIBLA_DIRECTION = 295; // Approx direction to Kaaba in degrees

const Qibla: React.FC = () => {
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState<string>('Fetching...');
  const rotation = useState(new Animated.Value(0))[0];
  const { theme } = useTheme();

  useEffect(() => {
    requestLocationPermission();

    const degree_update_rate = 3;
    CompassHeading.start(degree_update_rate, ({ heading }: any) => {
      setHeading(heading);
      Animated.timing(rotation, {
        toValue: heading,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => CompassHeading.stop();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchLocationName(latitude, longitude);
          },
          (error) => {
            console.log(error);
            setLocation('Location not found');
          },
          { enableHighAccuracy: true }
        );
      } else {
        setLocation('Permission denied');
      }
    }
  };

  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      setLocation(data.address.city || data.address.town || 'Unknown');
    } catch {
      setLocation('Location fetch failed');
    }
  };

  const compassRotation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.gradientBg}>
      <Container
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing[4],
          width: '100%',
        }}
      >
        <Heading
          level={2}
          style={{
            color: theme.colors.primary[600],
            marginBottom: theme.spacing[2],
            fontWeight: 'bold',
            fontSize: 28,
            letterSpacing: 1,
          }}
        >
          Qibla Direction
        </Heading>
        <View style={styles.locationPill}>
          <Text color="primary" style={{ fontSize: 15, fontWeight: '500' }}>{location}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.glassCard}>
          <Animated.View
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: compassRotation }],
            }}
          >
            <MaterialCommunityIcons
              name="compass-outline"
              size={220}
              color={theme.colors.primary[300]}
              style={{ opacity: 0.25 }}
            />
          </Animated.View>
          <FontAwesome5
            name="location-arrow"
            size={60}
            color={theme.colors.success[500]}
            style={styles.qiblaArrow}
          />
        </View>
        <Text
          color="secondary"
          style={{
            fontSize: theme.fontSizes.lg,
            marginTop: theme.spacing[6],
            fontWeight: '600',
            letterSpacing: 0.5,
            textAlign: 'center',
          }}
        >
          {`Qibla is ${QIBLA_DIRECTION.toFixed(0)}° from North`}
        </Text>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    width: '100%',
    backgroundColor: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', // fallback for RN, will be replaced below
    // Simulate gradient with two absolutely positioned views
    position: 'relative',
    overflow: 'hidden',
  },
  glassCard: {
    width: 220,
    height: 220,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  qiblaArrow: {
    position: 'absolute',
    top: 80,
    left: 80,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    elevation: 4,
  },
  locationPill: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignSelf: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  spacer: {
    height: 12,
  },
});

export default Qibla;
