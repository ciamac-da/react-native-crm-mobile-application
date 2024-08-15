import { StyleSheet, Text, View } from "react-native";
export default function Game() {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Sum Game </Text>
      <Text style={styles.target}>42</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 32,
    backgroundColor: "#0073AA",
  },
  headline: {
    padding: 16,
    fontSize: 32,
    fontWeight: 700,
  },
  target: {
    fontSize: 32,
    padding: 16,
    borderRadius: 5,
    color: "black",
    backgroundColor: "gold",
  },
});
