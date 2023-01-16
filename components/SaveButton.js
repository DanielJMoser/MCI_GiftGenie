import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Colors from "../constants/colors";

const SaveButton = (props) => {
  const { onPress, title = "Save" } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="save-outline" size={24} color={"white"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    marginRight: 10,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: Colors.primary400,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default SaveButton;
