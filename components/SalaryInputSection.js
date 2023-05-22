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

const modalText = {
  net: {
    title: "NET SALARY",
    content:
      "Net salary is the salary for each pay period that you can take home.",
  },
  gross: {
    title: "GROSS SALARY",
    content:
      "Gross salary is your total salary that the company pays each pay period. Including taxes and insurance.",
  },
};

function SalaryInputSection() {
  const [salary, setSalary] = useState("");
  const [focus, setFocus] = useState(false);
  const [currencyInput, setCurrencyInput] = useState("vnd");
  const [modalVisible, setModalVisible] = useState(false);
  const {
    state: { netOrGross },
    currencySelect,
    salarySet,
  } = useContext(GlobalContext);
  useEffect(() => {
    currencySelect(currencyInput);
  }, [currencyInput]);
  useEffect(() => {
    salary ? salarySet(parseInt(salary)) : salarySet(0);
  }, [salary]);

  return (
    <View style={{ marginTop: 15, width: "90%" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20 }}>
          {netOrGross.replace(netOrGross[0], netOrGross[0].toUpperCase())}{" "}
          salary
        </Text>
        <Pressable
          onPress={() => {
            setModalVisible(true);
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
            style={[
              styles.currencyButton,
              currencyInput === "vnd" && styles.currencyButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.currencyText,
                currencyInput === "vnd" && styles.currencyTextSelected,
              ]}
            >
              VND
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCurrencyInput("usd");
            }}
            style={[
              styles.currencyButton,
              currencyInput === "usd" && styles.currencyButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.currencyText,
                currencyInput === "usd" && styles.currencyTextSelected,
              ]}
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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalText[netOrGross].title}</Text>
            <Text style={styles.modalText}>
              {modalText[netOrGross].content}
            </Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
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
    backgroundColor: "#e5f7ed",
  },
  currencyText: {
    fontSize: 20,
  },
  currencyTextSelected: {
    color: "#00b14f",
  },
});

export default SalaryInputSection;
