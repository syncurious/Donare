import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ReminderCard from '../../components/cards/ReminderCard';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Headline from '../../components/sections/Headline';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../config/theme';

const Donate: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const donateReminders = [
    {
      title: 'Give your Zakat',
      description:
        'Zakat is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80',
      buttonText: 'Donate Now',
      buttonAction: () => navigation.navigate('BenefitsZakat'),
    },
    {
      title: 'Give your Sadaqah',
      description:
        'Sadaqah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80',
      buttonText: 'Donate Now',
      buttonAction: () => navigation.navigate('BenefitsSadaqah'),
    },
    {
      title: 'Give your Fidyah',
      description:
        'Fidyah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80',
      buttonText: 'Donate Now',
      buttonAction: () => navigation.navigate('BenefitsFidyah'),
    },
    {
      title: 'Give your Kaffarah',
      description:
        'Kaffarah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
      buttonText: 'Donate Now',
      buttonAction: () => navigation.navigate('BenefitsKaffarah'),
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Headline>
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestHelp' as never)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Heading level={6} color="inverse">
            Need Help? Get Support with Donare
          </Heading>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.inverse}
          />
        </TouchableOpacity>
      </Headline>
      <Container scrollable style={styles.container}>
        <Heading level={1} style={styles.heading}>
          Donate
        </Heading>
        <FlatList
          data={donateReminders}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ReminderCard {...item} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  heading: {
    marginBottom: 16,
    marginLeft: 8,
  },
  cardWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Donate;