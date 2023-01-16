import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MenuDrawer from "./navigation/MenuDrawer";
import Navigator from "./navigation/Navigator";
import AssignmentContextProvider from "./store/AssignmentContext";
import EventsContextProvider from "./store/EventsContext";
import PersonsContextProvider from "./store/PersonsContext";
import PresentsContextProvider from "./store/PresentsContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AssignmentContextProvider>
      <PersonsContextProvider>
        <EventsContextProvider>
          <PresentsContextProvider>
            <NavigationContainer>
              <MenuDrawer />
            </NavigationContainer>
          </PresentsContextProvider>  
        </EventsContextProvider>
      </PersonsContextProvider>
    </AssignmentContextProvider>
  );
}
