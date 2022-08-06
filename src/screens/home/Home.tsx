import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeNavigatorProp } from "../../navigation/types";

const Home = () => {
  const navigator = useNavigation<HomeNavigatorProp>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigator.navigate("Details")}>
        <Text>Home</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
