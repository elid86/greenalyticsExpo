'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Alert
} from 'react-native';

const userName = "zlef";


export default class HardwareStatsPage extends Component<Props> {
    static navigationOptions = {
        title: 'Hardware Stats',
    };

constructor(props){
    super(props)
}

//--load existing Beds
componentDidMount(){
    //******* USE THIS TO PASS THE HARDWARE YOU'RE LOOKING AT AND CALL THE FUNCTION THAT CALLS THE API
    const {params} = this.props.navigation.state;

}



render() {
    return (
        <View style={styles.container}>

        </View>


);
}
}

const styles=StyleSheet.create({
    container: {
        top: 0,
        flex:20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
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
    }
});
