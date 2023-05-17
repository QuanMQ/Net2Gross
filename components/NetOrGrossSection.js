import { StyleSheet, Pressable, Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function NetOrGrossSection() {
  const [salary, setSalary] = useState("net");
  const { netOrGrossSelect } = useContext(GlobalContext);
  useEffect(() => {
    netOrGrossSelect(salary);
  }, [salary]);

  return (
    <View style={styles.innerContainer}>
      <View style={styles.netOrGrossSection}>
        <Pressable
          onPress={() => {
            setSalary("net");
          }}
          style={
            salary === "net"
              ? styles.netOrGrossButtonSelected
              : styles.netOrGrossButton
          }
        >
          <Text
            style={
              salary === "net"
                ? styles.netOrGrossTextSelected
                : styles.netOrGrossText
            }
          >
            Net -{">"} Gross
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSalary("gross");
          }}
          style={
            salary === "gross"
              ? styles.netOrGrossButtonSelected
              : styles.netOrGrossButton
          }
        >
          <Text
            style={
              salary === "gross"
                ? styles.netOrGrossTextSelected
                : styles.netOrGrossText
            }
          >
            Gross -{">"} Net
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  netOrGrossSection: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    marginVertical: 15,
    padding: 5,
    borderRadius: 5,
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 1,
  },
  netOrGrossButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbfc",
    borderRadius: 5,
  },
  netOrGrossButtonSelected: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5f7ed",
    borderRadius: 5,
  },
  netOrGrossText: {
    fontSize: 20,
  },
  netOrGrossTextSelected: {
    color: "#00b14f",
    fontSize: 20,
  },
});

export default NetOrGrossSection;
