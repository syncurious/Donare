import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment-hijri';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getRandomQuranVerse } from '../../service/aladhan';
import Container from '../../components/base/Container';
import Section from '../../components/base/Section';
import CampaignCard from '../../components/cards/CampaignCard';
import ReminderCard from '../../components/cards/ReminderCard';
import Heading from '../../components/base/Heading';
import VerseCard from '../../components/cards/verseCard';
import QuickNavigation from '../../components/cards/quickNavigation';
import Headline from '../../components/sections/Headline';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const quickCards = [
  {
    title: 'Emergency Relief',
    description:
      'Support families affected by natural disasters and conflicts.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
  },
  {
    title: 'Orphan Sponsorship',
    description: 'Provide education, food, and shelter for orphaned children.',
    backgroundColor: '#E8F5E9', // soft green
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
  },
  {
    title: 'Water Wells',
    description: 'Build water wells in drought-affected communities.',
    backgroundColor: '#E3F2FD', // soft blue
    image: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=400&q=80',
  },
];

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const profileData = useSelector(
    (state: RootState) => state?.profile?.profile,
  );
  const [islamicDate, setIslamicDate] = useState('');
  const [englishDate, setEnglishDate] = useState('');
  const [dailyVerse, setDailyVerse] = useState({
    heading: 'Daily Verse',
    verse: 'Loading...',
    reference: '',
  });

  // Get user's full name from Redux, fallback to empty string
  const fullName = profileData?.user?.fullName || '';

  useEffect(() => {
    // Fetch daily verse
    const fetchVerse = async () => {
      try {
        const response = await getRandomQuranVerse('en.asad');
        setDailyVerse({
          heading: 'Daily Verse',
          verse: response.data.text,
          reference: `${response.data.surah.englishName} ${response.data.numberInSurah}`,
        });
      } catch (error) {
        console.error('Error fetching verse:', error);
        // Fallback verse if API fails
        setDailyVerse({
          heading: 'Daily Verse',
          verse:
            'And spend in the way of Allah and do not throw [yourselves] with your [own] hands into destruction [by refraining]. And do good; indeed, Allah loves the doers of good.',
          reference: 'Quran 2:195',
        });
      }
    };
    fetchVerse();

    // Get current date
    const now = moment();

    // Format Islamic date (Hijri)
    const formattedHijri = `${now.format('iYYYY')} AH, ${now.format(
      'iD',
    )} ${now.format('iMMMM')}`;

    // Format English date
    const formattedEnglish = now.format('MMMM D, YYYY');

    setIslamicDate(formattedHijri);
    setEnglishDate(formattedEnglish);
  }, []);

  const updates = [
    {
      title: 'Ramadan Campaign',
      description:
        'Support 1000 families with food packages this Ramadan. Join our campaign.',
      buttonText: 'Donate Now',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
      buttonAction: () => {
        navigation.navigate('BenefitsZakat');
      },
    },
    {
      title: 'Medical Aid Needed',
      description:
        'Help provide medical supplies and treatment for refugees in need.',
      buttonText: 'Learn More',
      image:
        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80',
      buttonAction: () => {},
    },
    {
      title: 'Impact Report',
      description:
        'Your donations helped build 3 schools and feed 500 families this month.',
      buttonText: 'View Report',
      image:
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
      buttonAction: () => {},
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Headline>
        <Heading level={6} color="inverse">
          {islamicDate}
        </Heading>
        <Heading level={6} color="inverse">
          {englishDate}
        </Heading>
      </Headline>
      <Container scrollable style={styles.container}>
        {/* Quick Cards Section */}
        <View style={styles.containerPadding}>
          <Heading level={3}>Assalamu Alaikum, {fullName}</Heading>
        </View>
        <Section title="" autoCarousel>
          {quickCards.map((item, idx) => (
            <CampaignCard style={{ width: 300 }} key={idx} {...item} />
          ))}
        </Section>

        {/* Quick Navigation Section */}
        <QuickNavigation />
        {/* Updates Section */}
        <Section title="Updates" autoCarousel>
          {updates.map((item, idx) => (
            <ReminderCard {...item} />
          ))}
        </Section>
        {/* Daily Verse Section */}
        <Section title="Daily Verse">
          <VerseCard {...dailyVerse} />
        </Section>
        <View style={{ height: 50 }} />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  containerPadding: {
    paddingHorizontal: 12,
  },

  quickNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
  },
  quickNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3FAFF',
    borderRadius: 32,
    width: 64,
    height: 64,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  quickNavIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  quickNavLabel: {
    fontSize: 12,
    color: '#61758A',
    fontWeight: '500',
  },
  sectionHeadingWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#121417',
  },
  updateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minWidth: 220,
    maxWidth: 260,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between',
  },
  updateTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#121417',
    marginBottom: 4,
  },
  updateDescription: {
    color: '#637587',
    fontSize: 14,
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: '#58BAFF',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  dailyVerseCard: {
    backgroundColor: '#F3F8F1',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  dailyVerseText: {
    fontSize: 15,
    color: '#121417',
    fontWeight: '500',
    marginBottom: 8,
  },
  dailyVerseRef: {
    fontSize: 13,
    color: '#61758A',
    fontWeight: '400',
    textAlign: 'right',
  },
});

export default Home;
