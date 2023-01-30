import {
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  Button,
} from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import Colors from "../constants/colors";

import GiftCard from "./GiftCard";
import EventDeleteButton from "./EventDeleteButton";
import {useContext, useEffect, useState} from "react";
import { PersonsContext } from "../store/PersonsContext";
import { Picker } from "@react-native-picker/picker";
import { AssignmentContext } from "../store/AssignmentContext";
import { GiftAssignment } from "../models/GiftAssignment";
import { useNavigation } from "@react-navigation/native";
import { EventsContext } from "../store/EventsContext";
import { PresentsContext } from "../store/PresentsContext";

const defaultImage = "../assets/default-person-image.png";

const renderGiftCards = (person, eventID, isEditing, assignments) => {
  let gifts = assignments.filter((assignment) => {
    return assignment._person === person && assignment._event === eventID;
  });

  return gifts.map((item) => (
    <GiftCard
      key={item._key}
      giftID={item._gift}
      personID={person}
      eventID={eventID}
      isEditing={isEditing}
    />
  ));
};

const PersonScrollCardItem = ({
  item,
  eventID,
  isEditing,
  personDeleteHandler,
}) => {
  const events = useContext(EventsContext).events;
  const assignmentContext = useContext(AssignmentContext);
  const assignments = assignmentContext.assignments;
  const personsContext = useContext(PersonsContext);
  const persons = personsContext.persons;
  const presentsContext = useContext(PresentsContext);
  const presents = presentsContext.presents;
  const budget = events.find((event) => event._key === eventID)._budget;
  let budgetUsed = 0;
  const assignedGiftIDs = assignments
    .filter((assignment) => {
      return assignment._event === eventID;
    })
    .map((assignment) => assignment._gift);
  assignedGiftIDs.forEach((id) => {
    const presentPrice = presents.find(
      (present) => present._key === id
    )?._price;
    if (!isNaN(presentPrice)) {
      budgetUsed += presentPrice;
    }
  });
  const nav = useNavigation();
  const personsInEvent = assignments
    .filter((assignment) => {
      return assignment._event === eventID;
    })
    .map((assignment) => {
      return persons.find((person) => person._key === assignment._person);
    });
  const personsAddable = persons.filter(
    (person) => !personsInEvent.includes(person)
  );
  const presentsAssignedToPerson = assignments
    .filter((assignment) => {
      return assignment._event === eventID && assignment._person === item;
    })
    .map((assignment) => {
      return assignment._gift;
    });
  const presentsAddable = presents.filter(
    (present) => !presentsAssignedToPerson.includes(present._key)
  );
  const [userToAdd, setUserToAdd] = useState(personsAddable[0]?._key);
  const { width } = useWindowDimensions();
  const [presentToAdd, setPresentToAdd] = useState(presentsAddable[0]?._key);
  let person = "";
  if (item._key === "0") {
    person = item;
  } else {
    person = persons.find((person) => {
      return person._key === item;
    });
  }
  const [needToReset, setNeedToReset] = useState(false);
  useEffect(() => {
    if (needToReset){
      setPresentToAdd(presentsAddable[0]?._key);
      setNeedToReset(false);
    }
    
  }, [presentsAddable]);

  const addUser = () => {
    const assignment = new GiftAssignment("", userToAdd, eventID);
    assignmentContext.addAssignment(assignment);
  };
  const assignPresent = () => {
    const assignment = new GiftAssignment(presentToAdd, item, eventID);
    assignmentContext.addAssignment(assignment);
    setNeedToReset(true);
  };
  const AddPersontoEvent = () => {
    if (item._key === "0" && personsAddable.length > 0) {
      return (
        <View>
          <Picker
            itemStyle={styles.picker}
            dropdownIconColor={Colors.accent500}
            dropdownIconRippleColor={Colors.accent300}
            selectedValue={userToAdd}
            mode={"dropdown"}
            onValueChange={(itemValue) => setUserToAdd(itemValue)}
          >
            {personsAddable.map((item, index) => {
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
    <View style={[styles.screen, {width}]}>
      {isEditing && (
        <EventDeleteButton onPress={personDeleteHandler} style={styles.personDeleteButton}/>)}
      <ProgressiveImage
        style={[styles.image, { width: width * 0.65}]}
        uri={person._image}
        defaultSource={require(defaultImage)}
        resizeMode={"contain"}
      />
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetText1}>Budget:</Text>
        <Text style={styles.budgetText2}>
          {budgetUsed}€/{budget}€
        </Text>
      </View>
      <Text style={styles.infoText}> {person._name}</Text>
      {renderGiftCards(item, eventID, isEditing, assignments)}
      {isEditing && item._key !== "0" && presentsAddable.length > 0 && (
        <View style={styles.bottomContainer}>
          <Picker
            itemStyle={styles.presentPicker}
            dropdownIconColor={Colors.accent500}
            dropdownIconRippleColor={Colors.accent300}
            selectedValue={presentToAdd}
            mode={"dropdown"}
            onValueChange={(present) => setPresentToAdd(present)}
          >
            {presentsAddable.map((item, index) => {
              return (
                <Picker.Item
                  label={item._name}
                  value={item._key}
                  key={item._key}
                />
              );
            })}
          </Picker>
          <Button
            title="Add Present"
            onPress={assignPresent}
            color={Colors.accent300}
          />
        </View>
      )}
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
  screen: {
    alignItem: "center",
  },
  image: {
    height: 200,
    alignSelf: "center",
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
  presentPicker: {
    height: 150,
    color: "white",
    padding: 6,
    fontsize: 18,
  },
  budgetContainer: {
    position: "absolute",
    top: 15,
    left: "73%",
    width: "27%",
  },
  budgetText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  budgetText2: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default PersonScrollCardItem;
