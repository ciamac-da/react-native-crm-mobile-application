import React from "react";
import { StyleSheet, Text, View } from "react-native";
class Game extends React.Component {
  target = 10 + Math.floor(40 * Math.random());
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Sum Game </Text>
        <Text style={styles.target}>{this.target}</Text>
      </View>
    );
  }
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

export default Game;
