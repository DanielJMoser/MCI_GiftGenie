import {
  StyleSheet,
  Modal,
  Button,
  SafeAreaView,
  View,
  Text,
  TextInput,
} from "react-native";
import DatePicker from "react-native-datepicker";

import Colors from "../constants/colors";
import { useContext, useState } from "react";
import { EventsContext } from "../store/EventsContext";
import { Event } from "../models/Event";
import { GESCHENKE } from "../data/GeschenkData";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { PersonsContext } from "../store/PersonsContext";

//DUMMY:
// eventContext.addEvent(
//   new Event(
//     "testevent",
//     "2021-01-01",
//     "testcategory",
//     [PERSONS[0]],
//     [GESCHENKE[0]],
//     100
//   )
// );

const AddModal = ({ cancelHandler, visible, setVisible }) => {
  const [selectedPersons, setSelectedPersons] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("2022-12-24");
  const [budget, setBudget] = useState(0);
  const eventContext = useContext(EventsContext);
  const saveButtonHandler = () => {
    eventContext.addEvent(
      new Event(name, date, category, selectedPersons, selectedGifts, budget)
    );
    setVisible(false);
  };
  const personContext = useContext(PersonsContext);
  const persons = personContext.persons.map((item) => {
    return { key: item._key, value: item._name };
  });
  const gifts = GESCHENKE.map((item) => {
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
          <DatePicker
            date={date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text>Category: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(newCategory) => setCategory(newCategory)}
          />
        </View>
        {/* <View style={styles.textContainer}>
          <Text>Persons: </Text>
          <MultipleSelectList
            setSelected={setSelectedPersons}
            data={persons}
            save="id"
          />
        </View>
        <View style={styles.textContainer}>
          <Text>Gifts: </Text>
          <MultipleSelectList
            setSelected={setSelectedGifts}
            data={gifts}
            save="id"
          />
        </View> */}
        <View style={styles.textContainer}>
          <Text>Budget: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(newBudget) => setBudget(newBudget)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.button}>
          <Button title="Cancel" onPress={cancelHandler} />
          <Button title="Save" onPress={saveButtonHandler} />
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
    // marginLeft: 50,
    // alignItems: "flex-start",
    // justifyContent: "center",
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
