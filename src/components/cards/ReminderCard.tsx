import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import theme from '../../config/theme';

interface ReminderCardProps {
  title: string;
  description: string;
  date?: string;
  image?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  title,
  description,
  date,
  image,
  buttonText,
  buttonAction,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {date ? <Text style={styles.date}>{date}</Text> : null}
        {buttonText && buttonAction ? (
          <TouchableOpacity style={styles.button} onPress={buttonAction}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.imageContainer}>
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
          ></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 180,
    maxWidth: 320,
    alignItems: 'center',
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F0F2F5',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: 13,
    marginBottom: 4,
    textAlign: 'left',
  },
  date: {
    color: theme.colors.text.secondary[500],
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'left',
  },
  button: {
    marginTop: 8,
    backgroundColor: theme.colors.secondary[100],
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: theme.colors.text.secondary[500],
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default ReminderCard;
