import React from 'react';
import BenefitsCard from '../../components/cards/VolunteerCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import heartIconFilled from '../../assets/icons/heartIconFilled.png';
import duoIconFilled from '../../assets/icons/duoIconFilled.png';
import compassIconFilled from '../../assets/icons/compassIconFilled.png';

const kaffarahBenefits = [
  {
    icon: heartIconFilled,
    title: 'Atonement for Mistakes',
    description: 'Kaffarah provides a means to seek forgiveness and atone for missed obligations.',
  },
  {
    icon: duoIconFilled,
    title: 'Restoring Balance',
    description: 'Helps restore spiritual and social balance after a mistake.',
  },
  {
    icon: compassIconFilled,
    title: 'Supporting the Needy',
    description: 'Kaffarah contributions aid those in need, turning mistakes into positive action.',
  },
];

const BenefitsKaffarah = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <BenefitsCard
      image={"https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
      title="Benefits of Kaffarah"
      description="Kaffarah is a charitable act of atonement, offering spiritual and social benefits for those seeking forgiveness."
      benefits={kaffarahBenefits}
      buttonText="Give Kaffarah"
      sectionTitle="Why Give Kaffarah?"
      onButtonPress={() => navigation.navigate('ManualAmountEntry', { donationType: 'Kaffarah' })}
    />
  );
};

export default BenefitsKaffarah; 