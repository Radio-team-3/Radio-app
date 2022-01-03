import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import { style, width } from "styled-system";
import axios from "axios";

export default Lyrics= () =>{ 
    const [song, setSong] = useState('Rose Garden');
    const [artist, setArtist] = useState('Lynn Anderson');
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  let lyrics = "";

  useEffect(() => {
    axios
              .get(url)
              .then(function (response) {
                // handle success
                //alert(JSON.stringify(response.data));
                lyrics = response.data.lyrics;
                console.log(lyrics)
                setData(lyrics);
              })
              .catch(function (error) {
                // handle error
                console.log(error.message)

              .finally(() => setLoading(false));
              });
  }, [url]);

  return (
    <View style={styles.container}>
        <ImageBackground 
        source={require("../../../assets/images/image_lyrics.jpg")}
          style={styles.background}
          width ={Dimensions.get('window').width}
          height = {Dimensions.get('window').height}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logoImg}
        />
        <TextInput
          placeholder="Song Name"
          placeholderTextColor="#fff"
          onChangeText={(val) => setSong(val)}
          style={styles.input}
        />
        <TextInput
          placeholder="Artist Name"
          placeholderTextColor="#fff"
          onChangeText={(val) => setArtist(val)}
          style={styles.input}
        />
      </View>
      <ScrollView style={styles.scroll}>
                  <View style={styles.lyricscontainer}>
                    <Text style={styles.songname}>{song}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                      <Text style={styles.lyrics}>
                            {data}
                      </Text>
                    </View>
        </ScrollView>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    color: "#fff",
    paddingLeft: 15,
  },
  background:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: "#242c59",
    color: "#fff",
    width: 135,
    margin: 15,
    height: 40,
    borderRadius: 10,
    borderColor: "#d4cfcf",
    borderWidth: 1,
    alignContent: "center",
    paddingLeft: 10,
  },
 
  logoImg: {
    height: 75,
    width: 75,
  },
  searchContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  scroll:{
    width:'100%',
  },
  lyricscontainer:{
    backgroundColor:'#000000a0',
    marginTop:30,
  },
  songname:{
      fontStyle:'italic',
      fontSize:30,
      color:'#fff',
      textAlign:"center",
  },
  artist:{
      fontStyle:'italic',
      fontSize:30,
      color:'#fff',
      textAlign:"center",
  },
  lyrics:{
     textAlign:"center",
     color:'#fff',
     fontSize: 20,
     marginTop:20,
  },
});

