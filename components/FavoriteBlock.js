import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
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
import { snapPoint } from "react-native-redash";

const width = Dimensions.get("window").width;

const FavoriteBlock = ({
  stock,
  key,
  setModalVisible,
  navigation,
  handleFavClick,
  setSelectedStock,
}) => {
  const { gestureHandler, state, velocity, translation } =
    usePanGestureHandler();
  //   Tansition Values
  const t1X = useValue(0);
  // offset value
  const ofX = useValue(0);
  const reset = useValue(0);
  const sPoints = [-width + 200, 0, width - 200];
  const to = snapPoint(t1X, velocity.x, sPoints);
  const showDelete = useValue(0);
  const clock = new Clock();
  const removedFromRight = eq(to, width);
  const boxHeight = useValue(60);
  //   useCode(() => [cond(eq(state, State.ACTIVE), set(t1X, add(ofX, 100)))]);

  const printToConsole = (text) => {
    console.log(text);
  };
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), set(t1X, add(ofX, translation.x))),
      cond(eq(state, State.END), [
        // // cond(
        // //   lessThan(translation.x, width),
        // set(t1X, width),
        // //   call([], () => {
        // //     // console.log("lesser than ", t1X);
        // //     printToConsole(`lesser than ${translation.x}`);
        // //   })
        // // ),
        cond(
          lessThan(translation.x, -200),
          //   set(translation.x, width),
          call([], () => {
            // console.log("delete item", t1X);
            set(showDelete, 1);
            printToConsole(`delete item ${translation.x}`);
            setSelectedStock(stock);
            setModalVisible(true);
          }),
          set(t1X, width)
        ),
        cond(
          eq(showDelete, 1),
          set(t1X, width),
          call([], () => printToConsole("showdelete called"))
        ),
      ]),

      //
    ],
    []
  );

  const transX = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e) => {
      console.log("started");
    },
    onActive: (e) => {
      transX.value = e.translationX;
      //   console.log(e.translationX);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transX.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <View
        style={{
          position: "relative",
          height: 60,
          width: "100%",
          backgroundColor: "black",
          borderTopColor: "white",
          borderTopWidth: 2,
          marginTop: 20,
          //   paddingTop: 25,
        }}
      >
        <View
          style={{
            backgroundColor: "red",
            position: "absolute",
            top: 0,
            height: 50,
            marginTop: 10,
            // paddingTop: 25,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            // zIndex: `${showDelete ? 999 : 0}`,
          }}
        >
          <Icon.Button
            name="trash"
            backgroundColor={null}
            color="white"
            //   size={10}
            onPress={() => {
              console.log("delete button clicked");
            }}
          />
        </View>
        <GestureHandlerRootView>
          <PanGestureHandler
            {...gestureHandler}
            // onGestureEvent={panGestureEvent}
          >
            <Animated.View
              style={[
                {
                  transform: [{ translateX: t1X }],
                  height: 60,
                  backgroundColor: "#000000",
                  width: "100%",
                },
                rStyle,
              ]}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  //   backgroundColor: "blue",
                  height: "100%",
                }}
                onPress={() => {
                  handleFavClick(stock);
                  //   console.log("touchable without feedback");
                  //   navigation.navigate("Stock");
                }}
              >
                <Text style={{ color: "white", fontSize: 18, paddingTop: 10 }}>
                  {stock.symbol}
                </Text>

                <Text style={{ color: "white", fontSize: 18 }}>
                  {stock.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
        {/* <GestureHandlerRootView>
          <PanGestureHandler
            {...gestureHandler}
            onGestureEvent={panGestureEvent}
          >
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                height: 60,
                backgroundColor: "white",
                // paddingTop: 10,
                display: "flex",
                width: "100%",
                transform: [
                  {
                    translateX: t1X,
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  console.log("touchable opacity clicked=");
                }}
                style={{ backgroundColor: "pink", height: 60 }}
              >
                <Text style={{ color: "black", fontSize: 18 }}>
                  {stock.symbol}
                </Text>

                <Text style={{ color: "black", fontSize: 18 }}>
                  {stock.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView> */}
      </View>
    </GestureHandlerRootView>
  );
};

export default FavoriteBlock;
