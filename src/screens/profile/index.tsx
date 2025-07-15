import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Container from '../../components/base/Container';
import Section from '../../components/base/Section';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Feather from 'react-native-vector-icons/Feather';

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
};

const ICON_COLOR = '#6a85f1';
const CHEVRON_COLOR = '#b0b3c6';
const CARD_BG = 'rgba(255,255,255,0.85)';
const TOP_BG = '#b8c6ff';
const BOTTOM_BG = '#f7f8fa';

const Profile = () => {
  const user = {
    name: 'Omar Hassan',
    memberSince: '2022',
    email: 'omar.hassan@gmail.com',
    phone: '+1(555)123-4567',
    profileImage: 'https://avatar.iran.liara.run/public/boy',
    // profileCompletion: 0.8, // Remove profile completion
  };

  return (
    <Container scrollable padding="none" style={styles.containerBg}>
      <View style={styles.topBg}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {/* Remove avatar border */}
            {user.profileImage ? (
              <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitials}>
                  {getInitials(user.name)}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editIconBtn} activeOpacity={0.7}>
              <Feather name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Heading level={2} style={styles.name}>
            {user.name}
          </Heading>
          <Text variant="caption" color="secondary" style={styles.memberSince}>
            Member since {user.memberSince}
          </Text>
          {/* Remove profile completion text */}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Section title="Personal Info">
          <View style={styles.infoRow}>
            <Feather
              name="mail"
              size={16}
              color={ICON_COLOR}
              style={styles.infoIcon}
            />
            <Text variant="body2" color="secondary" style={styles.infoLabel}>
              Email
            </Text>
            <Text variant="body2" style={styles.infoValue}>
              {user.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Feather
              name="phone"
              size={16}
              color={ICON_COLOR}
              style={styles.infoIcon}
            />
            <Text variant="body2" color="secondary" style={styles.infoLabel}>
              Phone
            </Text>
            <Text variant="body2" style={styles.infoValue}>
              {user.phone}
            </Text>
          </View>
        </Section>
      </View>

      <View style={styles.sectionCard}>
        <Section title="Donation History">
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <View style={styles.linkRowLeft}>
              <Feather
                name="clock"
                size={16}
                color={ICON_COLOR}
                style={styles.linkIcon}
              />
              <Text variant="body2">View Donation History</Text>
            </View>
            <Feather
              name="chevron-right"
              size={18}
              color={CHEVRON_COLOR}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </Section>
      </View>
      <View style={styles.sectionCard}>
        <Section title="Saved Causes">
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <View style={styles.linkRowLeft}>
              <Feather
                name="bookmark"
                size={16}
                color={ICON_COLOR}
                style={styles.linkIcon}
              />
              <Text variant="body2">View Saved Causes</Text>
            </View>
            <Feather
              name="chevron-right"
              size={18}
              color={CHEVRON_COLOR}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </Section>
      </View>
      <View style={styles.sectionCard}>
        <Section title="Volunteer Record">
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <View style={styles.linkRowLeft}>
              <Feather
                name="award"
                size={16}
                color={ICON_COLOR}
                style={styles.linkIcon}
              />
              <Text variant="body2">View Volunteer Record</Text>
            </View>
            <Feather
              name="chevron-right"
              size={18}
              color={CHEVRON_COLOR}
              style={styles.chevron}
            />
          </TouchableOpacity>
        </Section>
      </View>

      <View style={styles.sectionCard}>
        <Section title="Settings">
          <View style={styles.infoRow}>
            <Text variant="body2" color="secondary" style={styles.infoLabel}>
              Language
            </Text>
            <Text variant="body2" style={styles.infoValue}>
              English
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body2" color="secondary" style={styles.infoLabel}>
              Zakat Reset Date
            </Text>
            <Text variant="body2" style={styles.infoValue}>
              1445 AH
            </Text>
          </View>
        </Section>
      </View>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Feather name="log-out" size={18} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerBg: {
    backgroundColor: BOTTOM_BG,
  },
  topBg: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 32 : 16,
    paddingBottom: 24, // reduced
    alignItems: 'center',
    backgroundColor: TOP_BG,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 4, // reduced
  },
  profileCard: {
    backgroundColor: CARD_BG,
    borderRadius: 14, // reduced
    alignItems: 'center',
    padding: 12, // reduced
    width: '90%',
    // Remove shadow and border
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    elevation: 0,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 0,
    borderColor: undefined,
  },
  avatarWrapper: {
    width: 80, // reduced
    height: 80, // reduced
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4, // reduced
  },
  // Remove avatarBorder style
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: ICON_COLOR,
    zIndex: 2,
  },
  avatarFallback: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: ICON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarInitials: {
    fontSize: 28, // reduced
    color: '#fff',
    fontWeight: '600', // lighter
  },
  editIconBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: ICON_COLOR,
    borderRadius: 12,
    padding: 2,
    zIndex: 3,
    borderWidth: 0,
    borderColor: undefined,
  },
  name: {
    marginBottom: 0,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.2,
  },
  memberSince: {
    marginBottom: 0,
    fontSize: 12,
    color: '#888',
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 0,
    marginVertical: 4,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoLabel: {
    minWidth: 60,
    marginRight: 4,
    color: '#aaa',
    fontSize: 13,
  },
  infoValue: {
    flex: 1,
    textAlign: 'left',
    color: '#222',
    fontSize: 13,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f4fa',
    borderRadius: 8,
    marginBottom: 2,
    marginTop: 2,
  },
  linkRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 6,
  },
  chevron: {
    marginLeft: 6,
  },
  // Remove old logoutBtn and logoutText
  logoutLink: {
    // old style, now replaced
  },
  logoutLinkText: {
    // old style, now replaced
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ff4d4f',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 32,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#ff4d4f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  logoutIcon: {
    marginRight: 0,
  },
});

export default Profile;
