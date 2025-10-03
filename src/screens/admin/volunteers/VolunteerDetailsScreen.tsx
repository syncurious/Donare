import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Button from '../../../components/base/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../../config/theme';
import Section from '../../../components/base/Section';
import ProfileCard from '../../../components/cards/ProfileCard';

interface VolunteerDetails {
  name: string;
  email: string;
  phone: string;
  joined: string;
  skills: string[];
  availability: { label: string; value: string }[];
  message: string;
}

type VolunteerDetailsScreenRouteProp = RouteProp<
  { params: { volunteer: VolunteerDetails } },
  'params'
>;

const VolunteerDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<VolunteerDetailsScreenRouteProp>();
  const volunteer = route.params?.volunteer;

  if (!volunteer) return null;

  const handleApprove = () => {
    // TODO: Implement approve logic
    navigation.goBack();
  };

  const handleReject = () => {
    // TODO: Implement reject logic
    navigation.goBack();
  };

  return (
    <Container
      padding="small"
      style={styles.container}
      scrollable={true}
      contentContainerStyle={styles.containerContent}
    >
      <View style={styles.profileCard}>
        <ProfileCard user={{
          name: volunteer.name,
          email: volunteer.email,
          phone: volunteer.phone, 
          image: "https://avatar.iran.liara.run/public/boy",
          memberSince: "2022",
        }} theme={theme} />
      </View>
      <View style={{ width : "100%"}}>
        <Section title="Skills">
          <View style={styles.skillsRow}>
            {volunteer.skills.map(skill => (
              <View key={skill} style={styles.skillBadge}>
                <Text variant="body2">{skill}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Availability">
          <View style={styles.availabilityRow}>
            {volunteer.availability.map(avail => (
              <View key={avail.label} style={styles.availCol}>
                <Text variant="body2" color="secondary">
                  {avail.label}
                </Text>
                <Text variant="body2">{avail.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Contact Information">
          <View style={styles.contactRow}>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">
                Phone
              </Text>
              <Text variant="body2">{volunteer.phone}</Text>
            </View>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">
                Email
              </Text>
              <Text variant="body2">{volunteer.email}</Text>
            </View>
          </View>
        </Section>
        <Section title="Message">
          <Text variant="body2">
            {volunteer.message}
          </Text>
        </Section>
      </View>
      <View style={styles.actionsRow}>
        <Button
          variant="outlined"
          style={styles.rejectBtn}
          onPress={handleReject}
        >
          Reject
        </Button>
        <Button style={styles.approveBtn} onPress={handleApprove}>
          Approve
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background.primary,
  },
  containerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
  },
  profileCard: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2,
    textAlign: 'center',
  },
  joined: {
    fontSize: 16,
    color: '#6B7582',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillBadge: {
    backgroundColor: '#F2F2F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  availabilityRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 8,
  },
  availCol: {
    alignItems: 'center',
    minWidth: 80,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  contactCol: {
    minWidth: 120,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  approveBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
  },
  rejectBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F5',
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
});

export default VolunteerDetailsScreen;
