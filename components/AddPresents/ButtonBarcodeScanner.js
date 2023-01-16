import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/colors";



const AddButton = (props) => {

  const { onPress, title = "Save" } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="barcode" size={90} color={Colors.accent500} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default AddButton;
