import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import { useNavigation } from '@react-navigation/native';
import Headline from '../../components/sections/Headline';
import { DonateOptionCard } from '../../components/cards';
import theme from '../../config/theme';

const QuickDonate: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: '#F7FAFC' }}>
      <Headline>
        <Heading level={6} color="inverse">
          What would you like to do today?
        </Heading>
      </Headline>
      <Container scrollable style={styles.container}>
        <DonateOptionCard
          title="Easy Donation"
          description="Make a quick donation to a trusted cause."
          buttonText="Start"
          image={{ uri: 'https://www.dropbox.com/scl/fi/22o4c0wipz0dzml93djol/EasyDonationImage.png?rlkey=gtsn13ctlswa6lc7c7lk5ff3v&st=w69kglrq&dl=1' }}
          onPress={() => navigation.navigate('ManualAmountEntry')}
          backgroundColor="rgba(255,255,255,0.85)"
        />
        <DonateOptionCard
          title="Charity Verification"
          description="Get help or find a charity in need."
          buttonText="Verify"
          image={{ uri: 'https://www.dropbox.com/scl/fi/c2m5ixp7ogi9ap2i9zr4w/CharityVerificationImage.png?rlkey=21t2yiyr5jvbnazdzpojgkvs5&st=rxfjs2vf&dl=1' }}
          onPress={() => navigation.navigate('RequestHelp')}
          backgroundColor="rgba(255,255,255,0.85)"
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingBottom: 100,
    paddingTop: 24,
    // paddingHorizontal: 0,
  },
  cardBg: {
    padding: 0,
    borderRadius: 16,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginBottom: 24,
    marginHorizontal: 12,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 16,
  },
});

export default QuickDonate;
