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

class CariJadwal extends React.Component {
  constructor() {
    super();
    this.state = {joinedIds: [], data: [],
    };
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
  handleJoin = (id) => {
    if (!this.state.joinedIds.includes(id)) {
      this.setState((prevState) => ({
        joinedIds: [...prevState.joinedIds, id],
      }));
      // Tambahkan logika untuk menangani ketika tombol "Join" ditekan
      console.log("Join button pressed for ID:", id);
      alert("Anda telah join");
      alert("Joined IDs: " + JSON.stringify(this.state.joinedIds));
      // Selanjutnya, Anda bisa melakukan navigasi atau tindakan lainnya dengan ID ini
    } else {
      alert("Anda sudah join acara ini sebelumnya.");
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
            <Text>{item.tanggal}</Text>
            <Text>{item.jam}</Text>
            <Button title={`0/${item.min_member} orang`}></Button>
            <Text>{item.lokasi}</Text>
            <Text>{item.alamat}</Text>
            <Text>{item.id}</Text>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="Join"
              onPress={() => this.handleJoin(item.id)}
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
