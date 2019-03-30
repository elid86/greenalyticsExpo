'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';

type Props = {};
var pageGroupName = "";

//------- Hard coded data (used before connecting to api) -----------//
const PlantsList = {
        "Greenhouse": [
            {plant_name: "Hybiscus"},
            {plant_name: "Poppies"},
            {plant_name: "Crocus"},
            {plant_name: "Tansy"},
        ],
        "Veggies": [
            {plant_name: "Carrot"},
            {plant_name: "Bell Pepper"},
            {plant_name: "Tomato"},
            {plant_name: "Romain Lettuce"}
        ],
        "Flower Bed": [
            {plant_name: "Hydrangea"},
            {plant_name: "Rose"},
            {plant_name: "Peonie"}
        ]
    }

//------- creates rows for the table ----------//
class ListItem extends React.PureComponent {
    _onPress = () => {
    this.props.onPressItem(this.props.index);
}

render() {
    const item = this.props.item;
    return (
        <TouchableHighlight
    onPress={this._onPress}
    underlayColor='#dddddd'>
        <View>
        <View style={styles.rowContainer}>
        <Text style={styles.title}>{item.plant_name}</Text>
    </View>
    <View style={styles.separator}/>
    </View>
    </TouchableHighlight>
);
}
}

//------ Plants Group Page --------//
export default class PlantGroupPage extends Component<Props> {

    //- details of the navigation bar on this page
    static navigationOptions = {
        title: "My Plants",
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

//- even handlers for page
/*
_executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
        .then(response => response.json())
.then(json => this._handleResponse(json.response))
.catch(error =>
    this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
    }));

};

_onSearchPressed = () => {
    const query = urlForQueryAndPage('plant_group', this.state.searchString);
    this._executeQuery(query);
};
*/

_onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('PlantDetailsPage', {plant: PlantsList[pageGroupName][index]});
}

_keyExtractor = (item, index) => index.toString();

_renderItem = ({item, index}) => (
<ListItem
item={item}
index={index}
onPressItem={this._onPressItem}
/>
);

_onPressAdd = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('AllPlantsPage');
}


//- what will show on the page
render() {
    const { params } = this.props.navigation.state;
    pageGroupName = params.plant.group_name;
    return (
        <View style={{flex:1}}>
        <FlatList
            data={PlantsList[params.plant.group_name]}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
        />
        <TouchableOpacity onPress={this._onPressAdd} style={styles.fab}>
            <Text style={styles.fabIcon}>+ Add A Plant</Text>
        </TouchableOpacity>
    </View>
);
}
}

//--------- Query function ----------------//
/*function urlForQueryAndPage(key, value) {
    const data = {
        user_id: '1234',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
.join('&');

    return 'https://api.nestoria.co.uk/api?' + querystring;
}*/



//--------- Styles for this page -----------//

const styles = StyleSheet.create({
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
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 0,
        backgroundColor: 'white'
    },
    title: {
        left: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#274f19'
    },
    description: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 8,
        backgroundColor: '#c1e190',
        height: 60,
    },
    fab: {
        position: 'absolute',
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        right: 20,
        bottom: 20,
        backgroundColor: '#274f19',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 30,
        color: 'white'
    }
});