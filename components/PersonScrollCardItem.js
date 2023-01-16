import {
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  Button,
} from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import { GIFTASSIGNMENTS } from "../data/GiftAssignmentData";
import Colors from "../constants/colors";

import GiftCard from "./GiftCard";
import { useContext, useState } from "react";
import { PersonsContext } from "../store/PersonsContext";
import { Picker } from "@react-native-picker/picker";
import { AssignmentContext } from "../store/AssignmentContext";
import { GiftAssignment } from "../models/GiftAssignment";
import { useNavigation } from "@react-navigation/native";

const defaultImage = "../assets/default-person-image.png";

const renderGiftCards = (item, eventID, isEditing, assignments) => {
  let gifts = assignments.filter((assignment) => {
    return assignment._person === item && assignment._event === eventID;
  });
  return gifts.map((item) => (
    <GiftCard key={item._key} giftID={item._gift} isEditing={isEditing} />
  ));
};

const PersonScrollCardItem = ({ item, eventID, isEditing }) => {
  const nav = useNavigation();
  const assignmentContext = useContext(AssignmentContext);
  const assignments = assignmentContext.assignments;
  const personsContext = useContext(PersonsContext);
  const persons = personsContext.persons;
  // console.log("eventid: " + eventID);
  // const personsInEvent = assignmentContext.assignments
  //   .filter((assignment) => {
  //     console.log("assignmenteventid: " + assignment._event);
  //     return assignment._event === eventID;
  //   })
  //   .map((assignment) => {
  //     assignment._person;
  //   });

  // console.log(personsInEvent);
  // const persons = personsContext.persons;
  // const notAddedUsers = persons.filter((person) => {
  //   personsInEvent.includes(person._key);
  //   // person._key !== item._key;
  // });
  const [userToAdd, setUserToAdd] = useState(persons[0]._key);
  const { width } = useWindowDimensions();
  let person = "";
  if (item._key === "0") {
    person = item;
  } else {
    person = persons.find((person) => {
      return person._key === item;
    });
  }

  const addUser = () => {
    const assignment = new GiftAssignment("", userToAdd, eventID);
    assignmentContext.addAssignment(assignment);
    nav.goBack();
  };
  const AddPersontoEvent = () => {
    if (item._key === "0") {
      return (
        <View>
          {/* // {(label, selectedValue, onValueChange, isInvalid, arrayOfValues)} */}
          <Picker
            // style={styles.picker}
            itemStyle={styles.picker}
            dropdownIconColor={Colors.accent500}
            dropdownIconRippleColor={Colors.accent300}
            selectedValue={userToAdd}
            mode={"dropdown"}
            onValueChange={(itemValue) => setUserToAdd(itemValue)}
          >
            {persons.map((item, index) => {
              return (
                <Picker.Item
                  label={item._name}
                  value={item._key}
                  key={item._key}
                />
              );
            })}
          </Picker>
          <Button title="Add" onPress={addUser} color={Colors.accent300} />
        </View>
      );
    }
  };

  return (
    <View style={styles.screen}>
      <ProgressiveImage
        style={[styles.image, { width, resizeMode: "contain" }]}
        uri={person._image}
        defaultSource={require(defaultImage)}
        resizeMode={"contain"}
      />
      <Text style={styles.infoText}> {person._name}</Text>
      {renderGiftCards(item, eventID, isEditing, assignments)}
      {AddPersontoEvent(
        item,
        persons,
        userToAdd,
        setUserToAdd,
        eventID,
        addUser
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  srceen: {
    alignItem: "center",
    justifyContent: "center",
  },
  image: {
    height: 250,
  },
  infoText: {
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  picker: {
    color: "white",
    padding: 6,
    fontsize: 18,
  },
});

export default PersonScrollCardItem;
