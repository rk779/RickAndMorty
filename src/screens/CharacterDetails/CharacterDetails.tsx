import { RouteProp, useRoute } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Character, CharacterLocationDetail } from "../../models/interfaces";
import { RootStackParamList } from "../../navigation/types";
import { WindowDimensions } from "../../utils";

const CharacterDetails: FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CharacterDetails">>();

  const [character, setCharacter] = useState<Character>();
  const [lastKnownLocation, setLastKnownLocation] =
    useState<CharacterLocationDetail>();
  const [originLocation, setOriginLocation] =
    useState<CharacterLocationDetail>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => getCharacter(), []);

  const getCharacter = () => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
      .then((response) => response.json())
      .then((item: Character) => {
        setCharacter(item);
        getCharacterLastKnownLocation(item);
        getCharacterOriginLocation(item);
      });
  };

  const getCharacterLastKnownLocation = (character: Character) => {
    fetch(character.location.url)
      .then((response) => response.json())
      .then((item: CharacterLocationDetail) => setLastKnownLocation(item))
      .catch((err) => console.info(err))
      .finally(() => setLoading(false));
  };

  const getCharacterOriginLocation = (character: Character) => {
    fetch(character.origin.url)
      .then((response) => response.json())
      .then((item: CharacterLocationDetail) => setOriginLocation(item))
      .catch((err) => console.info(err))
      .finally(() => setLoading(false));
  };

  const CharacterDetailRow: FC<{ label: string; value?: string }> = ({
    label,
    value,
  }) => (
    <Text style={styles.detailTextLabel}>
      {label} : <Text style={styles.detailText}>{value}</Text>
    </Text>
  );

  const CharacterDetail = () => (
    <View style={styles.detailContainer}>
      <Image
        source={{ uri: character?.image }}
        style={styles.image}
        resizeMode={"cover"}
      />
      <View style={styles.spacer} />
      <CharacterDetailRow label="Status" value={character?.status} />
      <CharacterDetailRow label="Species" value={character?.species} />
      <CharacterDetailRow label="Gender" value={character?.gender} />

      {lastKnownLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationHeader}>Last seen location</Text>
          <CharacterDetailRow label="Name" value={lastKnownLocation?.name} />
          <CharacterDetailRow label="Type" value={lastKnownLocation?.type} />
          <CharacterDetailRow
            label="Dimension"
            value={lastKnownLocation?.dimension}
          />
          <CharacterDetailRow
            label="Number of residents"
            value={lastKnownLocation?.residents.length.toString()}
          />
        </View>
      )}

      {originLocation && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationHeader}>Origin location</Text>
          <CharacterDetailRow label="Name" value={originLocation?.name} />
          <CharacterDetailRow label="Type" value={originLocation?.type} />
          <CharacterDetailRow
            label="Dimension"
            value={originLocation?.dimension}
          />
          <CharacterDetailRow
            label="Number of residents"
            value={originLocation?.residents.length.toString()}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size={"large"} /> : <CharacterDetail />}
    </SafeAreaView>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: WindowDimensions.height * 0.25,
    height: WindowDimensions.height * 0.25,
    borderRadius: (WindowDimensions.height * 0.25) / 2,
    alignSelf: "center",
    marginTop: 8,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  detailTextLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailText: {
    fontWeight: "normal",
  },
  locationContainer: {
    marginTop: 8,
  },
  locationHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  spacer: {
    marginTop: 8,
  },
});
