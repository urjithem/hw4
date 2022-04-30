import { StyleSheet, View, Text, StatusBar } from "react-native";
import React, { useContext } from "react";
import { format } from "date-fns";
import { Context } from "../App";
import Swipeable from "react-native-gesture-handler/Swipeable";
const date = new Date();
var formattedDate = format(date, "MMMM do").toString().slice(0, -2);
console.log(formattedDate);

const HomeScreen = ({ navigation }) => {
  const value = useContext(Context);
  console.log(value);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8f21a6" />
      <View style={styles.header}>
        <View style={styles.right}>
          <View style={styles.firstline}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              STOCK WATCH
            </Text>
          </View>
          <View style={styles.secondline}>
            <Text style={{ alignSelf: "flex-end", color: "white" }}>
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={{ color: "white", fontSize: 20 }}>Favorites</Text>
        {value.favorites.length === 0 ? (
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 2,
              marginTop: 10,
            }}
          ></View>
        ) : (
          <View>
            {value.favorites.map((stock, idx) => (
              <View
                // onSwipeableOpen={(direction) => {
                //   if (direction) {
                //     console.log("swiped left");
                //   }
                // }}
                key={idx}
                style={{
                  display: "flex",
                  borderTopColor: "white",
                  borderTopWidth: 2,
                  marginTop: 20,
                  paddingTop: 20,
                }}
              >
                <Text style={{ color: "white" }}>{stock.ticker}</Text>
                <Text style={{ color: "white" }}>{stock.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    // alignItems: "center",
    // justifyContent: "center",
    color: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "#000000",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // flex: 1,
  },
  right: {
    display: "flex",
    flexDirection: "column",
  },
  body: {
    backgroundColor: "pink",
    color: "white",
    flex: 1,
    display: "flex",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
