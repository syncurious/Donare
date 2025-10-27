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
import { useEffect, useState } from 'react';
import { GetDashboardStats, type AdminDashboardStats } from '../../../service/admin';
import Loader from '../../../components/base/Loader';

interface actionType {
  action: 'volunteerApplication' | 'donationReceived' | 'helpRequest';
}

interface DashboardState {
  stats: AdminDashboardStats | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const AdminDashboard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();
  
  const [state, setState] = useState<DashboardState>({
    stats: null,
    loading: true,
    refreshing: false,
    error: null,
  });

  const fetchDashboardData = async (isRefreshing = false) => {
    try {
      setState(prev => ({
        ...prev,
        loading: !isRefreshing,
        refreshing: isRefreshing,
        error: null,
      }));

      const response = await GetDashboardStats();
      
      if (response.status && response.data) {
        setState(prev => ({
          ...prev,
          stats: response.data.stats,
          loading: false,
          refreshing: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data');
      }
    } catch (error: any) {
      console.error('Dashboard fetch error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: error.message || 'Failed to load dashboard data',
      }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    fetchDashboardData(true);
  };

  const formatCurrency = (amount: number) => {
    // Handle very large numbers with abbreviations
    if (amount >= 1000000000000) {
      return `PKR ${(amount / 1000000000000).toFixed(1)}T`;
    } else if (amount >= 1000000000) {
      return `PKR ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `PKR ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `PKR ${(amount / 1000).toFixed(1)}K`;
    }
    
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatsData = () => {
    if (!state.stats) return [];
    
    return [
      { 
        label: 'Total Donations Today', 
        value: formatCurrency(state.stats.total_donations_today) 
      },
      { 
        label: 'Total Donations All Time', 
        value: formatCurrency(state.stats.total_donations_all_time) 
      },
      { 
        label: 'Volunteers Pending', 
        value: state.stats.volunteer_pending_count.toString() 
      },
      { 
        label: 'Volunteers Approved', 
        value: state.stats.volunteer_approved_count.toString() 
      },
      { 
        label: 'Help Requests Pending', 
        value: state.stats.help_request_pending_count.toString() 
      },
      { 
        label: 'Help Requests Resolved', 
        value: state.stats.help_request_resolved_count.toString() 
      },
      { 
        label: 'Total Users', 
        value: state.stats.total_users.toString() 
      },
      { 
        label: 'Total Volunteers', 
        value: state.stats.total_volunteers.toString() 
      },
    ];
  };

  const getRecentActivities = () => {
    if (!state.stats) return [];
    
    const activities = [];
    
    // Add volunteer activities
    if (state.stats.recent_activity.volunteers_last_7_days > 0) {
      activities.push({
        name: `${state.stats.recent_activity.volunteers_last_7_days} New Volunteer${state.stats.recent_activity.volunteers_last_7_days > 1 ? 's' : ''}`,
        type: 'Volunteer Application',
        action: 'volunteerApplication',
      });
    }
    
    // Add donation activities
    if (state.stats.recent_activity.donations_last_7_days > 0) {
      activities.push({
        name: `${state.stats.recent_activity.donations_last_7_days} New Donation${state.stats.recent_activity.donations_last_7_days > 1 ? 's' : ''}`,
        type: 'Donation Received',
        action: 'donationReceived',
      });
    }
    
    // Add help request activities
    if (state.stats.recent_activity.help_requests_last_7_days > 0) {
      activities.push({
        name: `${state.stats.recent_activity.help_requests_last_7_days} New Help Request${state.stats.recent_activity.help_requests_last_7_days > 1 ? 's' : ''}`,
        type: 'Help Request',
        action: 'helpRequest',
      });
    }
    
    return activities;
  };

  if (state.loading) {
    return (
      <Container padding="small" style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Container>
    );
  }

  if (state.error) {
    return (
      <Container padding="small" style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.error[500], textAlign: 'center', marginBottom: 16 }}>
          {state.error}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary[500],
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => fetchDashboardData()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  return (
    <Container 
      scrollable 
      padding="small" 
      style={{ backgroundColor: '#fff' }}
      refreshControl={true}
      refreshing={state.refreshing}
      onRefresh={onRefresh}
    >
      <Heading level={2} style={{ marginBottom: 16 }}>
        Admin Dashboard
      </Heading>
      <Heading level={4} style={{ marginBottom: 8 }}>
        Overview
      </Heading>
      <View style={styles.statsGrid}>
        {getStatsData().map((stat, idx) => (
          <View key={stat.label} style={styles.gridItem}>
            <ImpactMetricCard label={stat.label} value={stat.value} />
          </View>
        ))}
      </View>
      <Heading level={4} style={{ marginVertical: 16 }}>
        Recent Activities (Last 7 Days)
      </Heading>
      <View style={{ gap: 12, marginBottom: 12 }}>
        {getRecentActivities().length > 0 ? (
          getRecentActivities().map((activity, idx) => {
            const title = activity.name;
            const description = activity.action;
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
                  description={description}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={{
            backgroundColor: '#fff',
            padding: 24,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.neutral[200],
            alignItems: 'center',
          }}>
            <Text style={{ color: theme.colors.neutral[500], textAlign: 'center' }}>
              No recent activities in the last 7 days
            </Text>
          </View>
        )}
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
    gap: 8,
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
    minHeight: 80,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7582',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121417',
    flexWrap: 'wrap',
  },
  activityCard: {
    marginBottom: 8,
  },
});

export default AdminDashboard;
