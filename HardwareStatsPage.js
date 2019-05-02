'use strict';

import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Alert
} from 'react-native';

const userName = "zlef";

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}



const temp = [
    { time: convertUTCDateToLocalDate(new Date(1554007749 )).toLocaleTimeString(),value: 66},
    { time: convertUTCDateToLocalDate(new Date(1554017971 )).toLocaleTimeString(),value: 67},
    { time: convertUTCDateToLocalDate(new Date(1554027973 )).toLocaleTimeString(),value: 68},
    { time: convertUTCDateToLocalDate(new Date(1554037975 )).toLocaleTimeString(),value: 72},
    { time: convertUTCDateToLocalDate(new Date(1554047983 )).toLocaleTimeString(),value: 64},
    { time: convertUTCDateToLocalDate(new Date(1554057987 )).toLocaleTimeString(),value: 50},
    { time: convertUTCDateToLocalDate(new Date(1554067992 )).toLocaleTimeString(),value: 45},
    { time: convertUTCDateToLocalDate(new Date(1554077994 )).toLocaleTimeString(),value: 50},
    { time: convertUTCDateToLocalDate(new Date(1554087997 )).toLocaleTimeString(),value: 62},
    { time: convertUTCDateToLocalDate(new Date(1554097999 )).toLocaleTimeString(),value: 69}
];

const humidity = [
    { time: convertUTCDateToLocalDate(new Date(1554007971 )).toLocaleTimeString(),value: 44},
    { time: convertUTCDateToLocalDate(new Date(1554017973 )).toLocaleTimeString(),value: 45},
    { time: convertUTCDateToLocalDate(new Date(1554027976 )).toLocaleTimeString(),value: 44},
    { time: convertUTCDateToLocalDate(new Date(1554037983 )).toLocaleTimeString(),value: 46},
    { time: convertUTCDateToLocalDate(new Date(1554047988 )).toLocaleTimeString(),value: 43},
    { time: convertUTCDateToLocalDate(new Date(1554057992 )).toLocaleTimeString(),value: 42},
    { time: convertUTCDateToLocalDate(new Date(1554067995 )).toLocaleTimeString(),value: 45},
    { time: convertUTCDateToLocalDate(new Date(1554077997 )).toLocaleTimeString(),value: 44},
    { time: convertUTCDateToLocalDate(new Date(1554087999 )).toLocaleTimeString(),value: 43},
    { time: convertUTCDateToLocalDate(new Date(1554098001 )).toLocaleTimeString(),value: 44}
];

export default class HardwareStatsPage extends Component<Props> {
    static navigationOptions = {
        title: 'Hardware Stats',
    };

    constructor(props){
        super(props)
    }

    state = {
        light:[
            { time: convertUTCDateToLocalDate(new Date(1554007971)).toLocaleTimeString(),value: 123},
            { time: convertUTCDateToLocalDate(new Date(1554008974)).toLocaleTimeString(),value: 121},
            { time: convertUTCDateToLocalDate(new Date(1554009976)).toLocaleTimeString(),value: 119},
            { time: convertUTCDateToLocalDate(new Date(1554017983)).toLocaleTimeString(),value: 121},
            { time: convertUTCDateToLocalDate(new Date(1554027988)).toLocaleTimeString(),value: 795},
            { time: convertUTCDateToLocalDate(new Date(1554037993)).toLocaleTimeString(),value: 117},
            { time: convertUTCDateToLocalDate(new Date(1554047995)).toLocaleTimeString(),value: 17},
            { time: convertUTCDateToLocalDate(new Date(1554057997)).toLocaleTimeString(),value: 120},
            { time: convertUTCDateToLocalDate(new Date(1554067999)).toLocaleTimeString(),value: 800},
            { time: convertUTCDateToLocalDate(new Date(1554908002)).toLocaleTimeString(),value: 1012}
        ]
    };

    onPress_day = () => {
        this.setState({
            light:[
                { time: convertUTCDateToLocalDate(new Date(1554007971)).toLocaleTimeString(),value: 123},
                { time: convertUTCDateToLocalDate(new Date(1554008974)).toLocaleTimeString(),value: 121},
                { time: convertUTCDateToLocalDate(new Date(1554009976)).toLocaleTimeString(),value: 119},
                { time: convertUTCDateToLocalDate(new Date(1554017983)).toLocaleTimeString(),value: 121},
                { time: convertUTCDateToLocalDate(new Date(1554027988)).toLocaleTimeString(),value: 795},
                { time: convertUTCDateToLocalDate(new Date(1554037993)).toLocaleTimeString(),value: 117},
                { time: convertUTCDateToLocalDate(new Date(1554047995)).toLocaleTimeString(),value: 17},
                { time: convertUTCDateToLocalDate(new Date(1554057997)).toLocaleTimeString(),value: 120},
                { time: convertUTCDateToLocalDate(new Date(1554067999)).toLocaleTimeString(),value: 800},
                { time: convertUTCDateToLocalDate(new Date(1554908002)).toLocaleTimeString(),value: 1012}
            ]
        })
    };

