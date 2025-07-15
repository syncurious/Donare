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
      <View
        style={{
          width: '60%',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <View>
          <Text style={styles.verse}>{verse}</Text>
          {reference && <Text style={styles.reference}>{reference}</Text>}
          <Text style={styles.description}>{description}</Text>
        </View>
        {buttonText && buttonAction ? (
          <TouchableOpacity style={styles.button} onPress={buttonAction}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ width: '40%' }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.image,
              { backgroundColor: theme.colors.neutral[100], borderRadius: 12 },
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap :12,
    width: 350,
    height: 180,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  verse: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'left',
  },
  reference: {
    color: theme.colors.neutral[400],
    fontSize: 13,
    marginBottom: 4,
    textAlign: 'left',
  },
  description: {
    color: '#666',
    fontSize: 13,
    marginBottom: 4,
    textAlign: 'left',
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
    marginTop: 8,
    backgroundColor: theme.colors.neutral[100],
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: theme.colors.neutral[400],
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default VerseCard;
