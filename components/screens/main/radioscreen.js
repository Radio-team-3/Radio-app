import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {NavigationContainer, useNavigation, useRoute,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { style } from "styled-system";
import { Audio } from 'expo-av';
const Stack = createStackNavigator();

const Search = () => {
  const [country, setCountry] = useState("Canada");
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/search?country=${country}&reverse=false&offset=0&limit=15&hidebroken=false`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  // const [title, setTitle] = useState([]);
  // const [description, setDescription] = useState([]);
  // const [text, onChangeText] = React.useState("Useless Text");

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
        // console.log(json);
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logoImg}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#fff"
          onChangeText={(val) => setCountry(val)}
          style={styles.input}
        />
      </View>

      <Text style={styles.textStylingChannels}>Channels</Text>
      <FlatList
        data={data}
        key={data.changeuuid}
        // keyExtractor={({ id }, index) => id}
        keyExtractor={(value, index) => index.toString()}
        renderItem={({ item,index }) => (
          <View style={styles.stationsContainer} key={item.id}>
            <View>
              <TouchableOpacity onPress={() => {
                navigation.navigate("radioPlayer",{
                  itemIndex: index,
                });
              }}>
              <Image
                source={{
                  uri: item.favicon
                    ? item.favicon
                    : "https://www.iconsdb.com/icons/preview/orange/tabletop-radio-xxl.png",
                }}
                style={{ width: 90, height: 90 }}
              />
              </TouchableOpacity>
            </View>
            <View style={styles.stationsTextContainer}>
              <Text style={styles.stationText}>
                {item.name} {"\n"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

function radioPlayer() {

  const [country, setCountry] = useState("Canada");
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/search?country=${country}&reverse=false&offset=0&limit=15&hidebroken=false`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  let {itemIndex} = route.params;

  //Set up the radio player page
  const [radioLink, setRadioLink] = useState({itemIndex}.itemIndex);
  const [radioName, setRadioName] = useState('');
  const [cat,setCat] =useState('');
  const [sound, setSound] = useState();


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
        console.log(json);
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);



  //Fetch the data from the radio api
  // Play radio function
  async function playRadio(prop){
    console.log('Loading Radio');
    const { sound } = await Audio.Sound.createAsync(
      { uri: data[prop].url },
      { shouldPlay: true },
      setRadioLink(prop),
      setRadioName(data[prop].name),
      setCat(styles.cat)
    );
    setSound(sound);

    console.log("Playing Radio")
    await sound.playAsync();}

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.pauseAsync(); }
      : undefined;
  }, [sound]);



  return (
    <SafeAreaView style={styles.playerContainer}>
      <TouchableOpacity onPress={() =>navigation.goBack()} >
        <Image source={require('../../../assets/images/go-back.png')} style={styles.goBackButton}/>
      </TouchableOpacity>
      <View style={styles.currentRadio}>
        <Text style={styles.currentPlaying}> you are listening to {radioName}</Text>
        <Image source={{url:'https://media3.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif?cid=ecf05e47r1623rss2gol26uslycohbnspebjuwf7hrblrqn2&rid=giphy.gif&ct=g'}} style={cat}/>
      </View>
      <View>
        <Image source={require('../../../assets/images/1200px-Heart_corazón.svg.png')} style={styles.heart}/>
      </View>




      <View style={styles.musicPlayer}>

        <TouchableOpacity onPress={()=>playRadio(radioLink-1)}>
          <Image source={require('../../../assets/images/previous.png')} style={styles.buttons}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>playRadio(radioLink)} >
          <Image source={require('../../../assets/images/play.png')} style={styles.playButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>playRadio(radioLink+1)}>
          <Image source={require('../../../assets/images/next.png')} style={styles.buttons}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function radio(){
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Radio" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search}  />
        <Stack.Screen name="radioPlayer" component={radioPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2A6B",
    justifyContent: "center",
    color: "#fff",
    paddingLeft: 15
  },

  playerContainer: {
    flex: 1,
    backgroundColor: '#0c4a6e',
    color: '#000',
    alignItems: 'center',

  },

  input: {
    backgroundColor: "#242c59",
    color: "#fff",
    width: 250,
    margin: 15,
    height: 40,
    borderRadius: 10,
    borderColor: "#d4cfcf",
    borderWidth: 1,
    alignContent: "center",
    paddingLeft: 10,

  },
  stationsContainer: {
    color: "#F5F5F5",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  logoImg:{
    height: 75,
    width: 75
  },
  searchContainer:{
    flexDirection: "row",
    paddingTop: 20
  },
  textStylingChannels:{
    color: "#c4c3c3",
    marginTop: 10,
    fontSize: 22
  },
  stationsTextContainer: {
    marginLeft: 15,
    fontSize: 10
  },

  stationText: {
    color: "#fff",
    fontSize: 15,
    flexWrap: "wrap",
    width: 250
  },

  musicPlayer:{
    flex:1,
    flexDirection:"row",
    marginTop:50,
  },

  currentRadio:{
    height:200,
    width:300,
    borderWidth:1,
    borderColor:"white",
    borderStyle:"solid",
    backgroundColor:"black",

    paddingTop:40
  },

  currentPlaying:{
    color:"white",
    textAlign:'center',
  },

  cat:{
    height: 80,
    width: 100,
    marginTop:40,
    marginLeft:100
  },

  heart:{
    width: 40,
    height: 40,
    marginTop:100,
    marginLeft:280,
  },
  buttons:{
    width: 60,
    height: 60,
    marginTop:30
  },

  playButton:{
    width: 120,
    height: 200,
    marginTop:-45
  },

  goBackButton:{
    width: 120,
    height:70,


  }



});

export default radio;

