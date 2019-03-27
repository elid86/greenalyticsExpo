'use strict';

//------- MY PLANTS PAGE FOR EACH PLANT GROUP --------

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';


//------ plantsPage class -------------//
type Props = {};
export default class PlantsPage extends Component<Props> {
    static navigationOptions = {
        title: 'My Plants',
    };

_keyExtractor = (item, index) => index.toString();

_renderItem = ({item}) => {
    return (
        <TouchableHighlight
    underlayColor='#dddddd'>
        <View>
        <Text>{item.title}</Text>
        </View>
        </TouchableHighlight>
);

};

render() {
    const { params } = this.props.navigation.state;
    return (
        <FlatList
    data={params.listings}
    keyExtractor={this._keyExtractor}
    renderItem={this._renderItem}
    />
);
}
}
