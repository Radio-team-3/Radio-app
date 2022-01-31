import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";

const OnBoarding = ({ navigation }) => {
  function navigate() {
    navigation.navigate("Login");
  }

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? "purple" : "purple";
    } else {
      backgroundColor = selected ? "red" : "white";
    }
    return (
      <SafeAreaView
        style={{
          width: 15,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const backgroundColor = (isLight) => (isLight ? "red" : "red");
  const color = (isLight) => backgroundColor(!isLight);

  const Done = ({ isLight, ...props }) => (
    <Button
      title={"Done"}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
      onPress={() => navigation.navigate("Login")}
    />
  );

  const Skip = ({ isLight, skipLabel, ...props }) => (
    <Button
      title={"Skip"}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    >
      {skipLabel}
    </Button>
  );

  const Next = ({ isLight, ...props }) => (
    <Button
      title={"Next"}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 100,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  );

  return (
    <SafeAreaView style={styles.slide}>
      <Onboarding
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        titleStyles={{ color: "#FFF" }} // set default color for the title
        pages={[
          {
            backgroundColor: "#4632a1",
            image: (
              <Image
                style={styles.OnboardingLogoImage}
                source={require("../../../assets/images/logo.png")}
              />
            ),
          },
          {
            backgroundColor: "#4632a1",
            // image: (
            //   <Image source={require("../../../assets/images/logo.png")} />
            // ),
            title: "Welcome to the Radio Player",
            subtitle:
              "Start listing to radio stations from all over the wolrd with one of the most amazing and stylish Radio players",
          },
          {
            backgroundColor: "#4632a1",
            image: <Image source={require("../../../assets/RadioIcon.png")} />,
            title: "Rich radio program",
            subtitle: "Explore over 100+ stations",
          },
          {
            backgroundColor: "#4632a1",
            image: <Image source={require("../../../assets/Fav.jpg")} />,
            title: "Customize list",
            subtitle: "Listen to your favourite",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#4632a1",
  },

  OnboardingLogoImage: {
    width: "80%",
    resizeMode: "contain",
  },
});
