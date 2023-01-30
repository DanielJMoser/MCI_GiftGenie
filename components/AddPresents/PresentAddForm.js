import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Input from "./Input";
import { Present } from "../../models/Present";

import React, {useContext, useEffect,} from 'react';
import DropdownMenuPresentAssignment from "../PresentDropdownMenu";
import PickerInputField from "../PickerInputField";
import Colors from "../../constants/colors";
import ProgressiveImage from "../ProgressiveImage";
import pickImage from "../ImagePicker";
import takePicture from "../TakePicture";
import {GiftAssignment} from "../../models/GiftAssignment";
import {AssignmentContext} from "../../store/AssignmentContext";


const defaultImage = '../../assets/present.png';


// PresentAddForm Component
// makes use of the Universal Input Component (Input.js)

function PresentAddForm(props) {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [barcode, setBarcode] = React.useState(null);
    const options = ["Not Bought", "Bought"];
    const [status, setStatus] = React.useState(options[0]);
    const [category, setCategory] = React.useState('');
    const [storename, setStorename] = React.useState('');
    const [link, setLink] = React.useState('');

    const [selectedPerson, setSelectedPerson] = React.useState(null);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const assignmentContext = useContext(AssignmentContext);

  useEffect(() => {
    if (props.dataBarCode !== null) {
      if (typeof props.dataBarCode.title === "string") {
        setName(props.dataBarCode.title);
      }
      if (typeof props.dataBarCode.offers[0]?.price === "number") {
        setPrice(props.dataBarCode.offers[0].price.toString());
      }
      if (typeof props.dataBarCode.category === "string") {
        setCategory(props.dataBarCode.category);
      }
      if (typeof props.dataBarCode.offers[0]?.domain === "string") {
        setStorename(props.dataBarCode.offers[0].domain);
      }
      if (typeof props.dataBarCode.offers[0]?.link === "string") {
        setLink(props.dataBarCode.offers[0].link);
      }
      if (typeof props.dataBarCode.images[0] === "string") {
        props.dataBarCode.images.forEach((img) => {
          Image.getSize(
            img,
            () => {
              if (!image) {
                setImage(img);
              }
            },
            () => {
              console.log("Image not found");
            }
          );
        });
      }
      if (typeof props.dataBarCode.ean === "string") {
        setBarcode(props.dataBarCode.ean);
      }
    }
  }, [props.dataBarCode]);

  useEffect(() => {
    if (props.onSubmitButton) {
      submitHandler();
    }
  }, [props.onSubmitButton]);
  function submitHandler() {
    if (!name || name.trim().length === 0) {
      alert("Invalid Name");
      return;
    }
    // name, price, category, image, storename, link, barcode, status, key
    const newPresentData = new Present(
      name,
      price,
      category,
      image,
      storename,
      link,
      barcode,
      status
    );
    if (selectedPerson && selectedPerson !== "0") {
        const assignment = new GiftAssignment(
            newPresentData._key,
            selectedPerson,
            ""
        );
        assignmentContext.addAssignment(assignment);
    }

    props.onSubmit(newPresentData);
  }

  const imageHandler = () => {
    Alert.alert("Change Image", "How do you want to add a new image?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      { text: "From Gallery", onPress: () => pickImage(setImage) },
      { text: "Take a Picture", onPress: () => takePicture(setImage) },
    ]);
  };
  return (
    <View style={styles.container}>
      {/* Asking user for the new present's name */}
      <Input
        label="name"
        textInputConfig={{
          onChangeText: setName,
          value: name,
          keyboardType: "default",
        }}
      />
      <Text style={styles.label}>image</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => imageHandler()}
        onLongPress={() => {}}
      >
        <ProgressiveImage
          style={styles.image}
          uri={image}
          defaultSource={require(defaultImage)}
          resizeMode={"contain"}
        />
      </TouchableOpacity>

      {/* Asking user for the new present's price */}
      <Input
        label="price"
        textInputConfig={{
          onChangeText: setPrice,
          keyboardType: "decimal-pad",
          value: price,
        }}
      />

      <Input
        label="category"
        textInputConfig={{
          onChangeText: setCategory,
          keyboardType: "default",
          value: category,
        }}
      />

      <Input
        label="store"
        textInputConfig={{
          onChangeText: setStorename,
          keyboardType: "default",
          value: storename,
        }}
      />

      <Input
        label="link"
        textInputConfig={{
          onChangeText: setLink,
          keyboardType: "default",
          value: link,
        }}
      />
        <PickerInputField
            label="Status "
            selectedValue={status}
            onValueChange={(itemValue) => {
                setStatus(itemValue)
            }}
            arrayOfValues = {options}
            labelConfig={styles.labelConfig}
            textConfig={styles.textConfig}
            containerConfig={styles.containerConfig}
        ></PickerInputField>
        <Text style={styles.label}>Buy for</Text>
            <DropdownMenuPresentAssignment
                selectedPerson={selectedPerson}
                selectedEvent={selectedEvent}
                setSelectedPerson={setSelectedPerson}
                setSelectedEvent={setSelectedEvent}
            />

        </View>
        );
    }
        
/*
present.name,
      present.price,
      present.category,
      present.image,
      present.storename,
      present.link,
      present.barcode,
      present.status,
      present.key
*/

export default PresentAddForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 40,
    marginTop: 20,
  },
  Text: {
    color: "white",
    fontSize: 20,
  },
  SaveButtonStyle: {
    marginVertical: 25,
  },
  label: {
    color: Colors.accent500,
    fontSize: 16,
    marginBottom: 4,
  },
  imageContainer: {
    width: "50%",
    height: 200,
    backgroundColor: Colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  labelConfig: {
      color: Colors.accent500,
      fontSize: 16,
      marginBottom: 4,
  },
  textConfig: {
      color: Colors.accent300,
      fontSize: 18,
  },
  containerConfig : {
      borderRadius: 10
  }
});
