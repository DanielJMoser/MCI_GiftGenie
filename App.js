import { NavigationContainer } from "@react-navigation/native";
import MenuDrawer from "./navigation/MenuDrawer";
import AssignmentContextProvider from "./store/AssignmentContext";
import EventsContextProvider from "./store/EventsContext";
import PersonsContextProvider from "./store/PersonsContext";
import PresentsContextProvider from "./store/PresentsContext";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Require cycle']); // Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
// we know the reason for the require cycle, and would fix this in the 3rd sprint. We ignore the warning for the presentation only.

export default function App() {
  return (
    <PresentsContextProvider>
      <AssignmentContextProvider>
        <PersonsContextProvider>
          <EventsContextProvider>
            <NavigationContainer>
              <MenuDrawer />
            </NavigationContainer>
          </EventsContextProvider>
        </PersonsContextProvider>
      </AssignmentContextProvider>
    </PresentsContextProvider>
  );
}
