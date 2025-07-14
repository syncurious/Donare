import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Container from '../../components/base/Container';
import Header from '../../components/base/Header';
import Section from '../../components/base/Section';
import CampaignCard from '../../components/cards/CampaignCard';
import ReminderCard from '../../components/cards/ReminderCard';
import NewsCard from '../../components/cards/NewsCard';
import QuickCard from '../../components/cards/QuickCard';
import Heading from '../../components/base/Heading';
import theme from '../../config/theme';

const campaigns = [
  {
    title: 'Clean Water for All',
    description: 'Help provide clean water to communities in need.',
    image: 'https://example.com/campaign1.png',
    progress: 0.7,
    buttonText: 'Donate',
    buttonAction: () => {},
  },
  {
    title: 'School Supplies Drive',
    description: 'Support children with essential school supplies.',
    image: '',
    progress: 0.4,
    buttonText: 'Donate',
    buttonAction: () => {},
  },
];

const reminders = [
  {
    title: 'Monthly Donation',
    description: 'Your monthly donation is due.',
    date: '2024-07-01',
    image: '',
    buttonText: 'Donate',
    buttonAction: () => {},
  },
];

const news = [
  {
    title: 'Donare Launches New App',
    description: 'We are excited to announce the launch of our new app!',
    image: '',
  },
  {
    title: 'Impact Report 2024',
    description: 'See how your donations made a difference this year.',
    image: '',
  },
];

