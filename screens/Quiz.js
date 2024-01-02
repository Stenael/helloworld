import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { LinearProgress, Button, Text, Chip } from "@rneui/base";
import Question from "../class/question";


class Quiz extends Component {
    batas = 10


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


    checkAnswer(s) {
        var temp2;
        var temp4 = false
        var temp3 = this.state.skor;
        if (s == this.state.quiz[this.state.nomor].answer) {
            temp3 = this.state.skor + 100;
        } else {
            temp3 = this.state.skor - 50;
        }
        temp2 = this.state.nomor + 1;
        if (temp2 >= this.state.quiz.length) {
            temp2 = 0;
            temp4 = true
        }
        this.setState(
            this.state = {
                count: this.batas,
                nomor: temp2,
                skor: temp3,
                selesai: temp4
            })
    }


    state = {

        quiz: [
            new Question('Not a member of Avenger ', 'Ironman',
                'Spiderman', 'Thor', 'Hulk Hogan', 'Hulk Hogan'),
            new Question("Not a member of Teletubbies", 'Dipsy',
                'Patrick', 'Laalaa', 'Poo', 'Patrick'),
            new Question("Not a member of justice league", 'batman',
                'superman', 'flash', 'aquades', 'aquades')
        ],
        nomor: 0,
        skor: 0,
        selesai: false,
        count: this.batas,
        oneSecInterval: setInterval(() => {

            if (this.state.count == 0) {
                if (this.state.nomor == (this.state.quiz.length - 1)) {
                    this.setState(
                        this.state = {
                            count: this.batas,
                            nomor: 0,
                            selesai: true
                        })
                } else {
                    this.setState(
                        this.state = {
                            count: this.batas,
                            nomor: this.state.nomor + 1
                        })
                }

            }

            this.setState(
                this.state = {
                    count: this.state.count - 1
                })
        }, 1000)

    }
    render() {
        if (this.state.selesai == true) {
            return <View style={styles.vparent}>
                <Text h3>Your Score:</Text>
                <Chip
                    type="outline"
                    title={this.state.skor}
                />
            </View>
        }
        else {
            return <View>
                <LinearProgress animation={false}
                    value={1 - (this.state.count / this.batas)}
                    color="primary" />
                <Text >{this.toHHMMSS(this.state.count)}  Skor={this.state.skor}</Text>

                <Text h3>{this.state.quiz[this.state.nomor].question}</Text>
                <View style={styles.vparent}>
                    <Button onPress={() => { this.checkAnswer(this.state.quiz[this.state.nomor].option_a) }}
                        title={"A. " + this.state.quiz[this.state.nomor].option_a} type="clear" />
                    <Button onPress={() => { this.checkAnswer(this.state.quiz[this.state.nomor].option_b) }}
                        title={"B. " + this.state.quiz[this.state.nomor].option_b} type="clear" />
                    <Button onPress={() => { this.checkAnswer(this.state.quiz[this.state.nomor].option_c) }}
                        title={"C. " + this.state.quiz[this.state.nomor].option_c} type="clear" />
                    <Button onPress={() => { this.checkAnswer(this.state.quiz[this.state.nomor].option_d) }}
                        title={"D. " + this.state.quiz[this.state.nomor].option_d} type="clear" />
                </View>

            </View>

        }
    }

}


const styles = StyleSheet.create({
    vparent: {
        flex: 1,
        justifyContent: 'center',
    }
});


export default Quiz