    onPress_week = () => {
        this.setState({
            light:[
                { time: convertUTCDateToLocalDate(new Date(1554007971)).toLocaleTimeString(),value: 988},
                { time: convertUTCDateToLocalDate(new Date(1554008974)).toLocaleTimeString(),value: 225},
                { time: convertUTCDateToLocalDate(new Date(1554009976)).toLocaleTimeString(),value: 42},
                { time: convertUTCDateToLocalDate(new Date(1554017983)).toLocaleTimeString(),value: 988},
                { time: convertUTCDateToLocalDate(new Date(1554027988)).toLocaleTimeString(),value: 1012},
                { time: convertUTCDateToLocalDate(new Date(1554037993)).toLocaleTimeString(),value: 15},
                { time: convertUTCDateToLocalDate(new Date(1554047995)).toLocaleTimeString(),value: 600},
                { time: convertUTCDateToLocalDate(new Date(1554057997)).toLocaleTimeString(),value: 420},
                { time: convertUTCDateToLocalDate(new Date(1554067999)).toLocaleTimeString(),value: 69},
                { time: convertUTCDateToLocalDate(new Date(1554908002)).toLocaleTimeString(),value: 69}
            ]
        })
    };

    onPress_month = () => {
        this.setState({
            light:[
                { time: convertUTCDateToLocalDate(new Date(1554007971)).toLocaleTimeString(),value: 400},
                { time: convertUTCDateToLocalDate(new Date(1554008974)).toLocaleTimeString(),value: 500},
                { time: convertUTCDateToLocalDate(new Date(1554009976)).toLocaleTimeString(),value: 600},
                { time: convertUTCDateToLocalDate(new Date(1554017983)).toLocaleTimeString(),value: 200},
                { time: convertUTCDateToLocalDate(new Date(1554027988)).toLocaleTimeString(),value: 600},
                { time: convertUTCDateToLocalDate(new Date(1554037993)).toLocaleTimeString(),value: 500},
                { time: convertUTCDateToLocalDate(new Date(1554047995)).toLocaleTimeString(),value: 200},
                { time: convertUTCDateToLocalDate(new Date(1554057997)).toLocaleTimeString(),value: 400},
                { time: convertUTCDateToLocalDate(new Date(1554067999)).toLocaleTimeString(),value: 900},
                { time: convertUTCDateToLocalDate(new Date(1554908002)).toLocaleTimeString(),value: 200}
            ]
        })
    };



//--load existing Beds
    componentDidMount(){
        //******* USE THIS TO PASS THE HARDWARE YOU'RE LOOKING AT AND CALL THE FUNCTION THAT CALLS THE API
        const {params} = this.props.navigation.state;
    }



    render() {

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

                <View style={styles.container2}>

                    <Text>Sunlight</Text>
                    <VictoryChart
                        width={350}
                        theme={VictoryTheme.material}
                        animate={{ onLoad: { duration: 800 } }}>
                        <VictoryLine data={this.state.light} x="time" y="value"/>
                        <VictoryAxis fixLabelOverlap={true}/>
                        <VictoryAxis dependentAxis/>
                    </VictoryChart>
                    <Text>Temperature</Text>
                    <VictoryChart
                        width={350}
                        theme={VictoryTheme.material}
                        animate={{ onLoad: { duration: 800 } }}>
                        <VictoryLine data={temp} x="time" y="value"/>
                        <VictoryAxis fixLabelOverlap={true}/>
                        <VictoryAxis dependentAxis/>
                    </VictoryChart>
                    <Text>Humidity</Text>
                    <VictoryChart
                        width={350}
                        theme={VictoryTheme.material}
                        animate={{ onLoad: { duration: 800 } }}>
                        <VictoryLine data={humidity} x="time" y="value"/>
                        <VictoryAxis fixLabelOverlap={true}/>
                        <VictoryAxis dependentAxis/>
                    </VictoryChart>
                </View>

            </ScrollView>
        );
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
