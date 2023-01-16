import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function GiftScreen() {
  return (
    <View style={styles.container}>
      <Text>Test!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default GiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
