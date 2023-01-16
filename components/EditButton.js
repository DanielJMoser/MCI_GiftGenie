import { Button, StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const EditButton = ({ onPress }) => {
  return (
    <View style={styles.button}>
      <Button title="Edit" onPress={onPress} color={Colors.primary400} />
    </View>
    // <TouchableOpacity style={styles.button} onPress={onPress}>
    //   <Ionicons name="add" size={24} color="white" />
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
  // text: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: "bold",
  //   letterSpacing: 0.25,
  //   color: "white",
  // },
});

export default EditButton;
