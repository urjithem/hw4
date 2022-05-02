import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import StockItem from "../components/StockItem";
import { debounce } from "lodash";
import Icon from "react-native-vector-icons/Entypo";

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text) => {
    setLoading(true);
    console.log("keyword to search=", text);
    let res = await axios.get(
      `https://finnhub.io/api/v1/search?q=${text}&token=c9m7o2aad3i9qg80oe70`
    );
    setStocks(res.data.result);
    // console.log("res from api= ", res.data);
    setLoading(false);
  };

  const delayedQuery = useCallback(
    debounce((text) => handleSearch(text), 700),
    []
  );

  return (
    <View style={{ flex: 2 }}>
      <StatusBar backgroundColor="#1e1e1e" />
      <View style={styles.searchbar}>
        <View style={{ flexDirection: "row" }}>
          {/* <Button title="" onPress={() => navigation.goBack()}></Button> */}
          <Icon.Button
            backgroundColor={null}
            onPress={() => navigation.goBack()}
            name="chevron-thin-left"
            color="#939393"
            size={20}
          />

          {/* <Text style={{ color: "#939393" }}>Custom SearchHeader</Text> */}
          <TextInput
            // style={styles.input}
            autoFocus
            autoCapitalize="none"
            placeholder="Search"
            placeholderTextColor={"#939393"}
            selectionColor={"#8f21a6"}
            style={{
              color: "white",
              //   backgroundColor: "pink",
              fontSize: 20,
              marginLeft: 20,
              width: 200,
            }}
            onChangeText={(text) => {
              setKeyword(text);
              if (text.length > 0) delayedQuery(text);
            }}
            value={keyword}
          />
        </View>

        <Icon.Button
          backgroundColor={null}
          onPress={() => setKeyword("")}
          name="cross"
          color="#939393"
          size={25}
        />
      </View>

      {!(keyword.length > 0) ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: 600,
            backgroundColor: "#000000",
          }}
        >
          {/* <ActivityIndicator size="large" color="#8f21a6" /> */}
          <Text style={{ color: "white", fontSize: 25 }}>
            No suggestions found !
          </Text>
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: "#000000",
            flex: 1,
          }}
        >
          {loading && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: 600,
                backgroundColor: "#000000",
              }}
            >
              <ActivityIndicator size="large" color="#8f21a6" />
            </View>
          )}
          {!loading && stocks && stocks.length > 0 ? (
            <>
              {stocks.map((stock, idx) => (
                <StockItem key={idx} stock={stock} navigation={navigation} />
              ))}
            </>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                height: 600,
                backgroundColor: "#000000",
              }}
            >
              {/* <ActivityIndicator size="large" color="#8f21a6" /> */}
              <Text style={{ color: "white", fontSize: 25 }}>
                No suggestions found !
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    color: "#939393",
    alignItems: "center",
    // justifyContent: "center",
    height: 60,
    width: "100%",
  },
});
export default SearchScreen;
