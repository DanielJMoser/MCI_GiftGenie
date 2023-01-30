import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";

const MenuButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.screen} onPress={onPress}>
      <Ionicons
        style={styles.icon}
        name="menu"
        size={36}
        color={Colors.primary400}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 5,
  },
});

export default MenuButton;
