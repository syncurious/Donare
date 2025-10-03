import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import SkipButton from '../../components/sections/SkipButton';
import { Container } from '../../components/base';

const ZakatHomeAssets = () => {
  const navigation = useNavigation<NavigationProp<any, 'ZakatHomeAssets'>>();
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [otherAssets, setOtherAssets] = useState('');

  const handleNext = () => {
    // You can pass all values as a stringified object or as separate params
    navigation.navigate('ZakatBusinessAssets', {
      homeAssets: JSON.stringify({ cash, gold, silver, otherAssets }),
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}
    >
      <SkipButton
        onPress={() =>
          navigation.navigate('ManualAmountEntry', {
            donationType: 'Zakat',
            amount: 0,
          })
        }
      />
      <Container scrollable style={styles.container}>
        <Heading level={2} style={styles.heading}>
          Zakat Calculator
        </Heading>
        <Paragraph color="secondary" style={styles.description}>
          Enter your home assets below. This includes cash, gold, silver, and
          any other assets you own at home. These values will be used to
          calculate your zakat.
        </Paragraph>
        <Input
          label="Cash at Home/Bank"
          placeholder="Enter amount in PKR"
          keyboardType="numeric"
          value={cash}
          onChangeText={setCash}
          style={styles.input}
        />
        <Input
          label="Gold Value"
          placeholder="Enter gold value in PKR"
          keyboardType="numeric"
          value={gold}
          onChangeText={setGold}
          style={styles.input}
        />
        <Input
          label="Silver Value"
          placeholder="Enter silver value in PKR"
          keyboardType="numeric"
          value={silver}
          onChangeText={setSilver}
          style={styles.input}
        />
        <Input
          label="Other Assets"
          placeholder="Enter value of other assets in PKR"
          keyboardType="numeric"
          value={otherAssets}
          onChangeText={setOtherAssets}
          style={styles.input}
        />
        <Button onPress={handleNext} style={styles.button}>
          Next
        </Button>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex:1,
    // justifyContent: 'center',
    backgroundColor: '#fff',
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

export default ZakatHomeAssets;
