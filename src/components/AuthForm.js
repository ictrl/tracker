import React, { useState } from "react";
import { Input, Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import ShowError from "../components/ShowError";

const AuthForm = ({ header, errMsg, buttonText, onSubmit }) => {
  // const [email, setEmail] = useState("coolsaurav34@gmail.com"); //todo
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("samrat.online"); //todo
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3> {header}</Text>
      </Spacer>
      <Input
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
      />
      <Spacer />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={password}
        label="Password"
        onChangeText={setPassword}
      />

      {errMsg ? <ShowError errMsg={errMsg} /> : null}

      <Spacer>
        <Button title={buttonText} onPress={() => onSubmit(email, password)} />
      </Spacer>
    </>
  );
};

AuthForm.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default AuthForm;
