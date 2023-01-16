import { TextInput, View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

// Universal Input Component

function Input({ label, textInputConfig }) {
  return (
    <View style={styles.inputContainer}>

      <Text style={ styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />

    </View>
  );
}

export default Input;

const styles = StyleSheet.create({

  inputContainer: {
    marginHorizonral: 4,
    marginVertical: 8,
  },
  label: {
    color: Colors.accent500,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary400,
    color: Colors.accent300,
    padding: 6,
    borderRadius: 10,
    fontSize: 10,
  },
});