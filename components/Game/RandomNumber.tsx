import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

interface RandomNumberProps {
  number: number;
}

class RandomNumber extends React.Component<RandomNumberProps> {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };
  render() {
    return (
      <View>
        <Text style={styles.random}>{this.props.number}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    alignItems: "center",
    backgroundColor: "#0073AA",
  },
});

export default RandomNumber;
