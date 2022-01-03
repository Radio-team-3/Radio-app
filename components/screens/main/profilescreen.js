import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {firebase} from '../../../Firebase/firebase';

const Profile = ({navigation, route}) => {

  const user = firebase.auth().currentUser;  
  const email = user.email;
  const signOut = () => {
   firebase.auth().signOut();
  }

  const deleteAccount = () => {
      return user.delete();
        }
  
        return (
          
           <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar} source={require('../../../assets/user.png')}/>
                  <Text style={styles.name}>
                    {email}
                  </Text>
              </View>
            </View>

            <View style={styles.profileDetail}>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Saves</Text>
                <Text style={styles.count}>80</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Followers</Text>
                <Text style={styles.count}>21</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Following</Text>
                <Text style={styles.count}>30</Text>
              </View>
            </View>

          
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <TouchableOpacity style={styles.buttonContainer} onPress={signOut} >
                <Text style={{ color:'#fff',fontSize:20,}}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={deleteAccount} >
                <Text style={{ color:'#fff',fontSize:20,}}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>

      </View>
        );
    }


export default Profile;
  const styles = StyleSheet.create({

   header:{
    backgroundColor: "#161549",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#161549"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#161549",
    
  },
  description:{
    fontSize:20,
    color: "#161549",
    marginTop:10,
    textAlign: 'center'
  }

  })
