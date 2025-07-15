import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import VolunteerCard from '../../components/cards/VolunteerCard';
import { ImageSourcePropType } from 'react-native';

// Import icons from assets
import SocialIcon from '../../assets/icons/duoIcon.png';
import SkillIcon from '../../assets/icons/compassIcon.png';
import GrowthIcon from '../../assets/icons/heartIcon.png';
import VolunteerImage from '../../assets/images/get_started_illustration.png';
import { Container } from '../../components/base';

const benefits = [
  {
    icon: SocialIcon,
    title: 'Social Connection',
    description:
      'Volunteering connects you to others, helping you make new friends and expand your support network.',
  },
  {
    icon: SkillIcon,
    title: 'Skill Development',
    description:
      'Volunteering can help you learn new skills, gain experience, and even advance your career.',
  },
  {
    icon: GrowthIcon,
    title: 'Personal Growth',
    description:
      'Volunteering increases self-confidence and provides a sense of purpose by contributing to a cause you care about.',
  },
];

const Volunteer: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
      <VolunteerCard
        sectionTitle="Benefits of Volunteering"
        image={VolunteerImage as ImageSourcePropType}
        title="Make a difference"
        description="Join our volunteer program and help us make a positive impact in the community. Your time and skills can help us reach more people in need."
        benefits={benefits}
        buttonText="Apply to Volunteer"
        onButtonPress={() => {
          // Example: navigate to an application form or show a message
          navigation.navigate('Home');
        }}
      />
  );
};

export default Volunteer;
