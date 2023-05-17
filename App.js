import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import NetOrGrossSection from "./components/NetOrGrossSection";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Header />
        <NetOrGrossSection />
      </View>
    </GlobalProvider>
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
