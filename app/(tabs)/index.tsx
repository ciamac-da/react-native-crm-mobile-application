import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Button } from "@react-native-material/core";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
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
