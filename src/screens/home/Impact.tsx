import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Section from '../../components/base/Section';
import CampaignCard from '../../components/cards/CampaignCard';
import Divider from '../../components/base/Divider';
import Text from '../../components/base/Text';

// --- Static Data ---
const impactPrograms = [
  {
    title: 'Food Distribution Program',
    description:
      'We provided meals to over 500 families in need during Ramadan.',
    image: undefined, // Add image if available
    buttonText: 'Project Update',
    buttonAction: undefined,
  },
  {
    title: 'Education Support',
    description:
      'We helped 200 children access quality education by providing school supplies and tuition assistance.',
    image: undefined, // Add image if available
    buttonText: 'Project Update',
    buttonAction: undefined,
  },
  {
    title: 'Healthcare Assistance',
    description:
      'We supported 150 individuals with medical expenses, ensuring they receive the care they need.',
    image: undefined, // Add image if available
    buttonText: 'Project Update',
    buttonAction: undefined,
  },
];

const beneficiaryStories = [
  {
    name: "Aisha's Story",
    description: 'Aisha received food assistance during Ramadan.',
    image: undefined,
    buttonText: 'Project Update',
    buttonAction: undefined,
  },
  {
    name: "Omar's Story",
    description: 'Omar received support for his medical expenses.',
    image: undefined,
  },
  {
    name: "Fatima's Story",
    description: 'Fatima received school supplies for her education.',
    image: undefined,
  },
];

// --- Card Components ---
const ImpactMetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.metricCard}>
    <Text variant="subtitle1" style={styles.metricLabel}>
      {label}
    </Text>
    <Text variant="h3" style={styles.metricValue}>
      {value}
    </Text>
  </View>
);

// --- Main Screen ---
const Impact = () => {
  return (
    <Container
      scrollable
      padding="small"
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View style={styles.headerSection}>
        <Heading level={2} style={styles.title}>
          Donation Impact
        </Heading>
        <Heading level={4} style={styles.sectionTitle}>
          Our Impact
        </Heading>
        <Paragraph style={styles.description}>
          Your contributions are making a difference in the lives of those in
          need. Here's how we're using your donations to support our community:
        </Paragraph>
      </View>

      {/* Impact Programs */}
      <View style={styles.section}>
        {impactPrograms.map((item, idx) => (
          <CampaignCard
            style={{ width: '100%' }}
            key={idx}
            title={item.title}
            description={item.description}
            image={item.image}
            buttonText={item.buttonText}
            buttonAction={item.buttonAction}
          />
        ))}
      </View>

      <Section title="beneficiary stories" style={{ gap: 12 }} autoCarousel>
        {beneficiaryStories.map((story, idx) => (
          <CampaignCard
            style={{ width: 200 }}
            key={idx}
            title={story.name}
            description={story.description}
            image={story.image}
          />
        ))}
      </Section>

      {/* Quantitative Metrics */}
      <Heading level={4} style={styles.sectionTitle}>
        Quantitative Metrics
      </Heading>
      <View style={styles.metricsRow}>
        <View style={{ flexDirection: 'row' }}>
          <ImpactMetricCard label="Families Supported" value="500+" />
          <ImpactMetricCard label="Children Educated" value="200+" />
        </View>
        <ImpactMetricCard
          label="Individuals Received Healthcare"
          value="150+"
        />
        {/* {metrics.map((metric, idx) => (
        ))} */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 32,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
    color: '#637587',
  },
  section: {
    marginBottom: 16,
    gap: 20,
  },
  quickCard: {
    marginBottom: 12,
    minWidth: '100%',
    maxWidth: '100%',
  },
  storiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  storyCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    minWidth: 100,
    maxWidth: 120,
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  storyName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  storyText: {
    color: '#637587',
    fontSize: 13,
  },
  metricsRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBE0E5',
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  metricLabel: {
    color: '#637587',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontWeight: '700',
    fontSize: 24,
    color: '#121417',
    textAlign: 'center',
  },
});

export default Impact;
