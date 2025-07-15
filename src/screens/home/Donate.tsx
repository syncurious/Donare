import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ReminderCard from '../../components/cards/ReminderCard';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';

const donateReminders = [
  {
    title: 'Give your Zakat',
    description: 'Zakat is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    buttonText: 'Donate Now',
    buttonAction: () => {},
  },
  {
    title: 'Give your Sadaqah',
    description: 'Sadaqah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    buttonText: 'Donate Now',
    buttonAction: () => {},
  },
  {
    title: 'Give your Fidyah',
    description: 'Fidyah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    buttonText: 'Donate Now',
    buttonAction: () => {},
  },
  {
    title: 'Give your Kaffarah',
    description: 'Kaffarah is a religious obligation for Muslims to give a portion of their wealth to the poor and needy.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    buttonText: 'Donate Now',
    buttonAction: () => {},
  },
];

const Donate: React.FC = () => {
  return (
    <Container scrollable style={styles.container}>
      <Heading level={1} style={styles.heading}>Donate</Heading>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal : 8
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