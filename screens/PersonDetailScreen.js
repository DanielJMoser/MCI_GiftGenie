import React, { useContext, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { Person } from "../models/Person";
import SaveButton from "../components/SaveButton";
import Colors from "../constants/colors";
import PersonForm from "../components/PersonForm";
import { PersonsContext } from "../store/PersonsContext";

const PersonDetailScreen = ({ route, navigation }) => {
  const getPerson = (key) => {
    const Index = personsContext.persons.findIndex(
      (element) => element.key === key
    );
    return Index !== -1 ? personsContext.persons[Index] : null;
  };

  const personsContext = useContext(PersonsContext);
  const personKey = route.params?.personKey;
  const isEditing = !!personKey;
  const title = isEditing ? "Edit Person" : "Add Person";
  let personEditing = null;
  if (isEditing) {
    personEditing = getPerson(personKey);
  } else if (route.params?.selectedContact) {
    personEditing = Person.fromJson(route.params.selectedContact);
  }
  const [save, setSave] = useState(0);

  const SaveButtonHandler = () => {
    setSave(save + 1);
  };

  useLayoutEffect(() => {
    const TabNavigator = navigation.getParent();
    TabNavigator.setOptions({
      headerRight: null,
      headerShown: false,
      tabBarStyle: {
        display: Platform.OS === "android" ? "none" : "flex",
        backgroundColor: Colors.primary500,
        // We need to use "flex", since there is a Bug in the BottomTabNavigator, which crashes the whole Expo Go App on iOS when display is set to "none"
      },
    });
    navigation.setOptions(
      {
        headerRight: () => <SaveButton onPress={SaveButtonHandler} />,
        headerTitle: title,
      },
      [SaveButtonHandler, SaveButton, navigation]
    );
  });

  function saveHandler(personData) {
    if (isEditing) {
      const updatedPerson = new Person(
        personData.name,
        personData.birthday,
        personData.category,
        personData.image,
        personData.interests,
        personEditing.key
      );
      personsContext.updatePerson(updatedPerson);
    } else {
      const newPerson = new Person(
        personData.name,
        personData.birthday,
        personData.category,
        personData.image,
        personData.interests
      );
      personsContext.addPerson(newPerson);
    }
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <ScrollView>
        <PersonForm
          onSave={saveHandler}
          onSaveButton={save}
          defaultValues={personEditing}
        ></PersonForm>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary500,
  },
});

export default PersonDetailScreen;
