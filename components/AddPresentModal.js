import { StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import Colors from '../constants/colors';
import React from 'react';
import {useContext, useState } from 'react';
import { PresentsContext } from '../store/PresentsContext';
import { PRESENTS } from '../data/PresentData';
import { Present } from '../models/Present';


const AddPresentModal = (props) => {
    const presentsCtx = useContext(PresentsContext);
    const [present, setPresent] = useState(new Present());

    const { onPress, title = "Add Present" } = props;

    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );

  return (
    <TouchableNativeFeedback onPress={onPress}>
            {content}
        </TouchableNativeFeedback>
    );
}