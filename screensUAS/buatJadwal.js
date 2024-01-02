import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
class BuatJadwal extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Tanggal Dolan"
            
                    onChangeText={(text) => setTanggal(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Jam Dolan"
                   
                    onChangeText={(text) => setJam(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Lokasi Dolan"
                  
                    onChangeText={(text) => setLokasi(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Alamat Dolan"
                   
                    onChangeText={(text) => setAlamat(text)}
                />
                <Picker
                    // selectedValue={dolanUtama}
                    style={styles.input}
                    // onValueChange={(itemValue) => setDolanUtama(itemValue)}
                >
                    <Picker.Item label="Pilih Dolan Utama" value="Pilih Dolan Utama" />
                    <Picker.Item label="Dolan A" value="Dolan A" />
                    <Picker.Item label="Dolan B" value="Dolan B" />
                    {/* Tambahkan item lain sesuai kebutuhan */}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Minimal Member"
                    
                    onChangeText={(text) => setMinimalMember(text)}
                    keyboardType="numeric"
                />
                <Button title="Buat Jadwal"  />
            </View>
        );
    }

}
export default function (props) {
    const navigation = useNavigation();
    return <BuatJadwal {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});
