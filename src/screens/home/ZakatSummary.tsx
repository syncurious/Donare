import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Button from '../../components/base/Button';

const ZakatSummary = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UserStackParamList, 'ZakatSummary'>>();
  const route = useRoute<RouteProp<UserStackParamList, 'ZakatSummary'>>();
  const { homeAssets, businessAssets } = route.params;

  // Parse the JSON strings
  const home = homeAssets ? JSON.parse(homeAssets) : {};
  const business = businessAssets ? JSON.parse(businessAssets) : {};

  // Calculate totals
  const homeTotal =
    (parseFloat(home.cash) || 0) +
    (parseFloat(home.gold) || 0) +
    (parseFloat(home.silver) || 0) +
    (parseFloat(home.otherAssets) || 0);
  const businessTotal =
    (parseFloat(business.inventory) || 0) +
    (parseFloat(business.receivables) || 0) +
    (parseFloat(business.investments) || 0) +
    (parseFloat(business.otherBusinessAssets) || 0);
  const totalAssets = homeTotal + businessTotal;
  const zakat = totalAssets * 0.025;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading level={2} style={styles.heading}>Zakat Calculator</Heading>
      <View style={styles.zakatCard}>
        <Paragraph variant="body2" color="secondary" style={styles.zakatLabel}>Your Zakat Amount</Paragraph>
        <Heading level={2} style={styles.zakatAmount}>PKR {zakat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Heading>
      </View>
      <View style={styles.breakdownCard}>
        <View style={styles.row}>
          <Paragraph variant="body2" color="secondary">Total Assets</Paragraph>
          <Paragraph variant="body2" style={styles.bold}>PKR {totalAssets.toLocaleString()}</Paragraph>
        </View>
        <View style={styles.row}>
          <Paragraph variant="body2" color="secondary">Zakat (2.5%)</Paragraph>
          <Paragraph variant="body2" style={styles.bold}>PKR {zakat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Paragraph>
        </View>
      </View>
      <Button style={styles.button} onPress={() => {/* TODO: Go to next step or donation */}}>
        Proceed to Donate
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 24,
    textAlign: 'center',
  },
  zakatCard: {
    width: '100%',
    backgroundColor: '#F3F7F9',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  zakatLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  zakatAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  breakdownCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
});

export default ZakatSummary; 