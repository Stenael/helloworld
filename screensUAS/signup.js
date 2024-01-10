import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ValidationComponent from "react-native-form-validator";
import { useNavigation } from '@react-navigation/native';
class SignUp extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      resetPassword: "",
      photo: "",
      email: "",
    };
  }
  submitData = () => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body:
        "username=" +
        this.state.username +
        "&" +
        "password=" +
        this.state.password +
        "&" +
        "photo=" +
        this.state.photo +
        "&" +
        "email=" +
        this.state.email,
    };
    try {
      fetch("https://ubaya.me/react/160420112/UAS_signUp.php", options)
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          if (resjson.result === "success") {
            console.log("Sukses");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  _onPressButton = () => {
    if (
      this.validate({
        username: { required: true },
        password: { require: true },
        photo: { require: true },
        email: { required: true },
      })
    ) {
      this.submitData();
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Ulangi Password"
          value={this.state.resetPassword}
          onChangeText={(resetPassword) => this.setState({ resetPassword })}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Photo Url"
          value={this.state.photo}
          onChangeText={(photo) => this.setState({ photo })}
        />
        <Button title="Sign Up" 
        onPress={() => {
          this._onPressButton();
          alert("sukses");
          navigation.navigate("SignIn");
        }} />
        {/* <Button title="Kembali" onPress={handleGoBack} /> */}
        <Text>{this.getErrorMessages()}</Text>
      </View>
    );
  }
}
export default function(props) {
  const navigation = useNavigation();
  return <SignUp {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
