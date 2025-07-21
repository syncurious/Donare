import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';

interface ImpactMetricCardProps {
  label: string;
  value: string;
  align?: 'left' | 'center' | 'right';
}

const ImpactMetricCard = ({
  label,
  value,
  align = 'left',
}: ImpactMetricCardProps) => {
  const containerStyle: ViewStyle = {
    ...styles.metricCard,
    alignItems:
      align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
  };
  const textAlign: TextStyle['textAlign'] = align;

  return (
    <View style={containerStyle}>
      <Text variant="subtitle1" style={[styles.metricLabel, { textAlign }]}>
        {label}
      </Text>
      <Text variant="h3" style={[styles.metricValue, { textAlign }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBE0E5',
    padding: 24,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  metricLabel: {
    color: '#637587',
    fontWeight: '500',
    marginBottom: 8,
  },
  metricValue: {
    fontWeight: '700',
    fontSize: 24,
    color: '#121417',
  },
});

export default ImpactMetricCard; 