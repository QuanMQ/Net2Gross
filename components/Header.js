import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        NET <Text style={styles.symbol}>&#x21CC;</Text> GROSS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 75,
    width: "100%",
    paddingTop: 26,
    paddingBottom: 5,
    backgroundColor: "#003ba7",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
  symbol: {
    fontSize: 30,
  },
});

export default Header;
