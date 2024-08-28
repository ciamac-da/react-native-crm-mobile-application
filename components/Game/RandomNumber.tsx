import React from "react";
import { StyleSheet, Text, TouchableOpacity, TextStyle } from "react-native";
import PropTypes from "prop-types";

interface RandomNumberProps {
  id: number;
  number: number;
  isDisabled: boolean;
  onPress: (id: number) => void;
}

class RandomNumber extends React.Component<RandomNumberProps> {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    if (!this.props.isDisabled) {
      this.props.onPress(this.props.id);
    }
  };
  render() {
    const { number, isDisabled } = this.props;
    const randomNumberStyle: TextStyle = isDisabled
      ? styles.pressedNumber
      : styles.random;

    return (
      <TouchableOpacity onPress={this.handlePress} disabled={isDisabled}>
        <Text style={randomNumberStyle}>{number}</Text>
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
    fontSize: 32,
    color: "#0073AA",
    fontWeight: 700,
    opacity: 0.5,
  },
});

export default RandomNumber;