const quickCards = [
  {
    title: 'Support the Needy',
    description: 'Help families in need with your Zakat.',
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDQ8NDRIPDw0NDQ4PDw0PDw8PDQ4OFhEWFhURFRUYHSggGBolGxUVIjEhJSk3LjIyFx83ODMsNygtLisBCgoKDg0OGhAQGy0dHSUtLi0tLS0tLS0rLS0wLi0vLS0tLS0tLS0tKy0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKoBKQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABBAACAwYHBQj/xABJEAABAwIEBAIGBQYKCwAAAAABAAIDBBEFEhMhBjFBUQciMmFxgaGxFCNykbNCYnN0ssIIFzM0UmOCwdHwFiQlQ1NUkpOU4/H/xAAZAQEBAQEBAQAAAAAAAAAAAAABAAIDBAX/xAApEQACAwABAwMDBAMAAAAAAAAAAQIREgMEISITQVEUMWEycYGxI0Kh/9oADAMBAAIRAxEAPwDmFlLK9lLL7lHyLMeVTKslkLKobMeVTKsllLIorMWVTKslkchte23dVDow2UyrLZCyMjoxZVMqy2QyoyOjFlQyrNlQsrI7MWVDIs2VCyMjsw5EMiz2QsjI7MGRTIs9kLIyOzBkQLVnyqZUZNbF8iGRMZUMqMjsXyKFiz5VMqMj6gvkVciZyIZUYNLkFyxUcz5j5prKqSN5e1vzQ4djS5DDkQyJjKpkRgfUFQxTImGs2CmRGTXqCoYpkTDWfM/NTIsqI+oLZVMqYyKZFYNeoe9poGNOaaBjXr2fLyJmNV004Y0DGnYUJ6aGReiaZunmzea9svXr/gsGmrZUK5VbUdlyfk3vb1rOY0NNOkFCtlLJjTQMadIqMFkLLOY0NNNkYbKWWXTQyKIxubY22Ps3CFlkyoZVEUshZZLIWVRWUsplV7KWVRWY8qGVZLKWRQ2Y8qGVZbIWVQ6MeVCyy2Qsih0Y7IZVlspZWS0Yx12G/fmPYscjdh9pvzCz5VSVuw+039oLEo9jUZdymVTKsuVZ6DB5q6eKipra1Q5zW5jYbMc83PsaUT8YuXwag9SSEGC4BHZHInqrh6oomQOqMuWrh1og038t7b9uiXyrHFLcFJG+Txk0Ltbz9p+aZgqXMjmiDYy2drGuc+NrpGhrs3kcfR3t9yxsbz+075o5VpR7BvuYciGRZ8qGROS2bOY0NNOaaqY159FkT00DGnDGhpp0FCZjVdNOmNVMadhkT00DGnNNDTTssiZjVdNOGNAxp2GRPTQMac01XTTsMiemiYDa9jY9bJoxouBsG9ByC1sMiJjQMacMaqY07DInpoaacMaGmnZZEzGqmNOaaBjTsMiemhkThjQ007ChPKhlTemhpp0VCtkLJsRE7DcqpjTpBQtZZaYsDvrAS2x2GytpoGNVojC4C5tyvssc3IfbZ+0EwY14ldXlxszZrTe/VxHX2LnzcsYR7nTig5y7HrWTmDYtLQ1UNbAxsktO9zmseSGnNG5hvb1OXmUFTqjs9vMdD6wmsqXnlhXsw8uOX5Q1iXEE9dHTNnjZGKODRjLc13tve7geq86R4aC52wCzZUYMCnr5o6alAMhzus52VtgL3XNpcHC69jom+bk7+559HVNeS3kbkgdxzTdlZ3BlbFBLWPa0Q0tUaeUh4zCVswiNh2zEI2Wel5fUi/wPUceGvyY8qmVZLIWXqo4WbrpqumndNDTXx9nuoSMaBjThjQMa1ssiZjVTGndNV007DInk6jmgY04Y0DGnYZEtNAxpzTQ007DIo5mw25de6ppp0xqpjTsMiemgY04Y0NNa2GRMxqpjThjQMadhkT00DGnNNV006KhMxoaacMaGmnQUJmNVMad01XTTssiemgY04Y0NNOwyJhhG45oFib00DGnYZE9NDTThjVdNOwyJui6LN/FzL9BpK0SMy1lRTQNGZ1wZpMjSRk/vWZ0Y6cvWt0HEdGMFwmnNRT60GJYY+WPWj1I2MqLvc5t7gAbkleLrJ/pPX0sf1Gh4vwk/C6w08jmvcaaOQFpJ2dI9trkD/h9kvprcPEbE4KzFdWllinjFDTsL4ZGyNDhNUEtu087EfeFrWmu/Rz/wqzl1Mf8AIxMxrY/DuuhpcVhmqZI4YhHMDJK9rGXLNhd2y8cxpTEMObMAHFwLb2I5b9x1XTmTnxuK9znxeM1Jm94xj1JJgeJ07J4HTzY5USxxNljMj43Ykx4c1oNyC0XuOi0AxpSlwDK4Oe6+UggN25HqSvW01jpIS40793ZvqZKbVewmY0NNOaaGmvXs81G9mNAxpwxoGNfB2fVyJaaBjThjQ007DImY0DGnDGgY07DIlpoGNOaaGmnRZEzGq6acMaGmtaDInpqpjTumqmNOgyJmNDTTmmgY06DInpqpjTumq6adhkTMaGmnDGgY07ChLTQMac00DGnZZEzGq6adMarpp2GRPTQMac00DGtbDImY1XTThjQMadlkT00DGnNNAxp2GRIxrVazhaQH6pweCd83lcP8VupjQMaJVL7jFuP2NfwfBfo93F+ZzmgEAWaP8V6ZjTZjQLOnTstJpKkZdt2xMxoaacMaGmtaM0JGNZJaYBrSCDm5jqFn00DGnRUJmNDTThjVdNOgo3zTQMad01XTXwtH1ciZjVdNOmNAxp0GRLTXn41iUVHAZ5jZo2a0elI/o1o7r29Nc58XYbfRH5h/vm6V/N+Sc4HbYA+5bg7dGXGh7g7idlXmgkAjqA6R7W/kyMLi7ynuL7j1X722nTXGuEI82JUgziP69hzE2vY3ye11sv8AaXcDGt8jywSsT01R7QBckAdybC6e014uN4rDGx8LmySTSNfGymEUhdM4tNgDaxaR1vbn12WVKyocMaGmrYZTyMpoGTG8rYY2yG97vDQHb9d+qZ007ChIxoaaGNYjFRwOnmNmjZrR6UjzyY317fArW+D+K21T3U8wEcznyPit6L2lxdk+0Ln22Wk3VhRsmmq6adMaBjVsqEjGgY05poGNOwoS00NNOmNV007LImY1Uxp3TQ007DIkY0DGnDGgY07DImY1Uxp3TVTGnQZE9NDTThjQ006DIkY0DGnNNVcy3P1fHZa2WRTTVdNOmNV007DImY0DGnNNAxp2GRIxoaacMaGmnYZE9NDTTmmhpp2GTfDGqmNOmNV018HZ9XInpoGNOaaBjTssiRjWi+L7LUEP6438KRdFMa0HxmZbDoP11n4Ui7cMvNGJx8TRvDAXxaL9HP8AhldoMa434VC+MQ/op/w3LtdU9kTHSyuayOMFz3uNmtaOpK6dRKp0Y41aF9Ncz404va2upm0r88dHNqSloa5r3+iWtJ5+QvHbzeq6T414+fVZqaizRUu4dJ6Ms4/dYe3M9ey0VdeLif3kZlL4PoXDa2KqhbPTuD438iOYPVrh0I7JfH8Uioqd88xsB5WN/KkkINmge74FcY4d4gnoJtWB3lNtSF1zHK3sR37HmFuXGuO0+I4QyaI5ZYaqPUgdbUjLmPHvae/yOyy+NqS+C1aGfEKWKrwmGrgLnxiZrg4Ws0EFpDweRBsPatN4EptXE6YEOIY8yHLzGUEgn1XtdbM+IDhFrh+XLmPt+lFv7oXkeFgvirP0M37K6RdQl+LBrujrhjQMac00DGvLs6ZEtNDTTpjVdNOgyJmNVMadMaBjWtBkSMaGmnNNDTTsMiRjQMac00DGnYZE9NV006Y0NNWyyJGNAxpwxoGNa2GRLTXnY7UNhgEj+WvTjmRzmbc+4An3L3TGtE8VJbQ08Vt3SuffMNgGkWy8983P1LUZW6CjbTGqmNHB5BLSwSgWD4YzbMHW8o2uE2Y07ChLTQ004Y0NNWyoSMaBjTumqmNa2GRPTQ004Y0NNOwyb2Y0DGnMovbqADb1G9vkUDGvg7Pq5E9NDTThjQ007DIkY1zzxtbbDYP11n4Mq6fprj3jyXtfRNzv03smcYr/AFWdpaA+39KziLn4b39HTO+VHLlVRZrPhIL4zCP6qo/CcsviZxY6sqX0kJtR07y2wP8ALSt2Lz3ANwPv6rwOEJXtxOiySPhL6unjdIx2RzWPka12/K1idjt3XnV1K6GaSGS2eKR0brG4zNNjY9Qvp4T5NP4PLrxowKKKLqYIoooojpcpB4NjsQS2XK71H6Y42PuIPvXjeEwvi8f6Gf8AYV2ziDhgxP3diFe6SLKQcjY9MEvHMXMbrexKeGVc2DFqcva92rmhAYASHPGUE3I2HMrz14T/AJOnujoHGHHMNFVQ07GmV0codVBptkjLHDIO7/MHW5bAddtuoaiOohjngcHxStDmPHUH1dD0suE+INKIsXrGgEB02oMzg4nUaH3uOhzEgdBZdj8OKPTwekFnNL2OkIc5rr53l1xbkCCDbn33XDlhGPGpI6Qbcmj2TGqmNOaaBjXm2dciemgY04Y0NNOwyJGNAxpwxpV04FQ2nI8z4HzAjo1r2tN+184t3s7stKQOJTTVTGnTGvCx3iSlop6eCeRrXzv8w56ceV1pHf0Rnyi59fYrUW32QOND5jQMac0/u+CBjVssiWmgY07pqpjTsMiZjXMvF2ma2WklHpvjlY432ysc0t29r3LrBjXKvGPOJ6VpDdMRSFhF85cXAOBHubb2lduGVyMTVI27g2kazDaQMvZ0DZDc38z/ADO+JK9cxrzuBA92FUpkDR9VZobc/VgkNJ9ey93TWJS8mSj2EjGgY1eGQl9iNj8EwGX3CtFkT01hgIeCRbZ8jNt92vLT8k1I8MLy4gNa0vcTtlaBc/AXWqeGuI/SIKkOJL21ckuUkFwZL5u3fN8VtN02Za7mxuaLgdSppqlRF9YR6wntL/N0aHJ6eG4hI/HMQpnA6UNHQlly3LcmQkgXvvnt/Y9l9kyrScBffirGG2dtR0XN5I/k2H0b/nfPuvd4t4ppcLg1qpwzuB0qdpGtM4dGjoO7uQXinxXJJL2X9HqjOk7PYyrQPFriuow2GmFK1ueolLjM4ZmtbEWOyW/OuBfsD1Nwp4Y+IsNVmo6sthqX1E8kJcRpTasrpNMHo4F5AB57ddl538ISchmHw2ble6pkvY5w5oYLX7ef4Bb4unzzKMkZny3C0dKwCvNXRU1WWaZqII5THfNlzNBsD1C5T/CBH1uH/o6n9qNdO4FlMmEYe9waCaOAWaCG2DAB8AuRePNZK7EYKeRsbY4afUhc0uL3tkdZxffYHNGbAdOu9g9NCuft7WHLK+M5kooovrHjIooooiKKKKIi9LhyuZTVtPUSBxjhmY9waAXZQd7ArzVENWqI2Pj+sjqMSkngdmiljp3MdyuNFo3HQggi3qXdOCyBhOHgkAuo4Lf9AXzQuo8B4tVvxWmpHSXpm4ZTt0rDIIhTte0gX9LO/c89z0tby9RxXxpL2O3FLy/c2DhmqqXcT4pBJK58LISRETdjQHRiMNHSweeXcroJjXOuFaln+l2KgG+eJ0Y2PpNfCHfcWldQ014OodSX7I9PGrT/AHPMrn6cTnhpcWjZrctyenpEDnbqsjIzlGYAOsMwG4DrbgFcu8c8YqWSQUTLspJItVzgba0geRlPqbZpt3d6gtk8PuJZH4MKzEXANp3StNQ43dLBG0HOQNy6929yW9SVp8TXGp/JnS04jXCvEf0uhlrqlraVkM87HFzxkDGEEEk9r5fWWnvZeHwPxRQ1FdWwxBkL6idrqclgjM8TY2syA97tc4N/PPW65FX4zNLF9GzuFK2aWZsPJpe918zrczyG/LpzK85riCCCQQbgjYg917l0q7/k4eq+x9VmNcA8U6cx4zU3zfWCKQFxBuDG0bWPLYjffZbz4XceuqXtw6vdmnIIp6g85bC+m/8AOsNndbb789U8ZxbGXfq0HyK49PGXHyuL+DfI1KFo61wtSGPDqON2bM2lhBzWJByDbYkL0zGrYTH/AKrT/q8P4YWeUZWl1r2F143O2zso9hQxoGNZ6Ylzbkbg29qJtny7cr26q0VC2muPeM896yCLK9unASHuAySBzubbHoQQb9l2oAEEjkLj7lxLxpqWuxOONpuYaRjXixGV7nvdbfn5Sw7d16uld8hy5V4m9eGsurhFMcrm6epGC61pMrz5m2PLe2/VpWyWF8txfstY8K62M4NE2/8ANvpGqTsGfWvfYn7LgfetlMYExvsA4nf2XWOR+chivFCcMfnd7HrDrZQ1g2L3EA9ScpNvuBWU1TGzNic5olmZI5sZIDnNFg4ge8fFeBxC8tr8KaHNAdUVFwRufqS3b3OcPaQtR7sGqPSqbNje93otY5zja+wBJWneD9Q0Q1MZtm1mOJtuGlthf1XB+K3fErtgmeAXFsMjg0WubNJsL7LQvCB12VbLGwdC7Nta9ni3wXWLvjl/BhryR0Coj+t97fkE/ppRzd7/AP1elpf5uVwcjpRyii8R4IcZxLFWQSEVlKI6ZjgzM2VrYwDJY7NJjubEndaFi+Kz1k76mqkdLNIblzjyHRoHINHQDZJKL6UYRj3R5XJsi97H+KJ66lo4KomSSh12tncbvkifp5Q89XDId+oI6i58FRaaT7hZ1vE/ENtHgVBQURa+rmoGtllBu2mabtIH9ZsfZzWgcWcSy4nLBPUBomhpWU7nt2EuV73CS35JOfcDbbpew8QknnvYWHqCCxHijHuvuacmyKKKLoZIooooiKKKKIiiiiiIvQocaqYJhUQSuZM2NsQkAbcRhoaG7js0D3Lz1ENWR72AcU1VLXur2ZJamYuEhmaS2QvcC4mxG5IHJduHHMsJkjxGimiMZqWuqaV7amC0OUSSEbPa0ajOY6+23zoCvXi4orWsfGZ3vZJFUwuEtpCWThol3dc3ORu9+i4c3TrkadI6w5HE2DxZxmOqrIRC5j2RQEF2RzJmyGR2aKQOsQRlvYgWzHur007ncJztGm1rMRaw2Aa+VvkeS7fzG7m+5o7LU8dxWStq5qyYMbLO/O8RghgNgNgST07pIvNg25ygkgX2BNrm3uH3Bbjx+MV8GXPu2VUUUXUwOYPUaVVTzE5RFUQyZ7E5crwc1hvtZe94l47BiGJvqaUuMOlHGHPbkLi0G5A5236rVVFlwWtDbqj6pwjEaf6LTjXguKeEEa0dwcg25rPLWROa5rHBxII8pBG4XyeovC+gV3o9H1L+D6ra4tis30i437gLz6mdsbmNecpkJDXONhmFtrnqSQvmiKZ7PQc5v2XEfJXmq5ZAGySSPANwHvc4A9wCldFX+3/C+o/B9QtJ0nDfZw36m973XE/GQ/7Ti7ihiB/7sv8AdZasziGuHo1dWPZUzD95KVtdNO/UqJJJnhobnle6R+Uchdxvbcrpw9M+OWmzHJyqSo6xwnOG8K1JNv5rXsvt6RzWvfnzATOM+IlJTzGIXqGmBjmzQOjlbqnMCx3mHKzTz6rlMGP1UdK6jZK4Urw4Ohs0tObnzF15i19OnJuXyHq0kkM1WITSzGolke6cuD9UuOcOBuCD0t0ty6LoFHj/ANLmwEueH1DJp2T3AL83ka1xAO2YX37glc2V4ZnMcHsJa4Xs5psRcW2PvXaUFIwpUdsxziuktV0kc0f0htLMWuNzCZQx31WYbF3v699lrPgyCXVouMuWnuLG+a77EHtz+C5sti4P4rfhjpiyJsuuGAhzi3LlJta32lxfBnjcY+5tclyTZ3Uxpqzu5XKm+LTutIw+yoI/cWb+OA/8kP8Ayv8A1ryfT8vx/R29SHyctUUUX1DyEUUUURFFFFERRRRREUUUURFFFFERRRRREUUUURFFFFERRRRREUUUURFFFFERRRRREUUUURFFFFERRRRREUUUURFFFFERRRRRH//Z',
  },
  {
    title: 'Give Back to the Community',
    description: 'Your Sadaqah can make a difference.',
    backgroundColor: '#FDF6E3',
  },
  {
    title: 'Volunteer Your Time',
    description: 'Join us in community service.',
    backgroundColor: '#F3F8F1',
  },
];

