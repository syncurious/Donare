import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../../config/theme';
import NamazIcon from '../../assets/icons/NamazIcon.png';
import Heading from '../base/Heading';
import QiblaIcon from '../../assets/icons/QiblaIcon.png';
import IslamicCalenderIcon from '../../assets/icons/IslamicCalender.png';

const QuickNavigation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.quickNavigationContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.quickNavigationItem}
        >
          <View style={styles.quickNavigationItemIcon}>
            <Image source={NamazIcon} style={{ width: 40, height: 40 }} />
          </View>
          <Heading
            level={6}
            style={[styles.quickNavigationItemText]}
          >
            Namaz Time
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <View style={styles.quickNavigationItemIcon}>
            <Image source={QiblaIcon} style={{ width: 40, height: 40 }} />
          </View>
          <Heading
            level={6}
            style={[styles.quickNavigationItemText]}
          >
            Qibla Direction
          </Heading>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <View style={styles.quickNavigationItemIcon}>
            <Image source={IslamicCalenderIcon} style={{ width: 30, height: 30 }} />
          </View>
          <Heading
            level={6}
            style={[styles.quickNavigationItemText]}
          >
            Calendar
          </Heading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickNavigation;

const styles = StyleSheet.create({ 
  container : {
    paddingVertical: 30,
    backgroundColor: theme.colors.primary[100],
    padding: 12,
    gap: 12,
  },
  quickNavigationContainer : {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quickNavigationItem : {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  quickNavigationItemIcon : {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  quickNavigationItemText : {
    color: theme.colors.neutral[800],
    fontSize: 12,
    textAlign: 'center',
  },
  quickNavigationItemTextActive : {
    color: theme.colors.primary[500],
    fontWeight: 'bold',
  },
  quickNavigationItemTextInactive : {
    color: theme.colors.neutral[800],
    fontSize: 12,
    textAlign: 'center',
  }
});