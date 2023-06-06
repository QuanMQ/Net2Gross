import {
  StyleSheet,
  Pressable,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { useState, useContext } from "react";
import {
  insertComma,
  socialInsuranceRate,
  socialInsuranceRateForEmployer,
  healthInsuranceRate,
  healthInsuranceRateForEmployer,
  unemploymentInsuranceRate,
  unemploymentInsuranceRateForEmployer,
  grossToNet,
  netToGross,
} from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function SalaryResults() {
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const {
    state: {
      netOrGross,
      salaryInput,
      currency,
      exchangeRate,
      dependents,
      insurance,
      insuranceInput,
      region,
    },
  } = useContext(GlobalContext);
  const {
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    employerPay,
    incomeBeforeTax,
    personalReductionRate,
    dependentReduction,
    taxableIncome,
    incomeTax,
    salaryInputData,
    salaryOutput,
  } =
    netOrGross === "net"
      ? netToGross(
          salaryInput,
          currency,
          exchangeRate,
          dependents,
          insurance,
          insuranceInput,
          region
        )
      : grossToNet(
          salaryInput,
          currency,
          exchangeRate,
          dependents,
          insurance,
          insuranceInput,
          region
        );

  return (
    <View style={styles.resultsBox}>
      <View style={styles.resultsBoxTitle}>
        <Text style={styles.resultsText}>Conversion Results</Text>
        <Pressable
          onPress={() => {
            setResultsModalVisible(true);
          }}
          hitSlop={10}
        >
          <Text style={[styles.resultsText, { color: "#005aff" }]}>
            View Details
          </Text>
        </Pressable>
      </View>
      <Text style={{ color: "#848484", fontSize: 15 }}>
        (1 USD = {insertComma(exchangeRate)} VND)
      </Text>
      <View style={[styles.resultsSalary, { marginTop: 10 }]}>
        <Text style={[styles.resultsText, { fontWeight: "bold" }]}>
          {netOrGross.toUpperCase()}
        </Text>
        <View>
          <Text
            style={[
              styles.resultsText,
              { color: "#ff7d55", textAlign: "right" },
            ]}
          >
            {currency === "vnd"
              ? insertComma(salaryInputData.vnd)
              : insertComma(salaryInputData.usd)}{" "}
            {currency === "vnd" ? "VND" : "USD"}
          </Text>
          <Text
            style={[
              styles.resultsText,
              { color: "#848484", textAlign: "right" },
            ]}
          >
            {currency === "vnd"
              ? insertComma(salaryInputData.usd)
              : insertComma(salaryInputData.vnd)}{" "}
            {currency === "vnd" ? "USD" : "VND"}
          </Text>
        </View>
      </View>
      <View style={[styles.resultsSalary, { marginTop: 5 }]}>
        <Text style={[styles.resultsText, { fontWeight: "bold" }]}>
          {netOrGross === "net" ? "GROSS" : "NET"}
        </Text>
        <View>
          <Text
            style={[
              styles.resultsText,
              { color: "#ff7d55", textAlign: "right" },
            ]}
          >
            {currency === "vnd"
              ? insertComma(salaryOutput.vnd)
              : insertComma(salaryOutput.usd)}{" "}
            {currency === "vnd" ? "VND" : "USD"}
          </Text>
          <Text
            style={[
              styles.resultsText,
              { color: "#848484", textAlign: "right" },
            ]}
          >
            {currency === "vnd"
              ? insertComma(salaryOutput.usd)
              : insertComma(salaryOutput.vnd)}{" "}
            {currency === "vnd" ? "USD" : "VND"}
          </Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={resultsModalVisible}
        onRequestClose={() => {
          setResultsModalVisible(!resultsModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Conversion Results</Text>
                <View style={styles.divider}>
                  <Text>&nbsp;</Text>
                </View>
                <Text style={styles.modalText}>
                  Employee receives (in {currency.toUpperCase()}):
                </Text>
                <View style={styles.resultsDetails}>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    GROSS salary
                  </Text>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    {insertComma(
                      netOrGross === "gross"
                        ? salaryInputData[currency]
                        : salaryOutput[currency]
                    )}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Social insurance ({socialInsuranceRate * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    - {insertComma(socialInsurance)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Health insurance ({healthInsuranceRate * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    - {insertComma(healthInsurance)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Unemployment insurance ({unemploymentInsuranceRate * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    - {insertComma(unemploymentInsurance)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>Income before tax</Text>
                  <Text style={styles.modalText}>
                    {insertComma(incomeBeforeTax)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>Reduction for personal</Text>
                  <Text style={styles.modalText}>
                    - {insertComma(personalReductionRate)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>Reduction for dependant</Text>
                  <Text style={styles.modalText}>
                    {dependentReduction > 0 && "-"}{" "}
                    {insertComma(dependentReduction)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>Taxable income</Text>
                  <Text style={styles.modalText}>
                    {insertComma(taxableIncome)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>Personal income tax</Text>
                  <Text style={styles.modalText}>
                    {incomeTax > 0 && "-"} {insertComma(incomeTax)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    NET salary
                  </Text>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    {insertComma(
                      netOrGross === "net"
                        ? salaryInputData[currency]
                        : salaryOutput[currency]
                    )}
                  </Text>
                </View>
                <View style={styles.divider}>
                  <Text>&nbsp;</Text>
                </View>
                <Text style={styles.modalText}>
                  Employer pays (in {currency.toUpperCase()}):
                </Text>
                <View style={styles.resultsDetails}>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    GROSS salary
                  </Text>
                  <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                    {insertComma(
                      netOrGross === "gross"
                        ? salaryInputData[currency]
                        : salaryOutput[currency]
                    )}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Social insurance ({socialInsuranceRateForEmployer * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    {insertComma(employerPay.socialInsuranceByEmployer)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Health insurance ({healthInsuranceRateForEmployer * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    {insertComma(employerPay.healthInsuranceByEmployer)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>
                    Unemployment insurance (
                    {unemploymentInsuranceRateForEmployer * 100}%)
                  </Text>
                  <Text style={styles.modalText}>
                    {insertComma(employerPay.unemploymentInsuranceByEmployer)}
                  </Text>
                </View>
                <View style={styles.resultsDetails}>
                  <Text style={styles.modalText}>TOTAL</Text>
                  <Text style={styles.modalText}>
                    {insertComma(employerPay.total)}
                  </Text>
                </View>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setResultsModalVisible(!resultsModalVisible)}
                  hitSlop={10}
                >
                  <Text style={styles.buttonCloseIcon}>&#x2715;</Text>
                </Pressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  resultsBox: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#c0eed4",
    borderRadius: 5,
    padding: 10,
  },
  resultsText: {
    fontSize: 19,
  },
  resultsBoxTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultsSalary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f7faff",
    padding: 10,
  },
  resultsDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalView: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonClose: {
    position: "absolute",
    left: 15,
    top: 10,
  },
  buttonCloseIcon: {
    fontSize: 20,
    color: "#bdbdbd",
  },
  modalTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 18.5,
  },
  divider: {
    height: 2,
    backgroundColor: "#eaeaf0",
    marginTop: 15,
  },
});

export default SalaryResults;
