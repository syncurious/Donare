import React from 'react';
import BenefitsCard from '../../components/cards/VolunteerCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import NamazIcon from '../../assets/icons/NamazIcon.png';
import heartIcon from '../../assets/icons/heartIcon.png';
import duoIcon from '../../assets/icons/duoIcon.png';

const fidyahBenefits = [
  {
    icon: NamazIcon,
    title: 'Compensation for Missed Fasts',
    description: 'Fidyah allows those unable to fast to fulfill their religious obligations.',
  },
  {
    icon: heartIcon,
    title: 'Helping the Needy',
    description: 'Provides food and support to those in need, fostering compassion.',
  },
  {
    icon: duoIcon,
    title: 'Spiritual Fulfillment',
    description: 'Ensures you remain spiritually connected even when unable to fast.',
  },
];

const BenefitsFidyah = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <BenefitsCard
      image={"https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
      title="Benefits of Fidyah"
      description="Fidyah is a charitable compensation for missed fasts, offering both spiritual and social benefits."
      benefits={fidyahBenefits}
      buttonText="Give Fidyah"
      sectionTitle="Why Give Fidyah?"
      onButtonPress={() => navigation.navigate('FidyahCalculator')}
    />
  );
};

export default BenefitsFidyah; 