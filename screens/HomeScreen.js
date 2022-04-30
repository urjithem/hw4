import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Context } from "../App";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import axios from "axios";
// import Snackbar from "react-native-snackbar-component";
import SnackbarComponent from "react-native-snackbar-component";
const date = new Date();
var formattedDate = format(date, "MMMM do").toString().slice(0, -2);
console.log(formattedDate);

const HomeScreen = ({ navigation }) => {
  const value = useContext(Context);
  console.log(value);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const removeFavorites = () => {
    console.log("remove from fav clicked");
    console.log("selectedStock= ", selectedStock);
    // Snackbar.show({
    //   text: "Hello world",
    //   duration: 1000,
    // });
    setSnackbarText(`${selectedStock.ticker} was removed from watchlist`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 1000);

    value.setFavorites((prev) =>
      prev.filter((temp) => temp["ticker"] !== selectedStock.ticker)
    );
    setModalVisible(false);
  };

  const handleFavClick = async (stock) => {
    console.log("handleFavClick receieved= ", stock);

    let res = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.displaySymbol}&token=c9m7o2aad3i9qg80oe70`
    );
    value.setStock((prev) => res.data);
    value.setStockSymbol(stock.symbol);
    // console.log("value= ", value);
    console.log("Stock data= ", res.data);
    navigation.navigate("Stock");
  };

  const rightSwipe = () => {
    return (
      <View
        style={{
          backgroundColor: "red",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Icon.Button
          name="trash"
          backgroundColor={null}
          color="white"
          //   size={10}
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SnackbarComponent
        visible={snackbarVisible}
        textMessage={snackbarText}
        backgroundColor="white"
        messageColor="black"
      />
      <View>
        <Modal isVisible={modalVisible === true ? true : false}>
          <View
            style={{
              backgroundColor: "#3a3a3a",
              marginHorizontal: 20,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Delete Confirmation {modalVisible === true ? "true" : "no"}
            </Text>
            <Text style={{ color: "white" }}>
              Are you sure you want to delete this item ?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Pressable
                color="#3a3a3a"
                marginRight={10}
                style={{ marginRight: 20 }}
                //   title="Delete"
                onPress={removeFavorites}
              >
                <Text style={{ color: "white" }}>Delete</Text>
              </Pressable>

              <Pressable
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

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
        {/* <GestureHandlerRootView>
          <Swipeable renderRightActions={rightSwipe}>
            <View style={{ backgroundColor: "blue" }}>
              <Text>HIIIII</Text>
            </View>
          </Swipeable>
        </GestureHandlerRootView> */}

        {value.favorites.length === 0 ? (
          <View>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 10,
              }}
            ></View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              Empty
            </Text>
          </View>
        ) : (
          <View>
            {value.favorites.map((stock, idx) => (
              <GestureHandlerRootView key={idx}>
                <Swipeable
                  renderRightActions={rightSwipe}
                  onSwipeableRightOpen={() => {
                    console.log("onSwipeableRightOpen stock= ", stock);
                    setModalVisible(true);
                    setSelectedStock(stock);
                  }}
                >
                  <TouchableOpacity onPress={() => handleFavClick(stock)}>
                    <View
                      // key={idx}
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
                  </TouchableOpacity>
                </Swipeable>
              </GestureHandlerRootView>
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
    position: "relative",
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
    // backgroundColor: "pink",
    color: "white",
    flex: 1,
    display: "flex",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
