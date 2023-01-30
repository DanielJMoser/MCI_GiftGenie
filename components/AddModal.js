import {
  StyleSheet,
  Modal,
  Button,
  View,
  Text,
  TextInput,
} from "react-native";

import Colors from "../constants/colors";
import { useContext, useState } from "react";
import { EventsContext } from "../store/EventsContext";
import { Event } from "../models/Event";
import { PersonsContext } from "../store/PersonsContext";
import { PresentsContext} from "../store/PresentsContext";

const AddModal = ({ cancelHandler, visible, setVisible }) => {
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [budget, setBudget] = useState(0);
  const eventContext = useContext(EventsContext);
  const presentsCtx = useContext(PresentsContext);
  const saveButtonHandler = () => {
    if (new Date(date).toString() === "Invalid Date") {
      alert("Invalid Date");
      return;
    }
    if (name.trim().length === 0) {
      alert("Invalid Name");
      return;
    }
    if (category.trim().length === 0) {
      alert("Invalid Category");
      return;
    }
    if (budget < 0 || isNaN(budget)) {
      alert("Invalid Budget");
      return;
    }
    eventContext.addEvent(
      new Event(name, date, category, selectedPersons, selectedGifts, budget)
    );
    setVisible(false);
  };
  const personContext = useContext(PersonsContext);
  const persons = personContext.persons.map((item) => {
    return { key: item._key, value: item._name };
  });
  const gifts = presentsCtx.presents.map((item) => {
    return { key: item._key, value: item._name };
  });
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>Name: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(newName) => setName(newName)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>Date: </Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={(newDate) => setDate(newDate)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>Category: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(newCategory) => setCategory(newCategory)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>Budget: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(newBudget) => setBudget(newBudget)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" color={Colors.primary400} onPress={cancelHandler} />
          <Button title="Save" color={Colors.primary400} onPress={saveButtonHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 50,
    backgroundColor: Colors.accent300,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 200,
  },
  textContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  button: {
    alignItems: "center",
  },
});

export default AddModal;
