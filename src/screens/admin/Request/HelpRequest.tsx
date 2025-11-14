import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../../components/base/Container';
import Loader from '../../../components/base/Loader';
import Text from '../../../components/base/Text';
import Heading from '../../../components/base/Heading';
import theme from '../../../config/theme';
import {
  GetHelpRequests,
  type HelpRequest as HelpRequestType,
} from '../../../service/admin';

import VolunteerApplicationCard from '../../../components/cards/VolunteerApplicationCard';

interface HelpRequestsState {
  helpRequests: HelpRequestType[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  total: number;
}

const HelpRequest = () => {
  const navigation = useNavigation<any>();
  const [state, setState] = React.useState<HelpRequestsState>({
    helpRequests: [],
    loading: true,
    refreshing: false,
    error: null,
    total: 0,
  });

  const fetchHelpRequests = async (isRefreshing = false) => {
    try {
      setState(prev => ({
        ...prev,
        loading: !isRefreshing,
        refreshing: isRefreshing,
        error: null,
      }));

      const response = await GetHelpRequests();

      if (response.status && response.data && response.data.help_requests) {
        setState(prev => ({
          ...prev,
          helpRequests: response.data.help_requests,
          total: response.data.total,
          loading: false,
          refreshing: false,
        }));
      } else {
        throw new Error('Failed to fetch help requests');
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: error.message || 'Failed to load help requests',
      }));
    }
  };

  React.useEffect(() => {
    fetchHelpRequests();
  }, []);

  const onRefresh = () => fetchHelpRequests(true);

  const getStatusDisplay = (
    status: string,
  ): 'Pending' | 'Approved' | 'Rejected' | 'Completed' => {
    switch (status) {
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      case 'RESOLVED':
        return 'Completed';
      case 'PENDING':
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
          onPress={() => fetchHelpRequests()}
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
        Help Requests
      </Heading>
      <View>
        {state.helpRequests.length > 0 ? (
          state.helpRequests.map(request => (
            <VolunteerApplicationCard
              key={request.id}
              name={request.full_name}
              email={request.phone}
              image={`https://avatar.iran.liara.run/public/boy?seed=${request.phone}`}
              status={getStatusDisplay(request.status)}
              onView={() =>
                navigation.navigate('RequestDetails', {
                  requestId: request.id,
                  request,
                })
              }
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
              No help requests found
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default HelpRequest;
