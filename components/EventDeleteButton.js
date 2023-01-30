import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const EventDeleteButton = ({ onPress , style}) => {
  return (
    <View style={[styles.screen, style]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name="trash" size={24} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItem: "center",
    justifyContent: "center",
  },
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffd9d9",
    borderRadius: 25,
    position: "absolute",
    left: 20,
    top: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "red",
  },
});

export default EventDeleteButton;
