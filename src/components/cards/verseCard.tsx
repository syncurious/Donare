import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import theme, { borderRadius } from '../../config/theme';

interface VerseCardProps {
  verse: string;
  description?: string;
  image?: string;
  buttonText?: string | React.ReactNode;
  buttonAction?: () => void;
  reference?: string;
}

const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  description,
  image,
  buttonText,
  buttonAction,
  reference,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.verse} numberOfLines={4} ellipsizeMode="tail">
            {verse}
          </Text>
          {reference && (
            <Text style={styles.reference} numberOfLines={1}>
              {reference}
            </Text>
          )}
          {description && (
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {description}
            </Text>
          )}
        </View>
        {buttonText && buttonAction ? (
          <TouchableOpacity style={styles.button} onPress={buttonAction}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
    width: 350,
    minHeight: 180,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  verse: {
    fontWeight: '500',
    fontSize: 15,
    color: theme.colors.neutral[700],
    marginBottom: 8,
    textAlign: 'left',
    lineHeight: 22,
  },
  reference: {
    color: theme.colors.neutral[500],
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  description: {
    color: theme.colors.neutral[500],
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'left',
    lineHeight: 18,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.neutral[100],
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: theme.colors.neutral[600],
    fontWeight: '600',
    fontSize: 14,
  },
});

export default VerseCard;
