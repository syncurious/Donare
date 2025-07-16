import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Container from '../../components/base/Container';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import { Modal } from '../../components/base';
import { FoodCard } from '../../components/cards';
import { useTheme } from '../../config/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const foodOptions = [
  {
    label: 'Rice',
    value: 'rice',
    rate: 300,
    description: 'High-quality rice',
    image: require('../../assets/icons/duoIcon.png'),
  },
  {
    label: 'Grains',
    value: 'grains',
    rate: 200,
    description: 'Assorted grains',
    image: require('../../assets/icons/heartIcon.png'),
  },
  {
    label: 'Beans',
    value: 'beans',
    rate: 250,
    description: 'Various types of beans',
    image: require('../../assets/icons/compassIcon.png'),
  },
];

const FidyahCalculator: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [days, setDays] = useState('');
  const [selectedFood, setSelectedFood] = useState<
    (typeof foodOptions)[0] | null
  >(null);
  const [customRate, setCustomRate] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSkip = () => {
    navigation.navigate('ManualAmountEntry', { donationType: 'Fidyah' });
  };

  const handleFoodSelect = () => setModalVisible(true);

  const handleFoodCardPress = (food: (typeof foodOptions)[0]) => {
    setSelectedFood(food);
    setCustomRate(food.rate.toString());
  };

  const handleContinueModal = () => {
    setModalVisible(false);
  };

  const handleValuePerMealChange = (text: string) => {
    setCustomRate(text);
    setError(undefined);
  };

  const handleProceed = () => {
    if (!days || isNaN(Number(days)) || Number(days) <= 0) {
      setError('Please enter valid days');
      return;
    }
    if (!customRate || isNaN(Number(customRate)) || Number(customRate) <= 0) {
      setError('Please enter a valid value per meal');
      return;
    }
    setError(undefined);
    navigation.navigate('PaymentConfirmation', {
      donationType: 'Fidyah',
      amount: Number(days) * Number(customRate),
      paymentMethod: '',
    });
  };

  const calculatedAmount =
    customRate && days && !isNaN(Number(days)) && !isNaN(Number(customRate))
      ? `PKR ${(Number(days) * Number(customRate)).toLocaleString()}`
      : 'PKR 0.00';

  return (
    <Container
      scrollable
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        paddingHorizontal: 0,
      }}
    >
      {/* Food Select Modal */}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Heading level={3} style={styles.modalTitle}>
            Fidyah Goods
          </Heading>
          <Paragraph
            variant="body1"
            color="secondary"
            style={styles.modalDescription}
          >
            Select the goods you would like to donate for Fidyah.
          </Paragraph>
          <FlatList
            data={foodOptions}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <FoodCard
                label={item.label}
                description={item.description}
                image={item.image}
                selected={selectedFood?.value === item.value}
                onPress={() => handleFoodCardPress(item)}
                style={styles.foodCard}
              />
            )}
            style={{ width: 320, marginVertical: 8 }}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
          <Button
            onPress={handleContinueModal}
            variant="contained"
            size="medium"
            color="primary"
            style={styles.modalContinueButton}
          >
            Continue
          </Button>
        </View>
      </Modal>
      {/* Skip Row */}
      <View style={styles.skipRow}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Paragraph variant="body1" color="primary" style={styles.skipText}>
            Skip
          </Paragraph>
        </TouchableOpacity>
      </View>
      {/* Title & Description */}
      <View style={styles.headerSection}>
        <Heading level={2} style={styles.heading}>
          Calculate Fidyah
        </Heading>
        <Paragraph variant="h5" color="primary" style={styles.subheading}>
          Fidyah Calculation
        </Paragraph>
        <Paragraph variant="body1" color="secondary" style={styles.description}>
          Fidyah is a religious donation made to help those in need when one is
          unable to fast during Ramadan due to valid reasons. It is calculated
          based on the number of days missed and the current value of a meal.
        </Paragraph>
      </View>
      {/* Days Missed Input */}
      <View style={styles.inputRow}>
        <Input
          label="Days Missed"
          placeholder="Enter number of days missed"
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
          variant="outlined"
          size="large"
          style={styles.input}
        />
      </View>
      {/* Food Select Input */}
      <View style={styles.inputRow}>
        <TouchableOpacity onPress={handleFoodSelect} activeOpacity={1}>
          <Input
            label="Select Food Item"
            value={selectedFood?.label}
            placeholder="Select food item"
            editable={false}
            variant="outlined"
            size="large"
            style={styles.input}
          />
        </TouchableOpacity>
      </View>
      {/* Value Per Meal Input (Editable) */}
      <View style={styles.inputRow}>
        <Input
          label="Value Per Meal"
          value={customRate}
          placeholder="Enter value per meal"
          onChangeText={handleValuePerMealChange}
          keyboardType="numeric"
          variant="outlined"
          size="large"
          style={styles.input}
        />
      </View>
      {error && (
        <Paragraph
          variant="caption"
          color="error"
          style={{ marginTop: 8, marginHorizontal: 16 }}
        >
          {error}
        </Paragraph>
      )}
      {/* Total Amount */}
      <View style={styles.amountSection}>
        <Paragraph variant="h5" color="primary" style={styles.amountLabel}>
          Calculated Amount
        </Paragraph>
        <Paragraph variant="body1" color="primary" style={styles.amountValue}>
          {calculatedAmount}
        </Paragraph>
      </View>
      {/* Proceed Button */}
      <View style={styles.buttonSection}>
        <Button
          onPress={handleProceed}
          variant="contained"
          size="medium"
          color="primary"
          style={styles.proceedButton}
        >
          Proceed to Payment
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  skipRow: {
    alignItems: 'flex-end',
    padding: 16,
  },
  skipButton: {
    padding: 4,
  },
  skipText: {
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.7,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  heading: {
    marginBottom: 8,
    fontWeight: '700',
  },
  subheading: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
  },
  inputRow: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    borderRadius: 12,
    backgroundColor: '#F2F2F5',
  },
  amountSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  amountLabel: {
    fontWeight: '700',
    marginBottom: 4,
  },
  amountValue: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonSection: {
    marginTop: 'auto',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  proceedButton: {
    borderRadius: 24,
  },
  modalContent: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  modalTitle: {
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalDescription: {
    textAlign: 'center',
    marginBottom: 16,
  },
  foodCard: {
    marginBottom: 8,
  },
  modalContinueButton: {
    borderRadius: 24,
    marginTop: 8,
    width: '100%',
  },
});

export default FidyahCalculator;
