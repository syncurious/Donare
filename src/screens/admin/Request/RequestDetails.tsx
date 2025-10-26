import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Button from '../../../components/base/Button';
import Loader from '../../../components/base/Loader';
import theme from '../../../config/theme';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { type HelpRequest as HelpRequestType } from '../../../service/helpRequest';
import { UpdateHelpRequestStatus } from '../../../service/admin';

// Route params inline to avoid coupling to AdminStackParamList type
type AdminRequestDetailsRouteProp = RouteProp<
  { params: { requestId: string; request?: HelpRequestType } },
  'params'
>;

const RequestDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AdminRequestDetailsRouteProp>();
  const initialRequest = route.params?.request;

  const [resolving, setResolving] = useState(false);

  const getStatusBadge = (status: string) => {
    const isPending = status === 'PENDING';
    const isResolved = status === 'RESOLVED' || status === 'APPROVED';
    const isRejected = status === 'REJECTED';
    const bg = isResolved
      ? theme.colors.success[100]
      : isPending
      ? theme.colors.warning[100]
      : isRejected
      ? theme.colors.error[100]
      : theme.colors.neutral[100];
    const fg = isResolved
      ? theme.colors.success[700]
      : isPending
      ? theme.colors.warning[700]
      : isRejected
      ? theme.colors.error[700]
      : theme.colors.neutral[700];

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}> 
        <Text variant="caption" style={{ color: fg, fontWeight: '600' }}>
          {status}
        </Text>
      </View>
    );
  };

  const handleStatusUpdate = (newStatus: 'APPROVED' | 'REJECTED') => {
    if (!initialRequest) return;
    const actionText = newStatus === 'APPROVED' ? 'Approve' : 'Reject';
    Alert.alert(
      `${actionText} Help Request`,
      `Are you sure you want to ${actionText.toLowerCase()} this help request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: actionText,
          style: newStatus === 'REJECTED' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              setResolving(true);
              const res = await UpdateHelpRequestStatus(initialRequest.id, newStatus);
              if (res.status) {
                Alert.alert('Success', `Request ${actionText.toLowerCase()}ed successfully`, [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert('Error', res.message || `Failed to ${actionText.toLowerCase()} request`);
              }
            } catch (e: any) {
              Alert.alert('Error', e.message || `Failed to ${actionText.toLowerCase()} request`);
            } finally {
              setResolving(false);
            }
          },
        },
      ]
    );
  };

  if (!initialRequest) {
    return (
      <Container padding="small" style={{ flex: 1, backgroundColor: theme.colors.background.secondary, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.error[500], textAlign: 'center', marginBottom: 12 }}>
          Request not found
        </Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </Container>
    );
  }

  const req = initialRequest;

  return (
    <Container scrollable padding="small" style={{ flex: 1, backgroundColor: theme.colors.background.secondary }}>
      <View style={styles.header}>
        <Heading level={3} style={{ marginBottom: 4 }}>Help Request</Heading>
        {getStatusBadge(req.status)}
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text variant="body2" color="primary">ID: {req.id.slice(-8)}</Text>
          <Text variant="body2" color="secondary">{new Date(req.created_at).toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="caption" color="secondary" style={styles.label}>Requester</Text>
          <Text variant="body2" color="primary" style={styles.value}>{req.full_name}</Text>
          <Text variant="body2" color="primary" style={styles.value}>📞 {req.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="caption" color="secondary" style={styles.label}>Address</Text>
          <Text variant="body2" color="primary" style={styles.value}>{req.address}</Text>
          <Text variant="body2" color="primary" style={styles.value}>{req.city}, {req.country}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="caption" color="secondary" style={styles.label}>Description</Text>
          <Text variant="body2" color="primary" style={styles.value}>{req.description}</Text>
        </View>
      </View>

      {req.status === 'PENDING' ? (
        <View style={styles.actionsRow}>
          <Button
            variant="outlined"
            style={styles.rejectBtn}
            onPress={() => handleStatusUpdate('REJECTED')}
            disabled={resolving}
          >
            {resolving ? <Loader size="small" /> : 'Reject'}
          </Button>
          <Button
            style={styles.approveBtn}
            onPress={() => handleStatusUpdate('APPROVED')}
            disabled={resolving}
          >
            {resolving ? <Loader size="small" /> : 'Approve'}
          </Button>
        </View>
      ) : (
        <View style={styles.infoBox}>
          <Text style={{ color: req.status === 'APPROVED' ? theme.colors.success[600] : theme.colors.error[600] }}>
            This request has been {req.status === 'APPROVED' ? 'approved' : 'rejected'}.
          </Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    borderRadius: 12,
    padding: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  section: {
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  value: {
    lineHeight: 20,
  },
  infoBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: theme.colors.success[100],
    borderRadius: 8,
    alignItems: 'center',
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
});

export default RequestDetails;
