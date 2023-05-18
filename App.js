import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import NetOrGrossSection from "./components/NetOrGrossSection";
import SalaryInputSection from "./components/SalaryInputSection";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Header />
        <View style={styles.innerContainer}>
          <NetOrGrossSection />
          <SalaryInputSection />
        </View>
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
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
