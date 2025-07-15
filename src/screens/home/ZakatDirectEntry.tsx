import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserStackParamList } from '../../config/navigation/UserNavigation';
import { useNavigation } from '@react-navigation/native';

const ZakatDirectEntry = () => {
  const [zakatAmount, setZakatAmount] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<UserStackParamList, 'ZakatDirectEntry'>>();

  const handleProceed = () => {
    // Proceed to donation or next step
    // navigation.navigate('NextScreen', { zakatAmount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Zakat Amount Directly</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter zakat amount"
        keyboardType="numeric"
        value={zakatAmount}
        onChangeText={setZakatAmount}
      />
      <Button title="Proceed" onPress={handleProceed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 24 },
});

export default ZakatDirectEntry; 