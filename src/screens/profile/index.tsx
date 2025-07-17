import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/base/Container';
import Section from '../../components/base/Section';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Button from '../../components/base/Button';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../config/theme';

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
};

const Profile = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const user = {
    name: 'Omar Hassan',
    memberSince: '2022',
    email: 'omar.hassan@gmail.com',
    phone: '+1(555)123-4567',
    profileImage: 'https://avatar.iran.liara.run/public/boy',
  };

  return (
    <Container
      scrollable
      padding="none"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      {/* Top Section with Avatar and Edit */}
      <View
        style={[
          styles.topBg,
          {
            backgroundColor: theme.colors.primary[50],
            borderBottomLeftRadius: theme.borderRadius['2xl'],
            borderBottomRightRadius: theme.borderRadius['2xl'],
          },
        ]}
      >
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.xl,
            },
          ]}
        >
          <View style={styles.avatarWrapper}>
            {user.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={[
                  styles.avatar,
                  { borderColor: theme.colors.primary[500] },
                ]}
              />
            ) : (
              <View
                style={[
                  styles.avatarFallback,
                  { backgroundColor: theme.colors.primary[500] },
                ]}
              >
                <Text style={styles.avatarInitials}>
                  {getInitials(user.name)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.editIconBtn,
                { backgroundColor: theme.colors.primary[500] },
              ]}
              activeOpacity={0.7}
            >
              <Feather
                name="edit-2"
                size={16}
                color={theme.colors.text.inverse}
              />
            </TouchableOpacity>
          </View>
          <Heading level={2} style={styles.name}>
            {user.name}
          </Heading>
          <Text variant="caption" color="secondary" style={styles.memberSince}>
            Member since {user.memberSince}
          </Text>
        </View>
      </View>

      {/* Personal Info Section */}
      <Container variant="card" style={styles.sectionCard}>
        <Section title="Personal Info">
          <View style={styles.infoRow}>
            <Feather
              name="mail"
              size={16}
              color={theme.colors.primary[500]}
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
              color={theme.colors.primary[500]}
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
      </Container>

      {/* Saved Causes Section */}
      <Container variant="card" style={styles.sectionCard}>
        <Section style={{ marginVertical: 0 }} title="History">
          <TouchableOpacity
            style={styles.listRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DonationHistory' as never)}
          >
            <Text variant="body2" style={styles.listRowText}>
              Donation History
            </Text>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.primary[500]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RequestHelp' as never)}
          >
            <Text variant="body2" style={styles.listRowText}>
              View Your Help Requests
            </Text>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.primary[500]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('VolunteerRecord' as never)}
          >
            <Text variant="body2" style={styles.listRowText}>
              View Your Volunteer Form
            </Text>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.primary[500]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listRow,
              { backgroundColor: theme.colors.error[50] },
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('VolunteerRecord' as never)}
          >
            <Text
              variant="h6"
              style={[styles.listRowText, { color: theme.colors.error[500] }]}
            >
              Logout
            </Text>
            <Feather name="log-out" size={20} color={theme.colors.error[500]} />
          </TouchableOpacity>
        </Section>
      </Container>

      {/* Settings Section */}
      {/* <Container variant="card" style={styles.sectionCard}>
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
      </Container> */}

      {/* Logout Button */}
      <View style={{ flex: 1 }}></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  topBg: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    marginBottom: 4,
  },
  profileCard: {
    alignItems: 'center',
    padding: 16,
    width: '90%',
    marginTop: 0,
    marginBottom: 0,
  },
  avatarWrapper: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    zIndex: 2,
  },
  avatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarInitials: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  editIconBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 12,
    padding: 4,
    zIndex: 3,
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
  },
  sectionCard: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  infoRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    minWidth: 60,
    marginRight: 0,
    fontSize: 13,
  },
  infoValue: {
    flex: 1,
    textAlign: 'left',
    fontSize: 13,
  },
  actionButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  logoutButton: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // alignSelf: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    // borderRadius: 24,
    marginVertical: 32,
    marginHorizontal: 50,
    // elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    // fontWeight: '600',
    // fontSize: 16,
    textAlign: 'center',
    // marginLeft: 8,
    // letterSpacing: 0.2,
  },
  logoutIcon: {
    marginRight: 0,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginTop: 2,
    marginBottom: 2,
  },
  listRowText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
  },
});

export default Profile;
