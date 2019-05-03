'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
} from 'react-native';

type Props = {};

//-------- TEMPORARY API DETAILS -------//
var userName = '';

//------ Gardens Page --------//
export default class PlantDetailsPage extends Component<Props> {

    //- details of the navigation bar on this page
    static navigationOptions = {
        title: 'Plant Details',
    };

//- initial state of the page
constructor(props)
{
    super(props);
    this.state = {
        //- setting page settings
        isLoading: true,
        message: '',
        dataSoure: null,
    };
}


//- even handlers for page (must define when making object)

async componentDidMount()
{
    const {params} = this.props.navigation.state;
    console.log('-----plantsDetails params: ' +params.toString());
    userName = await params.userName;
    const item = params.plant;
    var url = 'http://greenalytics.ga:5000/api/'+userName+'/plant/'+item;
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
.then((responseJson) => {
    this.setState({
        isLoading: false,
        dataSource: responseJson
    })
    console.log(responseJson);
})
.catch((error) => {
    console.error(error);
});

}


//- what will show on the page
render(){
    if (this.state.isLoading) {
        return (
            < View style={{top: 100}}>
    < ActivityIndicator size='large'/>
            < /View>
    );
    } else {
        return (
            <View style={styles.container}>
            <Text style={styles.title}>
            {this.state.dataSource.name}
            </Text>
            <Text style={styles.description}>
            {this.state.dataSource.plantType}
            </Text>
            <Text style={styles.description} >
            {this.state.dataSource.description}
            </Text>
            <Text style={styles.description} >
            {this.state.dataSource.tempString[0]}
            </Text>
            <Text style={styles.description} >
            {this.state.dataSource.tempString[1]}
            </Text>
            <Text style={styles.description} >
            {this.state.dataSource.tempString[2]}
            </Text>
            </View>
    );
    }
}
}


//--------- Styles for this page -----------//

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
        flexWrap: 'wrap'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
        marginRight: 5,
        flexGrow: 1,
        height: 36
    }
});
