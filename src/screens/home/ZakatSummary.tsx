import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Button from '../../components/base/Button';
import Container from '../../components/base/Container';
import Section from '../../components/base/Section';
import { screenDimensions, theme } from '../../config/theme';
import Feather from 'react-native-vector-icons/Feather';

const rightArrow = require('../../assets/icons/NamazIcon.png');

const ZakatSummary = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<any, 'ZakatSummary'>
    >();
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
    <View style={styles.root}>
      <Container scrollable padding="small" style={styles.container}>
        {/* <Heading level={2} style={styles.heading}>Zakat Calculator</Heading> */}
        {/* <View style={styles.summaryCard}>
          <Paragraph variant="body2" color="secondary" style={styles.summaryLabel}>Your Zakat Amount</Paragraph>
          <Heading level={1} style={styles.summaryAmount}>PKR {zakat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Heading>
        </View> */}
        <Section title="Home Assets" style={styles.section}>
          {/* <Paragraph variant="body2" color="secondary" style={styles.sectionHeader}>Home Assets</Paragraph> */}
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Cash at Home/Bank:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Liquid cash available in hand or in bank accounts
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(home.cash)
                ? parseFloat(home.cash).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Gold Value:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Total value of gold you own
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(home.gold)
                ? parseFloat(home.gold).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Silver Value:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Total value of silver you own
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(home.silver)
                ? parseFloat(home.silver).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Other Assets:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Any other valuable assets at home (e.g., property, bonds)
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(home.otherAssets)
                ? parseFloat(home.otherAssets).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <Paragraph
              variant="body2"
              color="secondary"
              style={{ fontWeight: 'bold' }}
            >
              Total Home Assets:
            </Paragraph>
            <Paragraph variant="body2" style={styles.bold}>
              PKR {homeTotal.toLocaleString()}
            </Paragraph>
          </View>
        </Section>
        <Section title="Business Assets" style={styles.section}>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Inventory:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Value of goods or products held for sale
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(business.inventory)
                ? parseFloat(business.inventory).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Receivables:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Money owed to you by others (e.g., customers)
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(business.receivables)
                ? parseFloat(business.receivables).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Investments:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Value of stocks, bonds, or other investments
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(business.investments)
                ? parseFloat(business.investments).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <View style={styles.assetRowLabel}>
              <Paragraph variant="body1" color="primary">
                Other Business Assets:
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Any other business-related assets of value
              </Paragraph>
            </View>
            <Paragraph variant="body2" style={styles.bold}>
              PKR{' '}
              {parseFloat(business.otherBusinessAssets)
                ? parseFloat(business.otherBusinessAssets).toLocaleString()
                : '0'}
            </Paragraph>
          </View>
          <View style={styles.assetRow}>
            <Paragraph
              variant="body2"
              color="secondary"
              style={{ fontWeight: 'bold' }}
            >
              Total Business Assets:
            </Paragraph>
            <Paragraph variant="body2" style={styles.bold}>
              PKR {businessTotal.toLocaleString()}
            </Paragraph>
          </View>
        </Section>
      </Container>
      <View style={styles.stickyFooter}>
        <Section title="Total Zakat Due" style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.assetRow}
            onPress={() =>
              navigation.navigate('NewPaymentMethod', {
                amount: zakat.toString(),
                donationType: 'Zakat',
              })
            }
          >
            <View style={styles.assetRowLabel}>
              <Paragraph variant="h4" style={{}}>
                PKR{' '}
                {zakat.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Paragraph>
              <Paragraph variant="caption" color="secondary">
                Is Your Zakat Which is 2.5% of your total assets
              </Paragraph>
            </View>
            <Feather
              name="chevron-right"
              size={30}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    marginBottom: screenDimensions.height * 0.2,
    paddingBottom: 120, // for sticky footer space
  },
  heading: {
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  summaryLabel: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  summaryAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  section: {
    width: '100%',
    // backgroundColor: '#fff',
    gap: 12,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenDimensions.height * 0.2,
    backgroundColor: theme.colors.primary[100],
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  nextButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  nextButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 12,
  },
  nextButtonAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assetRowLabel: {
    gap: 4,
    maxWidth: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default ZakatSummary;
