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
    ActivityIndicator
} from 'react-native';

type Props = {};
var selectedPlants = []; //list of plants selected by user
var selectionSuccess = true; //checks that no plants had issues submitting

//---- TEMP USER DETAILS -----//
const userName = 'zlef';
var dataSpot = [];

//------- creates rows for the table ----------//
class ListItem extends React.PureComponent {
    state = {
        textValue: '+'
    }

    _onPress = () => {
    this.props.onPressItem(this.props.index);
    }
    _selectionMade = () => {
        this.onSelectionMade(this.props.id);
    };

_onSelectionMade = () => {
    console.log('----- '+dataSpot)
    if(selectedPlants.includes(dataSpot[this.props.index].name)){
        this.setState({
            textValue: '+'
        });
        selectedPlants.splice( selectedPlants.indexOf(selectedPlants[this.props.index].name), 1 );
    }else{
    this.setState({
        textValue: '✔'
    });
    selectedPlants.push(dataSpot[this.props.index].name);
    }
    console.log(selectedPlants);
};


render() {
    const item = this.props.item;
    return (
        <TouchableHighlight
    onPress={this._onPress}
    underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
                <View style={styles.flowRight}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            <View style={{flow:1,marginRight: 5, justifyContent: 'center'}}>
                <TouchableHighlight onPress={this._onSelectionMade} style={{width: 50,}}>
                    <Text nativeID={item.plant_name} style={{fontSize: 35, fontWeight: 'bold', color: '#7da46e', textAlign: 'center'}} >{this.state.textValue}</Text>
                </TouchableHighlight>
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
        title: "All Plants",
    };

//- initial state of the page
constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
    }
}

//- even handlers for page

componentDidMount()
{
    this._fetchAllPlants();
}

_fetchAllPlants = () => {
    var url = 'http://greenalytics.ga:5000/api/'+userName+'/plants';
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
.then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson
        })
        dataSpot = this.state.dataSource;
        console.log('---datasour: '+this.state.dataSource);
})
.catch((error) => {
        this.setState({
            isLoading: false,
        })
        Alert.alert(
            'Error:',
            'An error occured while loading the plants.')
        console.error(error);
});

}


_onSearchPressed = () => {
    const query = urlForQueryAndPage('plant_group', this.state.searchString);
    this._executeQuery(query);
};




_onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('PlantDetailsPage', {plant: this.state.dataSource[index].name});
}

_keyExtractor = (item, index) => index.toString();

_renderItem = ({item, index}) => (
<ListItem
item={item}
id={item.plant_name}
index={index}
onPressItem={this._onPressItem}
/>
);

_submitPressed = () => {
    const {params} = this.props.navigation.state;
    var gardenName = params.garden;
    var plantGroupName = params.plantGroup;
    if(selectedPlants.length == 0){
        Alert.alert(
            'Uh oh!',
            'No plants have been selected...')
    } else {
        var count = 0; //used to ensure all the plants are added before popping
        this.setState({
            isLoading: true,
        })
        selectedPlants.map((plant)  => {
            //this._addPlantCall(plant);
            var url = 'http://greenalytics.ga:5000/api/'+userName+'/garden/'+gardenName+'/plantGroup/'+plantGroupName+'/plant/'+plant;
        console.log(url);
        fetch(url, {method: 'POST'})
            .then((response) => {
            console.log('---status code: '+response.statusMessage)
            count = count + 1;
            if(count == selectedPlants.length && selectionSuccess == true) {
                this.props.navigation.pop();
            }})
        .catch((error) => {
            Alert.alert(
                'Error:',
                'There was an error adding '+plant);
        console.error(error);
        selectionSuccess = false;
    })
    }
        );
        this.setState({
            isLoading: false,
        })
    }
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
        <View style={{flex:1}}>
<FlatList
    data={this.state.dataSource}
    keyExtractor={this._keyExtractor}
    renderItem={this._renderItem}
    />
    <TouchableOpacity onPress={this._submitPressed} style={styles.fab}>
        <Text style={styles.fabIcon}>Submit</Text>
        </TouchableOpacity>
        </View>
);
}
}
}


//--------- Styles for this page -----------//

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flex: 1,
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
        flexDirection: 'row',
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