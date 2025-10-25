import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import NamazIcon from '../../assets/icons/NamazIcon.png';
import {
  getPrayerTimesByCoordinates,
  formatPrayerTimes,
  getNextPrayer,
  calculateCountdown,
  PrayerTime,
  PrayerTimesData,
} from '../../service/aladhan';

type PrayerTimeRowProps = { name: string; time: string; icon: any };
const PrayerTimeRow: React.FC<PrayerTimeRowProps> = ({ name, time, icon }) => (
  <View style={styles.prayerRow}>
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </View>
    <Text variant="body1" style={styles.prayerName}>
      {name}
    </Text>
    <Text variant="body2" color="secondary" style={styles.prayerTime}>
      {time}
    </Text>
  </View>
);

type CountdownBoxProps = { label: string; value: string };
const CountdownBox: React.FC<CountdownBoxProps> = ({ label, value }) => (
  <View style={styles.countdownBox}>
    <Text variant="h5" style={styles.countdownValue}>
      {value}
    </Text>
    <Text variant="caption" color="secondary">
      {label}
    </Text>
  </View>
);

const PrayerTimes = () => {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [upcomingPrayer, setUpcomingPrayer] = useState<{ name: string; time: string } | null>(null);
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timingsData, setTimingsData] = useState<PrayerTimesData | null>(null);

  // Request location permission for Android
  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show accurate prayer times.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Location permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions differently
  };

  // Fetch prayer times
  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        // Fallback to a default location if permission denied
        console.log('Using default location');
        const response = await getPrayerTimesByCoordinates(24.8607, 67.0011); // Karachi as default
        const formattedPrayers = formatPrayerTimes(response.data.timings);
        const nextPrayer = getNextPrayer(response.data.timings);
        
        setPrayers(formattedPrayers);
        setUpcomingPrayer(nextPrayer);
        setTimingsData(response.data.timings);
        setLoading(false);
        return;
      }

      // Get current location
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await getPrayerTimesByCoordinates(latitude, longitude);
            const formattedPrayers = formatPrayerTimes(response.data.timings);
            const nextPrayer = getNextPrayer(response.data.timings);
            
            setPrayers(formattedPrayers);
            setUpcomingPrayer(nextPrayer);
            setTimingsData(response.data.timings);
            setLoading(false);
          } catch (apiError) {
            console.error('API Error:', apiError);
            setError('Failed to fetch prayer times. Please try again.');
            setLoading(false);
          }
        },
        (geoError) => {
          console.error('Geolocation Error:', geoError);
          // Fallback to default location
          getPrayerTimesByCoordinates(24.8607, 67.0011)
            .then((response) => {
              const formattedPrayers = formatPrayerTimes(response.data.timings);
              const nextPrayer = getNextPrayer(response.data.timings);
              
              setPrayers(formattedPrayers);
              setUpcomingPrayer(nextPrayer);
              setTimingsData(response.data.timings);
              setLoading(false);
            })
            .catch((err) => {
              setError('Failed to fetch prayer times. Please try again.');
              setLoading(false);
            });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  // Update countdown every second
  useEffect(() => {
    if (upcomingPrayer && timingsData) {
      const interval = setInterval(() => {
        const newCountdown = calculateCountdown(upcomingPrayer.time);
        setCountdown(newCountdown);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [upcomingPrayer, timingsData]);

  // Fetch prayer times on mount
  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  if (loading) {
    return (
      <Container style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text variant="body1" style={styles.loadingText}>
            Loading prayer times...
          </Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="body1" color="error" style={styles.errorText}>
            {error}
          </Text>
          <Text 
            variant="body2" 
            color="primary" 
            style={styles.retryText}
            onPress={fetchPrayerTimes}
          >
            Tap to retry
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Heading level={4} style={styles.header}>
        Today's Prayer Times
      </Heading>
      <View style={styles.prayerList}>
        {prayers.map((prayer) => (
          <PrayerTimeRow key={prayer.name} name={prayer.name} time={prayer.time} icon={NamazIcon} />
        ))}
      </View>
      {upcomingPrayer && (
        <>
          <Heading level={5} style={styles.upcomingHeader}>
            Upcoming Prayer
          </Heading>
          <PrayerTimeRow name={upcomingPrayer.name} time={upcomingPrayer.time} icon={NamazIcon} />
          <View style={styles.countdownContainer}>
            <CountdownBox label="Hours" value={countdown.hours} />
            <CountdownBox label="Minutes" value={countdown.minutes} />
            <CountdownBox label="Seconds" value={countdown.seconds} />
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 0,
  },
  header: {
    marginBottom: 16,
    textAlign: 'left',
  },
  prayerList: {
    marginBottom: 16,
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8F9FB',
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    width: 24,
    height: 24,
  },
  prayerName: {
    flex: 1,
    fontWeight: '600',
  },
  prayerTime: {
    minWidth: 70,
    textAlign: 'right',
  },
  divider: {
    marginVertical: 16,
  },
  upcomingHeader: {
    marginBottom: 8,
    textAlign: 'left',
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  countdownBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    marginHorizontal: 4,
    paddingVertical: 12,
  },
  countdownValue: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  retryText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default PrayerTimes;
