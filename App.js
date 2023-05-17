import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import NetOrGrossSection from "./components/NetOrGrossSection";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <NetOrGrossSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b14f",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
