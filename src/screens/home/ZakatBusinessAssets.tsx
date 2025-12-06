import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Text from '../../components/base/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import SkipButton from '../../components/sections/SkipButton';

const ZakatBusinessAssets = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<any, 'ZakatBusinessAssets'>
    >();
  const route =
    useRoute<RouteProp<UserStackParamList, 'ZakatBusinessAssets'>>();
  const { homeAssets } = route.params;
  const [inventory, setInventory] = useState('');
  const [receivables, setReceivables] = useState('');
  const [investments, setInvestments] = useState('');
  const [otherBusinessAssets, setOtherBusinessAssets] = useState('');
  const [errors, setErrors] = useState({
    inventory: '',
    receivables: '',
    investments: '',
    otherBusinessAssets: '',
  });

  const handleNext = () => {
    // Check if at least one field is filled
    const hasAnyValue = [inventory, receivables, investments, otherBusinessAssets].some(
      value => value && value.trim() !== ''
    );

    if (!hasAnyValue) {
      // Show error if no fields are filled
      const newErrors = {
        inventory: 'Please fill at least one field',
        receivables: '',
        investments: '',
        otherBusinessAssets: '',
      };
      setErrors(newErrors);
      return;
    }

    // Clear any existing errors
    setErrors({
      inventory: '',
      receivables: '',
      investments: '',
      otherBusinessAssets: '',
    });

    navigation.navigate('ZakatSummary', {
      homeAssets,
      businessAssets: JSON.stringify({
        inventory,
        receivables,
        investments,
        otherBusinessAssets,
      }),
    });
  };

  const handleSkip = () => {
    navigation.navigate('ManualAmountEntry', {
      donationType: 'ZAKAT',
      amount: 0,
    });
  };

  return (
    <>
      <SkipButton onPress={handleSkip} />
      <ScrollView contentContainerStyle={styles.container}>
        <Heading level={2} style={styles.heading}>
          Calculate Business Assets
        </Heading>
        <Paragraph color="secondary" style={styles.description}>
          Enter your business assets below. This includes inventory,
          receivables, investments, and any other business-related assets. These
          values will be used to calculate your zakat.
        </Paragraph>
        <Input
          label="Inventory"
          placeholder="Enter inventory value in PKR"
          keyboardType="numeric"
          value={inventory}
          onChangeText={(text) => {
            setInventory(text);
            if (errors.inventory && text.trim() !== '') {
              setErrors(prev => ({ ...prev, inventory: '' }));
            }
          }}
          style={styles.input}
        />
        <Input
          label="Receivables"
          placeholder="Enter receivables in PKR"
          keyboardType="numeric"
          value={receivables}
          onChangeText={(text) => {
            setReceivables(text);
            if (errors.receivables && text.trim() !== '') {
              setErrors(prev => ({ ...prev, receivables: '' }));
            }
          }}
          style={styles.input}
        />
        <Input
          label="Investments"
          placeholder="Enter investments in PKR"
          keyboardType="numeric"
          value={investments}
          onChangeText={(text) => {
            setInvestments(text);
            if (errors.investments && text.trim() !== '') {
              setErrors(prev => ({ ...prev, investments: '' }));
            }
          }}
          style={styles.input}
        />
        <Input
          label="Other Business Assets"
          placeholder="Enter value of other business assets in PKR"
          keyboardType="numeric"
          value={otherBusinessAssets}
          onChangeText={(text) => {
            setOtherBusinessAssets(text);
            if (errors.otherBusinessAssets && text.trim() !== '') {
              setErrors(prev => ({ ...prev, otherBusinessAssets: '' }));
            }
          }}
          style={styles.input}
        />
        {errors.inventory && (
          <Text style={{ color: 'red', marginTop: 4 }}>
            {errors.inventory}
          </Text>
        )}
        <Button onPress={handleNext} style={styles.button}>
          Next
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ZakatBusinessAssets;
