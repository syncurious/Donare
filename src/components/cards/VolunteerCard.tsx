import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Container from '../base/Container';
import Heading from '../base/Heading';
import Paragraph from '../base/Paragraph';
import Button from '../base/Button';
import Section from '../base/Section';
import Text from '../base/Text';
import theme from '../../config/theme';

interface Benefit {
  icon?: any; // require or import for local icon
  title: string;
  description: string;
}

interface VolunteerCardProps {
  image?: any; // require or import for local image
  title: string;
  description: string;
  benefits: Benefit[];
  buttonText: string;
  sectionTitle: string;
  onButtonPress: () => void;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({
  image,
  title,
  description,
  benefits,
  buttonText,
  sectionTitle,
  onButtonPress,
}) => {
  return (
    <Container
      variant="card"
      scrollable
      padding="small"
      contentContainerStyle={styles.listContent}
      style={styles.card}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={{ padding: 12, gap: 4 }}>
        <Heading level={2} style={styles.title}>
          {title}
        </Heading>
        <Paragraph style={styles.description}>{description}</Paragraph>
        <Section title={sectionTitle}>
          {benefits.map((benefit, idx) => (
            <View key={idx} style={styles.benefitRow}>
              {benefit.icon && (
                <View style={styles.benefitIconWrapper}>
                  <Image source={benefit.icon} style={styles.benefitIcon} />
                </View>
              )}
              <View style={styles.benefitTextContainer}>
                <Text variant="subtitle1" style={styles.benefitTitle}>
                  {benefit.title}
                </Text>
                <Text variant="body2" color="muted">
                  {benefit.description}
                </Text>
              </View>
            </View>
          ))}
        </Section>
        <Button onPress={onButtonPress} style={styles.button}>
          {buttonText}
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 0,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    marginBottom: 16,
    textAlign: 'left',
  },
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
  button: {
    marginTop: 16,
    borderRadius: 30,
    alignSelf: 'stretch',
  },
});

export default VolunteerCard;
