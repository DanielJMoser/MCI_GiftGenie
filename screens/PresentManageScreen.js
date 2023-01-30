import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import Colors from "../constants/colors";
import React, { useState, useContext } from "react";
import { BarCodeModal } from "../components/BarCodeModal";
import { useFocusEffect } from "@react-navigation/native";
import SaveButton from "../components/SaveButton";
import { ScrollView } from "react-native-gesture-handler";
import ButtonBarcodeScanner from "../components/AddPresents/ButtonBarcodeScanner";
import DividingLine from "../components/AddPresents/DividingLine";
import { PresentsContext } from "../store/PresentsContext";
import PresentAddForm from "../components/AddPresents/PresentAddForm";

const AddPresentModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { onPress, title = "Add Present" } = props;
  const [dataBarCode, setDataBarCode] = useState(null);

  const presentCtx = useContext(PresentsContext);

  function confirmHandler(newPresentData) {
    presentCtx.addPresent(newPresentData);
    props.navigation.goBack();
  }
  const [save, setSave] = useState(0);

  const SaveButtonHandler = () => {
    setSave(save + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      const tabNavigator = props.navigation.getParent();
      tabNavigator.setOptions({
        headerRight: () => <SaveButton onPress={SaveButtonHandler} />,
        headerShown: true,
      });
    }, [SaveButtonHandler, SaveButton, props.navigation])
  );

  const showModal = () => {
    setModalVisible(true);
  };

  const content = (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      behavior={Platform.OS === "ios" ? "position" : "height"}
    >
      <ScrollView>
        <Text style={styles.text}>Scan Barcode</Text>
        <View style={styles.button}>
          <ButtonBarcodeScanner onPress={showModal}></ButtonBarcodeScanner>
        </View>

        <DividingLine></DividingLine>

        <Text style={styles.text}>Add Present</Text>

        <PresentAddForm
          dataBarCode={dataBarCode}
          onSubmit={confirmHandler}
          onSubmitButton={save}
        ></PresentAddForm>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <BarCodeModal
        visible={modalVisible}
        style={styles.scanner}
        setVisible={setModalVisible}
        setDataBarCode={setDataBarCode}
      />
      {content}
    </View>
  );
};

export default AddPresentModal;

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  text: {
    color: Colors.accent300,
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 20,
    textAlign: "left",
    textDecorationLine: "underline",
    textTransform: "capitalize",
    marginTop: 50,
    marginBottom: 20,
  },
});
