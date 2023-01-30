import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TextInputField from "./TextInputField";
import React, {useEffect, useState} from "react";
import {DEFAULTPERSONCATEGORY, PERSONCATEGORIES} from "../data/PersonCategoryData";
import PickerInputField from "./PickerInputField";
import ProgressiveImage from "./ProgressiveImage";
import Colors from "../constants/colors";
import pickImage from "./ImagePicker";
import TextOutputField from "./TextOutputField";

const defaultImage = '../assets/default-person-image.png';

function PersonForm({onSave, onSaveButton, defaultValues}) {
    const nameCheck = (name) => name.trim().length > 0;
    const birthdayCheck = (birthday) => birthday.toString() !== 'Invalid Date';
    const categoryCheck = (category) => PERSONCATEGORIES.findIndex((element) => element.description === category) !== -1;
    const [age, setAge] = useState(0);

    const [inputs, setInputs] = useState({
        name: {
            value: defaultValues ? defaultValues.name : '',
            isValid: true,
        },
        category: {
            value: defaultValues ? defaultValues.category : DEFAULTPERSONCATEGORY.description,
            isValid: true,
        },
        birthday: {
            value: defaultValues && defaultValues.birthday ? defaultValues.birthday.toISOString().slice(0, 10) : null,
            isValid: true,
        },
        image: {
            value: defaultValues ? defaultValues.image : null,
            isValid: true
        },
        interests: {
            value: defaultValues ? defaultValues.interests : [],
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs, [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    useEffect(() => {
        if (onSaveButton) {
            saveHandler();
        }
    }, [onSaveButton])

    useEffect(() => {
        let today = new Date();
        let birthDate = new Date(inputs.birthday.value);
        if (!inputs.birthday.value || birthDate.toString() === 'Invalid Date') {
            setAge(0);
            return;
        }
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
    }, [inputs.birthday.value])

    function saveHandler() {
        const personData = {
            name: inputs.name.value,
            category: inputs.category.value,
            birthday: inputs.birthday.value ? new Date(inputs.birthday.value) : null,
            image: inputs.image.value,
            interests: inputs.interests.value
        }

        const nameIsValid = nameCheck(personData.name);
        const birthdayIsValid = personData.birthday == null || birthdayCheck(personData.birthday);
        const categoryIsValid = categoryCheck(personData.category);

        if (!nameIsValid || !birthdayIsValid || !categoryIsValid) {
            setInputs((currentInputs) => {
                return {
                    name: {value: currentInputs.name.value, isValid: nameIsValid},
                    category: {value: currentInputs.category.value, isValid: categoryIsValid},
                    birthday: {value: currentInputs.birthday.value, isValid: birthdayIsValid},
                    image: {value : currentInputs.image.value, isValid: true},
                    interests: {value : currentInputs.interests.value, isValid: true},
                }
            });
            return;
        }

        onSave(personData);
    }

    const formIsValid = inputs.name.isValid &&
        inputs.category.isValid &&
        inputs.birthday.isValid &&
        inputs.image.isValid &&
        inputs.interests.isValid;
    const options = [];
    for (let i = 0; i < PERSONCATEGORIES.length; i++) {
        options.push(PERSONCATEGORIES[i].description);
    }


    return <View>
        {!formIsValid &&
            <Text style={styles.errorText}>Invalid inputs!</Text>
        }

        <Text style={styles.label}>
            Image
        </Text>
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => pickImage(inputChangedHandler.bind(this, 'image'))}
            onLongPress={() => {}}
        >
            <ProgressiveImage style={styles.image}
                              uri={inputs.image.value}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}
            />
        </TouchableOpacity>

        <TextInputField label="Name" isInvalid={!inputs.name.isValid} textInputConfig={{
            autoCapitalize: "words",
            onChangeText: inputChangedHandler.bind(this, 'name'),
            value: inputs.name.value,

        }}
        />
        <PickerInputField
            label="Category "
            isInvalid={!inputs.category.isValid}
            selectedValue={inputs.category.value}
            onValueChange={(itemValue) => {
                inputChangedHandler('category', itemValue)
            }}
            arrayOfValues = {options}
        ></PickerInputField>
        <TextInputField label="Birthday" isInvalid={!inputs.birthday.isValid} textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'birthday'),
            value: inputs.birthday.value,
        }}
        />
        {age > 0 &&
            <TextOutputField label="Age" text={age.toString()}></TextOutputField>
        }
    </View>
}

export default PersonForm;

const styles = StyleSheet.create({
    errorText: {
        textAlign: 'center',
        color: Colors.error,
        margin: 8
    },
    imageContainer:{
        width: '50%',
        height: 200,
        backgroundColor: Colors.primary400,
        justifyContent:"center",
        alignItems: "center"
    },
    image: {
        height: '100%',
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: Colors.accent300,
        marginBottom: 6,
    },
    outputContainer: {
        marginHorizontal: 4,
        marginVertical: 12,
    },
    output: {
        backgroundColor: Colors.primary400,
        color: 'white',
        padding: 6,
        paddingLeft: 14,
        borderRadius: 6,
        fontSize: 15
    },
});