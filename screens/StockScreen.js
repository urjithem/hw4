import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Context } from "../App";
import axios from "axios";
import SnackbarComponent from "react-native-snackbar-component";
import StatsTable from "../components/StatsTable";
import AboutTable from "../components/AboutTable";

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
    }, 2000);
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
        <Icon.Button
          backgroundColor={null}
          onPress={() => {
            // value.setStock(null);
            navigation.goBack();
          }}
          name="chevron-thin-left"
          color="white"
          size={20}
        />

        <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
          Details
        </Text>
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
            name="star-outlined"
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
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "100" }}
                >
                  {value.stock.ticker}
                </Text>
                <Text
                  style={{
                    color: "#939393",
                    fontSize: 30,
                    fontWeight: "100",
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
                  style={{ color: "white", fontSize: 30, fontWeight: "100" }}
                >
                  {value.stock.c}
                </Text>
                <Text
                  style={{
                    color: `${value.stock.d ? "red" : "green"}`,
                    fontSize: 30,
                    fontWeight: "100",
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
                  fontWeight: "100",
                  marginTop: 20,
                }}
              >
                Stats
              </Text>
              <View>
                <StatsTable stock={value.stock} />
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "100",
                  marginTop: 20,
                }}
              >
                About
              </Text>

              <AboutTable stock={value.stock} />
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
    // backgroundColor: "pink",
    color: "white",
    // paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 5,
    height: 60,
  },
});

export default StockScreen;
