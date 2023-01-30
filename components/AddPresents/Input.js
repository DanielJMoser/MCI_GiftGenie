import { TextInput, View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

// Universal Input Component

function Input({ label, textInputConfig, }) {
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
    marginVertical: 8,
  },
  label: {
    color: Colors.accent500,
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary400,
    color: Colors.accent300,
    padding: 6,
    borderRadius: 10,
    fontSize: 15,
  },
});