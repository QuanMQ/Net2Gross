import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { useState, useContext, useEffect } from "react";
import { insertComma } from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function ExchangeRateSection() {
  const [exchangeRateInput, setExchangeRateInput] = useState("23400");
  const [focus, setFocus] = useState(false);
  const { exchangeRateSet } = useContext(GlobalContext);
  useEffect(() => {
    exchangeRateInput
      ? exchangeRateSet(parseInt(exchangeRateInput.replace(/,/g, "")))
      : exchangeRateSet(23400);
  }, [exchangeRateInput]);

  return (
    <View style={{ marginTop: 15 }}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Exchange Rate</Text>
        <Text style={styles.title}>1 USD =</Text>
      </View>
      <SafeAreaView>
        <TextInput
          value={insertComma(exchangeRateInput)}
          textAlign="right"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChangeText={(text) => {
            const regex = /^[^0a-zA-Z]*[1-9][0-9]{0,2},?([0-9]{0,3},?)*$/g;
            regex.test(text)
              ? setExchangeRateInput(text)
              : setExchangeRateInput((prev) => (text === "" ? "" : prev));
          }}
          keyboardType="number-pad"
          style={[styles.input, focus && styles.inputFocused]}
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
  inputFocused: {
    borderColor: "#00b14f",
  },
});

export default ExchangeRateSection;
