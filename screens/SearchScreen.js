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
import SearchHeader from "../components/SearchHeader";
import axios from "axios";
import StockItem from "../components/StockItem";
// import { Icon } from "react-native-elements";
import { debounce } from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";

// text color= #939393
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
    debounce((text) => handleSearch(text), 500),
    []
  );

  return (
    <View style={{ flex: 2 }}>
      <StatusBar backgroundColor="#1e1e1e" />
      {/* <SearchHeader navigation={navigation} /> */}
      <View style={styles.searchbar}>
        <View style={{ flexDirection: "row" }}>
          {/* <Button title="" onPress={() => navigation.goBack()}></Button> */}
          <Icon.Button
            backgroundColor={null}
            onPress={() => navigation.goBack()}
            name="angle-left"
            color="white"
          />

          {/* <Text style={{ color: "#939393" }}>Custom SearchHeader</Text> */}
          <TextInput
            // style={styles.input}
            placeholder="Search"
            placeholderTextColor={"#939393"}
            selectionColor={"#8f21a6"}
            style={{
              color: "white",
              //   backgroundColor: "pink",
              marginLeft: 20,
              width: 200,
            }}
            onChangeText={(text) => {
              setKeyword(text);
              delayedQuery(text);
            }}
            value={keyword}
          />
        </View>

        <Icon.Button
          backgroundColor={null}
          onPress={handleSearch}
          name="remove"
          color="white"
        />
      </View>

      <ScrollView
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
          <Text>Nothing Found</Text>
        )}
      </ScrollView>
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
