import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import ProgressiveImage from "./ProgressiveImage";

const defaultImage = '../assets/default-person-image.png';

const PersonWithoutPresentCard = (props) => {
    const person = props.person;
    return (
        <TouchableOpacity
        style={{ ...styles.screen, ...props.style }}
        onPress={() => props.onSelect(person)}
            onLongPress={() => props.onLongPress(person)}
        >
        <ProgressiveImage style={styles.image}
                              uri={person.image !== undefined ? person.image : defaultImage}
                              defaultSource={require(defaultImage)}
                              resizeMode={'contain'}
            />
            <View style={styles.textContainer}>
                <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.personText}
                >{person.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
        cardContainer: {
            height: 180,
            width: '42.5%',
            backgroundColor: Colors.primary500,
            elevation: 10,
            marginLeft: '5%',
            marginTop: '5%',
        },
        personText: {
            textAlign: 'center',
            color: 'black',
            fontSize: 20
        },
        image: {
            height: 150,
            width: '100%',
    
        },
        textContainer: {
            justifyContent: 'center',
            height: 40,
            width: '100%',
            backgroundColor: Colors.accent500,
        }
    });
    

export default PersonWithoutPresentCard;
