import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { useState, useContext, useEffect } from "react";
import { insertComma } from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function ExchangeRateSection() {
  const [exchangeRateInput, setExchangeRateInput] = useState("23300");
  const { exchangeRateSet } = useContext(GlobalContext);
  useEffect(() => {
    exchangeRateSet(parseInt(exchangeRateInput));
  }, [exchangeRateInput]);

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Exchange Rate</Text>
        <Text style={styles.title}>1 USD =</Text>
      </View>
      <SafeAreaView>
        <TextInput
          value={insertComma(exchangeRateInput)}
          textAlign="right"
          onChangeText={(text) => {
            const regex = /^[^0a-zA-Z]*[1-9][0-9]{0,2},?([0-9]{0,3},?)*/g;
            regex.test(text)
              ? setExchangeRateInput(text)
              : setExchangeRateInput((prev) => (text === "" ? "23300" : prev));
          }}
          keyboardType="number-pad"
          style={styles.input}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
  },
  input: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginTop: 5,
  },
});

export default ExchangeRateSection;
