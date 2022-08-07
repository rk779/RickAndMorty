import { useNavigation } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import CharacterCard from "../../components/CharacterCard";
import { Character } from "../../models/interfaces";
import { CharactersNavigatorProp } from "../../navigation/types";

const Characters: FC = () => {
  const navigator = useNavigation<CharactersNavigatorProp>();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  useEffect(() => getData(), []);

  const getData = () => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then(({ info, results }) => {
        if (info?.next !== null) {
          setPage(page + 1);
        }
        setCharacters([...characters, ...results]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onPressCharacter = (character: Character) => {
    navigator.navigate("CharacterDetails", {
      id: character.id,
      name: character.name,
    });
  };

  const renderFooterItem = () => <View style={styles.footer} />;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.indicator} size={"large"} />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <CharacterCard
              character={item}
              onPress={() => onPressCharacter(item)}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          ListFooterComponent={renderFooterItem()}
          onEndReached={() => getData()}
        />
      )}
    </SafeAreaView>
  );
};

export default Characters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    paddingTop: 8,
  },
  footer: {
    paddingBottom: 8,
  },
});
