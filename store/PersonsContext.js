import {createContext, useEffect, useState} from "react";
import {Person} from "../models/Person";
import {PERSONS} from "../data/PersonData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const personsStorageKey = 'persons';

export const PersonsContext = createContext({
    persons: [],
    addPerson: (person) => {},
    updatePerson: (person) => {},
    removePerson: (person) => {}
});

function PersonsContextProvider({children}) {
    const [persons, setPersons] = useState([]);

    function addPerson (person) {
        setPersons((currentPersons) => [...currentPersons, person]);
    }
    function updatePerson (person) {
        setPersons((currentPersons) => {
            const newArray = [...currentPersons];
            const updateIndex = newArray.findIndex((element) => element.key === person.key);
            newArray[updateIndex].setAttributes(person.name, person.birthday, person.category, person.image, person.interests);
            return newArray;
        })
    }
    function removePerson (person)  {
        setPersons((currentPersons) =>
            currentPersons.filter((currentPerson) => currentPerson.key !== person.key)
        );
    }

    useEffect(() => {
        let personsSaved;
        AsyncStorage.getItem(personsStorageKey).then((value) => {
            if (value) {
                personsSaved = JSON.parse(value);
            }
        });
        if (persons.length > 0) {
            const personsJson = JSON.stringify(persons);
            if (personsJson !== personsSaved) { // only save when there are changes
                AsyncStorage.setItem(personsStorageKey, personsJson).then(() => { })
            }

        } else {
            setPersons(PERSONS);    // TODO: restore test data during testing only
        }
    }, [persons]);

    useEffect(() => {
        AsyncStorage.getItem(personsStorageKey).then((value) => {
            if (value) {
                const valueParsed = JSON.parse(value);
                const savedPersons = valueParsed.map((element) => Person.fromObj(element));
                setPersons(savedPersons);
            }
        });
    }, []);

    const value = {
        persons: persons,
        addPerson: addPerson,
        updatePerson: updatePerson,
        removePerson: removePerson
    }

    return <PersonsContext.Provider value={value}>
                {children}
            </PersonsContext.Provider>
}

export default PersonsContextProvider;