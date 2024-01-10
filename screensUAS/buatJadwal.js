import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  DropDownPicker,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ValidationComponent from "react-native-form-validator";
import DateTimePicker from "react-native-modal-datetime-picker";
import { DatePickerModal } from "react-native-paper-dates";
class BuatJadwal extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      tanggal: "",
      alamat: "",
      lokasi: "",
      jam: 0,
      min_member: 0,
      id_dolan: 0,
      isDateTimePickerVisible: false,
    };
  }
  submitData = () => {
    const options = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body:
        "tanggal=" +
        this.state.tanggal +
        "&" +
        "alamat=" +
        this.state.alamat +
        "&" +
        "lokasi=" +
        this.state.lokasi +
        "&" +
        "jam=" +
        this.state.jam +
        "&" +
        "idDolan=" +
        this.state.id_dolan +
        "&" +
        "min_member=" +
        this.state.min_member,
    };
    try {
      fetch("https://ubaya.me/react/160420112/UAS_newJadwal.php", options)
        .then((response) => response.json())
        .then((resjson) => {
          console.log(resjson);
          if (resjson.result === "success") alert("sukses");
        });
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  };
  _onPressButton = () => {
    if (
      this.validate({
        alamat: { required: true },
        lokasi: { required: true },
        jam: { required: true },
        min_member: { required: true },
      })
    ) {
      this.submitData();
    }
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    this.setState({
      tanggal:
        date.date.getFullYear() +
        "-" +
        (date.date.getMonth() + 1) +
        "-" +
        date.date.getDate(),
    });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Release Date</Text>
        <View style={styles.viewRow}>
          <Text style={styles.input2}>{this.state.release_date}</Text>
          <Button title="..." onPress={this.showDateTimePicker} />
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={this.state.isDateTimePickerVisible}
          onDismiss={this.hideDateTimePicker}
          date={this.state.tanggal}
          onConfirm={this.handleDatePicked}
        />

        <TextInput
          style={styles.input}
          placeholder="Jam Dolan"
          value={this.state.jam}
          onChangeText={(jam) => this.setState({ jam })}
        />
        <TextInput
          style={styles.input}
          placeholder="Lokasi Dolan"
          onChangeText={(lokasi) => this.setState({ lokasi })}
          value={this.state.lokasi}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat Dolan"
          value={this.state.alamat}
          onChangeText={(alamat) => this.setState({ alamat })}
        />
        <Picker
          // selectedValue={dolanUtama}
          style={styles.input}
          value={this.state.id_dolan}
          onValueChange={(id_dolan) => this.setState({ id_dolan })}
        >
          <Picker.Item label="Pilih Dolan Utama" value="Pilih Dolan Utama" />
          <Picker.Item label="Petang Umpet" value="1" />
          <Picker.Item label="Gobak Sodor" value="2" />
          <Picker.Item label="Lompat Tali" value="3" />
          <Picker.Item label="Sepak Bola" value="4" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Minimal Member"
          value={this.state.min_member}
          onChangeText={(min_member) => this.setState({ min_member })}
          keyboardType="numeric"
        />
        <Button title="Buat Jadwal" onPress={this._onPressButton} />
        <Text>{this.getErrorMessages()}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  input2: {
    height: 40,
    borderWidth: 1,
    width: 300,
    padding: 10,
  },
});
