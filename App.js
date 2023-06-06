import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import Header from "./components/Header";
import NetOrGrossSection from "./components/NetOrGrossSection";
import SalaryInputSection from "./components/SalaryInputSection";
import DependentsSection from "./components/DependentsSection";
import InsuranceSection from "./components/InsuranceSection";
import RegionSection from "./components/RegionSection";
import SalaryResults from "./components/SalaryResults";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <AutocompleteDropdownContextProvider>
        <View style={styles.container}>
          <Header />
          <SafeAreaView style={{ width: "90%" }}>
            <ScrollView>
              <View style={styles.innerContainer}>
                <NetOrGrossSection />
                <SalaryInputSection />
                <DependentsSection />
                <InsuranceSection />
                <RegionSection />
                <SalaryResults />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </AutocompleteDropdownContextProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b14f",
    alignItems: "center",
    position: "relative",
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 105,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
