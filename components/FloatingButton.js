import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/colors";

function FloatingButton() {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: Colors.accent500,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        position: "absolute",
        top: 560,
        right: 20,
        height: 70,
        backgroundColor: Colors.accent500,
        borderRadius: 100,
      }}
      onPress={() => {
        alert("Button is pressed");
      }}
    >
      <Icon name="add-circle-outline" color="white" size={40} />
    </TouchableOpacity>
  );
}

export default FloatingButton;
