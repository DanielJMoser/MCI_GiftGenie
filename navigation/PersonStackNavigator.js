import {createStackNavigator} from "@react-navigation/stack";
import PersonOverviewScreen from "../screens/PersonOverviewScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import Colors from "../constants/colors";


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
            </PersonStackNavigator.Navigator>
    );
}

export default PersonStack;