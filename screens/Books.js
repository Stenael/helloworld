import { StyleSheet, View, Text, Button, FlatList, Image } from "react-native";
import React from "react";
import { DATA } from "../class/booksData";
import { ScrollView } from "react-native-gesture-handler";


export default function Setting() {
 return ( 
  <ScrollView>
       <FlatList
        data={DATA}
        renderItem={({ item }) => (
            <View style={styles.vparent2}>
  
             <Text  style={styles.txtNama}>{item.nama}</Text>
             <Image
                style={styles.imgResep}
                source={{uri:item.photo}}
             />
             <Text  style={styles.txtDesk} >{item.desk}</Text>
            </View>
        )}
        />
  </ScrollView>
 );
}
const styles = StyleSheet.create({
    txtNama:{
      fontSize:20,
      color:"red"
    },
    txtDesk:{
      marginLeft:15,
      marginRight:15,
      marginBottom:10,
      fontSize:12,
      color:'grey'
    },
    vparent:{
      flex: 1,
      justifyContent: 'center',
    },
    vparent2:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth : 1,
      borderColor: 'grey',
      margin : 10,
      borderRadius:20
    },
    imgResep: {
      width: 150,
      height: 200,
      marginRight:10,
      marginBottom : 10,
    },
    });