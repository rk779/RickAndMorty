import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/types";
import { StatusBar } from "expo-status-bar";
import Characters from "./src/screens/Characters/Characters";
import CharacterDetails from "./src/screens/CharacterDetails/CharacterDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName="Characters">
        <Stack.Screen
          name="Characters"
          component={Characters}
          options={{
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetails}
          options={({ route }) => ({
            headerTitle: route.params.name,
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
