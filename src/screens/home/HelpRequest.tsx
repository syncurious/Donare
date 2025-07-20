import React from 'react';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import { View, StyleSheet } from 'react-native';

const helpRequests = [
  {
    id: '1',
    title: 'Need Food Assistance',
    description: 'Requesting help with groceries for my family this week.',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Medical Support',
    description: 'Looking for help with medical expenses for my child.',
    status: 'Approved',
  },
  {
    id: '3',
    title: 'Rent Payment',
    description: 'Unable to pay rent this month due to job loss.',
    status: 'Rejected',
  },
];

const statusColors = {
  Pending: '#FFA500', // orange
  Approved: '#4CAF50', // green
  Rejected: '#F44336', // red
};

const HelpRequest = () => {
  return (
    <Container scrollable padding="large" style={{ flex: 1, backgroundColor: '#fff' }}>
      <Heading level={2} style={{ marginBottom: 16, textAlign: 'center' }}>
        Help Requests
      </Heading>
      <View>
        {helpRequests.map(request => (
          <View key={request.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Paragraph style={styles.title}>{request.title}</Paragraph>
              <Paragraph style={[styles.status, { color: statusColors[request.status] }]}>{request.status}</Paragraph>
            </View>
            <Paragraph style={styles.description}>{request.description}</Paragraph>
          </View>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7F8FA',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  description: {
    color: '#555',
    fontSize: 14,
  },
});

export default HelpRequest; 