import React from 'react';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import VolunteerApplicationCard from '../../../components/cards/VolunteerApplicationCard';
import { View } from 'react-native';

const volunteerApplications = [
  {
    name: 'Ahmed Ali',
    email: 'ahmed.ali@email.com',
    status: 'Pending',
  },
  {
    name: 'Fatima Khan',
    email: 'fatima.khan@email.com',
    status: 'Approved',
  },
  {
    name: 'Omar Hassan',
    email: 'omar.hassan@email.com',
    status: 'Pending',
  },
  {
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@email.com',
    status: 'Approved',
  },
];

const AdminVolunteerApplications = () => {
  const handleView = (name: string) => {
    // TODO: Implement view logic (e.g., navigate to detail page or open modal)
    // alert(`View application for ${name}`);
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
            onView={() => handleView(app.name)}
          />
        ))}
      </View>
    </Container>
  );
};

export default AdminVolunteerApplications; 