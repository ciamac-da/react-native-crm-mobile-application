import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

// Define the type for the component props
interface GameProps {
  randomNumberCount: number;
}

class Game extends React.Component<GameProps> {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  randomNumbers = Array.from({
    length: this.props.randomNumberCount,
  }).map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Sum Game</Text>
        <Text style={styles.target}>{this.target}</Text>
        {this.randomNumbers.map((randomNumber, index) => (
          <Text key={index}>{randomNumber}</Text>
        ))}
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
    fontWeight: "700", // Corrected fontWeight value
  },
  target: {
    fontSize: 32,
    padding: 16,
    borderRadius: 5,
    color: "black",
    backgroundColor: "gold",
    width: 300,
    textAlign: "center",
  },
});

export default Game;
