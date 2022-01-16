import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {firebase} from './Firebase/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SignUp from './components/screens/loginSignUp/signupscreen';
import Login from './components/screens/loginSignUp/loginscreen';
import Home from './components/screens/main/homescreen';
import Favourite from './components/screens/main/favouritescreen';
import radio from "./components/screens/main/radioscreen";
import Profile from './components/screens/main/profilescreen';
import OnboardingScreens from './components/screens/main/OnBoardingScreen';



//GET RIDE OF UNWANTED YELLOW WARNING SIGNALS

export default function App(){
    {/*setting initial sign in state to false */}
  const [isSignedIn, setIsSignedIn ]= useState(false);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


useEffect(()=>{
 firebase.auth().onAuthStateChanged(user=>{
if(user){
  setIsSignedIn(true);
}else{
   setIsSignedIn(false);
}

 })
},[])

if(isSignedIn === true){
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={ ({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icon = {
                Home: "home",
                Favourites: "heart",
                Radio: "radio",
                Profile: "account"
              };

              return (
              console.disableYellowBox = true,
                <MaterialCommunityIcons
                  name={icon[route.name]}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#000000",
            tabBarStyle: { backgroundColor: '#A6A7E7' },
          })}
        >
          <Tab.Screen
            name="Home"
            component={ Home }
          />
          <Tab.Screen
            name="Favourites"
            component={ Favourite }
          />
          <Tab.Screen
            name="Radio"
            component={ radio }
          />
          <Tab.Screen
            name="Profile"
            component={ Profile }
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}else{
  return(
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown:false}}>
  <Stack.Screen name="Onboarding" component={OnboardingScreens}  />
  <Stack.Screen name="Login" component={Login}  />
  <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
</NavigationContainer>
);
}
}

