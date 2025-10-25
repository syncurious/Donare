import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
  gameToast: ({ text1 }: any) => (
    <View style={styles.toastContainer}>
      <Text style={styles.message} numberOfLines={1}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  message: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});