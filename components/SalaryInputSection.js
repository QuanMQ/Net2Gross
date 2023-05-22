import {
  Modal,
  StyleSheet,
  Pressable,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import ExchangeRateSection from "./ExchangeRateSection";
import { insertComma } from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function SalaryInputSection() {
  const [salary, setSalary] = useState("");
  const [focus, setFocus] = useState(false);
  const [currencyInput, setCurrencyInput] = useState("vnd");
  const [netModalVisible, setNetModalVisible] = useState(false);
  const [grossModalVisible, setGrossModalVisible] = useState(false);
  const {
    state: { netOrGross },
    currencySelect,
    salarySet,
  } = useContext(GlobalContext);
  useEffect(() => {
    currencySelect(currencyInput);
  }, [currencyInput]);
  useEffect(() => {
    salarySet(parseInt(salary));
  }, [salary]);

  return (
    <View style={{ marginTop: 10, width: "90%" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20 }}>
          {netOrGross.replace(netOrGross[0], netOrGross[0].toUpperCase())}{" "}
          salary
        </Text>
        <Pressable
          onPress={() => {
            netOrGross === "net" && setNetModalVisible(true);
            netOrGross === "gross" && setGrossModalVisible(true);
          }}
        >
          <Text style={{ fontSize: 17 }}>&#x2753;</Text>
        </Pressable>
      </View>
      <View style={styles.salarySection}>
        <SafeAreaView style={{ flex: 1.5 }}>
          <TextInput
            value={insertComma(salary)}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onChangeText={(text) => {
              const regex = /^[^0a-zA-Z]*[1-9][0-9]{0,2},?([0-9]{0,3},?)*/g;
              regex.test(text)
                ? setSalary(text)
                : setSalary((prev) => (text === "" ? "" : prev));
            }}
            keyboardType="number-pad"
            placeholder="Input salary"
            style={[styles.input, focus && styles.inputFocused]}
          />
        </SafeAreaView>
        <View style={styles.currency}>
          <Pressable
            onPress={() => {
              setCurrencyInput("vnd");
            }}
            style={
              currencyInput === "vnd"
                ? styles.currencyButtonSelected
                : styles.currencyButton
            }
          >
            <Text
              style={
                currencyInput === "vnd"
                  ? styles.currencyTextSelected
                  : styles.currencyText
              }
            >
              VND
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCurrencyInput("usd");
            }}
            style={
              currencyInput === "usd"
                ? styles.currencyButtonSelected
                : styles.currencyButton
            }
          >
            <Text
              style={
                currencyInput === "usd"
                  ? styles.currencyTextSelected
                  : styles.currencyText
              }
            >
              USD
            </Text>
          </Pressable>
        </View>
      </View>
      {currencyInput === "usd" && <ExchangeRateSection />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={netModalVisible}
        onRequestClose={() => {
          setNetModalVisible(!netModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>NET SALARY</Text>
            <Text style={styles.modalText}>
              Net salary is the salary for each pay period that you can take
              home.
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setNetModalVisible(!netModalVisible)}
            >
              <Text style={styles.buttonCloseIcon}>&#x2715;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={grossModalVisible}
        onRequestClose={() => {
          setGrossModalVisible(!grossModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>GROSS SALARY</Text>
            <Text style={styles.modalText}>
              Gross salary is your total salary that the company pays each pay
              period. Including taxes and insurance.
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setGrossModalVisible(!grossModalVisible)}
            >
              <Text style={styles.buttonCloseIcon}>&#x2715;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  salarySection: {
    flexDirection: "row",
    marginTop: 5,
    columnGap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalView: {
    height: "25%",
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
  },
  buttonClose: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  buttonCloseIcon: {
    fontSize: 20,
    color: "#bdbdbd",
  },
  modalTitle: {
    marginBottom: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 18,
  },
  input: {
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: "#00b14f",
  },
  currency: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderRadius: 5,
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 1,
  },
  currencyButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfc",
    borderRadius: 5,
  },
  currencyButtonSelected: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5f7ed",
    borderRadius: 5,
  },
  currencyText: {
    fontSize: 20,
  },
  currencyTextSelected: {
    color: "#00b14f",
    fontSize: 20,
  },
});

export default SalaryInputSection;
