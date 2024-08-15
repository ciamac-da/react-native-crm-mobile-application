import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Button } from "@react-native-material/core";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Target Sum!</Text>
      <StatusBar barStyle="default" />
      <Button title="Button" onPress={() => alert("Hi!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
