import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../config/theme';

interface FoodCardProps {
  label: string;
  description: string;
  image: any;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const FoodCard: React.FC<FoodCardProps> = ({ label, description, image, selected, onPress, style }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { borderColor: selected ? theme.colors.primary[600] : '#F2F2F5', backgroundColor: selected ? theme.colors.primary[50] : '#fff' },
        style,
      ]}
      activeOpacity={0.85}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={[styles.label, { color: theme.colors.text.primary }]}>{label}</Text>
        <Text style={[styles.description, { color: theme.colors.text.secondary }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#F2F2F5',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default FoodCard; 