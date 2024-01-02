import { StyleSheet, View, Text, FlatList, TextInput, Button } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

class PopularActor extends React.Component {
    constructor() {
        super();
        this.state = {}
        cari: "",
        this.fetchData()
        
    }

    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "cari=" + this.state.cari
        };

        try {
            fetch('https://ubaya.me/react/160420112/listactor.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            data: resjson.data
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }
    showData(data) {
        return <FlatList
            data={data}
            keyExtractor={(item) => item.person_id.toString()}
            renderItem={({ item }) => (
                <Card>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Card.Image
                            source={{ uri: item.person_image }}
                            style={{ width: 200, height: 200 }} 
                        />
                    </View>
                    <Card.Title>{item.person_name}</Card.Title>
                    <Button
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW DETAIL'
                        onPress={() => {
                            const { navigation } = this.props;
                            navigation.navigate("DetailActor", { person_id: item.person_id })
                        }
                        }
                    />

                </Card>
            )}
        />
    }


    render() {  
        return <View>
                <Card>
                  <View  style={styles.viewRow} >
                      <Text>Cari </Text>
                      <TextInput style={styles.input}
                      onChangeText={(cari) => this.setState({cari})}
                      onSubmitEditing={this.fetchData()} 
                       />
                    </View>
                </Card>

                 {this.showData(this.state.data)}
                 
              </View>
    }
}




export default function(props){
    const navigation = useNavigation();
    return <PopularActor {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      width:200,
      borderWidth: 1,
      padding: 10,
    },
    viewRow:{
       flexDirection:"row",
       justifyContent:"flex-end",
       alignItems: 'center',
       paddingRight:50,
       margin:3
    }
 })
