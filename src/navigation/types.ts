import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type HomeNavigatorProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
