import React, { useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Context } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrMsg, tryLocalSignin } = useContext(Context);

  useEffect(() => {
    tryLocalSignin();
    // const listner = navigation.addListener("didFocus", () => {
    //   clearErrMsg();
    // });
    // return () => listner.remove();
  }, []);

  return (
    <View style={style.container}>
      <NavigationEvents onWillFocus={() => clearErrMsg()} />

      <AuthForm
        header="Sign Up for Tracker"
        errMsg={state.errMsg}
        buttonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in Instead"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignupScreen;
