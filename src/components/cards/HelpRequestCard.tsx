import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HelpRequestCardProps {
  name: string;
  location: string;
  type: string;
  status: 'Pending' | 'Resolved';
  onPress: () => void;
}

const statusColors: Record<HelpRequestCardProps['status'], string> = {
  Pending: '#FFA500', // orange
  Resolved: '#4CAF50', // green
};

const HelpRequestCard: React.FC<HelpRequestCardProps> = ({
  name,
  location,
  type,
  status,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.type}>{type}</Text>
      </View>
      <View style={styles.statusSection}>
        <Text style={[styles.status]}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E020',
    padding: 16,
    marginBottom: 16,
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 16,
    color: '#121417',
    marginBottom: 2,
  },
  location: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    color: '#6B7582',
    marginBottom: 2,
  },
  type: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    color: '#6B7582',
  },
  statusSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 80,
  },
  status: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 16,
    color: '#6B7582',
  },
});

export default HelpRequestCard;
