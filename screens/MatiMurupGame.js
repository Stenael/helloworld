import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button, Pressable, Picker } from "react-native";
import { LinearProgress } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

class MatiMurupGame extends Component {
    toHHMMSS(v) {
        var sec_num = parseInt(v, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            clue: 'Hapalkan Polanya',
            ronde: 0,
            isStartGame: false,
            selectedDifficulty: 'Mudah',
            gridColors: [
                'transparent',
                'transparent',
                'transparent',
                'transparent',
                'transparent',
                'transparent',
                'transparent',
                'transparent',
                'transparent'],
            colorChangeCount: 0,
            isDisabled: true,
            isHighScore: false,
            listClue: [],
            listAnswer: [],
            statusRonde: 1,
            statusBenar: false

        };
        this.interval = null;


    }
    clueGantiWarnaGrid = () => {
        const randomIndex = Math.floor(Math.random() * 9);
        const updatedGridColors = [...this.state.gridColors];
        if (this.state.colorChangeCount < this.tingkatKesulitan ()) {

            updatedGridColors[randomIndex] = 'red';

            this.setState((prevState) => ({
                gridColors: updatedGridColors,
                colorChangeCount: prevState.colorChangeCount + 1,
                listClue: [...prevState.listClue, randomIndex],
            }));

            setTimeout((prevState) => {
                updatedGridColors[randomIndex] = 'transparent';
                this.setState({ gridColors: updatedGridColors });

            }, 300);
        } else {
            updatedGridColors[randomIndex] = 'transparent';
            this.setState({ gridColors: updatedGridColors, clue: 'Tekan Tombol Sesuai Urutan', isDisabled: false });

        }
    };
    tingkatKesulitan () {
        switch (this.state.selectedDifficulty) {
            case 'Sedang':
                return 9;
            case 'Sulit':
                return 12;
            default:
                return 5;
            
        }
    }
    mulaiPermainan() {
        this.clueGantiWarnaGrid();
        this.interval = setInterval(this.clueGantiWarnaGrid, 500);
    }

   
    pengecekanSetupPermainan = async (nama, ronde) => {
        if (nama === '') {
            alert('Nama belum diisi');
        } else if (ronde <= 0 || ronde > 10) {
            alert('Jumlah ronde tidak valid');
        } else {
            try {
                await AsyncStorage.setItem('nama', nama);
                await AsyncStorage.setItem('ronde', ronde.toString());
                alert("Oke gass");
                this.setState({
                    isStartGame: true,
                    ronde: ronde,
                    count: 10,
                    statusRonde: 1
                });
                this.mulaiPermainan();
               
            } catch (e) {
                console.error('Terjadi kesalahan saat menyimpan data: ', e);
            }
        }
    }
    pengecekanJawabanUser = (index) => {
        if (this.state.isDisabled) {
            return;
        }
    
        const expectedIndex = this.state.listClue[this.state.listAnswer.length];
    
        if (index === expectedIndex) {
            this.setState((prevState) => ({
                listAnswer: [...prevState.listAnswer, index],
            }));
    
            if (
                JSON.stringify(this.state.listAnswer) === JSON.stringify(this.state.listClue)
                && this.state.listAnswer.length === this.state.listClue.length
            ) {
           
                if (this.state.ronde > 0) {
                
                    this.setState((prevState) => ({
                        statusRonde: prevState.statusRonde + 1,
                        ronde: prevState.ronde - 1,
                        statusBenar: true,
                        listAnswer: [],
                        clue: 'Hapalkan Polanya',
                        isDisabled: true,
                    }));
                    this.mulaiPermainan(); 
                } else {
                   
                    this.setState({
                        isHighScore: true
                    });
                }
            } else {
                this.setState({ clue: 'Benar!' });
            }
        } else {
            this.setState({ clue: 'Salah! Coba lagi', statusBenar: false, isHighScore: true });
        }
    };
    
    render() {
        if (this.state.isHighScore == true) {
            return (
                <View style={styles.vparent}>
                    <Text>Your Current Score:</Text>
                    <Text>{this.state.statusRonde}</Text>
                    <Text>High Score:</Text>
                    <Text>{this.state.ronde}</Text>
                </View>
            );

        }
        return (
            <View style={styles.vparent}>
                {this.state.isStartGame ? (
                    <View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.nama}</Text>
                            <Text value="clue">{this.state.clue}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => this.pengecekanJawabanUser(0)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[0] }]} value="1" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(1)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[1] }]} value="2" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(2)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[2] }]} value="3" /></Pressable>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => this.pengecekanJawabanUser(3)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[3] }]} value="4" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(4)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[4] }]} value="5" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(5)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[5] }]} value="6" /></Pressable>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => this.pengecekanJawabanUser(6)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[6] }]} value="7" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(7)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[7] }]} value="8" /></Pressable>
                                <Pressable onPress={() => this.pengecekanJawabanUser(8)} disabled={this.state.isDisabled}><View style={[styles.grid, { backgroundColor: this.state.gridColors[8] }]} value="9" /></Pressable>
                            </View>
                        </View>
                        <View>
                            <Text>Ronde: {this.state.statusRonde}</Text>
                            <Text>Level:  {this.state.selectedDifficulty}</Text>
                            {/* <Button onPress={() => alert(this.state.statusBenar)}>grid colors</Button>
                            <Button onPress={() => alert(this.state.listClue.length)}>grid clue</Button>
                            <Button onPress={() => alert(this.state.listAnswer.length)}>grid answer</Button>
                            <Button onPress={() => alert(this.state.listClue)}>grid clue</Button>
                            <Button onPress={() => alert(this.state.listAnswer)}>grid answer</Button>
                            <Button onPress={() => alert(this.pengecekanJawabanUser)} label="cek">grid answer</Button> */}
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.judul}>Setup Permainan</Text>
                        <View style={styles.isi}>
                            <Text>Name Pemain</Text>
                            <TextInput style={styles.input} onChangeText={(nama) => this.setState({ nama })} value={this.state.nama} />
                            <Text>Jumlah Ronde</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(ronde) => {
                                    if (!isNaN(ronde)) {
                                        this.setState({ ronde: parseInt(ronde) });
                                    }
                                }}
                                value={this.state.ronde.toString()}
                                keyboardType="numeric"
                            />
                            <View style={styles.isi}>
                                <Text>Tingkat Kesulitan</Text>
                                <Picker
                                    selectedValue={this.state.selectedDifficulty}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedDifficulty: itemValue })
                                    }
                                >
                                    <Picker.Item label="Mudah" value="Mudah" />
                                    <Picker.Item label="Sedang" value="Sedang" />
                                    <Picker.Item label="Sulit" value="Sulit" />
                                </Picker>
                            </View>
                            <View style={styles.isi}>
                                <Button
                                    title="Submit"
                                    onPress={() => this.pengecekanSetupPermainan(this.state.nama, this.state.ronde)}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        borderWidth: 1
    },
    vparent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    judul: {
        fontSize: 30,
        color: 'black'
    },
    isi: {
        paddingTop: 40
    },
    grid: {
        height: 100,
        width: 100,
        borderWidth: 1,
    }
});

export default MatiMurupGame; 