import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import SkipButton from '../../components/sections/SkipButto';

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

  const handleNext = () => {
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
      donationType: 'Zakat',
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
          onChangeText={setInventory}
          style={styles.input}
        />
        <Input
          label="Receivables"
          placeholder="Enter receivables in PKR"
          keyboardType="numeric"
          value={receivables}
          onChangeText={setReceivables}
          style={styles.input}
        />
        <Input
          label="Investments"
          placeholder="Enter investments in PKR"
          keyboardType="numeric"
          value={investments}
          onChangeText={setInvestments}
          style={styles.input}
        />
        <Input
          label="Other Business Assets"
          placeholder="Enter value of other business assets in PKR"
          keyboardType="numeric"
          value={otherBusinessAssets}
          onChangeText={setOtherBusinessAssets}
          style={styles.input}
        />
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
