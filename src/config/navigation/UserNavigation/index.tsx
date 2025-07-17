import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabs';
import VolunteerFrom from '../../../screens/home/VolunteerFrom';
import BenefitsZakat from '../../../screens/home/BenefitsZakat';
import BenefitsSadaqah from '../../../screens/home/BenefitsSadaqah';
import BenefitsFidyah from '../../../screens/home/BenefitsFidyah';
import BenefitsKaffarah from '../../../screens/home/BenefitsKaffarah';
import ZakatHomeAssets from '../../../screens/home/ZakatHomeAssets';
import ZakatBusinessAssets from '../../../screens/home/ZakatBusinessAssets';
import ZakatSummary from '../../../screens/home/ZakatSummary';
import NewPaymentMethod from '../../../screens/home/NewPaymentMethod';
import PaymentConfirmation from '../../../screens/home/PaymentConfirmation';
import ThankYou from '../../../screens/home/ThankYou';
import ManualAmountEntry from '../../../screens/home/ManualAmountEntry';
import FidyahCalculator from '../../../screens/home/FidyahCalculator';
import DonationHistory from '../../../screens/profile/DonationHistory';
import PrayerTimes from '../../../screens/prayerTime';

type UserStackParamList = {
  BottomTabs: undefined;
  VolunteerForm: undefined;
  BenefitsZakat: undefined;
  BenefitsSadaqah: undefined;
  BenefitsFidyah: undefined;
  BenefitsKaffarah: undefined;
  ZakatHomeAssets: undefined;
  ZakatBusinessAssets: { homeAssets: string };
  ZakatSummary: { homeAssets: string; businessAssets: string };
  NewPaymentMethod: { amount: string; donationType: string };
  PaymentConfirmation: {
    donationType: string;
    amount: number | string;
    paymentMethod: string;
  };
  ThankYou: { donationType: string; amount: number | string };
  ManualAmountEntry: undefined;
  FidyahCalculator: undefined;
  DonationHistory: undefined;
  PrayerTimes: undefined;
};

const Stack = createNativeStackNavigator<UserStackParamList>();
const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />
      <Stack.Screen
        name="VolunteerForm"
        options={{
          animation: 'slide_from_bottom',
          headerShown: true,
          title: 'Volunteer Form',
        }}
        component={VolunteerFrom}
      />
      <Stack.Screen
        name="BenefitsZakat"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Zakat Benefits',
        }}
        component={BenefitsZakat}
      />
      <Stack.Screen
        name="BenefitsSadaqah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Sadaqah Benefits',
        }}
        component={BenefitsSadaqah}
      />
      <Stack.Screen
        name="BenefitsFidyah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Fidyah Benefits',
        }}
        component={BenefitsFidyah}
      />
      <Stack.Screen
        name="BenefitsKaffarah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Kaffarah Benefits',
        }}
        component={BenefitsKaffarah}
      />
      <Stack.Screen
        name="ZakatHomeAssets"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Home Assets',
        }}
        component={ZakatHomeAssets}
      />
      <Stack.Screen
        name="ZakatBusinessAssets"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Business Assets',
        }}
        component={ZakatBusinessAssets}
      />
      <Stack.Screen
        name="ZakatSummary"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Zakat Summary',
        }}
        component={ZakatSummary}
      />
      <Stack.Screen
        name="NewPaymentMethod"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Add Payment Method',
        }}
        component={NewPaymentMethod}
      />
      <Stack.Screen
        name="PaymentConfirmation"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Confirm Payment',
        }}
        component={PaymentConfirmation}
      />
      <Stack.Screen
        name="ThankYou"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Thank You',
        }}
        component={ThankYou}
      />
      <Stack.Screen
        name="ManualAmountEntry"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Enter Amount',
        }}
        component={ManualAmountEntry}
      />
      <Stack.Screen
        name="FidyahCalculator"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Calculate Fidyah',
        }}
        component={FidyahCalculator}
      />
      <Stack.Screen
        name="DonationHistory"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Donation History',
        }}
        component={DonationHistory}
      />
      <Stack.Screen
        name="PrayerTimes"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Prayes Time',
        }}
        component={PrayerTimes}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
export type { UserStackParamList };
