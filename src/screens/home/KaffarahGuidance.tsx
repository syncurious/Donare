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

const KaffarahGuidance = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container scrollable contentContainerStyle={styles.container} padding="large">
      <Heading level={3} style={styles.title}>
        Kaffarah Shariya Guidance
      </Heading>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Definition
        </Heading>
        
        <Text variant="body2" style={styles.definition}>
          <Text style={styles.bold}>Kaffārah</Text> is a mandatory act of compensation to atone for certain sins or violations (like breaking a fast intentionally, false oath, or zihar).
        </Text>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Main Situations That Require Kaffārah
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Breaking a Fast of Ramadan:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Intentionally breaking fast by eating or drinking
          </Text>
          <Text variant="body2" style={styles.content}>
            • Intentional intercourse during fasting hours
          </Text>
          <Text variant="body2" style={styles.content}>
            • Must be done deliberately without valid excuse
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Breaking an Oath:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Swearing and not fulfilling the oath
          </Text>
          <Text variant="body2" style={styles.content}>
            • Must be a serious oath, not casual statements
          </Text>
          <Text variant="body2" style={styles.content}>
            • Breaking oath deliberately or negligently
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Other Major Violations:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zihar (declaring one's wife as unlawful like one's mother)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Unintentional Killing (Qatl Khata')
          </Text>
          <Text variant="body2" style={styles.content}>
            • Certain violations during Hajj or Umrah
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Rules & Conditions
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Kaffārah for Breaking Fast:
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Option 1:</Text> Free a slave (no longer applicable today)
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Option 2:</Text> Fast for 60 consecutive days
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Option 3:</Text> If unable — Feed 60 poor people, each one with two meals or equivalent in grain (approx. 1.5 kg per person)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Must be consecutive days if choosing fasting option
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Kaffārah for Oath:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Feed 10 poor persons (average meal)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or clothe 10 poor persons
          </Text>
          <Text variant="body2" style={styles.content}>
            • Or free a slave (not applicable today)
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>If one cannot do any —</Text> Fast for 3 days
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Kaffārah for Unintentional Killing:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Free a slave (if possible)
          </Text>
          <Text variant="body2" style={styles.content}>
            • Pay Diyah (blood money) to the victim's family
          </Text>
          <Text variant="body2" style={styles.content}>
            • If unable to free a slave — Fast for 2 consecutive months
          </Text>
          <Text variant="body2" style={styles.content}>
            • Diyah amount varies based on circumstances and local customs
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Important Conditions
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            General Requirements:
          </Text>
          <Text variant="body2" style={styles.content}>
            • The violation must be deliberate and without valid excuse
          </Text>
          <Text variant="body2" style={styles.content}>
            • Person must be sane, mature, and Muslim
          </Text>
          <Text variant="body2" style={styles.content}>
            • Must have knowledge of the prohibition
          </Text>
          <Text variant="body2" style={styles.content}>
            • Repentance is required along with Kaffarah
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h5" style={styles.subsectionTitle}>
            Order of Preference:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Follow the specific order mentioned in Islamic texts
          </Text>
          <Text variant="body2" style={styles.content}>
            • Move to next option only if genuinely unable
          </Text>
          <Text variant="body2" style={styles.content}>
            • Financial inability must be genuine, not convenient
          </Text>
          <Text variant="body2" style={styles.content}>
            • Consult knowledgeable scholars for specific cases
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={5} style={styles.sectionTitle}>
          Common Questions
        </Heading>

        <View style={styles.subsection}>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>What if I break multiple fasts?</Text> One Kaffarah covers all broken fasts in Ramadan
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Can I pay money instead of food?</Text> Yes, equivalent value can be given to poor
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>What if I miss some consecutive fasting days?</Text> Must restart from beginning
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Is repentance necessary?</Text> Yes, sincere repentance is essential for acceptance
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

export default KaffarahGuidance;
