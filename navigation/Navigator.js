import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../constants/colors";

import MainScreen from "../screens/MainScreen";
import LogoTitle from "../components/LogoTitle";
import PersonStackNavigator from "./PersonStackNavigator";
import EventStackNavigator from "./EventStackNavigator";
import BudgetScreen from "../screens/BudgetScreen";
import MenuButton from "../components/MenuButton";
import PresentStack from "./PresentStackNavigator";
import MainStackNavigator from "./MainStackNavigator";

const Tab = createBottomTabNavigator();

function Navigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.accent500,
        },
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => <MenuButton onPress={props.navigation.openDrawer} />,
        headerTitleAlign: "center",
        tabBarShowLabel: true,
        tabBarStyle: styles.TabBar,
        tabBarActiveTintColor: Colors.accent500,
        tabBarActiveBackgroundColor: Colors.primary400,
      }}
    >
      <Tab.Screen
        name="Gifts"
        component={PresentStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="gift-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="logo-usd" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarItemStyle: styles.homeTab,
          tabBarActiveTintColor: Colors.accent500,
          tabBarActiveBackgroundColor: Colors.primary400,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={EventStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Persons"
        component={PersonStackNavigator}
        options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="person-circle-outline" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    backgroundColor: Colors.primary500,
  },
  homeTab: {
    borderWidth: 1,
    borderColor: Colors.accent300,
    borderRadius: 50,
    padding: 5,
  },
});

export default Navigator;
