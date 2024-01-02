import { StyleSheet, View, Text, Button, FlatList, Image } from "react-native";
import React from "react";
import { DATA } from "../class/resep";
import { ScrollView } from "react-native-gesture-handler";

export default function Product({ navigation }) {
    return (
        <ScrollView>
        <Text >Ini Product</Text>
        <Button
          title="Go to About page"
          onPress={() => navigation.navigate("About")}
        />
        <Button
          title="Product 1"
          onPress={() => navigation.navigate("Product Detail", { id: 1,jumlah:10 })}
        />
    <Button 
          title="Product 2"
          onPress={() => navigation.navigate("Product Detail", { id: 22,jumlah:13 })}
        />
        
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
      color:"blue"
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
      width: 300,
      height: 200,
      marginRight:10,
      marginBottom : 10,
    },
    });
  