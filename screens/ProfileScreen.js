import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const ProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItem: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
