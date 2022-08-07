import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Character } from "../models/interfaces";

interface CharacterCardProps {
  character: Character;
  onPress?: () => void;
}

const CharacterCard: FC<CharacterCardProps> = ({ character, onPress }) => (
  <Pressable
    onPress={onPress}
    android_ripple={styles.rippleConfig}
    style={styles.container}
  >
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{character.name}</Text>
        <Text>
          {character.status} - {character.species}
        </Text>
        <Text>{character.location.name}</Text>
      </View>
    </View>
  </Pressable>
);

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#d1d1d1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 8,
  },
  image: {
    width: 100,
    aspectRatio: 1,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  rippleConfig: {
    color: "gray",
    foreground: true,
  },
});
