import { Text, View, StyleSheet } from 'react-native';
import Input from './Input';
import { Present } from '../../models/Present';
import SaveButton from '../SaveButton';
import React from 'react';
import { useState } from 'react';
import { PickerPresents } from '../DropdownMenuPresentAssignment';





// PresentAddForm Component
// makes use of the Universal Input Component (Input.js)

function PresentAddForm( {onSubmit} ) {


    const [present, setPresent] = useState( new Present() );

    function inputChangeHandler(inputIdentifier, userInput) {
        setPresent((prevState) => {
            return {
                ...prevState,
                [inputIdentifier]: userInput,
            };
        });
    }

    function submitHandler() {
        alert('submitting');
        const newPresentData = {
            name: present.name,
            price: present.price,
            category: present.category,
            image: present.image,
            storename: present.storename,
            link: present.link,
            barcode: '0000000000000',
            status: 'not bought',
        };
        onSubmit(newPresentData);
    }



    return (
        <View style={styles.container}>


            {/* Asking user for the new present's name */}
            <Input label="name" textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'name'),
                value: present.name,
                keyboardType: 'default',
                maxLength: 25,
            }}/>

            {/* Asking user for the new present's price */}
            <Input label="price" textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'price'),
                value: present.price,
                keyboardType: 'decimal-pad',
                maxLength: 5,
            }}/>

            <Input label="category" textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'category'),
                value: present.category,
                keyboardType: 'default',
                maxLength: 25,
            }}/>

            <Input label="storename" textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'storename'),
                value: present.storename,
                keyboardType: 'default',
                maxLength: 25,
            }}/>
            
            <Input label="link" textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'link'),
                value: present.link,
                keyboardType: 'default',
            }}/>
            
            <View style={styles.SaveButtonStyle}>
                <SaveButton onPress={submitHandler}/>
            </View>
 
        </View>
        );
    }
        
/*
present.name,
      present.price,
      present.category,
      present.image,
      present.storename,
      present.link,
      present.barcode,
      present.status,
      present.key
*/

export default PresentAddForm;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 40,
        marginTop: 20,
    },
    Text: {
        color: 'white',
        fontSize: 20,
    },
    SaveButtonStyle: {
        marginVertical: 25,
    }
});