import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, FlatList, TextInput, Image } from "react-native";
import { Card } from "react-native-elements";

const RadioCards = () => {
  const [country, setCountry] = useState("Canada");
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/search?country=${country}&reverse=false&offset=0&limit=5&hidebroken=false`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "radio-browser.p.rapidapi.com",
        "x-rapidapi-key": "93929a08ebmsh1d9489f52854d26p1ca74djsna9c4054aea22",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);

  return (
    <FlatList
        horizontal={true}
        data={data}
        key={data.changeuuid}
        keyExtractor={(value, index) => index.toString()}
        renderItem={({ item }) => (
            <Card containerStyle={styles.card} key={item.id}>
                <Card.Image style={styles.cardimg} source={{uri: item.favicon ? item.favicon : "https://www.iconsdb.com/icons/preview/orange/tabletop-radio-xxl.png",}}></Card.Image>
                <Card.Divider />
                <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
            </Card>
        )}
    />
  );
};

export default RadioCards;

const styles = StyleSheet.create({
    card: {
        width: 200,
        borderColor: '#A6A7E7',
        backgroundColor: '#191C55',
    },
    cardimg: {
        resizeMode: "contain",
    },
    cardTitle: {
        color: '#A6A7E7',
        fontSize: 16,
    }
});