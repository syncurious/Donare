import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { UserStackParamList } from '../../config/navigation/UserNavigation';
import BenefitsCard from '../../components/cards/VolunteerCard';
import { showToast } from '../../utils/toast';
import { Donate } from '../../service/handler';

const PaymentConfirmation = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<UserStackParamList, 'PaymentConfirmation'>>();
  const { donationType, amount, paymentMethod, kindFields, isInKind } =
    route.params;
  const [loading, setLoading] = useState(false);

  // Helper function to get the donation amount
  const getDonationAmount = (): number => {
    if (amount) {
      return Number(amount);
    }
    if (kindFields?.assetsValue) {
      return parseFloat(kindFields.assetsValue);
    }
    if (kindFields?.amount) {
      return parseFloat(kindFields.amount);
    }
    return 0;
  };

  const donationAmount = getDonationAmount();

  const handlePayNow = async () => {
    setLoading(true);

    try {
      let payload: any;

      if (isInKind) {
        // In-kind payload (supports both Zakat and manual in-kind flow)
        payload = {
          donation_type: donationType,
          is_in_kind: true,
          // If using Zakat in-kind, keep zakat related fields;
          zakat_year: new Date().getFullYear(),
          zakat_calculation_method: kindFields?.calculationMethod || undefined,
          zakat_assets_value: kindFields?.assetsValue
            ? parseFloat(kindFields.assetsValue)
            : donationAmount || undefined,
          // Unified mapping for names/contacts from various flows
          item_name: kindFields?.itemName || kindFields?.name || '',
          donor_name: kindFields?.donorName || kindFields?.name || '',
          donor_phone: kindFields?.donorPhone || kindFields?.phone || '',
          pickup_address: kindFields?.pickupAddress || kindFields?.address || '',
          // Uploaded image URL from ManualAmountEntry
          item_image: kindFields?.item_image,
        } as any;
      } else {
        // Zakat in amount payload
        payload = {
          donation_type: donationType,
          amount: donationAmount,
          zakat_year: new Date().getFullYear(),
          zakat_calculation_method: kindFields?.calculationMethod || 'CASH',
          zakat_assets_value: donationAmount,
          zakat_percentage: 2.5,
          payment_method:
            paymentMethod?.toUpperCase().replace(/\s/g, '_') || 'CREDIT_CARD',
          is_in_kind: false,
        };
      }

      const response = (await Donate(payload)) as any;

      if (response.status || response.success) {
        showToast('success', `${donationType} donation successful!`);
        navigation.navigate('ThankYou', {
          donationType,
          amount: donationAmount,
        });
      } else {
        showToast(
          'error',
          response.message || 'Donation failed. Please try again.',
        );
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      showToast(
        'error',
        error?.data?.error?.message ||
          'Failed to process donation. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <BenefitsCard
      image={
        'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
      title="Confirm Your Donation"
      description={
        isInKind
          ? `You are about to donate ${
              kindFields?.itemName || 'items'
            } as ${donationType} in kind. Our team will contact you for pickup.`
          : `You are about to donate PKR ${donationAmount} for ${donationType} using ${paymentMethod}.`
      }
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
