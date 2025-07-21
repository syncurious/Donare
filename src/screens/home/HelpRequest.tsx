import React from 'react';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import { View, StyleSheet } from 'react-native';
import HelpRequestCard from '../../components/cards/HelpRequestCard';

const helpRequests = [
  {
    id: '1',
    name: 'Aisha Khan',
    location: 'Location: Mecca, Saudi Arabia',
    type: 'Type: Financial Aid',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    location: 'Location: Medina, Saudi Arabia',
    type: 'Type: Medical Assistance',
    status: 'Resolved',
  },
  {
    id: '3',
    name: 'Zainab Hassan',
    location: 'Location: Riyadh, Saudi Arabia',
    type: 'Type: Food Assistance',
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Sara Ahmed',
    location: 'Location: Jeddah, Saudi Arabia',
    type: 'Type: Shelter',
    status: 'Resolved',
  },
  {
    id: '5',
    name: 'Layla Khan',
    location: 'Location: Dammam, Saudi Arabia',
    type: 'Type: Education Support',
    status: 'Pending',
  },
];

const HelpRequest = () => {
  return (
    <Container
      scrollable
      padding="small"
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <View>
        {helpRequests.map(request => (
          <HelpRequestCard
            onPress={() => {}}
            key={request.id}
            name={request.name}
            location={request.location}
            type={request.type}
            status={request.status as 'Pending' | 'Resolved'}
          />
        ))}
      </View>
    </Container>
  );
};

export default HelpRequest;
