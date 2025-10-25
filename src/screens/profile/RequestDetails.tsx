import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import { useNavigation } from '@react-navigation/native';
import { HelpRequest, getHelpRequests } from '../../service/helpRequest';
import { showToast } from '../../utils/toast';
import { useTheme } from '../../config/theme';

const RequestDetails = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await getHelpRequests();
      if (
        response.data.help_requests &&
        response.data.help_requests.length > 0
      ) {
        const userRequest = response.data.help_requests[0];
        setRequest(userRequest);
      } else {
        setRequest(null);
      }
    } catch (error: any) {
      console.error('Error fetching request details:', error);
      showToast('error', 'Failed to load request details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const isPending = status === 'PENDING';
    const isResolved = status === 'RESOLVED';

    return (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isResolved
              ? theme.colors.success[100]
              : isPending
              ? theme.colors.warning[100]
              : theme.colors.error[100],
          },
        ]}
      >
        <Text
          variant="caption"
          style={{
            color: isResolved
              ? theme.colors.success[700]
              : isPending
              ? theme.colors.warning[700]
              : theme.colors.error[700],
            fontWeight: '600',
          }}
        >
          {status}
        </Text>
      </View>
    );
  };

  const renderRequestCard = () => {
    if (!request) return null;

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.border.primary,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Text variant="h5" color="primary" style={styles.name}>
              Help Request
            </Text>
            <Text variant="caption" color="secondary" style={styles.email}>
              ID: {request.id.slice(-8)}
            </Text>
          </View>
          {getStatusBadge(request.status)}
        </View>

        <View style={styles.contactInfo}>
          <Text variant="body2" color="primary">
            📅 {new Date(request.created_at).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.expandedContent}>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.border.primary },
            ]}
          />

          <View style={styles.section}>
            <Text variant="caption" color="secondary" style={styles.label}>
              Description
            </Text>
            <Text variant="body2" color="primary" style={styles.value}>
              {request.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="caption" color="secondary" style={styles.label}>
              Contact Information
            </Text>
            <Text variant="body2" color="primary" style={styles.value}>
              {request.full_name}
            </Text>
            <Text variant="body2" color="primary" style={styles.value}>
              📞 {request.phone}
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="caption" color="secondary" style={styles.label}>
              Address
            </Text>
            <Text variant="body2" color="primary" style={styles.value}>
              {request.address}
            </Text>
            <Text variant="body2" color="primary" style={styles.value}>
              {request.city}, {request.country}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="h4" color="primary" style={styles.emptyTitle}>
        No Help Request Found
      </Text>
      <Text variant="body2" color="secondary" style={styles.emptyText}>
        You haven't submitted any help requests yet.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <Container
        style={[
          styles.container,
          { backgroundColor: theme.colors.background.secondary },
        ]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          <Text variant="body2" color="secondary" style={styles.loadingText}>
            Loading request details...
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container
      scrollable
      padding="small"
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.secondary },
      ]}
    >
      <View style={styles.header}>
        <Heading level={3} style={styles.heading}>
          Your Help Request
        </Heading>
        {request && (
          <Text variant="body2" color="secondary" style={styles.subheading}>
            Status: {request.status}
          </Text>
        )}
      </View>

      {request ? renderRequestCard() : renderEmptyState()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  heading: {
    marginBottom: 4,
  },
  subheading: {
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginTop: 2,
  },
  contactInfo: {
    marginTop: 8,
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  value: {
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default RequestDetails;
