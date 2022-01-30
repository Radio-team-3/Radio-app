import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SocialIcon } from "react-native-elements";
import FormErrorMessage from "../loginSignUp/FormErrorMessage";
import { firebase } from "../../../Firebase/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [displayFormErrorMessage, setFormErrorMessage] = useState(false);
  function navigate() {
    navigation.navigate("SignUp");
  }

  const validateInput = () => {
    var form_inputs = [email, password];

    if (form_inputs.includes("") || form_inputs.includes(undefined)) {
      setErrorMessage("Please fill in all fields");
      return setFormErrorMessage(true);
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        setErrorMessage(error.message);
        return setFormErrorMessage(true);
      });
  };

  function EmailChange(value) {
    setEmail(value);
  }

  function PasswordChange(value) {
    setPassword(value);
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.logoImg}
          source={require("../../../assets/images/logo.png")}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <Text style={styles.loginHeading}>Welcome!</Text>
        <View style={styles.RegisterNow}>
          <Text style={{ marginRight: 10, fontSize: 17 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={navigate}>
            <Text style={{ color: "red", fontStyle: "italic", fontSize: 17 }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.FormView}>
          <TextInput
            placeholder={"Email address*"}
            value={email}
            onChangeText={EmailChange}
            placeholderTextColor={"#333"}
            style={styles.TextInput}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={PasswordChange}
            placeholder={"Password*"}
            placeholderTextColor={"#333"}
            style={styles.TextInput}
          />
          <TouchableOpacity style={styles.ButtonLogin} onPress={validateInput}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.LoginOptText}>Or</Text>
          <TouchableOpacity>
            <SocialIcon
              style={{ padding: 20 }}
              title="Sign In With Facebook"
              button
              type="facebook"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {displayFormErrorMessage === true ? (
        <FormErrorMessage
          hideErrorOverlay={setFormErrorMessage}
          error={errorMessage}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainView: {
    // marginTop: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4632a1",
  },
  TopView: {
    width: "100%",
    height: "30%",
    backgroundColor: "#4632a1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    width: "100%",
    height: "60%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  logoImg: {
    width: "55%",
    resizeMode: "contain",
  },

  loginHeading: {
    fontSize: 36,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#4632a1",
    borderRadius: 10,
    padding: 15,
    marginTop: 25,
  },
  ButtonLogin: {
    width: "50%",

    height: 52,
    backgroundColor: "#4632a1",
    borderRadius: 50,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonFb: {
    width: "70%",
    height: 52,
    backgroundColor: "#1778F2",
    marginTop: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  RegisterNow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 30,
    marginTop: 10,
  },
  LoginOptText: {
    marginTop: 15,
  },
});
