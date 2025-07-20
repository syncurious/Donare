import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../base/Card';
import Text from '../base/Text';
import Button from '../base/Button';

interface VolunteerApplicationCardProps {
  name: string;
  email: string;
  status: 'Pending' | 'Approved';
  onView: () => void;
}

const VolunteerApplicationCard: React.FC<VolunteerApplicationCardProps> = ({
  name,
  email,
  status,
  onView,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text variant="h6" style={styles.name}>{name}</Text>
          <Text variant="body2" color="secondary" style={styles.email}>{email}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <View style={[styles.statusBadge, status === 'Approved' ? styles.approved : styles.pending]}>
            <Text variant="body2" style={styles.statusText}>{status}</Text>
          </View>
          <Button size="small" style={styles.viewButton} onPress={onView}>
            View
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#6B7582',
  },
  actionsContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'flex-end',
  },
  approved: {
    backgroundColor: '#F2F2F5',
  },
  pending: {
    backgroundColor: '#F2F2F5',
  },
  statusText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#121417',
  },
  viewButton: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minWidth: 84,
  },
});

export default VolunteerApplicationCard; 