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
class GantiPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "oke"
     
    };
  }
  doLogin = async (username) => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "username=" + username 
    };

    const response = await fetch(
      "https://ubaya.me/react/160420112/UAS_gantiPass.php",
      options
    );
    const json = await response.json();

    if (json.result == "success") {
      try {
        await AsyncStorage.setItem("idUsername", json.id);
      
        alert("usernamemu tersedia");
      } catch (e) {
       
      }
    } else {
        alert("usernamemu tidak tersedia ");
    }
  };

  render() {
    return (
      <Card>
        <Card.Title>Silakan masukan username</Card.Title>

        <View style={styles.viewRow}>
          <Text>Username </Text>
          <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
          />
        </View>
        <View style={styles.viewRow}>
          <Button
            style={styles.button}
            title="Submit"
            onPress={() => {
              this.doLogin(this.state.username);
              const { navigation } = this.props;
              navigation.navigate("UpdatePassword")
            }}
          />
        </View>
      </Card>
    );
  }
}

export default function(props) {
    const navigation = useNavigation();
    return <GantiPassword {...props} navigation={navigation} />;
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
