import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Characters: undefined;
  CharacterDetails: {
    id: number | string;
    name: string;
  };
};

export type CharactersNavigatorProp = NativeStackNavigationProp<
  RootStackParamList,
  "Characters"
>;
