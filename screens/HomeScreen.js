import {
  StyleSheet,
  View,
  Text,
  StatusBar,
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
  //   TouchableOpacity,
  State,
  PanGestureHandler,
} from "react-native-gesture-handler";
import {
  usePanGestureHandler,
  useValue,
  timing,
} from "react-native-redash/lib/module/v1";
import Animated, {
  event,
  cond,
  Value,
  block,
  set,
  eq,
  add,
  not,
  clockRunning,
  and,
  startClock,
  stopClock,
  spring,
  greaterThan,
  lessThan,
  call,
  Clock,
  useCode,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/EvilIcons";
import Modal from "react-native-modal";
import axios from "axios";
import SnackbarComponent from "react-native-snackbar-component";
import FavoriteBlock from "../components/FavoriteBlock";

const date = new Date();
var formattedDate = format(date, "MMMM do").toString().slice(0, -2);
console.log(formattedDate);

const HomeScreen = ({ navigation }) => {
  const value = useContext(Context);
  const clock = new Clock();

  console.log(value);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const { gestureHandler, state, velocity, translation } =
    usePanGestureHandler();

  //   Tansition Values
  const t1X = useValue(0);
  // offset value
  const ofX = useValue(0);
  //   useCode(() => [cond(eq(state, State.ACTIVE), set(t1X, add(ofX, 100)))]);
  useCode(
    () => [cond(eq(state, State.ACTIVE), set(t1X, add(ofX, translation.x)))],
    []
  );

  //////////////////////////////////////////////////////////////////
  //   const transX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e) => {
      console.log("startedhomescreen");
    },
    onActive: (e) => {
      t1X = e.translationX;
      console.log(e.translationX);
    },
    onEnd: (e) => {},
  });

  //   const rStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ translateX: translateX.value }],
  //     };
  //   });
  ////////////////////////////////////////////////////////

  const removeFavorites = () => {
    console.log("remove from fav clicked");
    console.log("selectedStock= ", selectedStock);
    setSnackbarText(`${selectedStock.ticker} was removed from watchlist`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);

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
          //   width: "100%",
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
      <StatusBar backgroundColor="#8f21a6" />
      <View
        style={{
          display: "flex",
          backgroundColor: "#8f21a6",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: 40,
            fontSize: 20,
          }}
        >
          Stock
        </Text>
        <Icon.Button
          backgroundColor={"#8f21a6"}
          iconStyle={{
            margin: 0,
            padding: 0,
            alignSelf: "flex-end",
          }}
          onPress={() => {
            console.log("search button clicked");
            navigation.navigate("Search");
          }}
          name="search"
          color="white"
          size={30}
        />
        {/* <Text style={{ color: "white" }}>Stock2</Text> */}
      </View>
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
            <Text style={{ color: "white", fontWeight: "300", fontSize: 20 }}>
              Delete Confirmation
            </Text>
            <Text style={{ color: "white", marginTop: 20 }}>
              Are you sure you want to delete this item ?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 20,
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
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              STOCK WATCH
            </Text>
          </View>
          <View style={styles.secondline}>
            <Text
              style={{
                alignSelf: "flex-end",
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={{ color: "white", fontSize: 20 }}>Favorites</Text>
        {/* <GestureHandlerRootView>
          <PanGestureHandler
            {...gestureHandler}
            // onGestureEvent={panGestureEvent}
          >
            <Animated.View
              style={{
                transform: [{ translateX: t1X }],
                height: 60,
                backgroundColor: "pink",
              }}
            >
              <Text>HELLLOOO</Text>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView> */}

        {value.favorites.length === 0 ? (
          <View>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 2,
                marginTop: 20,
              }}
            ></View>
            <Text
              style={{
                color: "white",
                fontSize: 23,
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
              <FavoriteBlock
                stock={stock}
                navigation={navigation}
                key={idx}
                setModalVisible={setModalVisible}
                handleFavClick={handleFavClick}
                setSelectedStock={setSelectedStock}
                // removeFavorites={removeFavorites}
              />
              //   <View
              //     key={idx}
              //     style={{
              //       position: "relative",
              //       height: 60,
              //       width: "100%",
              //       backgroundColor: "pink",
              //       borderTopColor: "blue",
              //       borderTopWidth: 2,
              //       marginTop: 20,
              //       //   paddingTop: 25,
              //     }}
              //   >
              //     <View
              //       style={{
              //         backgroundColor: "red",
              //         position: "absolute",
              //         top: 0,
              //         height: 60,
              //         paddingTop: 25,
              //         display: "flex",
              //         flexDirection: "row",
              //         alignItems: "center",
              //         justifyContent: "flex-end",
              //         width: "100%",
              //       }}
              //     >
              //       {/* <Text>Hi this the delete button</Text> */}
              //       <Icon.Button
              //         name="trash"
              //         backgroundColor={null}
              //         color="white"
              //         //   size={10}
              //         onPress={() => setModalVisible(true)}
              //       />
              //     </View>
              //     <GestureHandlerRootView>
              //       <PanGestureHandler
              //         {...gestureHandler}
              //         onGestureEvent={panGestureEvent}
              //       >
              //         <Animated.View
              //           style={{
              //             position: "absolute",
              //             top: 0,
              //             height: 60,
              //             backgroundColor: "white",
              //             // paddingTop: 10,
              //             display: "flex",
              //             width: "100%",
              //             transform: [
              //               {
              //                 translateX: t1X,
              //               },
              //             ],
              //           }}
              //         >
              //           <TouchableOpacity
              //             onPress={() => {
              //               console.log("touchable opacity clicked=");
              //             }}
              //             style={{ backgroundColor: "pink", height: 60 }}
              //           >
              //             <Text style={{ color: "black", fontSize: 18 }}>
              //               {stock.symbol}
              //             </Text>

              //             <Text style={{ color: "black", fontSize: 18 }}>
              //               {stock.name}
              //             </Text>
              //           </TouchableOpacity>
              //         </Animated.View>
              //       </PanGestureHandler>
              //     </GestureHandlerRootView>
              //   </View>

              //   <GestureHandlerRootView key={idx}>
              //     <View
              //       style={{
              //         display: "flex",
              //         borderTopColor: "white",
              //         borderTopWidth: 2,
              //         marginTop: 20,
              //         paddingTop: 15,
              //       }}
              //     >
              //       <Swipeable
              //         renderRightActions={rightSwipe}
              //         onSwipeableRightOpen={() => {
              //           console.log("onSwipeableRightOpen stock= ", stock);
              //           setModalVisible(true);
              //           setSelectedStock(stock);
              //         }}
              //       >
              //         <TouchableOpacity onPress={() => handleFavClick(stock)}>
              //           <View
              //           // key={idx}
              //           >
              //             <Text style={{ color: "white", fontSize: 18 }}>
              //               {stock.symbol}
              //             </Text>
              //             <Text style={{ color: "white", fontSize: 18 }}>
              //               {stock.name}
              //             </Text>
              //           </View>
              //         </TouchableOpacity>
              //       </Swipeable>
              //     </View>
              //   </GestureHandlerRootView>
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
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
