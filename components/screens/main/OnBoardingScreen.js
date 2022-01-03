import { StyleSheet, View, Text, Image, Button } from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";

const OnBoarding = ({ navigation }) => {
  function navigate() {
    navigation.navigate("SignUp");
  }

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
    } else {
      backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const backgroundColor = (isLight) => (isLight ? "blue" : "lightblue");
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
      onPress={() => navigation.navigate("SignUp")}
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
        width: 70,
        backgroundColor: backgroundColor(isLight),
      }}
      textStyle={{ color: color(isLight) }}
      {...props}
    />
  );

  return (
    <View style={styles.slide}>
      <Onboarding
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        titleStyles={{ color: "blue" }} // set default color for the title
        pages={[
          {
            backgroundColor: "#161549",
            image: <Image source={require("../../../assets/fulllogo.jpeg")} />,
          },
          {
            backgroundColor: "#161549",
            image: <Image source={require("../../../assets/smalllogo.jpg")} />,
            title: "Welcome to the Music Player",
            subtitle:
              "Start listingin to your songs with one of the most amazing and stylish music players",
          },
          {
            backgroundColor: "#161549",
            image: <Image source={require("../../../assets/RadioIcon.png")} />,
            title: "Rich radio program",
            subtitle: "Explore more stations",
          },
          {
            backgroundColor: "#161549",
            image: <Image source={require("../../../assets/Fav.jpg")} />,
            title: "Customize list",
            subtitle: "Listen to your favourite",
          },
        ]}
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#EAF8E4",
  },
});
