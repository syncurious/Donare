import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import type { UserStackParamList } from '../../config/navigation/UserNavigation';
import BenefitsCard from '../../components/cards/VolunteerCard';

const checkmark = require('../../assets/icons/heartIconFilled.png');

type ThankYouRouteParams = {
  donationType?: string;
  amount?: number | string;
};

const ThankYou = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<UserStackParamList, 'ThankYou'>>();
  const { donationType, amount } = route.params || {};

  return (
      <BenefitsCard
        image="https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Thank Your Donation"
        description={`Your ${
          donationType ? donationType : 'donation'
        } of $${amount} has been received.`}
        sectionTitle=""
        buttonText="Back To Home"
        benefits={[]}
        onButtonPress={() => navigation.navigate('BottomTabs')}
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
    width: 80,
    height: 80,
    marginBottom: 12,
    tintColor: '#4CAF50',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
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

export default ThankYou;
