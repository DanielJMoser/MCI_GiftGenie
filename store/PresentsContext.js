import { createContext, useState, useEffect } from "react";
import { Present } from "../models/Present";
import { PRESENTS } from "../data/PresentData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PresentsContext = createContext({
    presents: [],
    addPresent: (present) => {},
    removePresent: (present) => {},
    updatePresent: (present) => {},
});


function PresentsContextProvider( {children} ) {

    const presentsStorageKey = 'presents';
    
    const [presents, setPresents] = useState([]);

    function addPresent (present) {
        setPresents((currentPresents) => [...currentPresents, present]);
    }

    function removePresent (present) {
        setPresents((currentPresents) =>
            currentPresents.filter((currentPresent) => currentPresent._key !== present._key)
        );
    }

    function updatePresent (present) {
        setPresents((currentPresents) => {
            const newArray = [...currentPresents];
            const updateIndex = newArray.findIndex((element) => element.key === present.key);
            newArray[updateIndex].setAttributes(present.name, present.price, present.category, present.image, present.storename, present.link, present.barcode, present.status, present.key);
            return newArray;
        })
    }

    useEffect(() => {
        let presentsSaved;
        AsyncStorage.getItem(presentsStorageKey).then((value) => {
            if (value) {
                presentsSaved = JSON.parse(value);
            }
        });
        if (presents.length > 0) {
            const presentsJson = JSON.stringify(presents);
            if (presentsJson !== presentsSaved) {
                AsyncStorage.setItem(presentsStorageKey, presentsJson).then(() => { })
            }
        } else {
            setPresents(PRESENTS);
        }
    }, [presents]);
    
    useEffect(() => {
        AsyncStorage.getItem(presentsStorageKey).then((value) => {
            if (value) {
                const valueParsed = JSON.parse(value);
                const savedPresents = valueParsed.map((element) => Present.fromObj(element));
                setPresents(savedPresents);
            }
        });
    }, []); 

    // ---------------------------------------------- //  


    const value = {
        presents: presents,
        addPresent: addPresent,
        removePresent: removePresent,
        updatePresent: updatePresent
    }


    return <PresentsContext.Provider value={value}>
                {children}
            </PresentsContext.Provider>
}

export default PresentsContextProvider;