import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import { View, StyleSheet, Button} from "react-native";
import PersonScrollCard from "../components/PersonScrollCard";
import Colors from "../constants/colors";
import EditButton from "../components/EditButton";
import { useFocusEffect } from "@react-navigation/native";
import { EventsContext } from "../store/EventsContext";

const EventDetailScreen = ({ route, navigation }) => {
  const DoneButtonHandler = () => {
    setIsEditing(false);
  };

  const EditButtonHandler = () => {
    setIsEditing(true);
  };

  const [isEditing, setIsEditing] = useState(false);
  const eventsContext = useContext(EventsContext);
  const eventsArray = eventsContext.events;
  const event = eventsArray.find((event) => {
    return event._key === route.params;
  });
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <Button
              title= {isEditing ? "Done" : "Edit"}
              onPress={ isEditing ? DoneButtonHandler : EditButtonHandler}
              color={Colors.primary400}
          />
      ),
    });
  }, [isEditing]);

  useFocusEffect(
    React.useCallback(() => {
      const tabNavigator = navigation.getParent();
      tabNavigator.setOptions({
        headerShown: false,
      });
    }, [navigation])
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: event._name,
      headerRight: () => <EditButton onPress={EditButtonHandler} />,
    });
  });
  return (
    <View style={styles.screen}>
      <PersonScrollCard data={event} isEditing={isEditing} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary500,
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EventDetailScreen;
