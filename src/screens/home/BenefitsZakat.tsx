import React from 'react';
import BenefitsCard from '../../components/cards/VolunteerCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import heartIcon from '../../assets/icons/heartIcon.png';
import duoIcon from '../../assets/icons/duoIcon.png';
import compassIcon from '../../assets/icons/compassIcon.png';

const zakatBenefits = [
  {
    icon: heartIcon,
    title: 'Purification of Wealth',
    description: 'Zakat purifies your wealth and soul, fostering generosity and empathy.',
  },
  {
    icon: duoIcon,
    title: 'Social Welfare',
    description: 'Helps reduce poverty and supports those in need within the community.',
  },
  {
    icon: compassIcon,
    title: 'Spiritual Growth',
    description: 'Fulfilling a key pillar of Islam, bringing you closer to Allah.',
  },
];

const BenefitsZakat = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <BenefitsCard
      image={"https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
      title="Benefits of Zakat"
      description="Zakat is a fundamental pillar of Islam, offering numerous benefits to both the giver and the receiver."
      benefits={zakatBenefits}
      buttonText="Donate Zakat"
      sectionTitle="Why Give Zakat?"
      onButtonPress={() => navigation.navigate("ZakatHomeAssets")}
    />
  );
};

export default BenefitsZakat; 