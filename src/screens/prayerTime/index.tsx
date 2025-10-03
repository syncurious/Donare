import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import NamazIcon from '../../assets/icons/NamazIcon.png';

const PRAYERS = [
  { name: 'Fajr', time: '05:30 AM', icon: NamazIcon },
  { name: 'Dhuhr', time: '01:15 PM', icon: NamazIcon },
  { name: 'Asr', time: '05:00 PM', icon: NamazIcon },
  { name: 'Maghrib', time: '07:30 PM', icon: NamazIcon },
  { name: 'Isha', time: '09:00 PM', icon: NamazIcon },
];

const UPCOMING_PRAYER = { name: 'Maghrib', time: '07:30 PM', icon: NamazIcon };
const COUNTDOWN = { hours: '02', minutes: '30', seconds: '00' };

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
  return (
    <Container style={styles.container} >
      <Heading level={4} style={styles.header}>
        Today's Prayer Times
      </Heading>
      <View style={styles.prayerList}>
        {PRAYERS.map(prayer => (
          <PrayerTimeRow key={prayer.name} {...prayer} />
        ))}
      </View>
      <Heading level={5} style={styles.upcomingHeader}>
        Upcoming Prayer
      </Heading>
      <PrayerTimeRow {...UPCOMING_PRAYER} />
      <View style={styles.countdownContainer}>
        <CountdownBox label="Hours" value={COUNTDOWN.hours} />
        <CountdownBox label="Minutes" value={COUNTDOWN.minutes} />
        <CountdownBox label="Seconds" value={COUNTDOWN.seconds} />
      </View>
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
});

export default PrayerTimes;
