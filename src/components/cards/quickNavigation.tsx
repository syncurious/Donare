import { Image, TouchableOpacity, View } from 'react-native';
import theme from '../../config/theme';
import NamazIcon from '../../assets/icons/NamazIcon.png';
import Heading from '../base/Heading';
import QiblaIcon from '../../assets/icons/QiblaIcon.png';
import IslamicCalenderIcon from '../../assets/icons/IslamicCalender.png';

const QuickNavigation = () => {
  return (
    <View
      style={{
        paddingVertical: 30,
        backgroundColor: theme.colors.primary[100],
        padding: 12,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image source={NamazIcon} style={{ width: 40, height: 40 }} />
          </View>
          <Heading
            level={6}
            style={{ color: theme.colors.neutral[800], fontSize: 12 }}
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
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image source={QiblaIcon} style={{ width: 40, height: 40 }} />
          </View>
          <Heading
            level={6}
            style={{ color: theme.colors.neutral[800], fontSize: 12 }}
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
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image source={IslamicCalenderIcon} style={{ width: 40, height: 40 }} />
          </View>
          <Heading
            level={6}
            style={{ color: theme.colors.neutral[800], fontSize: 12 }}
          >
            Calendar
          </Heading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickNavigation;
