import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Text from '../../base/Text';
import theme from '../../../config/theme';

const SkipButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.skipRow}>
      <TouchableOpacity style={styles.skipButton} onPress={onPress}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  skipRow: {
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: "#fff",
  },
  skipButton: {
    padding: 4,
  },
  skipText: {
    color: theme.colors.primary[600],
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.7,
  },
});

export default SkipButton;
