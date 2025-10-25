import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../../components/base/Container';
import Paragraph from '../../components/base/Paragraph';
import Button from '../../components/base/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import Section from '../../components/base/Section';

const statusColors = {
  Pending: '#FFA500',
  Resolved: '#4CAF50',
};

// Dummy data for the request
const dummyRequest = {
  id: 'REQ-2024-001',
  type: 'Medical Assistance',
  status: 'Pending',
  submittedOn: 'October 20, 2024',
  description:
    'Need urgent help with medical supplies for a sick family member. My mother requires medication and medical equipment that we cannot afford. Any assistance would be greatly appreciated during this difficult time.',
  contact: {
    name: 'Sara Ahmed',
    email: 'sara.ahmed@example.com',
    phone: '+92 312 4567890',
  },
  address: 'House 25, Street 10, G-11/3, Islamabad',
  city: 'Islamabad',
  zipCode: '44000',
  country: 'Pakistan',
};

const RequestDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get request from route params or use dummy data
  const request = (route.params as any)?.request || dummyRequest;

  return (
    <Container
      padding="small"
      style={styles.container}
      scrollable={true}
      contentContainerStyle={styles.containerContent}
    >
      <View style={{ flex: 1, width: '100%' }}>
        <Section title="Request Details" style={styles.sectionCard}>
          <View style={styles.rowBetween}>
            <Paragraph style={styles.requestTitle}>{request.type}</Paragraph>
            <Paragraph
              style={[
                styles.status,
                {
                  color:
                    statusColors[request.status as keyof typeof statusColors],
                },
              ]}
            >
              {request.status}
            </Paragraph>
          </View>
          <View style={styles.rowBetween}>
            <Paragraph style={styles.requestId}>
              Request ID: {request.id}
            </Paragraph>
            <Paragraph style={styles.submittedOn}>
              Submitted on: {request.submittedOn}
            </Paragraph>
          </View>
        </Section>
        <Section title="Description" style={styles.sectionCard}>
          <Paragraph style={styles.description}>
            {request.description}
          </Paragraph>
        </Section>
        <Section title="Contact Information" style={styles.sectionCard}>
          <Paragraph style={styles.contactName}>
            {request.contact.name}
          </Paragraph>
          <Paragraph style={styles.contactInfo}>
            Email: {request.contact.email}
          </Paragraph>
          <Paragraph style={styles.contactInfo}>
            Phone: {request.contact.phone}
          </Paragraph>
        </Section>
        <Section title="Address" style={styles.sectionCard}>
          <Paragraph style={styles.description}>{request.address}</Paragraph>
          <Paragraph style={styles.contactInfo}>
            {request.city}, {request.zipCode}
          </Paragraph>
          <Paragraph style={styles.contactInfo}>{request.country}</Paragraph>
        </Section>
      </View>
      <Button
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Mark as Resolved
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  containerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
  },
  sectionCard: {
    padding: 16,
    marginBottom: 18,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  requestTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  requestId: {
    color: '#6B7582',
    fontSize: 14,
  },
  submittedOn: {
    color: '#6B7582',
    fontSize: 14,
  },
  description: {
    color: '#555',
    fontSize: 15,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactInfo: {
    color: '#6B7582',
    fontSize: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 24,
    alignSelf: 'center',
    minWidth: 200,
  },
});

export default RequestDetails;
