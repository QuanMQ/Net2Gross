import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: "NET 2 GROSS",
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: "100%",
    padding: 12,
    backgroundColor: "#003ba7",
    position: "absolute",
    top: 25,
  },
  text: {
    color: "yellow",
    fontSize: 23,
    textAlign: "center",
  },
});

export default Header;
