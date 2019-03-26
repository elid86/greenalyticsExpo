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
export default class GardensPage extends Component<Props> {

    //- details of the navigation bar on this page
    static navigationOptions = {
        title: 'My Gardens',
    };

//- what will show on the page
render() {
    return (
        <View style={styles.container}>
        <Text style={styles.description}>
        Add your gardens here!
    </Text>
    <Text style={styles.description}>
        Coming soon...
    </Text>
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
});
