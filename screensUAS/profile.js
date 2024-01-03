import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
export default class Profile extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      homepage: "",
      overview: "",
      runtime: "100",
      release_date: "",
      genres: [],
      isDateTimePickerVisible: false,
      dd_items: [{ genre_name: 'Action', genre_id: '1' },
      { genre_name: 'Horror', genre_id: '2' },
      { genre_name: 'Family', genre_id: '3' },
      ],
      dd_value: '',
      dd_open: false,
      is_addgenre: false,


    }
  }
  setOpen = open => {
    this.setState({
      dd_open: open
    });
  }
  setValue = callback => {
    this.setState(state => ({
      dd_value: callback(state.value),
      is_addgenre: true

    }));
  }


  fetchData = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "id=" + this.state.movie_id
    };
    try {
      fetch('https://ubaya.me/react/160420112/detailmovie.php',
        options)
        .then(response => response.json())
        .then(resjson => {
          var data = resjson.data;
          this.setState(
            this.state = {
              is_fetched: true,
              title: data.title,
              homepage: data.homepage,
              overview: data.overview,
              runtime: data.runtime,
              genres: data.genres

            })
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
      body: "title=" + this.state.title + "&" +
        "homepage=" + this.state.homepage + "&" +
        "overview=" + this.state.overview + "&" +
        "release_date=" + this.state.release_date + "&" +
        "runtime=" + this.state.runtime + "&" +
        "movie_id=" + this.state.movie_id
    };
    try {
      fetch('https://ubaya.me/react/160420112/updatemovie.php',
        options)
        .then(response => response.json())
        .then(resjson => {
          console.log(resjson);
          if (resjson.result === 'success') alert('sukses')
        });
    } catch (error) {
      console.log(error);
    }
  }

  _onPressButton = () => {
    if (this.validate({
      title: { required: true },
      homepage: { required: true, website: true },
      overview: { minlength: 50 }
    })) {
      this.submitData();
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {photoUrl ? (
            <Image
              source={{ uri: photoUrl }}
              style={styles.profileImage}
              onError={handleImageError}
            />
          ) : (
            <View style={styles.defaultImageContainer}>
              <Text style={styles.defaultImageText}>No Image</Text>
            </View>
          )}
          {imageError && <Text style={styles.errorText}>{imageError}</Text>}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Photo URL"
          value={photoUrl}
          onChangeText={(text) => setPhotoUrl(text)}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

