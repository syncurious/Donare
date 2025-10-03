import React from 'react';
import BenefitsCard from '../../components/cards/VolunteerCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import heartIconFilled from '../../assets/icons/heartIconFilled.png';
import duoIconFilled from '../../assets/icons/duoIconFilled.png';
import compassIconFilled from '../../assets/icons/compassIconFilled.png';

const sadaqahBenefits = [
  {
    icon: heartIconFilled,
    title: 'Continuous Charity',
    description: 'Sadaqah provides ongoing rewards and blessings, even after death.',
  },
  {
    icon: duoIconFilled,
    title: 'Protection from Calamity',
    description: 'Acts of charity protect you from misfortune and hardship.',
  },
  {
    icon: compassIconFilled,
    title: 'Community Support',
    description: 'Strengthens bonds and uplifts the less fortunate in society.',
  },
];

const BenefitsSadaqah = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <BenefitsCard
      image={"https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
      title="Benefits of Sadaqah"
      description="Sadaqah is a voluntary act of charity that brings countless rewards and benefits to both giver and receiver."
      benefits={sadaqahBenefits}
      buttonText="Give Sadaqah"
      sectionTitle="Why Give Sadaqah?"
      onButtonPress={() => navigation.navigate('ManualAmountEntry', { donationType: 'Sadaqah' })}
    />
  );
};

export default BenefitsSadaqah; 