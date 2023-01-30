import { StyleSheet, Text, View, Alert } from "react-native";
import Colors from "../constants/colors";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { version } from "../constants/version";

const clearButtonHandler = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  Alert.alert("Storage successfully cleared!");
};

const AboutUsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.textbox}>
        <Text style={styles.header}>About Us</Text>
        <Text style={styles.text}>GiftGenie is proudly brought to you by </Text>
        <FlatList
          data={[
            { key: "Ilona Sanner" },
            { key: "Clemens Frotschnig" },
            { key: "Nicolas Gadner" },
            { key: "Tobias Leiter" },
            { key: "Daniel Moser" },
            { key: "Samuel Oberhofer" },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 20, color: "white" }}>{item.key}</Text>
              </View>
            );
          }}
        />
      </View>
      {/* For Debugging: */}
      {/* <Button title="Clear Storage" onPress={clearButtonHandler} /> */}
      <View style={styles.versionText}>
        <Text style={{ fontSize: 14, color: "#888" }}>Version {version}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItem: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.primary500,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  textbox: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  versionText: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
});

export default AboutUsScreen;
