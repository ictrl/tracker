import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrMsg } = useContext(Context);

  // useEffect(() => {
  //   const listner = navigation.addListener("didFocus", () => {
  //     clearErrMsg();
  //   });

  //   return () => listner.remove();
  // },[]);
  return (
    <View style={style.container}>
      <NavigationEvents onWillFocus={() => clearErrMsg()} />

      <AuthForm
        header="Sign In to Your Account"
        errMsg={state.errMsg}
        buttonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up Instead"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
