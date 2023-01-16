import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import EventDeleteButton from "./EventDeleteButton";
import Paginator from "./Paginator";
import PersonScrollCardItem from "./PersonScrollCardItem";
import { PersonsContext } from "../store/PersonsContext";
import { AssignmentContext } from "../store/AssignmentContext";

function onlyUnique(value, index, self) {
  return self.indexOf(value) == index;
}
const PersonScrollCard = ({ data, isEditing }) => {
  const personContext = useContext(PersonsContext);
  const persons = personContext.persons.map((item) => {
    return { key: item._key, value: item._name };
  });
  const { width } = useWindowDimensions();
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [eventPersons, setEventPersons] = useState([]);
  const assignmentContext = useContext(AssignmentContext);
  const assignments = assignmentContext.assignments;
  const filteredassignments = assignments.filter((assignment) => {
    return assignment._event === data._key;
  });
  const personlist = filteredassignments.map((assignment) => {
    let person = persons.find((person) => {
      return person.key === assignment._person;
    });
    return person.key;
  });
  const uniquepersonlist = personlist.filter(onlyUnique);
  if (true) {
    uniquepersonlist.push({
      _key: "0",
      _name: "Add People to this Event",
      _image: "../assets/default-person-image.png",
    });
  }
  return (
    <View style={styles.screen}>
      <View style={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={uniquepersonlist}
          renderItem={({ item }) => (
            <PersonScrollCardItem
              item={item}
              eventID={data._key}
              isEditing={isEditing}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onMomentumScrollEnd={(event) => {
            setSelectedPerson(event.nativeEvent.contentOffset.x / width);
          }}
        />
      </View>
      {isEditing && <EventDeleteButton />}
      <Paginator
        style={styles.paginator}
        data={uniquepersonlist}
        index={selectedPerson}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  paginator: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  infoTextContainer: {
    width: "100%",
    marginTop: 10,
  },

  flatlist: {
    //backgroundColor: "white",
  },
  flatlistContainer: {
    width: "100%",
  },
});

export default PersonScrollCard;
