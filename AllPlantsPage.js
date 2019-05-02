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


type Props = {};
var selectedPlants = []; //list of plants selected by user
var count = 0;
var incompatiblePlantsString = "";
var incompatiblePlant = "";

const userName = "zlef";
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
    console.log('----- '+dataSpot[this.props.index].name)
    var plant = dataSpot[this.props.index].name;
    if(selectedPlants.includes(plant)){
        this.setState({
            textValue: '+'
        });
        selectedPlants.splice( selectedPlants.indexOf(plant), 1 );
    }else{
    this.setState({
        textValue: '✔'
    });
    selectedPlants.push(plant);
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


AsyncAlert = () =>  {
        console.log("***INCOMPATIBLE PLANT: "+incompatiblePlant);
        Alert.alert(
            'Warning!',
            ''+incompatiblePlant+' is not compatible with: '+incompatiblePlantsString+'\n Are you sure you want to add it?',
            [
                {text: 'Yes', onPress: () => {
                        //-- Adding the plant to the group anyway
                        this._addPlant(incompatiblePlant);
                    } },
                {text: 'No', onPress: () => {
                    count = count + 1;
                    incompatiblePlantsString = "";
                    incompatiblePlant = "";
                    if(count==selectedPlants.length){
                        this.setState({
                            isLoading: false,
                        })
                    } else {
                        this._submitPressed();
                    }
                }}
            ],
            { cancelable: false }
        );
    };



_addPlant= async (plant) => {
    const {params} = this.props.navigation.state;
    var gardenName = params.garden;
    var plantGroupName = params.plantGroup;
    //-- Adding the plant to the group anyway
    var url = 'http://greenalytics.ga:5000/api/'+userName+'/garden/'+gardenName+'/plantGroup/'+plantGroupName+'/plant/'+plant;
    console.log(url);
    await fetch(url, {method: 'POST'})
        .then((response) => {
            console.log('---status code: '+response.statusMessage)
            })
        .catch((error) => {
            Alert.alert(
                'Error:',
                'There was an error adding '+plant);
            console.error(error);
        })
    count = count + 1;
    if(count == selectedPlants.length) {
        count = 0;
        incompatiblePlantsString = "";
        incompatiblePlant = "";
        selectedPlants = [];
        this.setState({
            isLoading: false,
        })
        this.props.navigation.pop();
    } else {
        this._submitPressed();
        console.log("--- SUBMIT SHOULD BE PRESSED...")
        incompatiblePlantsString = "";
        incompatiblePlant = "";
    }
}

_submitPressed = async () => {
    console.log("--- sumbit running for: "+count);
    const {params} = this.props.navigation.state;
    var gardenName = params.garden;
    var plantGroupName = params.plantGroup;
    if(selectedPlants.length == 0){
        Alert.alert(
            'Uh oh!',
            'No plants have been selected...')
    } else {

        this.setState({
            isLoading: true,
        })

        //--- get plant to be checked
        var plant = selectedPlants[count];
        console.log("--- running plant: "+plant);

        //-- check plant for incompatibility
        var urlInc = 'http://greenalytics.ga:5000/api/' + userName + '/incompatibilities/plantGroup/' + plantGroupName + '/plant/' + plant;
        console.log(urlInc);
        await fetch(urlInc)
            .then((response) => {
                console.log(JSON.stringify(response, null, 4));
                return response.json();
            })
            .then((responseJson) => {
                //console.log("*** respone: " + responseJson);
                //console.log("---responseJson.length: " + responseJson.length);

                if (Object.keys(responseJson).length == 0) {
                    //- if not incompatible, add to plant group

                    console.log("--- plant passed: "+plant);
                    //-- Adding the plant to the group
                    var urlAdd = 'http://greenalytics.ga:5000/api/' + userName + '/garden/' + gardenName + '/plantGroup/' + plantGroupName + '/plant/' + plant;
                    console.log(urlAdd);
                    fetch(urlAdd, {method: 'POST'})
                        .then((response) => {
                            //console.log('---status code: ' + response.statusMessage)
                        })
                        .catch((error) => {
                            Alert.alert(
                                'Error:',
                                'There was an error adding ' + plant);
                            console.error(error);
                        });
                    count = count + 1;
                    if(count == selectedPlants.length) {
                        count = 0;
                        incompatiblePlantsString = "";
                        incompatiblePlant = "";
                        selectedPlants = [];
                        this.setState({
                            isLoading: false,
                        })
                        this.props.navigation.pop();
                    } else {
                        incompatiblePlantsString = "";
                        incompatiblePlant = "";
                        this._submitPressed();
                    }

                } else {
                    //- if incompatible, check alert before continuing to next

                    console.log("--- plant failed: "+plant);

                    //- gather list in form of string of plants incompatible with
                    var incompatiblePlantsList = [];
                    console.log("**** NUMBER OF KEYS: " + Object.keys(responseJson).length);
                    //console.log("---- response: "+response.0.item1);
                    for (var i = 0; i < (Object.keys(responseJson).length - 2); i++) {
                        console.log("*** Incompt plant: " + responseJson[i].item1);
                        if (incompatiblePlantsList.includes(responseJson[i].item1) == false) {
                            incompatiblePlantsList.push(responseJson[i].item1)
                            incompatiblePlantsString = incompatiblePlantsString + "\n" + responseJson[i].item1;
                            console.log("----incompatiblePlantsString: " + incompatiblePlantsString);
                        }
                    }
                    incompatiblePlant = plant;
                    this.AsyncAlert();
                }
            })
            .catch((error) => {
                Alert.alert(
                    'Error:',
                    'There was an error adding ' + plant);
                console.error(error);
            })
    }
};




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
            <View style={{flex:1, flexDirection: 'column'}}>
                <View >
                    <FlatList
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    />
                    </View>
                <View style={{height: 60, alignSelf: 'flex-end'}}>
                    <TouchableOpacity onPress={this._submitPressed} style={styles.fab}>
                    <Text style={styles.fabIcon}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </ImageBackground>
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
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
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
        backgroundColor: '#c0e283',
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
    },
    fabIcon: {
        fontSize: 30,
        color: 'white'
    }
});