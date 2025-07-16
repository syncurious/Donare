import React, { useEffect, useState } from 'react';
import { View, Text as RNText, StyleSheet, PermissionsAndroid, Platform, Alert, Animated, Image } from 'react-native';
import Text from '../../components/base/Text';
// import Geolocation from '@react-native-community/geolocation';
import { magnetometer, SensorData } from 'react-native-sensors';
import { useFocusEffect } from '@react-navigation/native';
import Section from '../../components/base/Section';
import { Animated as RNAnimated } from 'react-native';

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRadians(deg: number) {
  return deg * (Math.PI / 180);
}
function toDegrees(rad: number) {
  return rad * (180 / Math.PI);
}

function calculateQiblaBearing(lat: number, lng: number) {
  // Formula to calculate bearing from current location to Kaaba
  const dLon = toRadians(KAABA_LNG - lng);
  const lat1 = toRadians(lat);
  const lat2 = toRadians(KAABA_LAT);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

// Custom hook for Qibla logic
function useQibla() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [qiblaBearing, setQiblaBearing] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastError, setLastError] = useState<any>(null);
  const rotateAnim = useState(new Animated.Value(0))[0];
  const prevHeading = React.useRef<number>(0);

  // Helper to request location
  const requestLocation = React.useCallback(() => {
    setLoading(true);
    setError(null);
    setLastError(null);
    // Geolocation.getCurrentPosition(
    //   (pos) => {
    //     const { latitude, longitude } = pos.coords;
    //     setLocation({ lat: latitude, lng: longitude });
    //     setQiblaBearing(calculateQiblaBearing(latitude, longitude));
    //     setLoading(false);
    //   },
    //   (err) => {
    //     setLastError(err);
    //     setError(
    //       err && err.message
    //         ? `Failed to get location: ${err.message}`
    //         : 'Failed to get location. Please check your GPS settings.'
    //     );
    //     setLoading(false);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
  }, []);

  // Request location and calculate Qibla bearing
  useEffect(() => {
    let geoWatchId: number | null = null;
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Location permission denied. Please enable location services.');
          setLoading(false);
          return false;
        }
      }
      return true;
    };

    setLoading(true);
    // requestLocationPermission().then((granted) => {
    //   if (granted) {
    //     requestLocation();
        // Optionally, watch position for live updates
    //     geoWatchId = Geolocation.watchPosition(
    //       (pos) => {
    //         const { latitude, longitude } = pos.coords;
    //         setLocation({ lat: latitude, lng: longitude });
    //         setQiblaBearing(calculateQiblaBearing(latitude, longitude));
    //       },
    //       (err) => {},
    //       { enableHighAccuracy: true, distanceFilter: 10 }
    //     );
    //   } else {
    //     setLoading(false);
    //   }
    // });
    // return () => {
    //   if (geoWatchId !== null) Geolocation.clearWatch(geoWatchId);
    // };
    
  }, [requestLocation]);

  // Subscribe to magnetometer
  useFocusEffect(
    React.useCallback(() => {
      const subscription = magnetometer.subscribe(
        (data: SensorData) => {
          let { x, y } = data;
          if (typeof x !== 'number' || typeof y !== 'number') return; // fallback for missing data
          let angle = Math.atan2(y, x) * (180 / Math.PI);
          angle = angle >= 0 ? angle : 360 + angle;
          // Normalize heading for smooth animation (handle wrap-around)
          let prev = prevHeading.current;
          let diff = angle - prev;
          if (diff > 180) angle -= 360;
          if (diff < -180) angle += 360;
          prevHeading.current = angle;
          setHeading(angle);
          Animated.timing(rotateAnim, {
            toValue: angle,
            duration: 200,
            useNativeDriver: true,
          }).start();
        },
        (err: unknown) => setError('Compass not available on this device.')
      );
      return () => subscription.unsubscribe();
    }, [rotateAnim])
  );

  let qiblaDirection = 0;
  if (location) {
    qiblaDirection = (qiblaBearing - heading + 360) % 360;
  }

  return { location, heading, qiblaBearing, qiblaDirection, error, loading, requestLocation, lastError, rotateAnim };
}

