import { StyleSheet, View, Text, FlatList, TextInput, Button } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
class DetailMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            movie_id: 0,
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
            body: "id=" + this.state.movie_id
        };
        try {
            fetch('https://ubaya.me/react/160420112/detailmovie.php',
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
            this.state.movie_id = this.props.route.params.movie_id;
            this.fetchData();
            return <Text>Waiting JSON..</Text>
        } else {
            return <View>
                <Card>
                    <Card.Title>{this.state.data.title}</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        source={{ uri: 'http://placekitten.com/200/150' }}>
                    </Card.Image>
                    <Text style={{ marginBottom: 10 }}>
                        {this.state.data.overview}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                        {this.state.data.homepage}
                    </Text>

                    <Text>Genre:</Text>
                    <FlatList
                        data={this.state.data.genres}
                        keyExtractor={(item) => item.genre_name}
                        renderItem={({ item }) => (
                            <View><Text>{item.genre_name}</Text>
                            </View>)}
                    />
                    <Button
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Edit'
                        onPress={() => {
                            const { navigation } = this.props;
                            navigation.navigate("EditMovie", { movie_id: this.state.movie_id })
                        }
                        }
                    />

                </Card>
            </View>

        }
    }

}
export default function(props) {
    const navigation = useNavigation();
    return <DetailMovie {...props} navigation={navigation} />;
 }