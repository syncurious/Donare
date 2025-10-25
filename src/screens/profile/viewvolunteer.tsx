import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import { GetVolunteer } from '../../service/handler';
import { showToast } from '../../utils/toast';
import { useTheme } from '../../config/theme';

interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  on_week_days: string;
  on_week_ends: string;
  skills?: string;
  message?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const ViewVolunteer: React.FC = () => {
  const { theme } = useTheme();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVolunteer = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = (await GetVolunteer()) as any;
      if (response) {
        if (response.data?.volunteer) {
          setVolunteer(response.data.volunteer);
        } else {
          console.log('No volunteer data found in response');
          setVolunteer(null);
        }
      } else {
        showToast('error', 'Failed to fetch volunteer data.');
      }
    } catch (err: any) {
      console.error('Error fetching volunteer:', err);
      showToast(
        'error',
        err?.data?.error?.message || 'Failed to load volunteer data.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const getAvailabilityBadge = (status: string) => {
    const isAvailable = status === 'AVAILABLE';
    return (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isAvailable
              ? theme.colors.success[100]
              : theme.colors.error[100],
          },
        ]}
      >
        <Text
          variant="caption"
          style={{
            color: isAvailable
              ? theme.colors.success[700]
              : theme.colors.error[700],
            fontWeight: '600',
          }}
        >
          {isAvailable ? 'Available' : 'Not Available'}
        </Text>
      </View>
    );
  };

  const getStatusBadge = (status?: string) => {
    const statusText = status || 'PENDING';
    const isPending = statusText === 'PENDING';
    const isApproved = statusText === 'APPROVED';

    return (
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isApproved
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
            color: isApproved
              ? theme.colors.success[700]
              : isPending
              ? theme.colors.warning[700]
              : theme.colors.error[700],
            fontWeight: '600',
          }}
        >
          {statusText}
        </Text>
      </View>
    );
  };

  const renderVolunteerCard = () => {
    if (!volunteer) return null;

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
              {volunteer.full_name}
            </Text>
            <Text variant="caption" color="secondary" style={styles.email}>
              {volunteer.email}
            </Text>
          </View>
          {getStatusBadge(volunteer.status)}
        </View>

        <View style={styles.contactInfo}>
          <Text variant="body2" color="primary">
            📞 {volunteer.phone}
          </Text>
        </View>

        <View style={styles.expandedContent}>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.border.primary },
            ]}
          />

          <View style={styles.availabilitySection}>
            <Text variant="caption" color="secondary" style={styles.label}>
              Week Days
            </Text>
            {getAvailabilityBadge(volunteer.on_week_days)}
          </View>

          <View style={styles.availabilitySection}>
            <Text variant="caption" color="secondary" style={styles.label}>
              Weekends
            </Text>
            {getAvailabilityBadge(volunteer.on_week_ends)}
          </View>

          {volunteer.skills && (
            <View style={styles.section}>
              <Text variant="caption" color="secondary" style={styles.label}>
                Skills / Interests
              </Text>
              <Text variant="body2" color="primary" style={styles.value}>
                {volunteer.skills}
              </Text>
            </View>
          )}

          {volunteer.message && (
            <View style={styles.section}>
              <Text variant="caption" color="secondary" style={styles.label}>
                Message
              </Text>
              <Text variant="body2" color="primary" style={styles.value}>
                {volunteer.message}
              </Text>
            </View>
          )}

          {volunteer.created_at && (
            <View
              style={[
                styles.dateSection,
                { borderTopColor: theme.colors.border.primary },
              ]}
            >
              <Text variant="caption" color="secondary">
                Applied on:{' '}
                {new Date(volunteer.created_at).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="h4" color="primary" style={styles.emptyTitle}>
        No Application Found
      </Text>
      <Text variant="body2" color="secondary" style={styles.emptyText}>
        You haven't submitted a volunteer application yet.
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
            Loading volunteer data...
          </Text>
        </View>
      </Container>
    );
  }

  console.log('Vol', volunteer);

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
          Your Volunteer Application
        </Heading>
        {volunteer && (
          <Text variant="body2" color="secondary" style={styles.subheading}>
            Application Status: {volunteer.status || 'PENDING'}
          </Text>
        )}
      </View>

      {volunteer ? renderVolunteerCard() : renderEmptyState()}
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
  availabilitySection: {
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
  section: {
    marginBottom: 12,
  },
  value: {
    lineHeight: 20,
  },
  dateSection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
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

export default ViewVolunteer;
