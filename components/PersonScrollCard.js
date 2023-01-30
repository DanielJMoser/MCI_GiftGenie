import { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
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
      _image: null,
    });
  }

  const DeletePersonHandler = () => {
    const currentPersonID = uniquepersonlist[selectedPerson];
    const currentEventID = data._key;
    const assignmentsToDelete = assignments.filter((assignment) => {
      return (
        assignment._person === currentPersonID &&
        assignment._event === currentEventID
      );
    });
    assignmentsToDelete.forEach((assignment) => {
      assignmentContext.removeAssignment(assignment);
    });
  };
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={uniquepersonlist}
          renderItem={({ item }) => (
            <PersonScrollCardItem
              item={item}
              eventID={data._key}
              isEditing={isEditing}
              personDeleteHandler={DeletePersonHandler}
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
      </ScrollView>
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
  },
  flatlistContainer: {
    width: "100%",
  },
});

export default PersonScrollCard;
