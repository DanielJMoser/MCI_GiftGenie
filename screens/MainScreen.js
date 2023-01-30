import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/colors";
import EventCard from "../components/EventCard";
import { useContext, useState, useEffect } from "react";
import { EventsContext } from "../store/EventsContext";
import PersonWithoutPresentCard from "../components/PersonWithoutPresentCard";
import {PersonsContext} from "../store/PersonsContext";
import AddButton from "../components/AddButton";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import AddMainModal from "../components/AddMainModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssignmentContext } from "../store/AssignmentContext";
import tabBarAttributes from "../constants/tabBarAttributes";

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
  if (budgetCards && budgetCards.length > 0) {
      budgetCards.forEach((card) => {
          sum += parseFloat(card.props.budget);
      });
  }

  return sum;
};

const getTotalBudgetLeftForCards = (budgetCards) => {
  let sum = 0;
  if (budgetCards && budgetCards.length > 0) {
      budgetCards.forEach((card) => {
          if (card.props.budgetLeft !== undefined) {
              sum += parseFloat(card.props.budgetLeft);
          } else {
              sum += parseFloat(card.props.budget)
          }
      });
  }

  return parseFloat(sum);
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
 
    const [budgetCards, setBudgetCards] = useState([]);
    const [eventBudgetSum, setEventBudgetSum] = useState(0);
    const totalBudget = getTotalBudgetForCards(budgetCards) + eventBudgetSum;
    const budgetLeft = (getTotalBudgetLeftForCards(budgetCards));
    const [dataFetched, setDataFetched] = useState(false);

    const personsContext = useContext(PersonsContext);
    const personsArray = personsContext.persons;

    const personsSorted = personsArray.sort((a, b) => a.name.localeCompare(b.name));
    const [showAddModal, setShowAddModal] = useState(false);

    const eventsContext = useContext(EventsContext);
    const eventsArray = eventsContext.events;

    const assignmentContext = useContext(AssignmentContext);
    const assignments = assignmentContext.assignments;



    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

  const fetchData = async () => {
    try {
        const budgetCardsJson = await AsyncStorage.getItem("budgetCards");
        const budgetCards = JSON.parse(budgetCardsJson);
        setBudgetCards(budgetCards);
        setDataFetched(true);
        getTotalBudgetLeftForCards(budgetCards);
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchData();
}, []);

useEffect(() => {
    let sum = 0;
    eventsArray.map((event) => {
        if (isNaN(event._budget)) {
            console.log(`Budget is not a number: ${event.budget}`)
        } else {
            sum += parseFloat(event._budget);
        }
    });
    setEventBudgetSum(sum);
}, [eventsArray]);

  const retrieveBudgetCards = async () => {
    try {
        const budgetCardsJson = await AsyncStorage.getItem("budgetCards");
        let budgetCards = [];
        if (budgetCardsJson) {
            budgetCards = JSON.parse(budgetCardsJson);
        }
        setBudgetCards(budgetCards);
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

  const refreshData = () => {
    fetchData();
}

  const personLongPressed = (person) => {
    // deleteConfirmationAlert(person, deletePerson, person.name, "person");
  };
  

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
        ...tabBarAttributes
      });
      retrieveBudgetCards();
    }, [AddButtonHandler, AddButton, navigation])
  );

  const numberOfGifts = (assignments, personKey) => {
    const theseGifts = assignments.filter(
        (assignment) => assignment._person === personKey
    );
    const unique = theseGifts
        .map((assignment) => assignment._gift)
        .filter(onlyUnique);
    return unique.length;
};

  const personSelected = (person) => {
    const personKey = person.key;
    navigation.navigate('Person Details', {personKey: personKey}
    );
  };



  const getPersonsToDisplay = personsSorted.map( (person, index) => {
    if (numberOfGifts(assignments, person._key) == 0) {
    return(
        <PersonWithoutPresentCard
            person={person}
            onSelect={personSelected}
            onLongPress={personLongPressed}
            key={index}
        />
    );}
});

  

  const eventSelected = (event) => {
    const eventKey = event._key;
    navigation.navigate("Calendar");
  };
 

  const eventsToDisplayNew = eventsArray.map((event, index) => {
    return (
      <EventCard eventKey={event._key} key={index} navigation={navigation} />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.ViewScroll}>
        <Text style={styles.textStyles}>People without Present:</Text>
        <View style={styles.scrollView}>
          <ScrollView>{getPersonsToDisplay}</ScrollView>
        </View>
      </View>

      <View style={styles.ViewScroll}>
        <Text style={styles.textStyles}>Upcoming Events:</Text>
        <View style={styles.scrollView}>
          <ScrollView>{eventsToDisplayNew}</ScrollView>
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
    backgroundColor: Colors.primary400,
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
    backgroundColor: Colors.primary500,
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
  TabBar: {
    backgroundColor: Colors.primary500,
  },
});
