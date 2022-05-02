import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

const AboutTable = ({ stock }) => {
  // const col=["Start date", "Industry","Website","Exchange","Market Cap"]

  return (
    <View style={styles.container}>
      <View style={styles.leftview}>
        <Text style={styles.text}>Startdate</Text>
        <Text style={styles.text}>Industry</Text>
        <Text style={styles.text}>Website</Text>
        <Text style={styles.text}>Exchange</Text>
        <Text style={styles.text}>Market Cap</Text>
      </View>

      <View style={styles.rightview}>
        <Text style={styles.righttext}>{stock.ipo}</Text>
        <Text style={styles.righttext}>{stock.finnhubIndustry}</Text>
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(`${stock.weburl}`)}
        >
          {stock.weburl}
        </Text>
        <Text style={styles.righttext}>{stock.exchange}</Text>
        <Text style={styles.righttext}>{stock.marketCapitalization}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "pink",
    marginTop: 10,
    width: "100%",
  },
  text: {
    color: "white",
  },
  righttext: {
    color: "#939393",
  },
  leftview: {
    display: "flex",
    textAlign: "left",
    width: "30%",
    // backgroundColor: "blue",
  },
  rightview: {
    display: "flex",
    textAlign: "left",
  },
});
export default AboutTable;
