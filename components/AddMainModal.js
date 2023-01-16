import {
    StyleSheet,
    Modal,
    Button,
    SafeAreaView,
    View,
    Text,
    TextInput,
    Pressable,
  } from "react-native";
 
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Colors from "../constants/colors";
  import { useContext, useState, useEffect, } from "react";
  import { EventsContext } from "../store/EventsContext";
  import { Event } from "../models/Event";
  import { GESCHENKE } from "../data/GeschenkData";
  import { MultipleSelectList } from "react-native-dropdown-select-list";
  import { PersonsContext } from "../store/PersonsContext";
  import AddBudgetModal from "../components/AddBudgetModal";
  import AddModal from "../components/AddModal";
  

  
  const AddMainModal = ({ cancelHandler, visible, setVisible, navigation }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [currentBudget, setCurrentBudget] = useState(0);
    const [budgetCards, setBudgetCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const AddButtonPersonHandler = () => {
      cancelHandler();
      navigation.navigate("Person Details");
  }

    function AddButtonHandler() {
      setShowAddModal(true);
    }
  
    function ModalCancelHandler() {
      console.log("Cancel");
      setShowAddModal(false);
    }
  

    function AddButtonBudgetHandler() {
      console.log("AddButtonHandler");
      setShowAddBudgetModal(true);
  }
  function ModalCancelBudgetHandler() {
    setShowAddBudgetModal(false);
}

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
    const eventContext = useContext(EventsContext);
   
    const personContext = useContext(PersonsContext);
    const persons = personContext.persons.map((item) => {
      return { key: item._key, value: item._name };
    });
    const gifts = GESCHENKE.map((item) => {
      return { key: item._key, value: item._name };
    });
    return (
      <Modal animationType="slide" visible={visible} transparent={true}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.headerStyle}>What do you want to add: </Text>
            <View style={styles.buttonContainer}>
            <Pressable title="Present" style={styles.buttonStyle}>
              <Text>Present</Text>
            </Pressable>
            <Pressable title="Present" style={styles.buttonStyle} onPress={AddButtonBudgetHandler}>
              <Text>Budget</Text>
            </Pressable>
            <Pressable title="Present" style={styles.buttonStyle} onPress={AddButtonHandler}>
              <Text>Event</Text>
            </Pressable>
            <Pressable title="Present" style={styles.buttonStyle} onPress={AddButtonPersonHandler}>
              <Text>Person</Text>
            </Pressable>
            </View>

            <Button title="Cancel" onPress={cancelHandler} />
      
          </View>
          <AddBudgetModal
                    cancelHandler={ModalCancelBudgetHandler}
                    visible={showAddBudgetModal}
                    setCurrentBudget={setCurrentBudget}
                    setShowAddModal={setShowAddBudgetModal}
                    budgetCards={budgetCards}
                    setBudgetCards={setBudgetCards}
                    setSelectedCard={setSelectedCard}
                    setShowEditModal={setShowEditModal}
                />
          <AddModal
        cancelHandler={ModalCancelHandler}
        visible={showAddModal}
        setVisible={setShowAddModal}
      />
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      paddingLeft: 50,
      // marginLeft: 50,
      // alignItems: "flex-start",
      // justifyContent: "center",
      backgroundColor: Colors.accent300,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      minWidth: 200,
    },
    textContainer: {
      width: "80%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: 5,
    },
    button: {
      alignItems: "center",
    },
    buttonContainer: {
      margin: 30,
    },
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      margin: 5,
      backgroundColor: Colors.accent500,
    },
    headerStyle: {
      fontSize: 20,
      fontWeight: 'bold',

    },
  });
  
  export default AddMainModal;
  