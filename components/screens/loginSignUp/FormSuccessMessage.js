import React from 'react';
import {Text ,View, ActivityIndicator ,StyleSheet,Image, TouchableOpacity} from 'react-native';
import { Overlay } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';

const FormSuccessMessage = (props) => {
// const navigation = useNavigation();
  // function navigate(){
  //   navigation.navigate('Login');
  //
  // }
 return (
   props.successMessage ?
     <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.close('') }>
     <Image
        style={styles.successLogo}
        source={require('../../../assets/images/success.png')}
         />
         <Text style={styles.successMsg}>{props.successMessage}</Text>
           <TouchableOpacity style={styles.buttonSuccess} onPress={() => {
                navigation.navigate("Login");
              }}>
             <Text style={{color:'#fff'}}>Okay!</Text>
           </TouchableOpacity>
     </Overlay>
   :
   <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideErrorOverlay(false)} >
   <ActivityIndicator size="large" color="#4632a1"/>
   </Overlay>

 )

}

export default FormSuccessMessage;


const styles= StyleSheet.create({
 Overlay: {
   width:'90%',
   height:350,
   display: 'flex',
   justifyContent: 'center',
   alignItems:'center',
 },
 successLogo:{
  width:85,
  height:85,
},
successMsg:{
  marginTop:10,
  padding:30,
  textAlign:'center',
  lineHeight: 30,
  color:'green',
},
buttonSuccess:{
  width:'50%',
  height:52,
  backgroundColor:'#4632a1',
  borderRadius:50,
  marginTop:20,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
},

});
