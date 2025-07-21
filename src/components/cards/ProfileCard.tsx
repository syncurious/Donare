import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Heading from '../base/Heading';
import Text from '../base/Text';
import Feather from 'react-native-vector-icons/Feather';

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
};

interface User {
  name: string;
  memberSince: string;
  email: string;
  phone: string;
  image?: string;
}

interface ProfileCardProps {
  user: User;
  theme: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, theme }) => {
  return (
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
          {user.image ? (
            <Image
              source={{ uri: user.image }}
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
});

export default ProfileCard; 