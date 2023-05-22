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
    <View style={styles.netOrGrossSection}>
      <Pressable
        onPress={() => {
          setSalary("net");
        }}
        style={[
          styles.netOrGrossButton,
          salary === "net" && styles.netOrGrossButtonSelected,
        ]}
      >
        <Text
          style={[
            styles.netOrGrossText,
            salary === "net" && styles.netOrGrossTextSelected,
          ]}
        >
          Net &rarr; Gross
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setSalary("gross");
        }}
        style={[
          styles.netOrGrossButton,
          salary === "gross" && styles.netOrGrossButtonSelected,
        ]}
      >
        <Text
          style={[
            styles.netOrGrossText,
            salary === "gross" && styles.netOrGrossTextSelected,
          ]}
        >
          Gross &rarr; Net
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  netOrGrossSection: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    marginTop: 15,
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
    backgroundColor: "#e5f7ed",
  },
  netOrGrossText: {
    fontSize: 20,
  },
  netOrGrossTextSelected: {
    color: "#00b14f",
  },
});

export default NetOrGrossSection;