// Compass visual component
const Compass = ({ heading, rotateAnim }: { heading: number; rotateAnim: Animated.Value }) => (
  <Animated.View
    style={[
      styles.compass,
      {
        transform: [
          { rotate: rotateAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            }) },
        ],
      },
    ]}
    accessibilityLabel="Compass dial"
  >
    <Image source={require('../../assets/icons/compassIcon.png')} style={styles.compassImage} />
    <RNText style={styles.north}>N</RNText>
    <RNText style={[styles.north, styles.south]}>S</RNText>
    <RNText style={[styles.north, styles.east]}>E</RNText>
    <RNText style={[styles.north, styles.west]}>W</RNText>
  </Animated.View>
);

// Qibla Arrow visual component
const QiblaArrow = ({ qiblaDirection, rotateAnim }: { qiblaDirection: number; rotateAnim: Animated.Value }) => {
  // Combine compass rotation and qibla offset for a single smooth transform
  const totalRotation = RNAnimated.add(rotateAnim, qiblaDirection);
  const animatedRotation = totalRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Animated.View
      style={[
        styles.qiblaArrow,
        {
          transform: [
            { rotate: animatedRotation },
          ],
        },
      ]}
      accessibilityLabel="Qibla direction arrow"
    >
      <RNText style={styles.arrowText}>🕋</RNText>
      <RNText style={styles.qiblaLabel}>Qibla</RNText>
    </Animated.View>
  );
};

const Qibla = () => {
  // Use the custom hook
  const { location, heading, qiblaBearing, qiblaDirection, error, loading, requestLocation, lastError, rotateAnim } = useQibla();

  if (loading) {
    return (
      <Section title="Qibla Direction">
        <View style={styles.centered}>
          <Text style={{ marginBottom: 12 }}>Getting your location...</Text>
        </View>
      </Section>
    );
  }

  if (error) {
    return (
      <Section title="Qibla Direction">
        <View style={styles.centered}>
          <Text color="error" style={{ marginBottom: 12 }}>{error}</Text>
          {lastError && lastError.code === 1 && Platform.OS === 'android' && (
            <Text color="muted" style={{ textAlign: 'center', marginBottom: 8 }}>
              Please enable location services in your device settings.
            </Text>
          )}
          <Text color="muted" style={{ textAlign: 'center', marginBottom: 12 }}>
            Try enabling location and compass permissions. If the problem persists, restart the app or check your device's sensor support.
          </Text>
          <Text style={{ color: '#6a85f1', fontWeight: 'bold', marginBottom: 8 }} onPress={requestLocation} accessibilityRole="button">
            Retry
          </Text>
        </View>
      </Section>
    );
  }

  // Always render the compass if location is available
  return (
    <Section title="Qibla Direction" description="Align your device so the Qibla arrow points straight up for the correct direction.">
      <View style={styles.compassContainer}>
        {/* Qibla arrow above the compass */}
        <QiblaArrow qiblaDirection={qiblaDirection} rotateAnim={rotateAnim} />
        <Compass heading={heading} rotateAnim={rotateAnim} />
      </View>
      <Text style={styles.info}>
        {location
          ? `Qibla is ${Math.round(qiblaBearing)}° from North`
          : 'Getting location...'}
      </Text>
      <Text style={styles.info}>
        {`Current heading: ${Math.round(heading)}°`}
      </Text>
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  compassContainer: {
    width: 220,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  compass: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#6a85f1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative', // not absolute
  },
  north: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -8 }],
    fontSize: 18,
    color: '#6a85f1',
    fontWeight: 'bold',
  },
  south: {
    top: 180,
    left: '50%',
    transform: [{ translateX: -8 }],
  },
  east: {
    left: 180,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  west: {
    left: 10,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
  qiblaArrow: {
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  arrowText: {
    fontSize: 40,
    color: '#ff4d4f',
  },
  qiblaLabel: {
    fontSize: 14,
    color: '#ff4d4f',
    fontWeight: '600',
    marginTop: 2,
  },
  info: {
    fontSize: 15,
    color: '#888',
    marginTop: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassImage: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.85,
  },
});

export default Qibla;
