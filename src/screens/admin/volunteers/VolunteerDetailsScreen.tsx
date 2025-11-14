import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Button from '../../../components/base/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../../config/theme';
import Section from '../../../components/base/Section';
import ProfileCard from '../../../components/cards/ProfileCard';
import { UpdateVolunteerStatus, type Volunteer } from '../../../service/admin';
import Loader from '../../../components/base/Loader';

type VolunteerDetailsScreenRouteProp = RouteProp<
  { params: { volunteer: Volunteer } },
  'params'
>;

const VolunteerDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<VolunteerDetailsScreenRouteProp>();
  const volunteer = route.params?.volunteer;
  const [loading, setLoading] = useState(false);

  if (!volunteer) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAvailabilityText = (availability: string) => {
    return availability === 'AVAILABLE' ? 'Available' : 'Not Available';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return theme.colors.warning[500];
      case 'APPROVED':
        return theme.colors.success[500];
      case 'REJECTED':
        return theme.colors.error[500];
      case 'COMPLETED':
        return theme.colors.primary[500];
      case 'CANCELLED':
        return theme.colors.neutral[500];
      default:
        return theme.colors.neutral[500];
    }
  };

  const getStatusText = (status: string) => {
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
        return status;
    }
  };

  const handleStatusUpdate = async (
    newStatus: 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED',
  ) => {
    const actionText = newStatus.toLowerCase();
    const actionTextCapitalized =
      actionText.charAt(0).toUpperCase() + actionText.slice(1);

    Alert.alert(
      `${actionTextCapitalized} Volunteer`,
      `Are you sure you want to ${actionText} ${volunteer.full_name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: actionTextCapitalized,
          style:
            newStatus === 'REJECTED' || newStatus === 'CANCELLED'
              ? 'destructive'
              : 'default',
          onPress: async () => {
            try {
              setLoading(true);
              const response = await UpdateVolunteerStatus(
                volunteer.id,
                newStatus,
              );
              if (response.status) {
                Alert.alert(
                  'Success',
                  `Volunteer ${actionText} successfully!`,
                  [{ text: 'OK', onPress: () => navigation.goBack() }],
                );
              } else {
                Alert.alert(
                  'Error',
                  response.message || `Failed to ${actionText} volunteer`,
                );
              }
            } catch (error: any) {
              Alert.alert(
                'Error',
                error.message || `Failed to ${actionText} volunteer`,
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <Container
      padding="small"
      style={styles.container}
      scrollable={true}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.profileCard}>
        <ProfileCard
          user={{
            fullName: volunteer.full_name,
            email: volunteer.email,
            phone: volunteer.phone,
            image: `https://avatar.iran.liara.run/public/boy?seed=${volunteer.email}`,
            memberSince: formatDate(volunteer.created_at),
          }}
          theme={theme}
        />
      </View>

      {/* Status Badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(volunteer.status) + '20' },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: getStatusColor(volunteer.status) },
          ]}
        >
          {getStatusText(volunteer.status)}
        </Text>
      </View>

      <View style={{ width: '100%' }}>
        <Section title="Skills">
          <View style={styles.skillsRow}>
            {volunteer.skills.split(',').map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text variant="body2">{skill.trim()}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Availability">
          <View style={styles.availabilityRow}>
            <View style={styles.availCol}>
              <Text variant="body2" color="secondary">
                Weekdays
              </Text>
              <Text variant="body2">
                {getAvailabilityText(volunteer.on_week_days)}
              </Text>
            </View>
            <View style={styles.availCol}>
              <Text variant="body2" color="secondary">
                Weekends
              </Text>
              <Text variant="body2">
                {getAvailabilityText(volunteer.on_week_ends)}
              </Text>
            </View>
          </View>
        </Section>

        <Section title="Contact Information">
          <View style={styles.contactRow}>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">
                Phone
              </Text>
              <Text variant="body2">{volunteer.phone}</Text>
            </View>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">
                Email
              </Text>
              <Text variant="body2">{volunteer.email}</Text>
            </View>
          </View>
        </Section>

        <Section title="Application Date">
          <Text variant="body2">{formatDate(volunteer.created_at)}</Text>
        </Section>

        <Section title="Message">
          <Text variant="body2">{volunteer.message}</Text>
        </Section>
      </View>

      {volunteer.status == 'PENDING' && (
        <View style={styles.actionsRow}>
          <Button
            variant="outlined"
            style={styles.rejectBtn}
            onPress={() => handleStatusUpdate('REJECTED')}
            disabled={loading}
          >
            {loading ? <Loader size="small" /> : 'Reject'}
          </Button>
          <Button
            style={styles.approveBtn}
            onPress={() => handleStatusUpdate('APPROVED')}
            disabled={loading}
          >
            {loading ? <Loader size="small" /> : 'Approve'}
          </Button>
        </View>
      )}

      {(volunteer.status === 'REJECTED' ||
        volunteer.status === 'APPROVED' ||
        volunteer.status === 'CANCELLED') && (
        <View style={styles.statusMessage}>
          <Text
            style={[
              styles.statusMessageText,
              { color: getStatusColor(volunteer.status) },
            ]}
          >
            This volunteer has been{' '}
            {getStatusText(volunteer.status).toLowerCase()}
          </Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background.primary,
  },
  containerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
  },
  profileCard: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2,
    textAlign: 'center',
  },
  joined: {
    fontSize: 16,
    color: '#6B7582',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillBadge: {
    backgroundColor: '#F2F2F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  availabilityRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 8,
  },
  availCol: {
    alignItems: 'center',
    minWidth: 80,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  contactCol: {
    minWidth: 120,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  approveBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
  },
  rejectBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F5',
  },
  cancelBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F5',
  },
  completeBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[500],
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  statusMessage: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.neutral[100],
    marginTop: 16,
    alignItems: 'center',
  },
  statusMessageText: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default VolunteerDetailsScreen;
