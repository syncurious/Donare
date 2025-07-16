import React, { useState } from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Button from '../../components/base/Button';
import CheckBox from '../../components/base/CheckBox';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../config/theme';
import BefitsListCard from '../../components/cards/befitsListCard';

const PAYMENT_OPTIONS = [
  {
    icon: require('../../assets/icons/compassIcon.png'),
    key: 'card',
    label: 'Credit/Debit Card',
    description: 'Add your credit/debit card to donate easily and securely.',
  },
  {
    icon: require('../../assets/icons/duoIcon.png'),
    key: 'bank',
    label: 'Bank Transfer',
    description: 'Transfer funds directly from your bank account.',
  },
  {
    icon: require('../../assets/icons/homeIcon.png'),
    key: 'wallet',
    label: 'Wallet',
    description: 'Donate from your digital wallet.',
  },
];

const SelectPaymentMethod = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [selected, setSelected] = useState('card');

  const handleContinue = () => {
    // Proceed with selected payment method
    // navigation.navigate('NextScreen', { method: selected });
  };

  return (
    <Container
      scrollable
      padding="small"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      <Heading level={2} style={{ marginBottom: theme.spacing[4] }}>
        Select Payment Method
      </Heading>
      <View style={{ gap: theme.spacing[3], marginBottom: theme.spacing[5] }}>
        {PAYMENT_OPTIONS.map(option => (
          <TouchableOpacity
            onPress={() => setSelected(option.key)}
            style={{
              borderWidth: selected === option.key ? 2 : 1,
              borderColor:
                selected === option.key
                  ? theme.colors.primary[500]
                  : theme.colors.secondary[200],
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing[3],
              backgroundColor:
                selected === option.key
                  ? theme.colors.primary[50]
                  : theme.colors.background.secondary,
            }}
          >
            <BefitsListCard
              title={option.label}
              key={option.key}
              description={option.description}
              icon={option.icon}
            />
          </TouchableOpacity>
          //   <CheckBox
          //     key={option.key}
          //     checked={selected === option.key}
          //     onPress={() => setSelected(option.key)}
          //     label={option.label}
          //
          //     labelStyle={{ fontWeight: selected === option.key ? 'bold' : 'normal' }}
          //   />
        ))}
      </View>
      <Button
        variant="contained"
        color="primary"
        onPress={handleContinue}
        style={{ marginTop: theme.spacing[5] }}
        fullWidth
      >
        Continue
      </Button>
    </Container>
  );
};

export default SelectPaymentMethod;
