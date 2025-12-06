import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import SkipButton from '../../components/sections/SkipButton';
import { Container } from '../../components/base';
import Text from '../../components/base/Text';
import theme from '../../config/theme';

type ZakatType = 'sunni' | 'shia';
type ShiaRate = '5' | '10' | '20';

const ZakatHomeAssets = () => {
  const navigation = useNavigation<NavigationProp<any, 'ZakatHomeAssets'>>();
  const [zakatType, setZakatType] = useState<ZakatType | null>('sunni');
  const [shiaRate, setShiaRate] = useState<ShiaRate>('5');
  const [cash, setCash] = useState('');
  const [gold, setGold] = useState('');
  const [silver, setSilver] = useState('');
  const [otherAssets, setOtherAssets] = useState('');
  const [errors, setErrors] = useState({
    cash: '',
    gold: '',
    silver: '',
    otherAssets: '',
  });

  const handleNext = () => {
    // Check if at least one field is filled
    const hasAnyValue = [cash, gold, silver, otherAssets].some(
      value => value && value.trim() !== ''
    );

    if (!hasAnyValue) {
      // Show error if no fields are filled
      const newErrors = {
        cash: 'Please fill at least one field',
        gold: '',
        silver: '',
        otherAssets: '',
      };
      setErrors(newErrors);
      return;
    }

    // Clear any existing errors
    setErrors({
      cash: '',
      gold: '',
      silver: '',
      otherAssets: '',
    });

    // You can pass all values as a stringified object or as separate params
    navigation.navigate('ZakatBusinessAssets', {
      homeAssets: JSON.stringify({ 
        cash, 
        gold, 
        silver, 
        otherAssets,
        zakatType,
        shiaRate: zakatType === 'shia' ? shiaRate : undefined,
      }),
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
            donationType: 'ZAKAT',
            amount: 0,
          })
        }
      />
      <Container scrollable style={styles.container} contentContainerStyle={{flexGrow: 1,paddingBottom:40}}>
        <Heading level={2} style={styles.heading}>
          Zakat Calculator
        </Heading>
        <Paragraph color="secondary" style={styles.description}>
          Select your Zakat calculation method and enter your home assets below.
        </Paragraph>

        {/* Zakat Type Selection */}
        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Select Zakat Type
          </Text>
          
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                zakatType === 'sunni' && styles.typeButtonActive,
              ]}
              onPress={() => setZakatType('sunni')}
            >
              <Text
                variant="body1"
                style={[
                  styles.typeButtonText,
                  zakatType === 'sunni' && styles.typeButtonTextActive,
                ]}
              >
                Sunni
              </Text>
              <Text variant="caption" style={styles.typeButtonSubtext}>
                2.5% of total assets
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                zakatType === 'shia' && styles.typeButtonActive,
              ]}
              onPress={() => setZakatType('shia')}
            >
              <Text
                variant="body1"
                style={[
                  styles.typeButtonText,
                  zakatType === 'shia' && styles.typeButtonTextActive,
                ]}
              >
                Shia
              </Text>
              <Text variant="caption" style={styles.typeButtonSubtext}>
                Variable rates
              </Text>
            </TouchableOpacity>
          </View>

          {zakatType === 'shia' && (
            <View style={styles.shiaRateContainer}>
              <Text variant="body1" style={styles.label}>
                Select Zakat Rate
              </Text>
              <View style={styles.rateButtons}>
                {(['5', '10', '20'] as ShiaRate[]).map((rate) => (
                  <TouchableOpacity
                    key={rate}
                    style={[
                      styles.rateButton,
                      shiaRate === rate && styles.rateButtonActive,
                    ]}
                    onPress={() => setShiaRate(rate)}
                  >
                    <Text
                      variant="body2"
                      style={[
                        styles.rateButtonText,
                        shiaRate === rate && styles.rateButtonTextActive,
                      ]}
                    >
                      {rate}%
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text variant="caption" color="secondary" style={styles.rateNote}>
                5%: Artificially irrigated crops
                {'\n'}10%: Naturally irrigated crops
                {'\n'}20%: Khums on surplus income
              </Text>
            </View>
          )}
        </View>

        {/* Assets Input - Only show after selecting zakat type */}
        {zakatType && (
          <>
            <Text variant="h4" style={styles.sectionTitle}>
              Enter Your Home Assets
            </Text>
            <Paragraph color="secondary" style={styles.description}>
              This includes cash, gold, silver, and any other assets you own at home.
            </Paragraph>
            <Input
              label="Cash at Home/Bank"
              placeholder="Enter amount in PKR"
              keyboardType="numeric"
              value={cash}
              onChangeText={(text) => {
                setCash(text);
                if (errors.cash && text.trim() !== '') {
                  setErrors(prev => ({ ...prev, cash: '' }));
                }
              }}
              style={styles.input}
            />
            <Input
              label="Gold Value"
              placeholder="Enter gold value in PKR"
              keyboardType="numeric"
              value={gold}
              onChangeText={(text) => {
                setGold(text);
                if (errors.gold && text.trim() !== '') {
                  setErrors(prev => ({ ...prev, gold: '' }));
                }
              }}
              style={styles.input}
            />
            <Input
              label="Silver Value"
              placeholder="Enter silver value in PKR"
              keyboardType="numeric"
              value={silver}
              onChangeText={(text) => {
                setSilver(text);
                if (errors.silver && text.trim() !== '') {
                  setErrors(prev => ({ ...prev, silver: '' }));
                }
              }}
              style={styles.input}
            />
            <Input
              label="Other Assets"
              placeholder="Enter value of other assets in PKR"
              keyboardType="numeric"
              value={otherAssets}
              onChangeText={(text) => {
                setOtherAssets(text);
                if (errors.otherAssets && text.trim() !== '') {
                  setErrors(prev => ({ ...prev, otherAssets: '' }));
                }
              }}
              style={styles.input}
            />
            {errors.cash && (
              <Text style={{ color: 'red', marginTop: 4 }}>
                {errors.cash}
              </Text>
            )}
            <Button onPress={handleNext} style={styles.button}>
              Next
            </Button>
          </>
        )}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.neutral[500],
    backgroundColor: theme.colors.neutral[50],
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  typeButtonText: {
    fontWeight: '600',
    marginBottom: 4,
  },
  typeButtonTextActive: {
    color: theme.colors.primary[600],
  },
  typeButtonSubtext: {
    textAlign: 'center',
  },
  shiaRateContainer: {
    marginTop: 16,
  },
  label: {
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  rateButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  rateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.neutral[500],
    backgroundColor: theme.colors.neutral[50],
    alignItems: 'center',
  },
  rateButtonActive: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[500],
  },
  rateButtonText: {
    fontWeight: '500',
  },
  rateButtonTextActive: {
    color:'#fff',
  },
  rateNote: {
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  guidanceButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  guidanceButtonText: {
    fontWeight: '600',
  },
});

export default ZakatHomeAssets;
