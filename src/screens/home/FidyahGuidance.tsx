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

const FidyahGuidance = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container scrollable contentContainerStyle={styles.container} padding="large">
      <Heading level={3} style={styles.title}>
        Fidyah Shariya Guidance
      </Heading>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Definition
        </Heading>
        
        <Text variant="body2" style={styles.definition}>
          <Text style={styles.bold}>Fidyah</Text> is paid when a person cannot perform certain obligatory acts due to valid reasons (like illness, old age, or permanent disability).
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Applicable Situations
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Missed Fasts of Ramadan:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Missing fasts and being unable to make them up later
          </Text>
          <Text variant="body2" style={styles.content}>
            • Valid reasons include chronic illness, old age, or permanent disability
          </Text>
          <Text variant="body2" style={styles.content}>
            • Pregnancy or breastfeeding when fasting harms mother or baby
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Hajj Violations:
          </Text>
          <Text variant="body2" style={styles.content}>
            • In Hajj, if a pilgrim misses a wajib act
          </Text>
          <Text variant="body2" style={styles.content}>
            • Committing violations during Hajj (e.g., shaving head early, skipping tawaf)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Breaking ihram restrictions without valid excuse
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Rules & Conditions
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            For Missed Fasts:
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Feed one poor person per missed fast</Text>
          </Text>
          <Text variant="body2" style={styles.content}>
            • Either provide two meals to one poor person
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or give wheat/flour equivalent to 1.5 kg (approx. value of Sadaqat al-Fitr)
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Important:</Text> If the person later recovers, they must still fast and the Fidyah becomes voluntary charity
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            For Hajj Violations:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Fidyah may be:
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Slaughtering a sheep/goat
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Feeding six poor persons
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Fasting three days (depending on the type of violation)
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Calculation Method
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Amount per Missed Fast:
          </Text>
          <Text variant="body2" style={styles.content}>
            • 1.5 kg of wheat or equivalent flour
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or the market value equivalent in local currency
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or two complete meals for one poor person
          </Text>
          <Text variant="body2" style={styles.content}>
            • Should be calculated based on local food prices
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Payment Timing:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Can be paid daily for each missed fast
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or paid as lump sum for all missed fasts
          </Text>
          <Text variant="body2" style={styles.content}>
            • Should be paid before death if possible
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Important Notes
        </Heading>

        <View style={styles.subsection}>
          <Text variant="body2" style={styles.content}>
            • Fidyah is only for those with genuine inability to fast
          </Text>
          <Text variant="body2" style={styles.content}>
            • Temporary illness requires making up fasts, not Fidyah
          </Text>
          <Text variant="body2" style={styles.content}>
            • The food must reach the poor/needy recipients
          </Text>
          <Text variant="body2" style={styles.content}>
            • Can be given directly to poor or through trustworthy organizations
          </Text>
          <Text variant="body2" style={styles.content}>
            • Intention must be specifically for Fidyah, not general charity
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

export default FidyahGuidance;
