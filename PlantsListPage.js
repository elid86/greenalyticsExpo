'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';

import Swipeout from 'react-native-swipeout';


type Props = {};

//------ TEMP API PIECES --------//
var userName = '';
var gardenNameToPass = '';  //used when adding plants
var plantGroupNameToPass = '';
//------- creates rows for the table ----------//
class ListItem extends React.PureComponent {
    _onPress = () => {
    this.props.onPressItem(this.props.index);
}

sampleFunction=()=> {
        var item = this.props.item;
        //this.props.deleteItem(this.props.index)
        console.log("====================================================" + item)
        Alert.alert(
            "Delete Plant?",
            "Alert Message",
            [
                {text: 'Yes', onPress:()=> this._DeleteItem(item)},
                {text: 'No', onPress:() => console.log('No Pressed'), style: 'cancel'}


            ],
                {cancelable: true}
            );

    }

_DeleteItem = (item) => {
    //var item = dataSpot[this.props.index];
    //var item = this.props.item.plantGroups[this.props.index]
    console.log("in deleteItem")
    console.log("---------------------------------------------------------------------------" + item)
    console.log(item)
    var url = 'http://greenalytics.ga:5000/api/'+userName+'/garden/'+gardenNameToPass+'/plantGroup/'+plantGroupNameToPass+'/plant/'+item.name;
    console.log("==========================================================================" + url);
    fetch(url, {method: 'DELETE'})


}

render() {
    const item = this.props.item;
    var plant=item.name
        return (
                <TouchableHighlight
            onPress={this._onPress}
            onLongPress={this.sampleFunction}
            underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.flowRight}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>


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
        isLoading: true,
        message: '',
    };
}

//- even handlers for page
async componentDidMount(){
    const {params} = this.props.navigation.state;
    console.log('-----plantsDetails params: ' +params.plantGroup);
    userName = await params.userName;
    gardenNameToPass = params.garden;
    plantGroupNameToPass = params.plantGroup;
    const item = params.plantGroup;
    this._fetchData(item);
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
        this._fetchData(item);
     }
    );
}

componentWillUnmount() {
    this.willFocusSubscription.remove();
}

_fetchData = (pageGroupName) => {
    var url = 'http://greenalytics.ga:5000/api/'+userName+'/plantGroup/'+pageGroupName;
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
.then((responseJson) => {
    this.setState({
        isLoading: false,
        dataSource: responseJson.plants
    })
    console.log('---datasour: '+this.state.dataSource);
})
.catch((error) => {
    this.setState({
        isLoading: false,
    })
    Alert.alert(
        'Error:',
        'An error occured while loading your plants.')
    console.error(error);
});

}

_onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    console.log('---------'+this.state.dataSource[index].name);
    navigate('PlantDetailsPage', {plant: this.state.dataSource[index].name, userName: userName});
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
    navigate('AllPlantsPage', {garden: gardenNameToPass, plantGroup: plantGroupNameToPass, userName: userName});
}


//- what will show on the page
render() {
    if (this.state.isLoading) {
        return (
            < View style={{top: 100}}>
    < ActivityIndicator size='large'/>
            < /View>
    );
    } else {
        return (
        <ImageBackground source={require('./assets/Background.png')} style={styles.backgroundImage}>
            <View style={{flex:1}}>
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
            <TouchableOpacity onPress={this._onPressAdd} style={styles.fab}>
                <Text style={styles.fabIcon}>+ Add A Plant</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}
}
}

//--------- url Prep functions ----------------//
/*function urlPrepPlants(key, value) {
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
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
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
        height: 8,
        marginLeft: 9,
        marginRight: 9,
        borderRadius: 8,
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
        backgroundColor: 'rgba(255,255,255,0.7)',
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