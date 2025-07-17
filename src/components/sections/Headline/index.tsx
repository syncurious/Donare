import { View, StyleSheet } from 'react-native';
import theme from '../../../config/theme';

const Headline = ({children} : {children : React.ReactNode}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default Headline;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: theme.colors.primary[500],
    padding: 8,
  },
});
