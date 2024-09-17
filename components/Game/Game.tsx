import React from "react";
import RandomNumber from "./RandomNumber";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

interface GameProps {
  randomNumberCount: number;
  initialSeconds: number;
}

interface GameState {
  selectedIds: number[];
  remainingSeconds: number;
}

class Game extends React.Component<GameProps, GameState> {
  intervalId: NodeJS.Timeout | null = null;

  static defaultProps = {
    initialSeconds: 10,
  };

  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };

  state: GameState = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds || 10,
  };

  randomNumbers = this.generateRandomNumbers();

  target = this.calculateTarget(this.randomNumbers);

  generateRandomNumbers() {
    return Array.from({
      length: this.props.randomNumberCount,
    }).map(() => 1 + Math.floor(10 * Math.random()));
  }

  calculateTarget(randomNumbers: number[]) {
    return randomNumbers
      .slice(0, this.props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);
  }

  resetGame = () => {
    const randomNumbers = this.generateRandomNumbers();
    const target = this.calculateTarget(randomNumbers);
    this.setState({
      selectedIds: [],
      remainingSeconds: this.props.initialSeconds || 10,
    });
    this.randomNumbers = randomNumbers;
    this.target = target;

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            if (this.intervalId !== null) {
              clearInterval(this.intervalId);
            }
          }
        }
      );
    }, 1000);
  };

  componentDidMount(): void {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            if (this.intervalId !== null) {
              clearInterval(this.intervalId);
            }
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  isNumberSelected = (numberIndex: number) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = (numberIndex: number) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  gameStatus = (): "PLAYING" | "WON" | "LOST" => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (this.state.remainingSeconds === 0) {
      return "LOST";
    }
    if (sumSelected < this.target) {
      return "PLAYING";
    }
    if (sumSelected === this.target && this.state.remainingSeconds > 0) {
      return "WON";
    }
    return "LOST";
  };

  componentDidUpdate(prevProps: GameProps, prevState: GameState) {
    const gameStatus = this.gameStatus();
    if (gameStatus === "WON") {
      setTimeout(this.resetGame, 1000); // Startet das Spiel nach einem Sieg neu, nach 1 Sekunde Verzögerung
    }
  }

  render() {
    const gameStatus = this.gameStatus();
    const statusStyle = styles[`GAME_STATUS_${gameStatus}`];
    return (
      <View style={styles.container}>
        <Text style={styles.target}>
          Sum of numbers should be: &nbsp;
          <Text style={[styles.targetNumber, styles[`STATUS_${gameStatus}`]]}>
            {this.target}
          </Text>
        </Text>
        <Text style={[statusStyle]}>Current status is: {gameStatus}</Text>
        <Text style={[statusStyle]}>
          Remaining Time is: {this.state.remainingSeconds}
        </Text>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((randomNumber, index) => (
            <Text style={styles.randomNumber} key={index}>
              <RandomNumber
                number={randomNumber}
                id={index}
                isDisabled={
                  this.isNumberSelected(index) || gameStatus !== "PLAYING"
                }
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
    padding: 8,
    backgroundColor: "#0073AA",
    overflow: "scroll",
  },
  target: {
    fontSize: 18,
    padding: 16,
    borderRadius: 5,
    color: "white",
    fontWeight: 700,
    width: 300,
    textAlign: "center",
  },
  targetNumber: {
    fontWeight: 700,
    fontSize: 56,
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
    width: 85,
    height: 85,
    marginHorizontal: 15,
    marginVertical: 25,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 50,
    alignContent: "space-around",
    cursor: "pointer",
  },
  STATUS_PLAYING: {
    color: "gold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  STATUS_WON: {
    color: "green",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  STATUS_LOST: {
    color: "red",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  GAME_STATUS_PLAYING: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "gold",
    color: "white",
    padding: 30,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 700,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  GAME_STATUS_WON: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "green",
    color: "white",
    padding: 30,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 700,
  },
  GAME_STATUS_LOST: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    padding: 30,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 700,
  },
});

export default Game;
