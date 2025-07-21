import React from 'react';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import VolunteerApplicationCard from '../../../components/cards/VolunteerApplicationCard';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminStackParamList } from '../../../config/navigation/AdminNavigation';

interface VolunteerDetails {
  name: string;
  email: string;
  status: string;
  phone: string;
  joined: string;
  skills: string[];
  availability: { label: string; value: string }[];
  image: string;
}

const volunteerApplications: VolunteerDetails[] = [
  {
    name: 'Ahmed Ali',
    email: 'ahmed.ali@email.com',
    image: 'https://avatar.iran.liara.run/public/boy',
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
    image: 'https://avatar.iran.liara.run/public/boy',
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
    image: 'https://avatar.iran.liara.run/public/boy',
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
    image: 'https://avatar.iran.liara.run/public/boy',
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
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  const handleView = (email: string) => {
    const volunteer = volunteerApplications.find(v => v.email === email);
    if (volunteer) {
      navigation.navigate('VolunteerDetails', { volunteer });
    }
  };

  return (
    <Container
      scrollable
      padding="small"
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      {/* <Heading level={2} style={{ marginBottom: 16 }}>
        Volunteer Applications
      </Heading> */}
      <View>
        {volunteerApplications.map((app, idx) => (
          <VolunteerApplicationCard
            key={app.email}
            name={app.name}
            email={app.email}
            image={app.image}
            status={app.status as 'Pending' | 'Approved'}
            onView={() => handleView(app.email)}
          />
        ))}
      </View>
    </Container>
  );
};

export default AdminVolunteerApplications;
