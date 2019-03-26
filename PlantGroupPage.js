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

//------ Plant Groups Page --------//
export default class PlantGroupPage extends Component<Props> {
    //- details of the navigation bar on this page
    static navigationOptions = {
        title: 'Plant Groups',
    };

    //- what will show on the page
render() {
    return (
        <View style={styles.container}>
        <Text style={styles.description}>
        Add your plant groups here!
    </Text>
    <Text style={styles.description}>
        From there you can add plants to your plant groups.
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

