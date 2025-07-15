import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import theme, { borderRadius } from '../../config/theme';

interface ReaminderCardProps {
  title: string;
  description: string;
  image?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ReaminderCard: React.FC<ReaminderCardProps> = ({
  title,
  description,
  image,
  buttonText,
  buttonAction,
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
          <Text style={styles.title}>{title}</Text>
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
    marginHorizontal:5,
    // marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: 350,
    height: 180,
    // minWidth: 280,
    // maxWidth: 300,
    // alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
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
    color: theme.colors.neutral[500],
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default ReaminderCard;
