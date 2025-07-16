import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { UserStackParamList } from '../../config/navigation/UserNavigation';
import Volunteer from './Volunteer';
import BenefitsCard from '../../components/cards/VolunteerCard';

const PaymentConfirmation = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<UserStackParamList, 'PaymentConfirmation'>>();
  const { donationType, amount, paymentMethod } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ThankYou', { donationType, amount });
    }, 2000);
  };

  return (
      <BenefitsCard
        image={
          'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        title="Confirm Your Donation"
        description={`You are about to donate $${amount} for ${donationType} using ${paymentMethod}.`}
        benefits={[]}
        buttonText={loading ? 'Processing...' : 'Pay Now'}
        sectionTitle=""
        onButtonPress={handlePayNow}
      />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 16,
    borderRadius: 30,
    alignSelf: 'stretch',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentConfirmation;
