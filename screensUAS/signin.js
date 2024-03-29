import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  DevSettings,
} from "react-native";
import { Card } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";
import { useNavigation } from '@react-navigation/native';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "oke",
      password: "1234",
      email: "",
    };
  }
  doLogin = async (username, password) => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "username=" + username + "&password=" + password,
    };

    const response = await fetch(
      "https://ubaya.me/react/160420112/login.php",
      options
    );
    const json = await response.json();

    if (json.result == "success") {
      try {
        await AsyncStorage.setItem("username", json.username);
        await AsyncStorage.setItem("email", json.email);
        await AsyncStorage.setItem("id", json.id);
        
        alert("login sukses");
      } catch (e) {
      
      }
    } else {
      alert("username atau password salah");
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Card>
        <Card.Title>Silakan Login</Card.Title>

        <View style={styles.viewRow}>
          <Text>Username </Text>
          <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
          />
        </View>
        <View style={styles.viewRow}>
          <Text>Password </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View style={styles.viewRow}>
          <Button
            style={styles.button}
            title="Sign Up"
            onPress={() => navigation.navigate("Signup")}
          />

          <Button
            style={styles.button}
            title="Forgot Password"
            onPress={() => navigation.navigate("GantiPassword")}
          ></Button>
          <Button
            style={styles.button}
            title="Sign In"
            onPress={() => {
              this.doLogin(this.state.username, this.state.password);
            }}
          />
        </View>
      </Card>
    );
  }
}

export default function(props) {
  const navigation = useNavigation();
  return <SignIn {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 40,
    width: 200,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 50,
    margin: 3,
  },
});
