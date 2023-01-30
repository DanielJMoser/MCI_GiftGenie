import {createStackNavigator} from "@react-navigation/stack";
import PersonOverviewScreen from "../screens/PersonOverviewScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import Colors from "../constants/colors";
import ContactSelectionScreen from "../screens/ContactSelectionScreen";

const PersonStackNavigator = createStackNavigator();

function PersonStack() {

    return (
            <PersonStackNavigator.Navigator
                screenOptions={{
                    headerTintColor: Colors.primary500,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: Colors.accent500},
                }}
            >
                <PersonStackNavigator.Screen
                    name="Person Overview"
                    component={PersonOverviewScreen}
                    options={{headerShown: false}}
                />
                <PersonStackNavigator.Screen
                    name="Person Details"
                    component={PersonDetailScreen}/>
                <PersonStackNavigator.Screen
                    name="Contact Selection"
                    component={ContactSelectionScreen}/>
            </PersonStackNavigator.Navigator>
    );
}

export default PersonStack;