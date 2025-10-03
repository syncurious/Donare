import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Text } from '../../components/base';
import BefitsListCard from '../../components/cards/befitsListCard';
import { useNavigation } from '@react-navigation/native';
import theme from '../../config/theme';

const causes = [
  {
    title: 'Clean Water Initiative',
    description: 'Help provide clean water to communities in need.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Education for All',
    description: 'Support education programs for underprivileged children.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Disaster Relief Fund',
    description: 'Provide food and shelter to families affected by disasters.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Healthcare Access',
    description: 'Support healthcare services in underserved areas.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Women Empowerment Program',
    description: 'Empower women through vocational training and support.',
    image: 'https://via.placeholder.com/150',
  },
];

const Causes = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCause')}
      >
        <Text style={styles.addButtonText}>+ Add Cause</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        {causes.map((cause, idx) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CauseDetails', { cause })}
            style={styles.causeItem}
          >
            <BefitsListCard
              key={idx}
              image={{ uri: cause.image }}
              title={cause.title}
              description={cause.description}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#E8EDF5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#0D141C',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    gap: 12,
  },
  causeItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8EDF5',
  },
});

export default Causes;
