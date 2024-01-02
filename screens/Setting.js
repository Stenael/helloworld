import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button, Pressable, Picker } from "react-native";
import { LinearProgress } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

class MatiMurupGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            ronde: 0,
            isStartGame: false,
            count: 10,
            skor: 0,
            selectedDifficulty: 'Mudah',
            gridColors: ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
            colorChangeCount: 0,
        };
        this.interval = null;
    }

    componentWillUnmount() {
        // Hentikan interval ketika komponen tidak lagi digunakan
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    autoChangeGridColor = () => {
        if (this.state.colorChangeCount < this.getMaxColorChanges()) {
            const randomIndex = Math.floor(Math.random() * 9);
            const updatedGridColors = [...this.state.gridColors];
            updatedGridColors[randomIndex] = 'red';

            this.setState((prevState) => ({
                gridColors: updatedGridColors,
                colorChangeCount: prevState.colorChangeCount + 1,
            }));

            setTimeout(() => {
                updatedGridColors[randomIndex] = 'transparent';
                this.setState({ gridColors: updatedGridColors });
            }, 5000);
        } else {
            clearInterval(this.interval);
        }
    };

    getMaxColorChanges() {
        switch (this.state.selectedDifficulty) {
            case 'Sedang':
                return 9;
            case 'Sulit':
                return 12;
            default:
                return 5; 
        }
    }

    startColorChangeInterval() {
        this.autoChangeGridColor();
        this.interval = setInterval(this.autoChangeGridColor, 5000);
    }

    cekGame = async () => {
        try {
            const valueGame = await AsyncStorage.getItem('nama');
            const jmlhRonde = await AsyncStorage.getItem('ronde');

            if (valueGame !== null && jmlhRonde !== null) {
                this.setState({
                    nama: valueGame,
                    ronde: parseInt(jmlhRonde),
                    isStartGame: true,
                });

                this.startCountdown();
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data dari penyimpanan: ', error);
        }
    }

    startCountdown() {
        this.interval = setInterval(() => {
            if (this.state.count === 0) {
                this.setState((prevState) => ({
                    count: 10,
                    ronde: prevState.ronde - 1
                }));

                if (this.state.ronde === 0) {
                    clearInterval(this.interval);
                }
            } else {
                this.setState((prevState) => ({
                    count: prevState.count - 1
                }));
            }
        }, 1000);
    }

    doPlayGame = async (nama, ronde) => {
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
                });
                this.startColorChangeInterval();
                this.startCountdown();
            } catch (e) {
                console.error('Terjadi kesalahan saat menyimpan data: ', e);
            }
        }
    }

    render() {
        return (
            <View style={styles.vparent}>
                {this.state.isStartGame ? (
                    <View>
                        <Text>Ini Setting</Text>
                        <LinearProgress
                            animation={false}
                            value={1 - (this.state.count / 10)}
                            color="primary"
                        />
                        <Text>{this.state.count}, {this.state.ronde} lagi</Text>
                        <Text>Tingkat Kesulitan: {this.state.selectedDifficulty}</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.nama}</Text>
                            <Text value="clue">Clue</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {this.state.gridColors.map((color, index) => (
                                    <Pressable key={index} onPress={() => this.changeRandomGridColorToRed(index)}>
                                        <View style={[styles.grid, { backgroundColor: color }]} value={index.toString()} />
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.judul}>Setup Permainan</Text>
                        <View style={styles.isi}>
                            <Text>Nama Pemain</Text>
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
                                    onPress={() => this.doPlayGame(this.state.nama, this.state.ronde)}
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
        flex: 1,
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

