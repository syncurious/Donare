import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../../components/base';
import BefitsListCard from '../../components/cards/befitsListCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import theme from '../../config/theme';
import { GetCauses } from '../../service/handler';

interface Cause {
  id: string;
  name: string;
  description: string;
  media: string;
  media_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CausesResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    causes: Cause[];
    total: number;
  };
}

const Causes = () => {
  const navigation = useNavigation<any>();
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCauses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await GetCauses()) as CausesResponse;
      console.log('Response', response?.data?.causes);
      if (response.data.causes) {
        setCauses(response.data.causes);
      } else {
        setError('Failed to fetch causes');
      }
    } catch (err) {
      setError('An error occurred while fetching causes');
      console.error('Error fetching causes:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCauses();
    }, []),
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={styles.loadingText}>Loading causes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchCauses}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCause')}
      >
        <Text style={styles.addButtonText}>+ Add Cause</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        {causes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No causes available</Text>
          </View>
        ) : (
          causes.map((cause, idx) => (
            <TouchableOpacity
              key={cause.id}
              onPress={() => navigation.navigate('CauseDetails', { cause })}
              style={styles.causeItem}
            >
              <BefitsListCard
                image={{ uri: cause.media }}
                title={cause.name}
                description={cause.description}
              />
            </TouchableOpacity>
          ))
        )}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error[500],
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default Causes;
