import React from 'react';
import { View, Text, StyleSheet, ImageBackground, StyleProp, ViewStyle } from 'react-native';

interface QuickCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  image?: string;
  style?: StyleProp<ViewStyle>;
}

const QuickCard: React.FC<QuickCardProps> = ({ title, description, backgroundColor, image, style }) => {
  const CardContent = (
    <View style={[styles.content, { backgroundColor }, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );

  if (image) {
    return (
      <ImageBackground source={{ uri: image }} style={styles.imageBackground} imageStyle={styles.imageStyle}>
        {CardContent}
      </ImageBackground>
    );
  }
  return CardContent;
};

const styles = StyleSheet.create({
  content: {
    borderRadius: 12,
    padding: 16,
    minWidth: 180,
    maxWidth: 220,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 180,
    maxWidth: 220,
    marginRight: 12,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#121417',
    marginBottom: 4,
  },
  description: {
    color: '#61758A',
    fontSize: 14,
  },
});

export default QuickCard; 