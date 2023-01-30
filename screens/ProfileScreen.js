import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../constants/colors";
import {useContext} from "react";
import {PersonsContext} from "../store/PersonsContext";
import {PresentsContext} from "../store/PresentsContext";
import {EventsContext} from "../store/EventsContext";
import {AssignmentContext} from "../store/AssignmentContext";

const ProfileScreen = (props) => {
  const personsCtx = useContext(PersonsContext);
  const presentsCtx = useContext(PresentsContext);
  const eventsCtx = useContext(EventsContext);
  const assignmentsCtx = useContext(AssignmentContext);

    const restoreDummyData = () => {
    personsCtx.persons.forEach((element) => {
      personsCtx.removePerson(element);
    })
    presentsCtx.presents.forEach((element) => {
      presentsCtx.removePresent(element);
    })
    eventsCtx.events.forEach((element) => {
      eventsCtx.removeEvent(element);
    })
    assignmentsCtx.assignments.forEach((element) => {
      assignmentsCtx.removeAssignment(element);
    })
  }
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={restoreDummyData}>
        <Text>Restore dummy data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    marginRight: 10,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: Colors.accent300,
    width: '50%'
  },
});

export default ProfileScreen;
