import React,{useState} from 'react';
import {Image, StyleSheet,Text,View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firebase } from '../../../Firebase/firebase';
import { Overlay } from 'react-native-elements';
import FormSuccessMessage from '../loginSignUp/FormSuccessMessage';
import FormErrorMessage from '../loginSignUp/FormErrorMessage';

  const SignUp = ({navigation}) => {
  const [fullName,setFullName] = useState('');
   const [email,setEmail] = useState('');
   const [errorMessage,setErrorMessage] = useState('');
  const [successMessage,setSuccessMessage] = useState('');
  const [isLoading,setIsLoading]= useState(false);
   const [password,setPassword] = useState();
   const [confirmPassword,setConfirmPassword] = useState();
   const [displayFormErrorMessage,setFormErrorMessage] = useState(false);


  function navigate(){
      navigation.navigate('Login');
    // console.log(firebase);
  }
  function FullNameChange(value){
    setFullName(value);
  }

  function EmailChange(value){
    setEmail(value);
  }

  function PasswordChange(value){
    setPassword(value);
  }

  function ConfirmPasswordChange(value){
    setConfirmPassword(value);
  }
 function createUser(){
   setIsLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
      setIsLoading(false);
       setSuccessMessage("Your account has been created! Please Login to complete the Sign Up");
       console.log(successMessage);
    }).catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
      setFormErrorMessage(true);
    });
 }

 function validateFrom() {
  let form_inputs = [fullName,email,password,confirmPassword];
  let password_match = password === confirmPassword;

  if(form_inputs.includes('') || form_inputs.includes(undefined)){
    setErrorMessage("Please fill in all fields");
    return setFormErrorMessage(true);
  }

if(!password_match){
  setErrorMessage("Passwords do not match");
  return setFormErrorMessage(true);
}
  if(password_match) return createUser();

 }

  return (

    <View style={styles.mainView}>

     <View style={styles.TopView}>

     <Image
       style={styles.logoImg}
       source={ require('../../../assets/images/logo.png')}
     />
    </View>
     <ScrollView style={styles.BottomView}>
     <Text style={styles.loginHeading}>
     Sign Up!
     </Text>
     <View  style={styles.RegisterNow}>
     <Text style={{marginRight:10,fontSize:17}}>Already Have an account?</Text>
     <TouchableOpacity onPress={navigate}>
     <Text style={{ color:'red',fontStyle:'italic',fontSize:17}}>Login</Text>
     </TouchableOpacity>
     </View>

     <View style={styles.FormView}>
     <TextInput onChangeText={FullNameChange} value={fullName} placeholder={"Full Name*"} placeholderTextColor={"#333"} style={styles.TextInput}/>
      <TextInput onChangeText={EmailChange} value={email} placeholder={"Email address*"} placeholderTextColor={"#333"} style={styles.TextInput}/>
      <TextInput  onChangeText={PasswordChange} value={password} secureTextEntry={true}  placeholder={"Password*"} placeholderTextColor={"#333"} style={styles.TextInput}/>
      <TextInput   onChangeText={ConfirmPasswordChange} value={confirmPassword} secureTextEntry={true}  placeholder={" Re-Type Password*"} placeholderTextColor={"#333"} style={styles.TextInput}/>

      <TouchableOpacity style={styles.ButtonLogin} onPress={validateFrom} >
      <Text style={{ color:'#fff',fontSize:20,}}>Sign Up</Text>
      </TouchableOpacity>
    </View>
     </ScrollView>
 {displayFormErrorMessage === true ?
<FormErrorMessage  hideErrorOverlay ={setFormErrorMessage} error={errorMessage}/>
: null
 }
 { isLoading === true ?
 <FormSuccessMessage />
:
successMessage === "Your account has been created! Please Login to complete the Sign Up" ?
 <FormSuccessMessage successMessage={successMessage} close={setSuccessMessage}/>
   : null
 }

</View>

  )

}

export default SignUp;

const styles = StyleSheet.create({
  mainView:{
  flex:1,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#000',
  marginTop:'10%',
  },
  TopView:{
    width:'100%',
    height:'35%',
    backgroundColor: '#000',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'15%',
    paddingBottom:20,

  },
  BottomView:{
    width:'100%',
    height:'65%',
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },

  logoImg:{
   width:'100%',
   resizeMode:'contain',
 },

 loginHeading:{
   fontSize: 36,
   fontWeight: 'bold',
   marginLeft:30,
   marginTop:20,

 },
 FormView:{
   width: '100%',
   display:'flex',
   flexDirection: 'column',
   justifyContent:'center',
   alignItems:'center',
   marginTop:20,
 },

 TextInput:{
   width:'90%',
   borderWidth:1,
   borderColor:'#4632a1',
   borderRadius: 10,
   padding:15,
   marginTop:10,
 },
 ButtonLogin:{
   width:'50%',

   height:52,
   backgroundColor:'#4632a1',
   borderRadius:50,
   marginTop:20,
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
 },

 RegisterNow:{
 display:'flex',
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'flex-start',
 marginLeft:30,
 marginTop:10,

 }
})
