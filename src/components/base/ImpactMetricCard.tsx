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

  // Determine font size based on value length
  const getValueFontSize = () => {
    if (value.length > 15) return 12;
    if (value.length > 12) return 14;
    if (value.length > 8) return 16;
    return 18;
  };

  return (
    <View style={containerStyle}>
      <Text variant="subtitle1" style={[styles.metricLabel, { textAlign }]}>
        {label}
      </Text>
      <Text 
        variant="h3" 
        style={[
          styles.metricValue, 
          { 
            textAlign,
            fontSize: getValueFontSize(),
            flexWrap: 'wrap',
          }
        ]}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.7}
      >
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
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    minHeight: 80,
    justifyContent: 'center',
  },
  metricLabel: {
    color: '#637587',
    fontWeight: '500',
    marginBottom: 6,
    fontSize: 12,
    lineHeight: 16,
  },
  metricValue: {
    fontWeight: '700',
    fontSize: 18,
    color: '#121417',
    lineHeight: 22,
    flexShrink: 1,
  },
});

export default ImpactMetricCard; 