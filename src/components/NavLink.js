import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Spacer from "./Spacer";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(routeName);
      }}
    >
      <Spacer>
        <Text style={style.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default withNavigation(NavLink);
