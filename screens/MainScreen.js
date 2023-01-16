import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/colors";
import EventCard from "../components/EventCard";
import { useContext, useState, useEffect } from "react";
import { EventsContext } from "../store/EventsContext";
import { PERSONS } from "../data/PersonData";
import { GIFTASSIGNMENTS } from "../data/GiftAssignmentData";
import PersonWithoutPresentCard from "../components/PersonWithoutPresentCard";
import HomeEventCard from "../components/HomeEventCard";
import {PersonsContext} from "../store/PersonsContext";
import PersonCard from "../components/PersonCard";
import AddButton from "../components/AddButton";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import AddMainModal from "../components/AddMainModal";
import BudgetCard from "../components/BudgetCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveBudgetCards = async (budgetCards) => {
  try {
      const budgetCardsJson = JSON.stringify(budgetCards, getCircularReplacer());
      await AsyncStorage.setItem("budgetCards", budgetCardsJson);
  } catch (error) {
      console.error(error);
  }
};

const getTotalBudgetForCards = (budgetCards) => {
    let sum = 0;
    budgetCards.forEach((card) => {
        sum += parseInt(card.props.budget);
    });
    return sum;
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
      if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
              return;
          }
          seen.add(value);
      }
      return value;
  };
};

const MainScreen = ({ navigation }) => {
  /*const personsToDisplay = () => {
    const personsWithoutPresent = PERSONS.filter((person) => {
      return GIFTASSIGNMENTS.filter((giftAssignment) => {
        return giftAssignment.personId === person._key;
      }).length === 0;
    });*/
    const [budgetCards, setBudgetCards] = useState([]);
    const [totalGiftPrice, setTotalGiftPrice] = useState(0);
    const totalBudget = getTotalBudgetForCards(budgetCards);
    const budgetLeft = totalBudget - totalGiftPrice;

    const personsContext = useContext(PersonsContext);
    const personsArray = personsContext.persons;

    const personsSorted = personsArray.sort((a, b) => a.name.localeCompare(b.name));
    const [showAddModal, setShowAddModal] = useState(false);

    const eventsContext = useContext(EventsContext);
    const eventsArray = eventsContext.events;

    

    const retrieveBudgetCards = async () => {
      try {
          const budgetCardsJson = await AsyncStorage.getItem("budgetCards");
          let budgetCards = [];
          if (budgetCardsJson) {
              budgetCards = JSON.parse(budgetCardsJson);
          }
          return budgetCards;
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      const retrieveBudget = async () => {
          const retrievedBudgetCards = await retrieveBudgetCards();
          setBudgetCards(retrievedBudgetCards);
      };
      retrieveBudget();
  }, []);

  const personLongPressed = (person) => {
    // deleteConfirmationAlert(person, deletePerson, person.name, "person");
  };

  

  function AddButtonHandler() {
    setShowAddModal(true);
  }

  function ModalCancelHandler() {
    console.log("Cancel");
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


  const personSelected = (person) => {
    const personKey = person.key;
    console.log(personKey);
    navigation.navigate("Persons", 
    //{
    //  screen: "Person Details",
    //  params: { personKey: personKey },
    //}
    );
  };

  const getPersons = () => {
    const personArr = [];
    for (let i = 0; i < PERSONS.length; i++) {
      if (!GIFTASSIGNMENTS.find((e) => e._person === PERSONS[i]._key)) {
        personArr.push(PERSONS[i]);
      }
    }
    return personArr.map((person, index) => {
      return (
        <PersonWithoutPresentCard
          person={person}
          onSelect={personSelected}
          onLongPress={personLongPressed}
          key={index}
        />
      );
    });
  };

  

  const eventSelected = (event) => {
    const eventKey = event._key;
    navigation.navigate("Calendar");
  };
  
  const eventsArraySorted = eventsArray.sort((a, b)=>{new Date(b._date) - new Date(a._date);})
 
  const eventsToDisplay = eventsArraySorted.map((event, index) => {
    return (
      <HomeEventCard
        style={styles.EventCardOverwrite}
        eventKey={event._key}
        key={index}
        onSelect={eventSelected}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.ViewScroll}>
        <Text style={styles.textStyles}>People without Present:</Text>
        <View style={styles.scrollView}>
          <ScrollView>{getPersons()}</ScrollView>
        </View>
      </View>

      <View style={styles.ViewScroll}>
        <Text style={styles.textStyles}>Upcoming Events:</Text>
        <View style={styles.scrollView}>
          <ScrollView>{eventsToDisplay}</ScrollView>
        </View>
      </View>
     
      <Text style={styles.textStyles}>
                Current Budget: {totalBudget.toFixed(2)}€ 
      </Text>
      <Text style={styles.textStyles}>
        Total Budget Left: {budgetLeft.toFixed(2)}€
      </Text>    
      
      <AddMainModal
        cancelHandler={ModalCancelHandler}
        visible={showAddModal}
        setVisible={setShowAddModal}
        navigation={navigation}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 1,
    borderColor: "white",
    borderWidth: 2,
    width: "95%",
    margin: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary400,
  },
  ViewScroll: {
    height: "43%",
    width: "100%",
    marginTop: "3%",
    alignItems: "center",
  },
  textStyles: {
    color: "white",
    fontSize: 20,
  },
  
  EventCardOverwrite: {
    backgroundColor: Colors.primary400,
  },
});
