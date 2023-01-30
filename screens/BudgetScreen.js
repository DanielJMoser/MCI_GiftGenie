import { useEffect, useState, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";
import AddButton from '../components/AddButton';
import AddModal from "../components/AddBudgetModal";
import BudgetCard from "../components/BudgetCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditBudgetModal from "../components/EditBudgetModal";
import { v4 as generateUniqueKey } from 'uuid';
import { EventsContext } from "../store/EventsContext";
import EventCard from "../components/EventCard";
import BudgetEventCard from "../components/BudgetEventCard"

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


const BudgetScreen = ({ navigation, props }) => {
    const [currentBudget, setCurrentBudget] = useState(0);
    const [eventBudgetSum, setEventBudgetSum] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [budgetCards, setBudgetCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null)
    const totalBudget = getTotalBudgetForCards(budgetCards) + eventBudgetSum;
    const budgetLeft = (getTotalBudgetLeftForCards(budgetCards));
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    
    const eventsContext = useContext(EventsContext);
    const eventsArray = eventsContext.events;

    
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


    useFocusEffect(
        useCallback(() => {
            setBudgetCards([]);
            fetchData();
        }, [])
    );
    

    const saveBudgetCards = async (budgetCards) => {
        try {
            const budgetCardsJson = JSON.stringify(budgetCards, getCircularReplacer());
            await AsyncStorage.setItem("budgetCards", budgetCardsJson);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = (cardIndex) => {
        let newCards = [...budgetCards];
        newCards.splice(cardIndex, 1);
        setBudgetCards(newCards);
        saveBudgetCards(newCards);
    };

    function AddButtonHandler() {
        setShowAddModal(true);
    }

    function ModalCancelHandler() {
        setShowAddModal(false);
    }

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
        navigation.setOptions({
            headerRight: () => <AddButton onPress={AddButtonHandler} />,
        });
        retrieveBudgetCards();
    }, []);


    const refreshData = () => {
        fetchData();
    }

    const eventSelected = (event) => {
        const eventKey = event._key;
        navigation.navigate("Calendar");
    };

    const eventsArraySorted = eventsArray.sort((a, b) => { new Date(b._date) - new Date(a._date); })

    const eventsToDisplay = eventsArraySorted.map((event, index) => {
        return (
            <BudgetEventCard
                style={styles.EventCardOverwrite}
                eventKey={event._key}
                key={index}
                onSelect={eventSelected}
            />
        );
    });

    const eventsToDisplayNew = eventsArray.map((event, index) => {
        return (
            <EventCard eventKey={event._key} key={index} navigation={navigation} />
        );
    });

    return (
        <View style={styles.container}>
            <Text style={{ position: 'absolute', top: 0, right: 0, fontSize: 18, color: 'white' }}>
                Total Assigned Budget: {totalBudget.toFixed(2)}€
            </Text>
            <Text style={{ position: 'absolute', top: 20, right: 0, fontSize: 18, color: 'white' }}>
                Total Budget Left: {budgetLeft.toFixed(2)}€
            </Text>
            {budgetLeft < 0 && (
                <Text style={{ color: "red", top: 25, fontSize: 18 }}>
                    Warning: Current budget is below 0€
                </Text>
            )}
            {!showEditModal && (
                <AddModal
                    cancelHandler={ModalCancelHandler}
                    visible={showAddModal}
                    setCurrentBudget={setCurrentBudget}
                    setShowAddModal={setShowAddModal}
                    budgetCards={budgetCards}
                    setBudgetCards={setBudgetCards}
                    setSelectedCard={setSelectedCard}
                    setShowEditModal={setShowEditModal}
                />
            )}
            {showEditModal && (
                <EditBudgetModal
                    selectedCard={selectedCard}
                    budgetCards={budgetCards}
                    setBudgetCards={setBudgetCards}
                    setSelectedCard={setSelectedCard}
                    setShowEditModal={setShowEditModal}
                    selectedGifts={selectedGifts}
                    fetchData={fetchData}
                    onClose={() => {
                        setShowEditModal(false);
                    }}
                ></EditBudgetModal>
            )}

            <ScrollView style={{ width: "98%", marginTop: "7%", }}>
                <Text style={[styles.label]}>Budget Cards:</Text>
                {budgetCards?.map((budgetCard, index) =>
                    <BudgetCard
                        key={generateUniqueKey()}
                        budgetCards={budgetCards}
                        setBudgetCards={setBudgetCards}
                        deleteHandler={deleteHandler}
                        index={index}
                        setSelectedCard={setSelectedCard}
                        setShowEditModal={setShowEditModal}
                        refreshData={refreshData}
                        fetchData={fetchData}
                        {...budgetCard?.props} 
                        />
                    )}
                <Text style={[styles.label]}>Event Cards:</Text>
                {eventsToDisplayNew}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary500,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginLeft: '1%',
        marginBottom: 4,
        alignSelf: 'center'
    },
});

export default BudgetScreen;
