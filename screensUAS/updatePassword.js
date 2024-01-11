import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this line
import { useNavigation } from '@react-navigation/native';
class UpdatePassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: {},
      email: "",
    }
    this.asyncStorage = AsyncStorage;
  }
  componentDidMount() {
    this.fetchData();
    
  }
  
  fetchData = async () => {
    try {
      const user_id = await this.asyncStorage.getItem('idUsername');
      if (user_id !== null) {
        this.setState({ user_id });
      }
      const options = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: "id=" + user_id
      };
      const response = await fetch('https://ubaya.me/react/160420112/UAS_detailProfile.php', options);
      const resjson = await response.json();
  
      console.log('Response JSON:', resjson); // Add this line to log the response
  
      this.setState({
        data: resjson,
        username: resjson.username,
      });
    
    } catch (error) {
      console.log(error);
    }
  }
  




  submitData = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "password=" + this.state.password + "&" +
      "id=" + this.state.user_id 
    };

    try {
      fetch('https://ubaya.me/react/160420112/UAS_updatePass.php', options)
        .then(response => response.json())
        .then(resjson => {
          console.log(resjson);
          if (resjson.result === 'success') {
            alert('sukses');
          }
        });
    } catch (error) {
      console.log(error);
    }
  }


  _onPressButton = () => {
    if (this.validate({
      password: { required: true },
    })) {
      this.submitData();
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Save" 
        onPress={() => {
          this._onPressButton();
          alert("sukses");
          navigation.navigate("SignIn");
        }} />
      </View>
    );
  }
}
export default function(props) {
    const navigation = useNavigation();
    return <UpdatePassword {...props} navigation={navigation} />;
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  errorText: {
    color: 'red',
  },
});
