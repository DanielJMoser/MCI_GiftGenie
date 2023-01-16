import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import Colors from '../constants/colors';
import React, { useState, useContext } from "react";
import { BarCodeModal } from "../components/BarCodeModal";
import { useFocusEffect } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBarcodeScanner from '../components/AddPresents/ButtonBarcodeScanner';
import DividingLine from '../components/AddPresents/DividingLine';
import { PresentsContext } from '../store/PresentsContext';
import PresentAddForm from '../components/AddPresents/PresentAddForm';


const AddPresentModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {onPress, title = "Add Present"} = props;
    const presentCtx = useContext(PresentsContext);

    function confirmHandler(newPresentData) {
        presentCtx.addPresent(newPresentData);
        props.navigation.goBack();
    }

    const AddButtonHandler = () => {
        console.log('Save Button Pressed');
    };

    useFocusEffect(
        React.useCallback(() => {
            const tabNavigator = props.navigation.getParent();
                 tabNavigator.setOptions({
                headerRight: null,
                headerShown: true,
                 });
        }, [AddButtonHandler, SaveButton, props.navigation])
    );

    const showModal = () => {
        setModalVisible(true);
    }

    const content = (

        <ScrollView>

            <Text style={styles.text}>Scan Barcode</Text>
            <View style={styles.button}>
                <ButtonBarcodeScanner onPress={showModal}>
                </ButtonBarcodeScanner>
            </View>

            <DividingLine>
            </DividingLine>

            <Text style={styles.text}>Add Present</Text>
            <PresentAddForm onSubmit={confirmHandler}>
            </PresentAddForm>

        </ScrollView>

    );


    return (
        <View style={styles.container}>
            <BarCodeModal
                visible={modalVisible}
                style={styles.scanner}
                setVisible={setModalVisible}
            />
            {content}
        </View>
    );
}
//   return (
//     <View style={styles.container}>
//       <BarCodeModal
//         visible={modalVisible}
//         style={styles.scanner}
//         setVisible={setModalVisible}
//       />
//       <TouchableNativeFeedback onPress={onPress}>
//         {content}
//       </TouchableNativeFeedback>
//       <Button
//         title="Scan Barcode"
//         onPress={() => {
//           setModalVisible(true);
//         }}
//       />
//     </View>
//   );
// };

export default AddPresentModal;

const styles = StyleSheet.create({
    scanner: {
        flex: 1,
    },
    // button: {
    //   backgroundColor: Colors.accent500,
    //   paddingVertical: 12,
    //   paddingHorizontal: 30,
    //   borderRadius: 25,
    //   length: 200,
    //   width: 250,
    // },
    // buttonText: {
    //   color: "white",
    //   fontSize: 18,
    //   textAlign: "center",
    // },
    container: {
        flex: 1,
        backgroundColor: Colors.primary500,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    text: {
        color: Colors.accent300,
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 20,
        textAlign: 'left',
        textDecorationLine: 'underline',
        textTransform: 'capitalize',
        marginTop: 50,
        marginBottom: 20,
    },
});
