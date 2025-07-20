import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Card from '../../../components/base/Card';
import { View, StyleSheet, ScrollView } from 'react-native';

const dashboardData = {
  stats: [
    { label: 'Total Donations Today', value: '$1,250' },
    { label: 'Total Donations All Time', value: '$12,500' },
    { label: 'Volunteers Pending', value: '5' },
    { label: 'Volunteers Approved', value: '20' },
    { label: 'Help Requests Pending', value: '3' },
    { label: 'Help Requests Resolved', value: '15' },
  ],
  recentActivities: [
    { name: 'Omar Hassan', action: 'Volunteer Application' },
    { name: 'Sadaqah', action: 'Donation Received' },
    { name: 'Food Assistance', action: 'Help Request' },
  ],
};

const AdminDashboard = () => {
  return (
    <Container scrollable padding="large">
      <Heading level={2} style={{ marginBottom: 16 }}>
        Admin Dashboard
      </Heading>
      <Heading level={4} style={{ marginBottom: 8 }}>
        Overview
      </Heading>
      <View style={styles.statsRow}>
        {dashboardData.stats.map((stat, idx) => (
          <Card key={stat.label} style={styles.statCard}>
            <Text variant="body2" style={styles.statLabel}>{stat.label}</Text>
            <Text variant="h4" style={styles.statValue}>{stat.value}</Text>
          </Card>
        ))}
      </View>
      <Heading level={4} style={{ marginVertical: 16 }}>
        Recent Activities
      </Heading>
      <View>
        {dashboardData.recentActivities.map((activity, idx) => (
          <Card key={idx} style={styles.activityCard}>
            <Text variant="h6">{activity.name}</Text>
            <Text variant="body2" color="secondary">{activity.action}</Text>
          </Card>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7582',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#121417',
  },
  activityCard: {
    marginBottom: 8,
  },
});

export default AdminDashboard;
