import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../screens/MainScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import Colors from "../constants/colors";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import PersonOverviewScreen from "../screens/PersonOverviewScreen";
import PresentManageScreen from "../screens/PresentManageScreen";

const MainStackNavigator = createStackNavigator();

function MainStack() {
  return (
    
    <MainStackNavigator.Navigator
      screenOptions={{
        initialRouteName: "Main Overview",
        headerTintColor: Colors.primary500,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: Colors.accent500 },
      }}
    >
      <MainStackNavigator.Screen
        name="Main Overview"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <MainStackNavigator.Screen
                    name="Person Overview"
                    component={PersonOverviewScreen}
                    options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
                    name="Person Details"
                    component={PersonDetailScreen}/>
      <MainStackNavigator.Screen
                name="Add Present"
                component={PresentManageScreen}
                options={{ headerShown: false }}
            />
      <MainStackNavigator.Screen
        name="Event Details"
        component={EventDetailScreen}
        options={{ headerShown: true }}
      />

    </MainStackNavigator.Navigator>
  );
}

export default MainStack;