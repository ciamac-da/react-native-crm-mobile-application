import React from "react";
import RandomNumber from "./RandomNumber";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

interface GameProps {
  randomNumberCount: number;
}

interface GameState {
  selectedNumbers: number[];
}

class Game extends React.Component<GameProps, GameState> {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state: GameState = {
    selectedNumbers: [],
  };
  randomNumbers = Array.from({
    length: this.props.randomNumberCount,
  }).map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  isNumberSlected = (numberIndex: number) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  };

  selectNumber = (numberIndex: number) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex],
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Cia's Sum Game</Text>
        <Text style={styles.target}>
          Sum of numbers should be: &nbsp;
          <Text style={styles.targetNumber}>{this.target}</Text>
        </Text>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <Text style={styles.randomNumber} key={index}>
              <RandomNumber
                number={randomNumber}
                id={index}
                isDisabled={this.isNumberSlected(index)}
                onPress={() => this.selectNumber(index)}
              />
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
  targetNumber: {
    fontWeight: 700,
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
    cursor: "pointer",
  },
});

export default Game;
