import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
  },
});

export { styles };
