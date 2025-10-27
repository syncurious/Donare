import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Card from '../base/Card';
import Text from '../base/Text';
import Button from '../base/Button';
import theme from '../../config/theme';

interface VolunteerApplicationCardProps {
  name: string;
  email: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  onView: () => void;
}

const VolunteerApplicationCard: React.FC<VolunteerApplicationCardProps> = ({
  name,
  email,
  image,
  status,
  onView,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text variant="h6" style={styles.name}>
            {name}
          </Text>
          <Text variant="body2" color="secondary" style={styles.email}>
            {email}
          </Text>
          <Text
            style={styles.statusBadge}
            color={
              status === 'Approved'
                ? 'success'
                : status === 'Completed'
                ? 'primary'
                : status === 'Pending'
                ? 'warning'
                : 'error'
            }
          >
            {status}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            textStyle={{
              color: theme.colors.secondary[600],
            }}
            style={[
              { backgroundColor: theme.colors.secondary[200] },
              styles.viewButton,
            ]}
            onPress={onView}
          >
            View
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 0,
    padding: 12,
    paddingHorizontal : 0,
    borderRadius: 0,
    elevation: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E020',
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
  imageContainer: {
    width: 50,
    marginRight: 16,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
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
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minWidth: 84,
  },
  statusBadge: {
    borderRadius: 16,
    fontSize: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
});

export default VolunteerApplicationCard;
