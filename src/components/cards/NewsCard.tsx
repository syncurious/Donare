import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface NewsCardProps {
  title: string;
  description: string;
  image?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, image }) => {
  return (
    <View style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 220,
    maxWidth: 260,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: 13,
  },
});

export default NewsCard;
