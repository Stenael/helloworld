import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { DatePickerModal } from 'react-native-paper-dates';
import { Card } from "@rneui/themed";
import DropDownPicker from 'react-native-dropdown-picker';

export default class EditMovie extends ValidationComponent {
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


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState(
      {
        release_date: date.date.getFullYear() + "-" +
          (date.date.getMonth() + 1) + "-" +
          date.date.getDate()

      }
    );
    this.hideDateTimePicker();
  };


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



  fetchDataDD = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "movie_id=" + this.state.movie_id
    };
    try {
      fetch('https://ubaya.me/react/160420112/genre_list.php',
        options)
        .then(response => response.json())
        .then(resjson => {
          var data = resjson.data;
          this.setState(
            this.state = {
              dd_items: data
            })
        });
    } catch (error) {
      console.log(error);
    }
  }


  addGenre = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "genre_id=" + this.state.dd_value + "&" +
            "movie_id=" + this.state.movie_id
    };
    try {
      fetch('https://ubaya.me/react/160420112/addmoviegenre.php',
        options)
        .then(response => response.json())
        .then(resjson => {
          console.log(resjson);
          if (resjson.result === 'success') alert('sukses')
          this.setState(
            this.state = {
              is_fetched: false,
              is_addgenre: false
            })
        });
    } catch (error) {
      console.log(error);
    }
  }
  deleteGenre = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "genre_id=" + this.state.dd_value + "&" +
            "movie_id=" + this.state.movie_id
    };
    try {
      fetch('https://ubaya.me/react/160420112/deletemoviegenre.php',
        options)
        .then(response => response.json())
        .then(resjson => {
          console.log(resjson);
          if (resjson.result === 'success') alert('sukses')
          this.setState(
            this.state = {
              is_fetched: false,
              is_addgenre: false
            })
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    if (this.state.is_addgenre) this.addGenre();

    if (!this.state.is_fetched) {
      this.state.movie_id = this.props.route.params.movie_id;
      this.fetchData();
      this.fetchDataDD();
      return <Text>Waiting JSON..</Text>
    } else {
      return <View>
        <Card>

          <Card.Title>Tambah Movie</Card.Title>
          <Card.Divider />
          <Text>Title</Text>
          <TextInput style={styles.input} ref="title" onChangeText={(title) => this.setState({ title })} value={this.state.title} />
          <Text>Homepage</Text>
          <TextInput style={styles.input}
            onChangeText={(homepage) => this.setState({ homepage })} value={this.state.homepage} />
          <Text>Overview</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.input3}
            onChangeText={(overview) => this.setState({ overview })} value={this.state.overview} />

          <Text>Release Date</Text>
          <View style={styles.viewRow}>
            <Text style={styles.input2}>{this.state.release_date}</Text>
            <Button title="..." onPress={this.showDateTimePicker} />
          </View>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={this.state.isDateTimePickerVisible}
            onDismiss={this.hideDateTimePicker}
            date={this.state.release_date}
            onConfirm={this.handleDatePicked}
          />

          <Text>Runtime</Text>
          <TextInput style={styles.input} ref="runtime" onChangeText={(runtime) => this.setState({ runtime })} value={this.state.runtime} />


          <Button style={styles.btn}
            onPress={this._onPressButton}
            title="Submit"
          />
           <Button style={styles.btn}
            onPress={this._onPressButton}
            title="Delete"
          />

          <Text>
            {this.getErrorMessages()}
          </Text>


          <br></br>
          <Text>Genre:</Text>
          <FlatList
            data={this.state.genres}
            keyExtractor={(item) => item.genre_name}
            renderItem={({ item }) => (
              <View><Text>{item.genre_name}</Text>
              </View>)}
          />

          <DropDownPicker
            schema={{
              label: 'genre_name',
              value: 'genre_id'
            }}
            open={this.state.dd_open}
            value={this.state.dd_value}
            items={this.state.dd_items}
            setOpen={this.setOpen}
            setValue={this.setValue}
          />

        </Card>
      </View>
    }
  }

}



const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  input2: {
    height: 40,
    borderWidth: 1,
    width: 300,
    padding: 10,
  },
  input3: {
    borderWidth: 1,
    padding: 10,
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row'
  },
  btn: {
    width: 30
  }
});
