import { StyleSheet, Text, View } from "react-native";

const CharacterDetails = () => (
  <View style={styles.container}>
    <Text>Character Details</Text>
  </View>
);

export default CharacterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
