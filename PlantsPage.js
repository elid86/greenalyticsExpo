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

//------- creates rows for the table ----------//
class ListItem extends React.PureComponent {
    _onPress = () => {
    this.props.onPressItem(this.props.index);
}

render() {
    const item = this.props.item;
    const price = item.price_formatted.split(' ')[0];
    return (
        <TouchableHighlight
    onPress={this._onPress}
    underlayColor='#dddddd'>
        <View>
        <View style={styles.rowContainer}>
        <Image style={styles.thumb} source={{ uri: item.img_url }} />
    <View style={styles.textContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.title}
    numberOfLines={1}>{item.title}</Text>
        </View>
        </View>
        <View style={styles.separator}/>
    </View>
    </TouchableHighlight>
);
}
}



//------ plantsPage class -------------//
type Props = {};
export default class PlantsPage extends Component<Props> {
    static navigationOptions = {
        title: 'My Plants',
    };

_keyExtractor = (item, index) => index.toString();

_renderItem = ({item, index}) => (
<ListItem
item={item}
index={index}
onPressItem={this._onPressItem}
/>
);

_onPressItem = (index) => {
    console.log("Pressed row: "+index);
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


//--------- Styles ------------//
const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});
