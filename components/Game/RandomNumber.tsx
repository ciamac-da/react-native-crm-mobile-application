import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import PropTypes from "prop-types";

interface RandomNumberProps {
  number: number;
}

interface RandomNumberState {
  isPressed: boolean;
}

class RandomNumber extends React.Component<
  RandomNumberProps,
  RandomNumberState
> {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

  state = {
    isPressed: false,
  };

  handlePress = () => {
    this.setState({ isPressed: !this.state.isPressed });
    console.log(this.props.number);
  };

  render() {
    const { isPressed } = this.state;
    const randomNumberStyle: TextStyle = isPressed
      ? styles.pressedNumber
      : styles.random;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={randomNumberStyle}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    alignItems: "center",
    fontSize: 24,
    color: "black",
    backgroundColor: "white",
    borderRadius: 8,
  },
  pressedNumber: {
    alignItems: "center",
    fontSize: 24,
    color: "#0073AA",
    fontWeight: 700,
  },
});

export default RandomNumber;