const quickNav = [
  { label: 'Donate', icon: '💸' },
  { label: 'Volunteer', icon: '🤝' },
  { label: 'Qibla', icon: '🧭' },
  { label: 'Profile', icon: '👤' },
];

const updates = [
  {
    title: 'Zakat Due',
    description:
      'Your Zakat is due in 30 days. Calculate and fulfill your obligation.',
    buttonText: 'Calculate',
    buttonAction: () => {},
  },
  {
    title: 'New Volunteer Opportunity',
    description:
      'Join our upcoming food drive to support local families in need.',
    buttonText: 'View',
    buttonAction: () => {},
  },
  {
    title: 'Your Donations Helped',
    description:
      'Your contributions have provided meals for 50 families this month.',
    buttonText: 'See Details',
    buttonAction: () => {},
  },
];

const dailyVerse = {
  heading: 'Daily Verse',
  verse:
    'And spend in the way of Allah and do not throw [yourselves] with your [own] hands into destruction [by refraining]. And do good; indeed, Allah loves the doers of good.',
  reference: 'Quran 2:195',
};

const Home: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dateSection}>
        <Heading level={6} color="inverse">
          1445 AH, 1st Muharram
        </Heading>
        <Heading level={6} color="inverse">
          July 7, 2024
        </Heading>
      </View>
      <Container scrollable style={styles.container}>
        {/* Quick Cards Section */}

        <View>
          <Heading level={1}>Assalamu Alaikum, Osama</Heading>
        </View>
        <Section title="" autoCarousel>
          {quickCards.map((item, idx) => (
            <CampaignCard key={idx} {...item} />
          ))}
        </Section>
        {/* Quick Navigation Section */}
        {/* <Section title="">
        
      </Section> */}
        {/* Updates Section */}
        <Section title="Updates" autoCarousel>
          {updates.map((item, idx) => (
            <ReminderCard {...item} />
          ))}
        </Section>
        {/* Daily Verse Section */}
        <Section title={dailyVerse.heading}>
          {[
            <View style={styles.dailyVerseCard} key="dailyVerseCard">
              <Text style={styles.dailyVerseText}>{dailyVerse.verse}</Text>
              <Text style={styles.dailyVerseRef}>{dailyVerse.reference}</Text>
            </View>,
          ]}
        </Section>
        {/* Existing sections (optional, can be moved below or above as needed) */}
        <Section title="Featured Campaigns" autoCarousel>
          {campaigns.map((item, idx) => (
            <CampaignCard key={idx} {...item} />
          ))}
        </Section>
        <Section title="Reminders">
          {reminders.map((item, idx) => (
            <ReminderCard key={idx} {...item} />
          ))}
        </Section>
        <Section title="Latest News" autoCarousel>
          {news.map((item, idx) => (
            <NewsCard key={idx} {...item} />
          ))}
        </Section>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  dateSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: theme.colors.primary[500],
    padding: 8,
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
