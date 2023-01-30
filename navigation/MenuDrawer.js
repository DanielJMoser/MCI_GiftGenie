import { createDrawerNavigator } from "@react-navigation/drawer";
import Navigator from "./Navigator";
import Colors from "../constants/colors";
import { StyleSheet } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import LogoTitle from "../components/LogoTitle";
import MenuButton from "../components/MenuButton";
import AboutUsScreen from "../screens/AboutUsScreen";
const Drawer = createDrawerNavigator();

function MenuDrawer(props) {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerStyle: styles.drawer,
        drawerActiveTintColor: Colors.accent500,
        drawerInactiveTintColor: Colors.accent500,
        headerShown: true,
        headerLeft: () => <MenuButton onPress={navigation.openDrawer} />,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: Colors.accent500,
        },
      })}
    >
      <Drawer.Screen
        name="Main"
        component={Navigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="About" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: Colors.primary500,
  },
});

export default MenuDrawer;
