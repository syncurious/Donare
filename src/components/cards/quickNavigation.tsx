import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../../config/theme';
import NamazIcon from '../../assets/icons/NamazIcon.png';
import Heading from '../base/Heading';
import QiblaIcon from '../../assets/icons/QiblaIcon.png';
import IslamicCalenderIcon from '../../assets/icons/IslamicCalender.png';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import DonateCoinIcon from '../../assets/icons/donationCoinIcon.png';

const QuickNavigation = () => {
  const navigation = useNavigation<any>();
  const handleNavigate = (name: string) => {
    return navigation.navigate(name);
  };
  return (
    <View style={styles.container}>
      <View style={styles.quickNavigationContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.quickNavigationItem}
          onPress={() => handleNavigate('Donate')}
        >
          <View style={styles.quickNavigationItemIcon}>
            {/* Replace with your Donate icon if available */}
            <Image source={DonateCoinIcon} style={{ width: 30, height: 30 }} />
          </View>
          <Heading level={6} style={[styles.quickNavigationItemText]}>
            Donate
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.quickNavigationItem}
          onPress={() => handleNavigate('PrayerTimes')}
        >
          <View style={styles.quickNavigationItemIcon}>
            <Image source={require('../../assets/icons/NamazIcon.png')} style={{ width: 40, height: 40 }} />
          </View>
          <Heading level={6} style={[styles.quickNavigationItemText]}>
            Namaz Time
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.quickNavigationItem}
          onPress={() => handleNavigate('IslamicCalendar')}
        >
          <View style={styles.quickNavigationItemIcon}>
            <Image source={require('../../assets/icons/IslamicCalender.png')} style={{ width: 30, height: 30 }} />
          </View>
          <Heading level={6} style={[styles.quickNavigationItemText]}>
            Calendar
          </Heading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickNavigation;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: theme.colors.primary[100],
    padding: 12,
    gap: 12,
  },
  quickNavigationContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quickNavigationItem: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  quickNavigationItemIcon: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  quickNavigationItemText: {
    color: theme.colors.neutral[800],
    fontSize: 12,
    textAlign: 'center',
  },
  quickNavigationItemTextActive: {
    color: theme.colors.primary[500],
    fontWeight: 'bold',
  },
  quickNavigationItemTextInactive: {
    color: theme.colors.neutral[800],
    fontSize: 12,
    textAlign: 'center',
  },
});
