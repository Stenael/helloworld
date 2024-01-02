import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

class Jadwal extends React.Component {
  render (){
    return (
        
        <View style={styles.container} >
          <TouchableOpacity style={styles.button} onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("BuatJadwal")
        }
        } >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        
       );

    }
  }
export default function(props){
    const navigation = useNavigation();
    return <Jadwal {...props} navigation={navigation} />;
}
  
  const styles = StyleSheet.create({
    vparent:{
      flex: 1,
      justifyContent: 'center',
    },
    vparent2:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    imgkucing: {
      width: 300,
      height: 400,
      marginRight:10,
      marginBottom : 10,
    },
    imgmissing: {
      width: 300,
      height: 140,
    },
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
      button: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16,
        backgroundColor: '#2196F3', // Change the background color as needed
        borderRadius: 28,
        elevation: 8, // Adds a shadow on Android
      },
      buttonText: {
        fontSize: 24,
        color: 'white',
      },

    });
  