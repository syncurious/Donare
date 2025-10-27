import React, { useEffect, useState } from 'react';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import VolunteerApplicationCard from '../../../components/cards/VolunteerApplicationCard';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminStackParamList } from '../../../config/navigation/AdminNavigation';
import {
  GetVolunteers,
  type Volunteer,
  type VolunteersResponse,
} from '../../../service/admin';
import Loader from '../../../components/base/Loader';
import theme from '../../../config/theme';

interface VolunteersState {
  volunteers: Volunteer[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  total: number;
}

const AdminVolunteerApplications = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  const [state, setState] = useState<VolunteersState>({
    volunteers: [],
    loading: true,
    refreshing: false,
    error: null,
    total: 0,
  });

  const fetchVolunteers = async (isRefreshing = false) => {
    try {
      setState(prev => ({
        ...prev,
        loading: !isRefreshing,
        refreshing: isRefreshing,
        error: null,
      }));

      const response = await GetVolunteers();

      if (response.status && response.data) {
        setState(prev => ({
          ...prev,
          volunteers: response.data.volunteers,
          total: response.data.total,
          loading: false,
          refreshing: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch volunteers');
      }
    } catch (error: any) {
      console.error('Volunteers fetch error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: error.message || 'Failed to load volunteers',
      }));
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const onRefresh = () => {
    fetchVolunteers(true);
  };

  const getStatusDisplay = (status: string): 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled' => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  if (state.loading) {
    return (
      <Container
        padding="small"
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </Container>
    );
  }

  if (state.error) {
    return (
      <Container
        padding="small"
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: theme.colors.error[500],
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {state.error}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary[500],
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => fetchVolunteers()}
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
      style={{ flex: 1, backgroundColor: '#fff' }}
      refreshControl={true}
      refreshing={state.refreshing}
      onRefresh={onRefresh}
    >
      <Heading level={3} style={{ marginBottom: 16 }}>
        Volunteer Applications
      </Heading>
      <View>
        {state.volunteers.length > 0 ? (
          state.volunteers.map(volunteer => (
            <VolunteerApplicationCard
              key={volunteer.id}
              name={volunteer.full_name}
              email={volunteer.email}
              image={`https://avatar.iran.liara.run/public/boy?seed=${volunteer.email}`}
              status={getStatusDisplay(volunteer.status)}
              onView={() => navigation.navigate('VolunteerDetails', { volunteer })}
            />
          ))
        ) : (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 24,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.neutral[200],
              alignItems: 'center',
            }}
          >
            <Text
              style={{ color: theme.colors.neutral[500], textAlign: 'center' }}
            >
              No volunteer applications found
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default AdminVolunteerApplications;
