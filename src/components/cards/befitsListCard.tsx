import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
import theme from '../../config/theme';
import { Text } from '../base';
import { ImageSourcePropType } from 'react-native';

function BefitsListCard({
  icon,
  title,
  description,
  RightComponent,
}: {
  icon?: any,
  title?: string;
  description?: string;
  RightComponent?: React.ReactNode;
}) {
  return (
    <View style={styles.benefitRow}>
      {icon && (
        <View style={styles.benefitIconWrapper}>
          <Image source={icon} style={styles.benefitIcon} />
        </View>
      )}
      <View style={styles.benefitTextContainer}>
        <Text variant="subtitle1" style={styles.benefitTitle}>
          {title}
        </Text>
        <Text variant="body2" color="muted">
          {description}
        </Text>
      </View>
      {RightComponent && RightComponent}
    </View>
  );
}

export default BefitsListCard;

const styles = StyleSheet.create({
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.neutral[100],
  },
  benefitIconWrapper: {
    width: 45,
    height: 45,
    backgroundColor: theme.colors.secondary[100],
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },
  benefitIcon: {
    width: 25,
    height: 25,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  listContent: {
    paddingBottom: 10,
  },
});
