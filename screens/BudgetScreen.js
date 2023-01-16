import { useEffect, useState } from "react";
import { View, ScrollView, TextInput, Button, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";
import AddButton from '../components/AddButton';
import AddModal from "../components/AddBudgetModal";
import { PERSONS } from "../data/PersonData";
import BudgetCard from "../components/BudgetCard";
import { getTotalGiftPrice } from "../components/BudgetCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditBudgetModal from "../components/EditBudgetModal";


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


const BudgetScreen = ({ navigation, props }) => {
    const [currentBudget, setCurrentBudget] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const PersonsSorted = PERSONS.sort((a, b) => a.name.localeCompare(b.name));
    const [totalGiftPrice, setTotalGiftPrice] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [budgetCards, setBudgetCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null)
    const totalBudget = getTotalBudgetForCards(budgetCards);
    const budgetLeft = totalBudget - totalGiftPrice;


    const BudgetForEachPerson = PersonsSorted.map((person, index) => {
        return (
            <BudgetCard
                personKey={person._key}  
                key={index} 
            />
        );
    });

    const deleteHandler = (cardIndex) => {
        let newCards = budgetCards
        newCards = newCards.filter((card, index) => index != cardIndex)
        return newCards
    };

    const handleChange = (text) => {
        setCurrentBudget(text);
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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <AddButton onPress={AddButtonHandler} />,
        });
        saveBudgetCards(budgetCards);
    }, [budgetCards]);

    return (
        <View style={styles.container}>
            <Text style={{ position: 'absolute', top: 0, right: 0, fontSize: 18, color: 'white' }}>
                Current Budget: {totalBudget.toFixed(2)}€
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
                    onClose={() => {
                        setShowEditModal(false);
                    }}
                ></EditBudgetModal>
            )}

            <ScrollView style={{ paddingTop: 25 }}>
                {budgetCards?.map((budgetCard, index) =>
                    <BudgetCard
                        budgetCards={budgetCards}
                        setBudgetCards={setBudgetCards}
                        deleteHandler={deleteHandler}
                        index={index}
                        setSelectedCard={setSelectedCard}
                        setShowEditModal={setShowEditModal}
                        {...budgetCard?.props} />)}
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
});

export default BudgetScreen;
