import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import { useTheme } from '../../config/theme';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import ReminderCard from '../../components/cards/ReminderCard';
import Text from '../../components/base/Text';

interface ManualAmountEntryProps {
  donationType?: 'Sadaqah' | 'Kaffarah' | 'Zakat' | 'Fidyah';
}

type RouteParams = {
  donationType?: 'Sadaqah' | 'Kaffarah' | 'Zakat' | 'Fidyah';
};

const ManualAmountEntry: React.FC<ManualAmountEntryProps> = props => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isKindSelected, setIsKindSelected] = useState(false);
  const [kindFields, setKindFields] = useState({
    amount: '',
    name: '',
    phone: '',
    address: '',
    description: '',
  });

  // Prefer prop, then route param, then default
  const donationType =
    props.donationType || route.params?.donationType || 'Sadaqah';

  const handleDonate = () => {
    if (
      (!amount || isNaN(Number(amount)) || Number(amount) <= 0) &&
      !isKindSelected
    ) {
      setError('Please enter a valid amount');
      return;
    }
    if (isKindSelected) {
      if (
        !kindFields.amount ||
        !kindFields.name ||
        !kindFields.phone ||
        !kindFields.address
      ) {
        setError('Please fill all required fields for Donate in Kind');
        return;
      }
    }
    setError(undefined);
    navigation.navigate('PaymentConfirmation', {
      donationType,
      amount: isKindSelected ? undefined : amount,
      paymentMethod: 'CASH',
      kindFields: isKindSelected ? kindFields : undefined,
      isKindSelected,
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleKindSelect = () => {
    setIsKindSelected(true);
    setAmount('');
  };
  const handleAmountChange = (val: string) => {
    setAmount(val);
    if (isKindSelected) setIsKindSelected(false);
  };

  return (
    <Container
      scrollable
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        paddingHorizontal: 0,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <View style={styles.headerSection}>
        <Heading level={2} style={styles.heading}>
          Donation Amount
        </Heading>
        <Paragraph variant="h5" color="primary" style={styles.subheading}>
          How much would you like to donate?
        </Paragraph>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.inputSection}>
          <Input
            label={undefined}
            placeholder="PKR 0.00"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            variant="outlined"
            size="large"
            prefixIcon={undefined}
            style={styles.input}
            inputStyle={styles.inputText}
            error={error && !isKindSelected ? error : undefined}
          />
        </View>
        <View style={[styles.inputSection, styles.gap16]}>
          <Paragraph variant="h2" color="primary">
            Or
          </Paragraph>
          <TouchableOpacity activeOpacity={0.8} onPress={handleKindSelect}>
            <ReminderCard
              style={{
                borderColor: isKindSelected
                  ? typeof theme.colors.primary === 'string'
                    ? theme.colors.primary
                    : theme.colors.primary[500] || '#007bff'
                  : '#E0E0E0',
                borderWidth: isKindSelected ? 2 : 1,
              }}
              buttonAction={() => {}}
              buttonText="Upload Image"
              title="Donate in Kind"
              description="Share an image of the goods you wish to donate"
              image={
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
              }
            />
          </TouchableOpacity>
          {isKindSelected && (
            <View style={{ gap: 12 }}>
              <Input
                label="Amount"
                placeholder="Enter Amount"
                value={kindFields.amount}
                onChangeText={val =>
                  setKindFields(f => ({ ...f, amount: val }))
                }
                style={{ marginTop: 8 }}
                keyboardType="number-pad"
              />
              <Input
                label="Name"
                placeholder="Enter Name"
                value={kindFields.name}
                onChangeText={val => setKindFields(f => ({ ...f, name: val }))}
                style={{ marginTop: 8 }}
              />
              <Input
                label="Phone No"
                placeholder="Enter Phone Number"
                value={kindFields.phone}
                onChangeText={val => setKindFields(f => ({ ...f, phone: val }))}
                keyboardType="phone-pad"
                style={{ marginTop: 8 }}
                maxLength={11}
              />
              <Input
                label="Take From Address"
                placeholder="Enter Address"
                value={kindFields.address}
                onChangeText={val =>
                  setKindFields(f => ({ ...f, address: val }))
                }
              />
              <Input
                label="Description (optional)"
                placeholder="Enter Description"
                value={kindFields.description}
                onChangeText={val =>
                  setKindFields(f => ({ ...f, description: val }))
                }
                style={{ marginTop: 8 }}
              />
              {error && (
                <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>
              )}
            </View>
          )}
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222', // fallback, will be overridden by theme
  },
  gap16: {
    gap: 16,
  },
  kindCard: {
    borderColor: '#E0E0E0',
    padding: 0,
    borderWidth: 1,
    borderRadius: 12,
    margin: 0,
  },
  kindCardLeft: {
    width: '60%',
  },
  kindTitle: {
    fontWeight: 'bold',
  },
  kindSubtitle: {
    fontSize: 12,
  },
  kindHelpIconRow: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
    marginTop: 8,
  },
  kindHelpIcon: {
    width: 25,
    height: 25,
  },
  kindImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  kindAddressRow: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonSection: {
    marginTop: 'auto',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  donateButton: {
    borderRadius: 24,
    marginBottom: 12,
  },
  cancelButton: {
    borderRadius: 24,
  },
});

export default ManualAmountEntry;
