import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import DateTimePicker from "react-native-modal-datetime-picker";
import { DatePickerModal } from 'react-native-paper-dates';
import { Card } from "@rneui/themed";


export default class NewPopMovie extends ValidationComponent {
    constructor(props){
        super(props);
        this.state = {  
            title:"",
            homepage:"",
            overview:"",
            runtime:"100",
            isDateTimePickerVisible:false
        }
    } 


        submitData = () => {
            const options = {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
              }),
              body: "title="+this.state.title+"&"+
                    "homepage="+this.state.homepage+"&"+
                    "overview="+this.state.overview+"&"+
                    "release_date="+this.state.release_date+"&"+
                    "runtime="+this.state.runtime
            };
              try {
                fetch('https://ubaya.me/react/160420112/newmovie.php',
                options)
                  .then(response => response.json())
                  .then(resjson =>{
                    console.log(resjson);
                    if(resjson.result==='success') alert('sukses')
                  });
              } catch (error) {
                console.log(error);
              } 
            }

    _onPressButton = () => {
       if(this.validate({
          title: {required: true},
          homepage : {required:true, website:true},
          overview : {minlength:10}
        }))
        {
          this.submitData()
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
                                (date.date.getMonth()+1)  + "-" +
                                date.date.getDate()  
                    
                }
                );
              this.hideDateTimePicker();
            };
        
render() {
            return (
              <View>
                <Card>
                
                <Card.Title>Tambah Movie</Card.Title>
                <Card.Divider />
                <Text>Title</Text>
                <TextInput style={styles.input} ref="title" onChangeText={(title) => this.setState({title})} value={this.state.title} />
                <Text>Homepage</Text>
<TextInput style={styles.input}
onChangeText={(homepage) => this.setState({homepage})} value={this.state.homepage} />
<Text>Overview</Text>
  <TextInput
     multiline
     numberOfLines={4}
     style={styles.input3}
 onChangeText={(overview) => this.setState({overview})} value={this.state.overview} />

<Text>Release Date</Text>
            <View style={styles.viewRow}>
              <Text style={styles.input2}>{this.state.release_date}</Text>
              <Button title="..." onPress={this.showDateTimePicker} />
            </View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            /> 
            <DatePickerModal
          locale="en"
          mode="single"
          visible={this.state.isDateTimePickerVisible}
          onDismiss={this.hideDateTimePicker}
          date={this.state.release_date}
          onConfirm={this.handleDatePicked}
        />

<Text>Runtime</Text>
                <TextInput style={styles.input} ref="runtime" onChangeText={(runtime) => this.setState({runtime})} value={this.state.runtime} />
                

                <Button style={styles.btn} 
                onPress={this._onPressButton}
                title="Submit"
                />
    
              <Text>
                {this.getErrorMessages()}
              </Text>
              </Card>
            </View>
             ) 
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
          width:300,
          padding: 10,
        },
        input3: {
          borderWidth: 1,
          padding: 10,
        },
        viewRow:{
          flex: 1,
        flexDirection:'row'
          },
        btn:{
          width:30
        }
      });