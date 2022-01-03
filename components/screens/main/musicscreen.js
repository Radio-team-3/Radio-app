import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { SearchBar } from "react-native-elements";

import SearchBody from "../../search/searchbody";

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMusic: '',
      musicData: [],
      musicFound: false
    };
  }
  
  
  music_search = () => {
    const musicQuery = this.state.searchMusic.toLowerCase();

    const axios = require("axios");
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/search&limit=15'

    axios({
      method: 'GET',
      url: url,
      params: {q: musicQuery},
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '28ef96556amsh63000c2e224a8cfp1806e9jsn1a1938144972'
      }
    }).then((res) => {
      console.log(res.data)

      var DATA = res.data.data ? res.data.data : false

      this.setState({
        musicData: DATA,
        musicFound: true
      })
      // console.log(DATA)

    }).catch((error) => {
      console.error(error);
      this.setState({
        musicFound: false
      })
    })
  }

  renderContent = () => {
      return( 
        <SearchBody musicData={this.state.musicData} />
      )
  }
  
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.displayInline}>
                <Image style={styles.logo} source={require("../../../assets/images/logo.png")} />
                <SearchBar 
                  containerStyle={styles.input}
                  inputContainerStyle={{color: '#fff', backgroundColor: 'none', borderColor: '#A6A7E7'}}
                  placeholder="Search for a song..." 
                  platform='default'
                  value={this.state.searchMusic} 
                  onChangeText={(searchMusic) => this.setState({ searchMusic })} 
                  onSubmitEditing={this.music_search}
                  music_search={this.music_search}
                />
              </View>
              {
                this.renderContent()
              }
            </View>
        );
    }
}

export default Music;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E2667',
    },
    displayInline: {
      flexDirection: 'row',
      padding: 10,
    },
    logo: {
      height: 75,
      width: 75,
    },
    input: {
      backgroundColor: "#242c59",
      width: 250,
      height: 55,
      marginLeft: 5,
      marginTop: 10,
      borderRadius: 15,
      borderColor: "#A6A7E7",
    },
  });