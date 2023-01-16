import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../constants/colors";

const FilterButton = ({ callback, text, id, selectedIndex }) => {
    const clicked = selectedIndex === id;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: clicked ? Colors.accent500 : Colors.primary400 },
            ]}
            onPress={() => {
                callback(id);
            }}>
            <Text style={{ color: clicked ? 'black' : 'white' }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default FilterButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        borderColor: 'black',
        padding: 10,
        marginTop: 5,
        marginHorizontal: 5,
        height: 40
    },

});