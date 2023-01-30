import { Button, StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const EditButton = ({ onPress }) => {
  return (
    <View style={styles.button}>
      <Button title="Edit" onPress={onPress} color={Colors.primary400} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
});

export default EditButton;
