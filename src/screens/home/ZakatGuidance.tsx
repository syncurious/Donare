import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../components/base/Heading';
import Text from '../../components/base/Text';
import Container from '../../components/base/Container';
import theme from '../../config/theme';

const ZakatGuidance = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container scrollable contentContainerStyle={styles.container} padding="large">
      <Heading level={2} style={styles.title}>
        Zakat Shariya Guidance
      </Heading>

      <View style={styles.section}>
        <Heading level={4} style={styles.sectionTitle}>
          1. Nisab – The Minimum Threshold
        </Heading>
        
        <Text variant="body1" style={styles.definition}>
          <Text style={styles.bold}>Definition:</Text> Nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory.
        </Text>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Sunni Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Nisab is based on the value of either gold or silver.
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Gold Nisab:</Text> 87.48 grams of gold (approx. 7.5 tola).
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Silver Nisab:</Text> 612.36 grams of silver (approx. 52.5 tola).
          </Text>
          <Text variant="body2" style={styles.content}>
            • Most Sunni scholars recommend calculating based on silver, because it makes more people eligible to pay Zakat, benefiting the poor.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat becomes obligatory if wealth is equal to or above Nisab for one full lunar year (hawl).
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Shia Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Similar Nisab values apply for gold and silver.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Shia scholars emphasize that not all types of wealth are subject to Zakat — traditionally only nine categories (gold, silver, wheat, barley, dates, raisins, camels, cows, sheep/goats).
          </Text>
          <Text variant="body2" style={styles.content}>
            • Modern Shia jurists (like Ayatollahs) have expanded Zakat applications to savings and money, but Khums (20%) is more central in Shia practice than Zakat.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Therefore, Nisab in Shia context is sometimes considered narrower in application compared to Sunni practice.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={4} style={styles.sectionTitle}>
          2. Calculating Zakat
        </Heading>
        
        <Text variant="body1" style={styles.definition}>
          <Text style={styles.bold}>Definition:</Text> Zakat is generally 2.5% (1/40th) of one's wealth above the Nisab.
        </Text>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Sunni Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat is calculated on:
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Cash, savings, gold, silver, stocks, trade goods, business income, and livestock.
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Debts owed to you are also included if they are likely to be repaid.
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Debts you owe others are deducted before calculation.
          </Text>
          <Text variant="body2" style={styles.content}>
            • <Text style={styles.bold}>Example:</Text> If someone has 500,000 PKR savings, Nisab is around 150,000 PKR → Pay 2.5% of (500,000 – 150,000) = 8,750 PKR.
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Shia Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Classical calculation applies only to the nine categories.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat on cash and business profits is generally not obligatory in the classical Shia view. Instead, Khums (20%) covers surplus income.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Modern Shia authorities sometimes allow paying Zakat on money as a recommended (mustahabb) act, but not strictly obligatory.
          </Text>
          <Text variant="body2" style={styles.content}>
            • For crops and livestock, Shia rules are stricter:
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- For example, crops watered naturally (rain, rivers) → 10% Zakat.
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Crops watered artificially (irrigation, wells) → 5% Zakat.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={4} style={styles.sectionTitle}>
          3. When to Pay Zakat
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Sunni Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat is due after one lunar year (hawl) passes while holding wealth above Nisab.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Agricultural produce Zakat is paid at the time of harvest.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Many Sunnis prefer to pay Zakat during Ramadan for extra reward, but it is valid any time after completion of hawl.
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Shia Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat on crops is due immediately at harvest.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat on livestock and gold/silver is due once one lunar year passes while above Nisab.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Shia scholars encourage paying Zakat at the proper due time, not delaying until Ramadan unless that coincides with the hawl.
          </Text>
          <Text variant="body2" style={styles.content}>
            • For surplus income and wealth, Shia Muslims mostly pay Khums at the end of the Islamic year.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Heading level={4} style={styles.sectionTitle}>
          4. How to Pay Zakat
        </Heading>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Sunni Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat must be given to the eight categories mentioned in the Qur'an (Surah At-Tawbah 9:60):
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;1. Poor (al-fuqara)
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;2. Needy (al-masakin)
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;3. Zakat collectors
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;4. Those whose hearts are to be reconciled (new Muslims, allies)
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;5. To free slaves
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;6. Those in debt
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;7. In the path of Allah (fi sabilillah – e.g., da'wah, Islamic projects, jihad)
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;8. Stranded traveler
          </Text>
          <Text variant="body2" style={styles.content}>
            • Cannot be given to wealthy individuals, direct descendants (parents, grandparents, children), or non-Muslims (except under "hearts to reconcile").
          </Text>
        </View>

        <View style={styles.subsection}>
          <Text variant="h4" style={styles.subsectionTitle}>
            Shia Perspective:
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat is paid to:
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- The needy Shia Muslims, especially those loyal to Ahl al-Bayt.
          </Text>
          <Text variant="body2" style={styles.content}>
            &nbsp;&nbsp;- Institutions or religious leaders (Marjaʿ) who distribute on behalf of the community.
          </Text>
          <Text variant="body2" style={styles.content}>
            • In practice, Shia scholars often guide followers to give Zakat locally, while Khums is paid directly to Marjaʿ or his representatives.
          </Text>
          <Text variant="body2" style={styles.content}>
            • Zakat is not given to Sayyids (descendants of the Prophet ﷺ; they receive from Khums instead).
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: theme.colors.primary[600],
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.primary[500],
  },
  definition: {
    marginBottom: 16,
    lineHeight: 22,
  },
  subsection: {
    marginBottom: 20,
    paddingLeft: 8,
  },
  subsectionTitle: {
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  content: {
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ZakatGuidance;
