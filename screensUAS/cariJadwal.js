import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CariJadwal extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.fetchData();
    cari: "";
  }

  fetchData = () => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: "cari=" + this.state.cari,
    };

    try {
      fetch("https://ubaya.me/react/160420112/UAS_cariJadwal.php", options)
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
            <Button title={`${item.member}/${item.min_member} orang`}></Button>
            <Text>Lokasi : {item.lokasi}</Text>
            <Text>Alamat : {item.alamat}</Text>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Join"
              onPress={async () => {
                try {
                  const userId = await AsyncStorage.getItem("id");
                  const options = {
                    method: "POST",
                    headers: new Headers({
                      "Content-Type": "application/x-www-form-urlencoded",
                    }),
                    body: "idJadwal=" + item.id + "&" + "idUser=" + userId,
                  };
                  const response = await fetch(
                    "https://ubaya.me/react/160420112/UAS_joinJadwal.php",
                    options
                  );
                  const resjson = await response.json();
                  console.log(resjson);
                  if (resjson.result === "success") {
                    alert("sukses");
                  }
                } catch (error) {
                  console.error("Error in fetch:", error);
                }
              }}
            />
          </Card>
        )}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <View style={styles.viewRow}>
            <Text>Cari </Text>
            <TextInput
              style={styles.input}
              onChangeText={(cari) => this.setState({ cari })}
              onSubmitEditing={this.fetchData()}
            />
          </View>
        </Card>
        {this.showData(this.state.data)}
      </ScrollView>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  return <CariJadwal {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 50,
    margin: 3,
  },
});
