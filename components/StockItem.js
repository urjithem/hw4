import { View, Text, TouchableHighlight } from "react-native";
import React, { useContext } from "react";
import axios from "axios";
import { Context } from "../App";

const StockItem = ({ stock, navigation }) => {
  const value = useContext(Context);
  const handleClick = async () => {
    console.log("clicked");
    let res = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.displaySymbol}&token=c9m7o2aad3i9qg80oe70`
    );
    value.setStock((prev) => ({ ...res.data, ...stock }));
    value.setStockSymbol(stock.symbol);
    // console.log("value= ", value);
    console.log("Stock data= ", res.data);
    navigation.navigate("Stock");
  };

  return (
    <TouchableHighlight onPress={handleClick}>
      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
            paddingVertical: 10,
          }}
        >
          {stock.displaySymbol} | {stock.description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default StockItem;
