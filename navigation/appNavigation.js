import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs({
    'Non-serializable values were found in the navigation state': true,
});

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
         </NavigationContainer>
    )
}