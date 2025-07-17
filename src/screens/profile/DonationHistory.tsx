import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Section from '../../components/base/Section';
import Text from '../../components/base/Text';
import Chip from '../../components/base/Chip';
import { useTheme } from '../../config/theme';
import BefitsListCard from '../../components/cards/befitsListCard';
import HeartIcon from '../../assets/icons/heartIcon.png';

const DONATION_TYPES = ['All', 'Zakat', 'Sadaqah', 'Fidyah'];

const SAMPLE_DONATIONS = [
  { id: 1, type: 'Zakat', title: 'Donated ', amount: 100, date: '2024-06-01' },
  { id: 2, type: 'Sadaqah', title: 'Donated ', amount: 50, date: '2024-05-15' },
  { id: 3, type: 'Fidyah', title: 'Donated ', amount: 25, date: '2024-04-20' },
  { id: 4, type: 'Zakat', title: 'Donated ', amount: 75, date: '2024-03-10' },
];

const DonationHistory = () => {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState('All');

  const filteredDonations =
    selectedType === 'All'
      ? SAMPLE_DONATIONS
      : SAMPLE_DONATIONS.filter(d => d.type === selectedType);

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
            <Text variant="body2" color="secondary">
              No donations found for this type.
            </Text>
          ) : (
            filteredDonations.map(donation => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={donation.id}
                onPress={() => {}}
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.neutral[200],
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <BefitsListCard
                  icon={HeartIcon}
                  RightComponent={
                    <Text
                      variant="h6"
                      color="primary"
                      style={{ marginLeft: 12 }}
                    >
                      {' '}
                      ${donation.amount}{' '}
                    </Text>
                  }
                  title={donation.title}
                  description={donation.type}
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
});

export default DonationHistory;
