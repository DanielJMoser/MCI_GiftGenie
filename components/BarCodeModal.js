import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Modal } from "react-native";
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
    //setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
      console.log(data.items);
      const result = data.items[0].title;
      alert(result);
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

        {/* {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )} */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 50,
    // marginLeft: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: Colors.primary400,
  },
});
