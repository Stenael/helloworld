import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this line

export default class Profile extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      photo: "",
      imageError: null, // Added imageError state
    }
  }
  componentDidMount() {
    this.selectData();
  }
  // componentDidMount() {
  //   // Access route.params in componentDidMount
  //   const { route } = this.props;
  //   const { username } = route.params;
  //   this.setState({ username }, () => {
  //     // After setting the username, call selectData
  //     this.selectData();
  //   });
  // }
  // selectData = () => {
  //   const apiUrl = 'https://ubaya.me/react/160420112/UAS_getEmail.php';
  
  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.result === 'success') {
  //         // Set username and email from data obtained from the database
  //         this.setState({ username: data.username, email: data.email });
  //       } else {
  //         console.error('Error fetching user data:', data.message);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });
  //   }
  selectData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      // const storedEmail = await AsyncStorage.getItem("email");
      // if (storedEmail) {
      //   this.setState({ email:storedEmail  });
      //   // Perform additional data fetching if needed
      // }
      if (storedUsername) {
        this.setState({ username:storedUsername});
        // Perform additional data fetching if needed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  submitData = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: `username=${this.state.username}&photo=${this.state.photo}`
    };

    try {
      fetch('https://ubaya.me/react/160420112/UAS_updateProfile.php', options)
        .then(response => response.json())
        .then(resjson => {
          console.log(resjson);
          if (resjson.result === 'success') {
            alert('sukses');
          } else {
            alert('gagal');
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  _onPressButton = () => {
    if (this.validate({
      username: { required: true },
      email: { required: true },
      photo: { required: true }
    })) {
      this.submitData();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {this.state.photo ? (
            <Image
              source={{ uri: this.state.photo }}
              style={styles.profileImage}
              onError={() => this.setState({ imageError: 'Invalid Image URL' })}
            />
          ) : (
            <View style={styles.defaultImageContainer}>
              <Text style={styles.defaultImageText}>No Image</Text>
            </View>
          )}
          {this.state.imageError && <Text style={styles.errorText}>{this.state.imageError}</Text>}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          keyboardType="email-address"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Photo URL"
          value={this.state.photo}
          onChangeText={(photo) => this.setState({ photo })}
        />
        
        <Button title="Save" onPress={this._onPressButton} />
      </View>
    );
  }
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
