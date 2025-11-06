import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Container from '../../components/base/Container';
import theme from '../../config/theme';

const SadaqahGuidance = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container scrollable contentContainerStyle={styles.container} padding="large">
      <Heading level={3} style={styles.title}>
        Sadaqah Shariya Guidance
      </Heading>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Definition
        </Heading>
        
        <Text variant="body2" style={styles.definition}>
          <Text style={styles.bold}>Sadaqah</Text> means voluntary giving of wealth, time, or help for the sake of Allah — different from Zakat (which is obligatory).
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Purpose
        </Heading>

        <View style={styles.subsection}>
          <Text variant="body2" style={styles.content}>
            • To purify one's wealth and soul
          </Text>
          <Text variant="body2" style={styles.content}>
            • To help the needy and support good causes
          </Text>
          <Text variant="body2" style={styles.content}>
            • To seek Allah's pleasure and reward
          </Text>
          <Text variant="body2" style={styles.content}>
            • To show gratitude for Allah's blessings
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Rules & Guidelines
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Eligibility & Intention:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Should be given from halal (lawful) income
          </Text>
          <Text variant="body2" style={styles.content}>
            • Intention (niyyah) must be purely for Allah's sake — not to show off
          </Text>
          <Text variant="body2" style={styles.content}>
            • Can be given at any time, in any amount
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Recipients:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Poor and needy
          </Text>
          <Text variant="body2" style={styles.content}>
            • Orphans and widows
          </Text>
          <Text variant="body2" style={styles.content}>
            • Students and seekers of knowledge
          </Text>
          <Text variant="body2" style={styles.content}>
            • Travelers and those in difficulty
          </Text>
          <Text variant="body2" style={styles.content}>
            • Any person in need or for good causes
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Best Practices:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Regular charity (even small) is highly encouraged
          </Text>
          <Text variant="body2" style={styles.content}>
            • Hidden charity is more rewarding than public charity
          </Text>
          <Text variant="body2" style={styles.content}>
            • Giving in times of ease and difficulty
          </Text>
          <Text variant="body2" style={styles.content}>
            • The best charity is that given when wealth is abundant
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Types of Sadaqah
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Financial Sadaqah:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Money, gold, silver, or valuable items
          </Text>
          <Text variant="body2" style={styles.content}>
            • Food, clothing, and shelter
          </Text>
          <Text variant="body2" style={styles.content}>
            • Business investments that benefit the community
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Non-Financial Sadaqah:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Volunteering time and skills
          </Text>
          <Text variant="body2" style={styles.content}>
            • Teaching knowledge
          </Text>
          <Text variant="body2" style={styles.content}>
            • Helping others physically (carrying goods, assisting elderly)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Speaking kind words and smiling (considered charity)
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Virtues & Rewards
        </Heading>

        <View style={styles.subsection}>
          <Text variant="body2" style={styles.content}>
            • Extinguishes sin as water extinguishes fire
          </Text>
          <Text variant="body2" style={styles.content}>
            • Provides shade on the Day of Judgment
          </Text>
          <Text variant="body2" style={styles.content}>
            • Increases wealth and blessings (barakah)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Protection from calamities and misfortune
          </Text>
          <Text variant="body2" style={styles.content}>
            • Allah multiplies the reward manifold
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: theme.colors.primary[600],
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.primary[500],
  },
  definition: {
    marginBottom: 16,
    lineHeight: 22,
  },
  subsection: {
    marginBottom: 20,
    paddingLeft: 8,
  },
  subsectionTitle: {
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  content: {
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default SadaqahGuidance;
