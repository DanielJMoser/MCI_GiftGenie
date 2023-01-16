import { Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const EventDeleteButton = ({ onPress }) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Person aus Event löschen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  srceen: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ffd9d9",
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
  },
});

export default EventDeleteButton;
