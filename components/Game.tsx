import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

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
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <Text style={styles.randomNumber} key={index}>
              {randomNumber}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0073AA",
  },
  headline: {
    color: "white",
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
    width: 300,
    textAlign: "center",
  },
  randomNumberContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  randomNumber: {
    padding: 32,
    fontSize: 20,
    width: 100,
    height: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 50,
    alignContent: "space-around",
  },
});

export default Game;
