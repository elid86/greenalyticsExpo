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

//------ Gardens Page --------//
export default class PlantDetailsPage extends Component<Props> {

    //- details of the navigation bar on this page
    static navigationOptions = {
        title: 'Plant Details',
    };

//- initial state of the page
constructor(props) {
    super(props);
    this.state = {
        //- setting page settings
        isLoading: false,
        message: '',
    };
}

//- even handlers for page (must define when making object)



//- what will show on the page
render() {
    const spinner = this.state.isLoading ?
<ActivityIndicator size='large'/> : null;
    return (
        <View style={styles.container}>
    <Text style={styles.title}>
        Coming soon...
    </Text>
    {spinner}
<Text style={styles.description}>{this.state.message}</Text>
        </View>

);
}
}


//--------- Styles for this page -----------//

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
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
        color: '#48BBEC',
        marginRight: 5,
        flexGrow: 1,
        height: 36
    }
});
