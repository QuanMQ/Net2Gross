import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useState, useContext, useEffect } from "react";
import {
  insertComma,
  regions,
  filterRegion,
  baseSalary,
  regionSalary,
  personalReductionRate,
  dependentReductionRate,
} from "../helpers/helperFunctions";
import { GlobalContext } from "../context/GlobalState";

function RegionSection() {
  const [focus, setFocus] = useState(false);
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { regionSelect } = useContext(GlobalContext);
  useEffect(() => {
    regionSelect(filterRegion(selectedRegion));
  }, [selectedRegion]);

  return (
    <View style={{ marginTop: 15, width: "90%" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 20 }}>Region</Text>
        <Pressable
          onPress={() => {
            setRegionModalVisible(true);
          }}
          hitSlop={10}
        >
          <Text style={{ fontSize: 17 }}>&#x2753;</Text>
        </Pressable>
      </View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        direction="up"
        initialValue={
          regions.all.find((province) => province.title === "Ho Chi Minh City")
            .id
        }
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onSelectItem={(item) => {
          item && setSelectedRegion(item.title);
        }}
        dataSet={regions.all}
        containerStyle={{
          borderColor: focus ? "#00b14f" : "#d9d9d9",
          borderStyle: "solid",
          borderWidth: 0.5,
          borderRadius: 5,
          padding: 2,
          marginTop: 5,
        }}
        inputContainerStyle={{ backgroundColor: "transparent" }}
        suggestionsListTextStyle={{ fontSize: 18 }}
        suggestionsListMaxHeight={250}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={regionModalVisible}
        onRequestClose={() => {
          setRegionModalVisible(!regionModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>REGION</Text>
                <View style={styles.divider}>
                  <Text>&nbsp;</Text>
                </View>
                <Text style={styles.modalText}>
                  Base salary: {insertComma(baseSalary)} VND
                </Text>
                <Text style={styles.modalText}>
                  Personal family deduction:{" "}
                  {insertComma(personalReductionRate)} VND / month
                </Text>
                <Text style={styles.modalText}>
                  Dependent: {insertComma(dependentReductionRate)} VND / person
                  / month
                </Text>
                <Text style={[styles.modalText, { marginTop: 10 }]}>
                  Regional minimum wage:
                </Text>
                <Text style={[styles.modalText, styles.modalTextBulletin]}>
                  &#x25FE; Region I: {insertComma(regionSalary.region1)}{" "}
                  VND/month
                </Text>
                <Text style={[styles.modalText, styles.modalTextBulletin]}>
                  &#x25FE; Region II: {insertComma(regionSalary.region2)}{" "}
                  VND/month
                </Text>
                <Text style={[styles.modalText, styles.modalTextBulletin]}>
                  &#x25FE; Region III: {insertComma(regionSalary.region3)}{" "}
                  VND/month
                </Text>
                <Text style={[styles.modalText, styles.modalTextBulletin]}>
                  &#x25FE; Region IV: {insertComma(regionSalary.region4)}{" "}
                  VND/month
                </Text>
                <Text style={[styles.modalText, { marginTop: 10 }]}>
                  Details of each region:
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    styles.modalTextBulletin,
                    { marginTop: 5 },
                  ]}
                >
                  &#x25FE; Region I, including the following areas:{" "}
                  {regions.region1.sort().join(", ")}
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    styles.modalTextBulletin,
                    { marginTop: 5 },
                  ]}
                >
                  &#x25FE; Region II, including the following areas:{" "}
                  {regions.region2.sort().join(", ")}
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    styles.modalTextBulletin,
                    { marginTop: 5 },
                  ]}
                >
                  &#x25FE; Region III, including the following areas:{" "}
                  {regions.region3.sort().join(", ")}
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    styles.modalTextBulletin,
                    { marginTop: 5 },
                  ]}
                >
                  &#x25FE; Region IV, including the remaining areas.
                </Text>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setRegionModalVisible(!regionModalVisible)}
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 18,
  },
  modalTextBulletin: {
    paddingLeft: 15,
  },
  divider: {
    height: 2,
    backgroundColor: "#eaeaf0",
    marginTop: 15,
    marginBottom: 10,
  },
});

export default RegionSection;
