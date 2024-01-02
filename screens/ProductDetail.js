import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function ProductDetail({ route }) {
   const { id, jumlah } = route.params;
        return (    
             <View >
                <Text >Ini Detail Product{id}, dengan jumlah {jumlah}</Text>
             </View>
        );
}
