import { createStackNavigator } from "@react-navigation/stack";
import PresentsOverviewScreen from "../screens/PresentsOverviewScreen";
import PresentDetailScreen from "../screens/PresentDetailScreen";
import PresentsContextProvider from "../store/PresentsContext";
import PresentManageScreen from "../screens/PresentManageScreen";
import Colors from "../constants/colors";
import SaveButton from "../components/SaveButton";


const PresentStackNavigator = createStackNavigator();

function PresentStack() {
    return (
        
        <PresentsContextProvider>
            <PresentStackNavigator.Navigator
                screenOptions={{
                //headerMode: 'screen',
                    headerTintColor: Colors.primary500,
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: Colors.accent300 },
                }}
            >
            <PresentStackNavigator.Screen
                name="Presents Overview"
                component={PresentsOverviewScreen}
                options={{ headerShown: false }}
            />
            <PresentStackNavigator.Screen
                name="Present Details"
                component={PresentDetailScreen}
                options={{ headerShown: false }}
            />
            <PresentStackNavigator.Screen
                name="Add Present"
                component={PresentManageScreen}
                options={{ headerShown: false }}
            />
            </PresentStackNavigator.Navigator>
        </PresentsContextProvider>
    );
}

export default PresentStack;