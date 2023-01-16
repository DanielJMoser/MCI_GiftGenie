import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../constants/colors";

import { PRESENTS } from "../data/PresentData";
import { GESCHENKE } from "../data/GeschenkData";
import { Ionicons } from "@expo/vector-icons";

const CardPressHandler = () => {
  Alert.alert("Will move to GiftScreen.");
};

const GiftCard = ({ giftID, isEditing }) => {
  const gift = PRESENTS.find((item) => item._key === giftID);
  if (!gift) {
    return <View></View>;
  }
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.giftCard} onPress={CardPressHandler}>
        <Image source={{ uri: gift._image }} style={styles.giftCardImage} />
        <Text style={styles.giftCardText}>
          {gift._name} ({gift._price}€)
        </Text>
        {isEditing && (
          <TouchableOpacity style={styles.deleteButton}>
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
    height: 80,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 35,
    marginBottom: 10,
  },
  giftCardText: {
    marginLeft: 20,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  giftCardImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  deleteButton: {
    flex: 1,
    position: "absolute",
    right: 20,
    // backgroundColor: "red",
    borderRadius: 10,
  },
});

export default GiftCard;
