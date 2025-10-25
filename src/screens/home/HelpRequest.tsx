import React from 'react';
import Container from '../../components/base/Container';
import { View } from 'react-native';
import HelpRequestCard from '../../components/cards/HelpRequestCard';
import { useNavigation } from '@react-navigation/native';
import { UserStackParamList } from '../../config/navigation/UserNavigation';

const helpRequests = [
  {
    id: '1',
    name: 'Aisha Khan',
    location: 'Location: Mecca, Saudi Arabia',
    type: 'Financial Aid',
    status: 'Pending',
    submittedOn: '2024-01-15',
    description:
      'A family of five is facing financial hardship and needs assistance with groceries and essential food items. They have been struggling to make ends meet due to recent job loss and are seeking support to ensure they can provide for their children.',
    contact: {
      name: 'Aisha Khan',
      email: 'aisha.khan@example.com',
      phone: '+1-555-123-4567',
    },
  },
  {
    id: '2',
    name: 'Fatima Ali',
    location: 'Location: Medina, Saudi Arabia',
    type: 'Medical Assistance',
    status: 'Resolved',
    submittedOn: '2024-01-20',
    description:
      'Fatima needs urgent medical assistance for her child. The family is unable to cover the medical expenses and is seeking help from the community.',
    contact: {
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      phone: '+1-555-987-6543',
    },
  },
  {
    id: '3',
    name: 'Zainab Hassan',
    location: 'Location: Riyadh, Saudi Arabia',
    type: 'Food Assistance',
    status: 'Pending',
    submittedOn: '2024-01-22',
    description:
      'Zainab is struggling to provide food for her family due to recent financial difficulties. Any support would be greatly appreciated.',
    contact: {
      name: 'Zainab Hassan',
      email: 'zainab.hassan@example.com',
      phone: '+1-555-222-3333',
    },
  },
  {
    id: '4',
    name: 'Sara Ahmed',
    location: 'Location: Jeddah, Saudi Arabia',
    type: 'Shelter',
    status: 'Resolved',
    submittedOn: '2024-01-25',
    description:
      'Sara and her children are in need of temporary shelter after losing their home in a fire. They are seeking urgent help.',
    contact: {
      name: 'Sara Ahmed',
      email: 'sara.ahmed@example.com',
      phone: '+1-555-444-5555',
    },
  },
  {
    id: '5',
    name: 'Layla Khan',
    location: 'Location: Dammam, Saudi Arabia',
    type: 'Education Support',
    status: 'Pending',
    submittedOn: '2024-01-28',
    description:
      'Layla is seeking support to continue her education. Her family is unable to pay for school fees and supplies.',
    contact: {
      name: 'Layla Khan',
      email: 'layla.khan@example.com',
      phone: '+1-555-666-7777',
    },
  },
];

const HelpRequest = () => {
  const navigation = useNavigation<any>();
  return (
    <Container
      scrollable
      padding="small"
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <View>
        {helpRequests.map(request => (
          <HelpRequestCard
            onPress={() => {
              navigation.navigate('RequestDetails', { request });
            }}
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
