import React, { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import PersonScrollCard from "../components/PersonScrollCard";
import Colors from "../constants/colors";
import EditButton from "../components/EditButton";
import { useFocusEffect } from "@react-navigation/native";
import { EventsContext } from "../store/EventsContext";
const defaultImage = "../assets/default-person-image.png";

const EventDetailScreen = ({ route, navigation }) => {
  const DoneButtonHandler = () => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Edit"
          onPress={EditButtonHandler}
          color={Colors.primary400}
        />
      ),
    });
    setIsEditing(false);
  };

  const EditButtonHandler = () => {
    Alert.alert("Editing Gift Assingments is not implemented yet.");
    return;
    setIsEditing(true);
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Done"
          onPress={DoneButtonHandler}
          color={Colors.primary400}
        />
      ),
    });
  };
  const [isEditing, setIsEditing] = useState(false);
  const eventsContext = useContext(EventsContext);
  const eventsArray = eventsContext.events;
  const event = eventsArray.find((event) =>{
    
    return event._key === route.params});
  
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
      {/* <Text style={styles.titleText}>{route.params._name}</Text> */}
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
