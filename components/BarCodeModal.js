import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export const BarCodeModal = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep.mp3")
    );
    await sound.playAsync();
  }
  const handleBarCodeScanned = ({ type, data }) => {
    playSound();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    props.setVisible(false);
    LookUpHandler(data);
  };

  const LookUpHandler = async (barcode) => {
    const url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (data.total < 1) {
        alert("Barcode not found in Database. Please try different article...");
        return;
      }
      const title = data.items[0].title;
      props.setDataBarCode(data.items[0]);
    } catch (error) {
      console.log("could not fetch data." + " error: " + JSON.stringify(error));
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {props.visible && (
          <TouchableOpacity
            onPress={() => props.setVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={{ color: Colors.primary400 }}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary400,
  },
  cancelButton: {
    position: "absolute",
    bottom: 100,
    right: "44%",
    backgroundColor: Colors.accent500,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});
