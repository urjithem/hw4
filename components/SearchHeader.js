import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const SearchHeader = ({ navigation }) => {
  const [keyword, setKeyword] = useState("Helloooo");
  const [stocks, setStocks] = useState([]);

  const handleSearch = async () => {
    console.log("keyword to search=", keyword);
    let res = await axios.get(
      `https://finnhub.io/api/v1/search?q=${keyword}&token=c9m7o2aad3i9qg80oe70`
    );
    setStocks(res.data.result);
    console.log("res from api= ", res.data);
  };

  return (
    <View style={styles.searchbar}>
      <View>
        <Button title="Back" onPress={() => navigation.goBack()}></Button>
      </View>
      {/* <Text style={{ color: "#939393" }}>Custom SearchHeader</Text> */}
      <TextInput
        // style={styles.input}
        style={{
          color: "white",
        }}
        onChangeText={(text) => setKeyword(text)}
        value={keyword}
      />
      <Button title="search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#1e1e1e",
    color: "#939393",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "100%",
  },
});

export default SearchHeader;
