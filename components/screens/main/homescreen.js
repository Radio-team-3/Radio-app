import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { firebase } from "../../../Firebase/firebase.js";
import RadioCards from "../../api_cards/radio_cards";
//import MusicCards from "../../api_cards/music_cards.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../../redux/actions/index";

class Home extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    // const user = firebase.auth().currentUser;
    // const email = user.email;
    const { currentUser } = this.props;
    console.log(currentUser);
    if (currentUser == undefined) {
      return (
        <View>
          <Text>Hey</Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container} Vertical>
          <Text style={styles.greeting}>Welcome {currentUser.fullName}!</Text>
          <ScrollView style={styles.row}>
            <View style={styles.displayInline}>
              <Text style={styles.subTitle}>Radio</Text>
              <MaterialCommunityIcons style={styles.icon} name={"magnify"} />
            </View>
            <RadioCards />
          </ScrollView>
        </ScrollView>
      );
    }
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191C55",
  },
  greeting: {
    fontSize: 23,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 50,
    color: "#FFF",
  },
  displayInline: {
    flexDirection: "row",
  },
  row: {
    marginBottom: 25,
  },
  subTitle: {
    color: "#FFF",
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 250,
  },
});
