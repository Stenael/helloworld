import { StyleSheet, View, Text,Button } from "react-native";
import React from "react";

export default function Home({ navigation })  {
  return (  
    <View >
      <Text >Halo {global.activeuser}, Ini Home bukan indiHome</Text>
      <Button
        title="Go to About page"
        onPress={() => navigation.navigate("About")}
      />
      <Button
        title="Go to Product page"
        onPress={() => navigation.navigate("Product")}
      />
    </View>
  );
}

