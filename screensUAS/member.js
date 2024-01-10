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

class ShowMember extends React.Component {
  constructor() {
    super();
    this.state = { id: 0, is_fetched: false, data: {} };
    this.asyncStorage = AsyncStorage;
  }
  fetchData = async () => {
    try {
      const options = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "idJadwal=" + this.state.id,
      };

      try {
        fetch("https://ubaya.me/react/160420112/showMember.php", options)
          .then((response) => response.json())
          .then((resjson) => {
            this.setState(
              (this.state = {
                is_fetched: true,
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
  render() {
    if (!this.state.is_fetched) {
      this.state.id = this.props.route.params.id;
      this.fetchData();
      return <Text>Waiting JSON...</Text>;
    } else {
      return (
        <ScrollView>
          <Card>
            <Card.Title>{this.state.username}</Card.Title>
          </Card>
        </ScrollView>
      );
    }
  }
}
export default function (props) {
  const navigation = useNavigation();
  return <ShowMember {...props} navigation={navigation} />;
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
    backgroundColor: "#2196F3", // Change the background color as needed
    borderRadius: 28,
    elevation: 8, // Adds a shadow on Android
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
});
