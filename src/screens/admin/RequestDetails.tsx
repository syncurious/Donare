import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Button from '../../components/base/Button';

const mockRequest = {
  id: '12345',
  title: 'Food Assistance',
  status: 'Pending',
  submittedOn: '2024-01-15',
  description:
    'A family of five is facing financial hardship and needs assistance with groceries and essential food items. They have been struggling to make ends meet due to recent job loss and are seeking support to ensure they can provide for their children.',
  contact: {
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    phone: '+1-555-123-4567',
  },
};

const statusColors = {
  Pending: '#FFA500',
  Approved: '#4CAF50',
  Rejected: '#F44336',
};

const RequestDetails = () => {
  return (
    <Container scrollable padding="large" style={{ flex: 1, backgroundColor: '#fff' }}>
      <Heading level={2} style={{ marginBottom: 8, textAlign: 'center' }}>Help Request</Heading>
      <View style={styles.sectionCard}>
        <Paragraph style={styles.sectionTitle}>Request Details</Paragraph>
        <View style={styles.rowBetween}>
          <Paragraph style={styles.requestTitle}>{mockRequest.title}</Paragraph>
          <Paragraph style={[styles.status, { color: statusColors[mockRequest.status as keyof typeof statusColors   ] }]}>{mockRequest.status}</Paragraph>
        </View>
        <View style={styles.rowBetween}>
          <Paragraph style={styles.requestId}>Request ID: {mockRequest.id}</Paragraph>
          <Paragraph style={styles.submittedOn}>Submitted on: {mockRequest.submittedOn}</Paragraph>
        </View>
      </View>
      <View style={styles.sectionCard}>
        <Paragraph style={styles.sectionTitle}>Description</Paragraph>
        <Paragraph style={styles.description}>{mockRequest.description}</Paragraph>
      </View>
      <View style={styles.sectionCard}>
        <Paragraph style={styles.sectionTitle}>Contact Information</Paragraph>
        <Paragraph style={styles.contactName}>{mockRequest.contact.name}</Paragraph>
        <Paragraph style={styles.contactInfo}>Email: {mockRequest.contact.email}</Paragraph>
        <Paragraph style={styles.contactInfo}>Phone: {mockRequest.contact.phone}</Paragraph>
      </View>
      <Button style={styles.button} onPress={() => {}}>
        Mark as Resolved
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    marginBottom: 4,
  },
  contactInfo: {
    color: '#6B7582',
    fontSize: 14,
    marginBottom: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  button: {
    marginTop: 24,
    borderRadius: 24,
    alignSelf: 'center',
    minWidth: 200,
  },
});

export default RequestDetails; 