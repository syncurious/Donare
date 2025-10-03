import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import Heading from '../base/Heading';
import theme from '../../config/theme';

interface DonateOptionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
  image?: ImageSourcePropType;
  backgroundColor?: string;
}

const DonateOptionCard: React.FC<DonateOptionCardProps> = ({
  title,
  description,
  buttonText,
  onPress,
  image,
  backgroundColor,
}) => {
  return (
    <View
      style={
        [styles.card, backgroundColor ? { backgroundColor } : {}] as ViewStyle[]
      }
    >
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <View style={{ width: '60%'}}>
          <Heading level={4} style={styles.title}>
            {title}
          </Heading>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: theme.colors.neutral[700],
    fontSize: 15,
    marginBottom: 16,
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DonateOptionCard;
