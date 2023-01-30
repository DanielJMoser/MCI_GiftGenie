import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Colors from "../constants/colors";

import { AssignmentContext } from "../store/AssignmentContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { PresentsContext } from "../store/PresentsContext";

import ProgressiveImage from "./ProgressiveImage";

const defaultImage = '../assets/present.png';


function truncate(input) {
  if (input.length > 18) {
    return input.substring(0, 18) + "...";
  }
  return input;
}


const GiftCard = ({ giftID, isEditing, personID, eventID }) => {
  const width = useWindowDimensions().width;
  const giftCardHeight = width < 400 ? 50 : 60;
  const giftCardFontSize = width < 400 ? 14 : 16;
  const assignmentContext = useContext(AssignmentContext);
  const assignments = assignmentContext.assignments;
  let navigation = useNavigation();
  const presentsCtx = useContext(PresentsContext);

  const RemoveGiftHandler = () => {
    let thisAssignment = assignments.find((assignment) => {
      return (
        assignment._gift === giftID &&
        assignment._person === personID &&
        assignment._event === eventID
      );
    });
    assignmentContext.removeAssignment(thisAssignment);
  };

  const CardPressHandler = () => {
    navigation.getParent().navigate("Gifts", {
      screen: "Presents Overview",
      params: { presentKey: giftID },
    });
  };
  const gift = presentsCtx.presents.find((item) => item._key === giftID);
  if (!gift) {
    return <View></View>;
  }
  return (
    <View style={styles.screen}>

          <TouchableOpacity
              style={[styles.giftCard, { height: giftCardHeight }]}
              onPress={CardPressHandler}
          >
        <ProgressiveImage
          uri={gift._image}
          style={styles.giftCardImage}
          defaultSource={require(defaultImage)}
        />
            <Text style={[styles.giftCardText, { fontSize: giftCardFontSize }]}>
              {truncate(gift._name)} ({gift._price}€)

        </Text>
        {isEditing && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={RemoveGiftHandler}
          >
            <Ionicons name="trash" size={24} color="#ff0000" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  srceen: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
  giftCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 35,
    marginBottom: 10,
  },
  giftCardText: {
    marginLeft: 20,
    color: "white",
    fontWeight: "bold",
  },
  giftCardImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  deleteButton: {
    flex: 1,
    position: "absolute",
    right: 20,
    width: 40,
  },
});

export default GiftCard;
