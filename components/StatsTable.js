import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

const StatsTable = ({ stock }) => {
  const tableTitle1 = ["Open", stock.o, "High", stock.h];
  const tableTitle2 = ["Low", stock.l, "Prev", stock.pc];

  const col1 = ["Open", "Low"];
  const data1 = [[stock.o], [stock.l]];

  const col2 = ["High", "Prev"];
  const data2 = [[stock.h], [stock.pc]];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 0 }} style={{ width: "100%" }}>
        <TableWrapper style={styles.wrapper}>
          <Col data={col1} style={styles.title} textStyle={styles.coltext} />
          <Rows
            data={data1}
            flexArr={[1, 2]}
            style={styles.row}
            textStyle={styles.textvalues}
          />
        </TableWrapper>
      </Table>

      <Table borderStyle={{ borderWidth: 0 }} style={{ width: "100%" }}>
        <TableWrapper style={styles.wrapper}>
          <Col data={col2} style={styles.title} textStyle={styles.coltext} />
          <Rows
            data={data2}
            flexArr={[1, 2]}
            style={styles.row}
            textStyle={styles.textvalues}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
  },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, textAlign: "center" },
  text: { textAlign: "center" },
  textvalues: {
    textAlign: "center",
    color: "#939393",
    fontSize: 17,
  },
  coltext: { textAlign: "center", color: "white", fontSize: 17 },
  row: { height: 28 },
});

export default StatsTable;
