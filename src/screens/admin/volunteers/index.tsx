import React from 'react';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import VolunteerApplicationCard from '../../../components/cards/VolunteerApplicationCard';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminStackParamList } from '../../../config/navigation/UserNavigation copy';

interface VolunteerDetails {
  name: string;
  email: string;
  status: string;
  phone: string;
  joined: string;
  skills: string[];
  availability: { label: string; value: string }[];
}

const volunteerApplications: VolunteerDetails[] = [
  {
    name: 'Ahmed Ali',
    email: 'ahmed.ali@email.com',
    status: 'Pending',
    phone: '+1 (555) 111-2222',
    joined: 'Joined 1 month ago',
    skills: ['Teaching', 'Mentoring'],
    availability: [
      { label: 'Weekdays', value: 'Available' },
      { label: 'Weekends', value: 'Not Available' },
    ],
  },
  {
    name: 'Fatima Khan',
    email: 'fatima.khan@email.com',
    status: 'Approved',
    phone: '+1 (555) 333-4444',
    joined: 'Joined 2 months ago',
    skills: ['Community Outreach'],
    availability: [
      { label: 'Weekdays', value: 'Available' },
      { label: 'Weekends', value: 'Available' },
    ],
  },
  {
    name: 'Omar Hassan',
    email: 'omar.hassan@email.com',
    status: 'Pending',
    phone: '+1 (555) 123-4567',
    joined: 'Joined 2 months ago',
    skills: ['Teaching', 'Mentoring', 'Community Outreach'],
    availability: [
      { label: 'Weekdays', value: 'Available' },
      { label: 'Weekends', value: 'Not Available' },
    ],
  },
  {
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@email.com',
    status: 'Approved',
    phone: '+1 (555) 555-6666',
    joined: 'Joined 3 weeks ago',
    skills: ['Mentoring'],
    availability: [
      { label: 'Weekdays', value: 'Not Available' },
      { label: 'Weekends', value: 'Available' },
    ],
  },
];

const AdminVolunteerApplications = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  const handleView = (email: string) => {
    const volunteer = volunteerApplications.find(v => v.email === email);
    if (volunteer) {
      navigation.navigate('VolunteerDetails', { volunteer });
    }
  };

  return (
    <Container scrollable padding="large">
      <Heading level={2} style={{ marginBottom: 16 }}>
        Volunteer Applications
      </Heading>
      <View>
        {volunteerApplications.map((app, idx) => (
          <VolunteerApplicationCard
            key={app.email}
            name={app.name}
            email={app.email}
            status={app.status as 'Pending' | 'Approved'}
            onView={() => handleView(app.email)}
          />
        ))}
      </View>
    </Container>
  );
};

export default AdminVolunteerApplications; 