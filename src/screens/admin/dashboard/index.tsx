import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Card from '../../../components/base/Card';
import ImpactMetricCard from '../../../components/base/ImpactMetricCard';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminStackParamList } from '../../../config/navigation/AdminNavigation';
import BefitsListCard from '../../../components/cards/befitsListCard';
import { donationCoinIcon, helpIcon } from '../../../assets/icons';
import theme from '../../../config/theme';

interface actionType {
  action: 'volunteerApplication' | 'donationReceived' | 'helpRequest';
}
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
    {
      name: 'Omar Hassan',
      type: 'Volunteer Application',
      image: 'https://avatar.iran.liara.run/public/boy',
      action: 'volunteerApplication',
    },
    { name: 'Sadaqah', type: 'Donation Received', action: 'donationReceived' },
    { name: 'Food Assistance', type: 'Help Request', action: 'helpRequest' },
  ],
};

const AdminDashboard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
  return (
    <Container scrollable padding="small" style={{ backgroundColor: '#fff' }}>
      <Heading level={2} style={{ marginBottom: 16 }}>
        Admin Dashboard
      </Heading>
      <Heading level={4} style={{ marginBottom: 8 }}>
        Overview
      </Heading>
      <View style={styles.statsGrid}>
        {dashboardData.stats.map((stat, idx) => (
          <View key={stat.label} style={styles.gridItem}>
            <ImpactMetricCard label={stat.label} value={stat.value} />
          </View>
        ))}
      </View>
      <Heading level={4} style={{ marginVertical: 16 }}>
        Recent Activities
      </Heading>
      <View style={{ gap: 12, marginBottom: 12 }}>
        {dashboardData.recentActivities.map((activity, idx) => {
          const title = activity.name;
          const description = activity.action;
          const image =
            activity.action == 'volunteerApplication' && activity.image
              ? { uri: activity.image }
              : undefined;
          const icon =
            activity.action == 'helpRequest'
              ? helpIcon
              : activity.action == 'donationReceived'
              ? donationCoinIcon
              : undefined;

          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.neutral[200],
              }}
              key={idx}
              onPress={() =>
                navigation.navigate('RequestDetails', { requestId: '12345' })
              }
              activeOpacity={0.8}
            >
              <BefitsListCard
                title={title}
                icon={icon}
                profileImage={image}
                description={description}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
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
