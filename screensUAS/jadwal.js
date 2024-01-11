import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/themed";

class Jadwal extends React.Component {
  constructor() {
    super();
    this.state = { data: {} };
    this.fetchData();
    this.asyncStorage = AsyncStorage;
  }
  fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      const options = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "idUser=" + userId,
      };

      try {
        fetch("https://ubaya.me/react/160420112/UAS_listJadwal.php", options)
          .then((response) => response.json())
          .then((resjson) => {
            this.setState(
              (this.state = {
                data: resjson.data,
              })
            );
          });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  showData(data) {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Image
              source={{
                uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
              }}
            />
            <Card.Title>{item.nama}</Card.Title>
            <Text>Tanggal : {item.tanggal}</Text>
            <Text>Jam : {item.jam}</Text>
            <Button
              title={`${item.member}/${item.min_member} orang`}
              onPress={() => {
                const { navigation } = this.props;
                navigation.navigate("ShowMember", { id: item.id });
              }}
            ></Button>
            <Text>Lokasi : {item.lokasi}</Text>
            <Text>Alamat : {item.alamat}</Text>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="CHAT"
              onPress={async () => {
                try {
                } catch (error) {}
              }}
            />
          </Card>
        )}
      />
    );
  }
  render() {
    return (
      <ScrollView >
        <View>
         {this.showData(this.state.data)}
        </View>
        
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("BuatJadwal");
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
   }
}
export default function (props) {
  const navigation = useNavigation();
  return <Jadwal {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  vparent: {
    flex: 1,
    justifyContent: "center",
  },
  vparent2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  imgkucing: {
    width: 300,
    height: 400,
    marginRight: 10,
    marginBottom: 10,
  },
  imgmissing: {
    width: 300,
    height: 140,
  },
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 16,
    bottom: 16,
    backgroundColor: "#2196F3", 
    borderRadius: 28,
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
});
