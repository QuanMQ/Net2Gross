import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useContext, useEffect } from "react";
import { insertComma } from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function InsuranceSection() {
  const [selectedInsurance, setSelectedInsurance] = useState("full");
  const [insuranceInput, setInsuranceInput] = useState("");
  const [selectFocus, setSelectFocus] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const { insuranceSelect, insuranceSet } = useContext(GlobalContext);
  useEffect(() => {
    insuranceSelect(selectedInsurance);
  }, [selectedInsurance]);
  useEffect(() => {
    insuranceInput ? insuranceSet(parseInt(insuranceInput)) : insuranceSet(0);
  }, [insuranceInput]);

  return (
    <View style={{ width: "90%" }}>
      <Text style={styles.title}>Insurance on</Text>
      <View
        style={[
          styles.pickerContainer,
          selectFocus && styles.pickerContainerFocused,
        ]}
      >
        <Picker
          selectedValue={selectedInsurance}
          onFocus={() => {
            setSelectFocus(true);
          }}
          onBlur={() => {
            setSelectFocus(false);
          }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedInsurance(itemValue)
          }
          mode="dropdown"
          dropdownIconColor={"white"}
          dropdownIconRippleColor={"transparent"}
        >
          <Picker.Item
            label={`${selectedInsurance === "full" ? "⚫" : "⚪"} Full wage`}
            value="full"
            style={styles.pickerItem}
          />
          <Picker.Item
            label={`${selectedInsurance === "other" ? "⚫" : "⚪"} Other`}
            value="other"
            style={styles.pickerItem}
          />
        </Picker>
      </View>
      <Text
        style={[
          styles.title,
          selectedInsurance === "full" && { color: "#999" },
        ]}
      >
        Salary paid for insurance
      </Text>
      <SafeAreaView>
        <TextInput
          value={insertComma(insuranceInput)}
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          onChangeText={(text) => {
            const regex = /^[^0a-zA-Z]*[1-9][0-9]{0,2},?([0-9]{0,3},?)*/g;
            regex.test(text)
              ? setInsuranceInput(text)
              : setInsuranceInput((prev) => (text === "" ? "" : prev));
          }}
          keyboardType="number-pad"
          style={[
            styles.input,
            inputFocus && styles.inputFocused,
            selectedInsurance === "full" && { backgroundColor: "#f6f8fb" },
          ]}
          editable={selectedInsurance === "full" ? false : true}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 15,
  },
  pickerContainer: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 2,
    marginTop: 5,
  },
  pickerContainerFocused: {
    borderColor: "#00b14f",
  },
  pickerItem: {
    fontSize: 18,
  },
  input: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: "#00b14f",
  },
});

export default InsuranceSection;
