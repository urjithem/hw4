import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../App";
import axios from "axios";
import SnackbarComponent from "react-native-snackbar-component";

const StockScreen = ({ navigation }) => {
  const value = useContext(Context);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  console.log("value inside stockscreen= ", value);
  const addToFavorites = () => {
    console.log("added to favorites");
    setSnackbarText(`${value.stock.ticker} was added to watchlist`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 1000);
    value.setFavorites((prev) => [...prev, value.stock]);
    console.log("after adding favorite=", value);
  };

  const removeFromFavorites = () => {
    setSnackbarText(`${value.stock.ticker} was removed from watchlist`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 1000);
    value.setFavorites((prev) =>
      prev.filter((movie) => movie.ticker !== value.stock.ticker)
    );
  };

  useEffect(() => {
    fetchStockDetails();
  }, []);

  const fetchStockDetails = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${value.stockSymbol}&token=c9m7o2aad3i9qg80oe70`
      );
      console.log("res= ", res);
      console.log("stock price details= ", res.data);
      value.setStock((prev) => ({ ...prev, ...res.data }));
      setLoading(false);
    } catch (err) {
      console.log("err= ", err);
      setLoading(false);
      setError(true);
    }
  };

  const isFavorite = () => {
    console.log("value.stock= ", value.stock);
    let flag;
    value.favorites.forEach((obj) => {
      if (obj["ticker"] === value.stock.ticker) {
        console.log("current stock is part of favorites");
        flag = true;
        return true;
      }
    });

    if (flag) return true;
    console.log("Stock not in favorites");
    return false;
  };

  return (
    <View style={styles.container}>
      <SnackbarComponent
        visible={snackbarVisible}
        textMessage={snackbarText}
        backgroundColor="white"
        messageColor="black"
      />
      <StatusBar backgroundColor="#1e1e1e" />

      <View style={styles.header}>
        {/* <Button title="" onPress={() => navigation.goBack()}></Button> */}
        <Icon.Button
          backgroundColor={null}
          onPress={() => {
            // value.setStock(null);
            navigation.goBack();
          }}
          name="angle-left"
          color="white"
        />

        <Text style={{ color: "#939393", alignSelf: "center" }}>Details</Text>
        {isFavorite() ? (
          <Icon.Button
            backgroundColor={null}
            onPress={removeFromFavorites}
            name="star"
            color="white"
          />
        ) : (
          <Icon.Button
            backgroundColor={null}
            onPress={addToFavorites}
            name="star-o"
            color="white"
          />
        )}
      </View>

      {error ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 30,
            }}
          >
            Failed to fetch stock data
          </Text>
        </View>
      ) : (
        <>
          {loading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ActivityIndicator size="large" color="#8f21a6" />
            </View>
          ) : (
            <View>
              <View
                style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
              >
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  {value.stock.ticker}
                </Text>
                <Text
                  style={{
                    color: "#939393",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: 20,
                  }}
                >
                  {value.stock.name}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
              >
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                >
                  {value.stock.c}
                </Text>
                <Text
                  style={{
                    color: `${value.stock.d ? "red" : "green"}`,
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: 20,
                  }}
                >
                  {value.stock.d}
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                Stats
              </Text>
              <View>
                <Text style={{ color: "white" }}>
                  Table to be displayed here
                </Text>
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                About
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "white",
                }}
              >
                <Text style={{ color: "white" }}>Start Date</Text>
                <Text style={{ color: "white" }}>{value.stock.ipo}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "white" }}>Industry</Text>
                <Text style={{ color: "white" }}>
                  {value.stock.finnhubIndustry}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "white" }}>Website</Text>
                <Text style={{ color: "white" }}>{value.stock.weburl}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "white" }}>Exchange</Text>
                <Text style={{ color: "white" }}>{value.stock.exchange}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ color: "white" }}>Market Cap</Text>
                <Text style={{ color: "white" }}>
                  {value.stock.marketCapitalization}
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default StockScreen;
