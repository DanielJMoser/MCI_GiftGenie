import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const DividingLine = () => <View style={styles.line} />;

const styles = StyleSheet.create({
  line: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary400,
    width: '60%',
    padding: 10,
  },
});

export default DividingLine;