import { useContext, useState } from "react";
import React from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Colors from "../constants/colors";
import EventCard from "../components/EventCard";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";
import { useFocusEffect } from "@react-navigation/native";
import { EventsContext } from "../store/EventsContext";

const EventOverviewScreen = ({ navigation, route }) => {
  const eventsContext = useContext(EventsContext);
  const eventsArray = eventsContext.events;
  const eventsToDisplay = eventsArray.map((event, index) => {
    return (
      <EventCard eventKey={event._key} key={index} navigation={navigation} />
    );
  });
  const [showAddModal, setShowAddModal] = useState(false);

  function AddButtonHandler() {
    setShowAddModal(true);
  }

  function ModalCancelHandler() {
    setShowAddModal(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      const tabNavigator = navigation.getParent();
      tabNavigator.setOptions({
        headerRight: () => <AddButton onPress={AddButtonHandler} />,
        headerShown: true,
      });
    }, [AddButtonHandler, AddButton, navigation])
  );

  return (
    <View style={styles.container}>
      <ScrollView>{eventsToDisplay}</ScrollView>
      <AddModal
        cancelHandler={ModalCancelHandler}
        visible={showAddModal}
        setVisible={setShowAddModal}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItem: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default EventOverviewScreen;
