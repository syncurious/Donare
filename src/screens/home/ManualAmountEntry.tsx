import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import { useTheme } from '../../config/theme';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';

interface ManualAmountEntryProps {
  donationType?: 'Sadaqah' | 'Kaffarah';
}

type RouteParams = { donationType?: 'Sadaqah' | 'Kaffarah' };

const ManualAmountEntry: React.FC<ManualAmountEntryProps> = (props) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  // Prefer prop, then route param, then default
  const donationType = props.donationType || route.params?.donationType || 'Sadaqah';

  const handleDonate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setError(undefined);
    navigation.navigate('PaymentConfirmation', {
      donationType,
      amount,
      paymentMethod: '', // To be selected in next step
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <Container style={{ flex: 1, backgroundColor: theme.colors.background.primary, paddingHorizontal: 0 }}>
      <View style={styles.headerSection}>
        <Heading level={2} style={styles.heading}>Donation Amount</Heading>
        <Paragraph variant="h5" color="primary" style={styles.subheading}>
          How much would you like to donate?
        </Paragraph>
      </View>
      <View style={styles.inputSection}>
        <Input
          label={undefined}
          placeholder="PKR 0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          variant="outlined"
          size="large"
          prefixIcon={undefined}
          style={styles.input}
          inputStyle={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text.primary }}
          error={error}
        />
      </View>
      <View style={styles.buttonSection}>
        <Button
          onPress={handleDonate}
          variant="contained"
          size="medium"
          color="primary"
          style={styles.donateButton}
        >
          Donate
        </Button>
        <Button
          onPress={handleCancel}
          variant="outlined"
          size="medium"
          color="primary"
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    marginTop: 48,
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    marginBottom: 8,
    fontWeight: '700',
  },
  subheading: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 16,
  },
  inputSection: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  input: {
    borderRadius: 12,
    backgroundColor: '#F2F2F5',
    // paddingHorizontal: 0,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonSection: {
    marginTop: 'auto',
    marginBottom: 16,
    marginHorizontal: 16,
    // gap: 12,
    // gap: 16,
  },
  donateButton: {
    borderRadius: 24,
    // minHeight: 56,
    marginBottom: 12,
  },
  cancelButton: {
    borderRadius: 24,
    // minHeight: 56,
  },
});

export default ManualAmountEntry; 