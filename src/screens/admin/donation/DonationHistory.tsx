import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Section from '../../../components/base/Section';
import Text from '../../../components/base/Text';
import Chip from '../../../components/base/Chip';
import { useTheme } from '../../../config/theme';
import BefitsListCard from '../../../components/cards/befitsListCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { donationCoinIcon } from '../../../assets/icons';
import { GetDonations } from '../../../service/admin';
import { showToast } from '../../../utils/toast';

const DONATION_TYPES = ['All', 'ZAKAT', 'SADAQAH', 'OTHER'];

interface Donation {
  id: string;
  donation_type: string;
  amount: number;
  is_in_kind: boolean;
  zakat_year?: number;
  zakat_calculation_method?: string;
  zakat_assets_value?: number;
  zakat_percentage?: number;
  payment_method: string;
  payment_status: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const DonationHistory = () => {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState('All');
  const navigation = useNavigation<NavigationProp<any>>();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await GetDonations()) as any;
      if (response.status && response.data) {
        const donationsData = response.data?.donations || [];
        setDonations(donationsData);
      } else {
        const msg = response.message || 'Failed to fetch donations.';
        setError(msg);
        showToast('error', msg);
      }
    } catch (error: any) {
      console.error('Error fetching donations:', error);
      const msg = error?.data?.error?.message || 'Failed to load donation history.';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const filteredDonations =
    selectedType === 'All'
      ? donations
      : donations.filter(d => d.donation_type === selectedType);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return theme.colors.success[600];
      case 'PENDING':
        return theme.colors.warning[600];
      case 'FAILED':
        return theme.colors.error[600];
      default:
        return theme.colors.neutral[600];
    }
  };

  if (loading) {
    return (
      <Container style={{ backgroundColor: '#fff', flex: 1 }} padding="small">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          <Text variant="body2" color="secondary" style={{ marginTop: 16 }}>
            Loading donations...
          </Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        padding="small"
        style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: theme.colors.error[500], textAlign: 'center', marginBottom: 16 }}>
          {error}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={fetchDonations}
          style={{
            backgroundColor: theme.colors.primary[500],
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  return (
    <Container
      scrollable
      padding="small"
      style={{ backgroundColor: '#fff', flex: 1 }}
    >
      <Heading level={2} style={{ marginBottom: 16 }}>
        Donation History
      </Heading>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            height: 40,
            flex: 0,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}
          >
            {DONATION_TYPES.map(type => (
              <Chip
                key={type}
                label={type}
                selected={selectedType === type}
                onPress={() => setSelectedType(type)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Section title="Recent Donations">
        <View style={{ gap: 12, marginVertical: 12 }}>
          {filteredDonations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text variant="h5" color="primary" style={{ marginBottom: 8 }}>
                No Donations Found
              </Text>
              <Text
                variant="body2"
                color="secondary"
                style={{ textAlign: 'center' }}
              >
                {selectedType === 'All'
                  ? "You haven't made any donations yet."
                  : `No ${selectedType.toLowerCase()} donations found.`}
              </Text>
            </View>
          ) : (
            filteredDonations.map(donation => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={donation.id}
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.neutral[200],
                  borderRadius: 12,
                  padding: 12,
                  backgroundColor: theme.colors.background.secondary,
                }}
              >
                <BefitsListCard
                  icon={donationCoinIcon}
                  RightComponent={
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text
                        variant="h6"
                        color="primary"
                        style={{ marginBottom: 4 }}
                      >
                        PKR {donation?.amount?.toFixed(2)}
                      </Text>
                    </View>
                  }
                  title={`${donation.donation_type} ${
                    donation.is_in_kind ? '(In Kind)' : ''
                  }`}
                  description={`${formatDate(donation.created_at)} • ${
                    donation.payment_method
                  }`}
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </Section>
    </Container>
  );
};

const styles = StyleSheet.create({
  donationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  filterList: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DonationHistory;
