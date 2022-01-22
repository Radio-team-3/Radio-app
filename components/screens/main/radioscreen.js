import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {NavigationContainer, useNavigation, useRoute,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PlayImage from '../../../assets/images/play.png';
import PauseImage from '../../../assets/images/pause.png';
import {
  StyleSheet,
  ScrollView,
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
// SEARCH ENGINE FUNCTIONS
const Search = () => {
  const [country, setCountry] = useState("Canada");
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/search?country=${country}&reverse=false&offset=0&limit=15&hidebroken=false`;
  const topURL = `https://radio-browser.p.rapidapi.com/json/stations/topclick/5?offset=0&limit=100000&hidebroken=false`;
  const newURL = `https://radio-browser.p.rapidapi.com/json/stations/lastchange/5?offset=0&limit=100000&hidebroken=false`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [newData, setNewData] = useState([]);
  const navigation = useNavigation();

  // const [title, setTitle] = useState([]);
  // const [description, setDescription] = useState([]);
  // const [text, onChangeText] = React.useState("Useless Text");

 // SET UP THE JSON API FUNCTION
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
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);

//SET UP THE TOP CLICK CHANNELS JSON API FUNCTION
  useEffect(() => {
    fetch(topURL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "radio-browser.p.rapidapi.com",
        "x-rapidapi-key": "93929a08ebmsh1d9489f52854d26p1ca74djsna9c4054aea22",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTopData(json);
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [topURL]);

//SET UP THE NEW CHANNELS JSON API FUNCTION
  useEffect(() => {
    fetch(newURL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "radio-browser.p.rapidapi.com",
        "x-rapidapi-key": "93929a08ebmsh1d9489f52854d26p1ca74djsna9c4054aea22",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setNewData(json);
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [newURL]);


  // DISPLAY THE SEARCH FUNCTION, AND THE SEARCH RESULT, SEARCH RESULT SET TO CANADA BY DEFAULT
  return (
    <ScrollView style={styles.container}>
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
        nestedScrollEnabled
        data={data}
        key={data.changeuuid}
        // keyExtractor={({ id }, index) => id}
        keyExtractor={(value, index) => index.toString()}
        renderItem={({ item,index }) => (
          <View style={styles.stationsContainer} key={item.id}>
            <View>
              <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => {
                navigation.navigate("radioPlayer",{
                  itemIndex: index,
                  selectedCountry: country,
                  selectedKey: item.stationuuid,
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
            <View style={styles.stationsTextContainer}>
              <Text style={styles.stationText}>
                {item.name} {"\n"}
              </Text>
            </View>
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

      <Text style={styles.textStylingChannelsTwo}> Top Channels</Text>
      <FlatList
                nestedScrollEnabled
               data={topData}
               key={topData.changeuuid}
               // keyExtractor={({ id }, index) => id}
               keyExtractor={(value, index) => index.toString()}
               renderItem={({ item,index }) => (
                 <View style={styles.stationsContainer} key={item.id}>
                   <View>

                     <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => {
                       navigation.navigate("topRadioPlayer",{
                         itemIndex: index,
                         selectedKey: item.stationuuid,
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
                   <View style={styles.stationsTextContainer}>
                     <Text style={styles.stationText}>
                       {item.name} {"\n"}</Text>
                   </View>
                     </TouchableOpacity>
                   </View>

                 </View>
               )}
             />

        <Text style={styles.textStylingChannelsTwo}> New Channels</Text>
              <FlatList
              nestedScrollEnabled
                       data={newData}
                       key={newData.changeuuid}
                       // keyExtractor={({ id }, index) => id}
                       keyExtractor={(value, index) => index.toString()}
                       renderItem={({ item,index }) => (
                         <View style={styles.stationsContainer} key={item.id}>
                           <View>

                             <TouchableOpacity style={{flexDirection:"row",alignItems:'center'}} onPress={() => {
                               navigation.navigate("newRadioPlayer",{
                                 itemIndex: index,
                                 selectedKey: item.stationuuid,
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
                           <View style={styles.stationsTextContainer}>
                             <Text style={styles.stationText}>
                               {item.name} {"\n"}</Text>
                           </View>
                             </TouchableOpacity>
                           </View>

                         </View>
                       )}
                     />
    </ScrollView>
  );
};

// CREATE A RADIO PLAYER THAT BASED ON SELECTED COUNTRY FUNCTION
function radioPlayer() {

    // ACCESS THE PARAM THAT ARE PASSED FROM THE SELECTED RADIO CHANNEL
    const route = useRoute();
    // SELECTED RADIO STATION INDEX PARAM
    let {itemIndex} = route.params;
    // SELECTED COUNTRY NAME PARAM
    let {selectedCountry} = route.params;
    let {selectedKey} = route.params;
  const [country, setCountry] = useState({selectedCountry}.selectedCountry);
  const [changeuuid, setChangeuuid] = useState({selectedKey}.selectedKey);
  console.log(changeuuid);
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/search?country=${country}&reverse=false&offset=0&limit=15&hidebroken=false`;
  const RadioURL = `https://radio-browser.p.rapidapi.com/json/stations/byuuid?uuids={changeuuid}`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();


  //Set up the radio player page
  const [radioLink, setRadioLink] = useState({itemIndex}.itemIndex);
  const [radioName, setRadioName] = useState('');
  const [playMusic, setPlayMusic] = useState(true);
  let imageUri = playMusic ? {PlayImage} : {PauseImage};
//  let toggleSwitch = () => setPlayMusic(previousState => !previousState);
  const [cat,setCat] =useState('');
  const [sound, setSound] = useState();

  // PASS THE PARAM TO THE JSON FILE TO GET THE RESULT LIST
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
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);


  //Fetch the data from the radio api
  // Play radio function
  async function playRadio(prop){
    const { sound } = await Audio.Sound.createAsync(
      { uri: data[prop].url },
      { shouldPlay: true },
      setRadioLink(prop),
      setRadioName(data[prop].name),
      setCat(styles.cat),

    );
    setPlayMusic(true?false:true);
    setSound(sound);

    await sound.playAsync();}

  useEffect(() => {
    return sound
      ? () => {
        sound.pauseAsync(); }
      : undefined;
  }, [sound]);


console.log(PauseImage);
  // DISPLAY THE RADIO PLAYER PAGE
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
          <Image source={{ uri:imageUri.toString() }} style={styles.playButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>playRadio(radioLink+1)}>
          <Image source={require('../../../assets/images/next.png')} style={styles.buttons}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


//CREATE A RADIO PLAYER THAT PLAYS TOP PLAYED CHANNELS FUNCTION
function topRadioPlayer() {

    // ACCESS THE PARAM THAT ARE PASSED FROM THE SELECTED RADIO CHANNEL
    const route = useRoute();
    // SELECTED RADIO STATION INDEX PARAM
    let {itemIndex} = route.params;
    // SELECTED COUNTRY NAME PARAM
    let {selectedCountry} = route.params;
    let {selectedKey} = route.params;
  const [country, setCountry] = useState({selectedCountry}.selectedCountry);
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/topclick/5?offset=0&limit=100000&hidebroken=false`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();


  //Set up the radio player page
  const [radioLink, setRadioLink] = useState({itemIndex}.itemIndex);
  const [radioName, setRadioName] = useState('');
  const [cat,setCat] =useState('');
  const [sound, setSound] = useState();

  // PASS THE PARAM TO THE JSON FILE TO GET THE RESULT LIST
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
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);


  //Fetch the data from the radio api
  // Play radio function
  async function playRadio(prop){
    const { sound } = await Audio.Sound.createAsync(
      { uri: data[prop].url },
      { shouldPlay: true },
      setRadioLink(prop),
      setRadioName(data[prop].name),
      setCat(styles.cat)
    );
    setSound(sound);

    await sound.playAsync();}

  useEffect(() => {
    return sound
      ? () => {
        sound.pauseAsync(); }
      : undefined;
  }, [sound]);



  // DISPLAY THE RADIO PLAYER PAGE
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

//CREATE A RADIO PLAYER THAT PLAYS NEWLY ADDED CHANNELS FUNCTION
function newRadioPlayer() {

    // ACCESS THE PARAM THAT ARE PASSED FROM THE SELECTED RADIO CHANNEL
    const route = useRoute();
    // SELECTED RADIO STATION INDEX PARAM
    let {itemIndex} = route.params;
    // SELECTED COUNTRY NAME PARAM
    let {selectedCountry} = route.params;
    let {selectedKey} = route.params;
  const [country, setCountry] = useState({selectedCountry}.selectedCountry);
  const URL = `https://radio-browser.p.rapidapi.com/json/stations/lastchange/5?offset=0&limit=100000&hidebroken=false`;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();


  //Set up the radio player page
  const [radioLink, setRadioLink] = useState({itemIndex}.itemIndex);
  const [radioName, setRadioName] = useState('');
  const [cat,setCat] =useState('');
  const [sound, setSound] = useState();

  // PASS THE PARAM TO THE JSON FILE TO GET THE RESULT LIST
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
        // setTitle(json.title);
        // setDescription(json.description);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, [URL]);


  //Fetch the data from the radio api
  // Play radio function
  async function playRadio(prop){
    const { sound } = await Audio.Sound.createAsync(
      { uri: data[prop].url },
      { shouldPlay: true },
      setRadioLink(prop),
      setRadioName(data[prop].name),
      setCat(styles.cat)
    );
    setSound(sound);

    await sound.playAsync();}

  useEffect(() => {
    return sound
      ? () => {
        sound.pauseAsync(); }
      : undefined;
  }, [sound]);



  // DISPLAY THE RADIO PLAYER PAGE
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

// CONNECT THE RADIO LIST AND THE RADIO PLAYER
function radio(){
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Radio" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search}  />
        <Stack.Screen name="radioPlayer" component={radioPlayer} />
        <Stack.Screen name="topRadioPlayer" component={topRadioPlayer} />
        <Stack.Screen name="newRadioPlayer" component={newRadioPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// RADIO LIST AND RADIO PLAYER STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2A6B",

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
  borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    width:"90%",
    backgroundColor:"orange",
    color: "#fff",
    marginTop: 15,
    fontSize: 22,
    paddingLeft:10,
     paddingTop:20,
     paddingBottom:20,
  },
    textStylingChannelsTwo:{
    borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      width:"90%",
      backgroundColor:"orange",
      color: "#fff",
      marginTop: 25,
      fontSize: 22,
      paddingLeft:10,
      paddingTop:20,
      paddingBottom:20,
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

