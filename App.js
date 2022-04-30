import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import Icon from "react-native-vector-icons/FontAwesome";

import { createContext, useState } from "react";
import SearchHeader from "./components/SearchHeader";
import StockScreen from "./screens/StockScreen";

const Stack = createNativeStackNavigator();

export const Context = createContext();

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [stock, setStock] = useState({});
  const [stockSymbol, setStockSymbol] = useState("");
  return (
    <Context.Provider
      value={{
        favorites,
        setFavorites,
        stock,
        setStock,
        stockSymbol,
        setStockSymbol,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Stock",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "#8f21a6",
              },
              headerRight: () => (
                <Icon.Button
                  backgroundColor={null}
                  onPress={() => {
                    console.log("search button clicked");
                    navigation.navigate("Search");
                  }}
                  name="search"
                  color="white"
                />
              ),
            })}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
            // options={{
            //   // title: "Search Page",
            //   headerBackVisible: false,
            //   headerTitle: () => <SearchHeader />,
            //   // headerTintColor: "#939393",
            //   headerStyle: {
            //     backgroundColor: "#1e1e1e",
            //   },
            // }}
          />

          <Stack.Screen
            name="Stock"
            component={StockScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>

    // <View style={styles.container}>
    //   <Text>HI</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
