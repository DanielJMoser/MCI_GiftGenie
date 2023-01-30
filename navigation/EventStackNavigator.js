import { createStackNavigator } from "@react-navigation/stack";
import EventOverviewScreen from "../screens/EventOverviewScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import Colors from "../constants/colors";

const EventStackNavigator = createStackNavigator();

function EventStack() {
  return (
    <EventStackNavigator.Navigator
      screenOptions={{
        headerTintColor: Colors.primary500,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: Colors.accent500 },
      }}
    >
      <EventStackNavigator.Screen
        name="Event Overview"
        component={EventOverviewScreen}
        options={{ headerShown: false }}
      />
      <EventStackNavigator.Screen
        name="Event Details"
        component={EventDetailScreen}
        options={{ headerShown: true }}
      />
    </EventStackNavigator.Navigator>
  );
}

export default EventStack;
