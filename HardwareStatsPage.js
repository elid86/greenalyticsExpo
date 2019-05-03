'use strict';

import React, {Component} from 'react';
import {VictoryAxis, VictoryChart, VictoryLine, VictoryTheme} from "victory-native";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

const userName = "zlef";
var MACaddress = "";

var light = [];
var temperature = [];
var humidity = [];

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function format_json (value_list, type){

    for(var i = 0; i<value_list.length; i++){
        if(type === "light"){
            light.push({ time: convertUTCDateToLocalDate(new Date(value_list[i][0] )).toLocaleTimeString(),value: value_list[i][1]});
        }
        else if(type === "temperature"){
            temperature.push({ time: convertUTCDateToLocalDate(new Date(value_list[i][0] )).toLocaleTimeString(),value: value_list[i][1]});
        }
        else if(type === "humidity"){
            humidity.push({ time: convertUTCDateToLocalDate(new Date(value_list[i][0] )).toLocaleTimeString(),value: value_list[i][1]});
        }
    }

    console.log(type);
}

function getDay (h_id,type){

    var now = Math.floor(Date.now() / 1000);

    var yesterday = now - (60*60*24);
    var url = 'http://greenalytics.ga:5000/api/hardware/'+h_id+'/'+type+'/'+yesterday;
    return fetch(url)
        .then((response) => response.json())
}

function getWeek(h_id,type) {

    var now = Math.floor(Date.now() / 1000);

    var week = now - (60*60*24*7);
    var url = 'http://greenalytics.ga:5000/api/hardware/'+h_id+'/'+type+'/'+week;
    return fetch(url)
        .then((response) => response.json())
}

function getMonth(h_id,type){

    var now = Math.floor(Date.now() / 1000);

    var month = now - (60*60*24*7*4);
    var url = 'http://greenalytics.ga:5000/api/hardware/'+h_id+'/'+type+'/'+month;
    return fetch(url)
        .then((response) => response.json())
}

export default class HardwareStatsPage extends Component<Props> {
    static navigationOptions = {
        title: 'Hardware Stats',
    };

    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        };
    }


    onPress_day = async () => {
        //Resetting values
        light = [];
        temperature = [];
        humidity = [];

        this.setState({isLoading: true });

        await getDay(MACaddress,"light").then(
            json => format_json(json, "light")
        );

        await getDay(MACaddress,"temperature").then(
            json => format_json(json, "temperature")
        );

        await getDay(MACaddress,"humidity").then(
            json => format_json(json, "humidity")
        );

        this.setState({isLoading: false });
    };

    onPress_week = async () => {
        //Resetting values
        light = [];
        temperature = [];
        humidity = [];

        this.setState({isLoading: true });

        await getWeek(MACaddress,"light").then(
            json => format_json(json, "light")
        );
        await getWeek(MACaddress,"temperature").then(
            json => format_json(json, "temperature")
        );
        await getWeek(MACaddress,"humidity").then(
            json => format_json(json, "humidity")
        );

        this.setState({isLoading: false });
    };

    onPress_month = async () => {
        //Resetting values
        light = [];
        temperature = [];
        humidity = [];

        this.setState({isLoading: true });

        await getMonth(MACaddress,"light").then(
            json => format_json(json, "light")
        );
        await getMonth(MACaddress,"temperature").then(
            json => format_json(json, "temperature")
        );
        await getMonth(MACaddress,"humidity").then(
            json => format_json(json, "humidity")
        );

        this.setState({isLoading: false });
    };



//--load existing Beds
    async componentDidMount() {
        //******* USE THIS TO PASS THE HARDWARE YOU'RE LOOKING AT AND CALL THE FUNCTION THAT CALLS THE API
        const {params} = this.props.navigation.state;
        MACaddress = await params.MACaddress;

        await this.onPress_day()
        // console.log(temperature);
        // console.log(light);
        this.setState({isLoading: false })
    }

    render() {
        if (this.state.isLoading) {
            return (
                < View style={{top: 100}}>
                    < ActivityIndicator size='large'/>
                < /View>
            );
        }
        else{
                return (
                <ScrollView>


                <View style={styles.container1}>
                <TouchableOpacity onPress={this.onPress_day} style={styles.fab1}>
                <Text style={styles.fabIcon}>Day</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onPress_week} style={styles.fab2}>
                <Text style={styles.fabIcon}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onPress_month} style={styles.fab3}>
                <Text style={styles.fabIcon}>Month</Text>
                </TouchableOpacity>

                </View>

                <View style={styles.container2} pointerEvents="none">
                <Text>Sunlight</Text>
                <VictoryChart
                width={350}
                theme={VictoryTheme.material}>

                <VictoryLine data={light} x="time" y="value"/>
                <VictoryAxis fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis/>
                </VictoryChart>
                <Text>Temperature</Text>
                <VictoryChart
                width={350}
                theme={VictoryTheme.material}>

                <VictoryLine data={temperature} x="time" y="value"/>
                <VictoryAxis fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis/>
                </VictoryChart>
                <Text>Humidity</Text>
                <VictoryChart
                width={350}
                theme={VictoryTheme.material}>

                <VictoryLine data={humidity} x="time" y="value"/>
                <VictoryAxis fixLabelOverlap={true}/>
                <VictoryAxis dependentAxis/>
                </VictoryChart>
                </View>

                </ScrollView>
                );
            }
    }


}

const styles=StyleSheet.create({
    container1: {
        top: 20,
        flex:20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    container2: {
        top: 45,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 40
    },
    headerText: {
        top: -240,
        fontSize:30,
        textAlign:"center",
        margin:10,
        fontWeight:'bold'
    },
    Box: {
        top: -230,
        height: 60,
        width: "95%",
        borderColor:"green",
        borderWidth: 3,
        color:"black"
    },
    fab1: {
        position: 'absolute',
        flexDirection: 'row',
        height: 24,
        width: 88,
        alignItems: 'center',
        justifyContent: 'center',
        left: 10,
        right: 20,
        backgroundColor: '#274f19',
        borderRadius: 30,
        elevation: 8
    },
    fab2: {
        position: 'absolute',
        flexDirection: 'row',
        height: 24,
        width: 88,
        alignItems: 'center',
        justifyContent: 'center',
        left: 140,
        right: 20,
        backgroundColor: '#274f19',
        borderRadius: 30,
        elevation: 8
    },
    fab3: {
        position: 'absolute',
        flexDirection: 'row',
        height: 24,
        width: 88,
        alignItems: 'center',
        justifyContent: 'center',
        left: 270,
        right: 20,
        backgroundColor: '#274f19',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 20,
        color: 'white'
    }
});
