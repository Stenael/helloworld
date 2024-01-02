import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
class DetailMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            person_id: 0,
            is_fetched: false,
            data: {}
        }

    }

    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "id=" + this.state.person_id
        };
        try {
            fetch('https://ubaya.me/react/160420112/detailActor.php',
                options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            is_fetched: true,
                            data: resjson.data
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (!this.state.is_fetched) {
            this.state.person_id = this.props.route.params.person_id;
            this.fetchData();
            return <Text>Waiting JSON..</Text>
        } else {
            return <View>
                <Card>
                    <Card.Title>{this.state.data.person_name}</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}
                        source={{ uri: this.state.data.person_image }}
                        ></Card.Image>
                        <Text>Character Name:</Text>
                    <FlatList 
                    data={this.state.data.genres}
                    keyExtractor={(item) => item.character_name}
                    renderItem={({ item }) => (

                        <View><Text>{item.character_name}</Text>
                        </View>)}
                    />

                </Card>
            </View >

        }
    }

}
export default DetailMovie;
