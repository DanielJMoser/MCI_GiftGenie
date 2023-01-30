import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import { EventsContext } from "../store/EventsContext";
import { deleteConfirmationAlert } from "./deleteConfirmationAlert";
import { AssignmentContext } from "../store/AssignmentContext";

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const NumberOfPersons = (assignments, eventID) => {
    const theseassignments = assignments.filter(
        (assignment) => assignment._event === eventID
    );
    const unique = theseassignments
        .map((assignment) => assignment._person)
        .filter(onlyUnique);
    return unique.length;
};

const NumberofGifts = (assignments, eventID) => {
    const theseGifts = assignments.filter(
        (assignment) => assignment._event === eventID
    );
    const unique = theseGifts
        .map((assignment) => assignment._gift)
        .filter(onlyUnique);
    return unique.length;
};

const EventCard = (props) => {
    const assignmentContext = useContext(AssignmentContext);
    const assignments = assignmentContext.assignments;
    const eventsContext = useContext(EventsContext);
    const eventsArray = eventsContext.events;

    const longPressHandler = () => {
        deleteConfirmationAlert(
            event,
            eventsContext.removeEvent,
            event._name,
            "event"
        );
    };
    const event = eventsArray.find((event) => event._key === props.eventKey);
    if (!event._personList) {
        return <View></View>;
    }
    return (
        <TouchableOpacity
            style={{ ...styles.screen, ...props.style }}
            onPress={() => {
                props.onSelect(event);
            }}
            onLongPress={longPressHandler}
        >
            <View style={styles.eventItem}>
                <Text style={styles.text}>
                    {event._name} ({event._date})
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <Ionicons
                        style={styles.icon}
                        name="person-outline"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.counts}>
                        {NumberOfPersons(assignments, props.eventKey)}
                    </Text>
                    <Ionicons
                        style={styles.icon}
                        name="gift-outline"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.counts}>
                        {NumberofGifts(assignments, props.eventKey)}
                    </Text>
                    <Ionicons
                        style={styles.icon}
                        name="cash-outline"
                        size={24}
                        color="white"
                    />
                    <Text style={styles.counts}> {event._budget}€ </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItem: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary500,
    },
    eventItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        height: 60,
        backgroundColor: Colors.primary400,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    icon: {
        marginLeft: 20,
    },
    counts: {
        color: "white",
        fontSize: 16,
        paddingTop: 3,
    },
});

export default EventCard;
