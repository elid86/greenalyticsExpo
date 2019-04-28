'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    ImageBackground
} from 'react-native';

var currentGardens = [];
const userName = "zlef";

export default class AddGarden extends Component<Props> {
	static navigationOptions = {
        title: 'Add Garden',
    };



	constructor(props){
		super(props)
		this.state={
			TextInputValue: ''	}
	}


	//--load existing Gardens
    componentDidMount(){
        const {params} = this.props.navigation.state;
        currentGardens = params.currentGardens;
    }


	buttonClockListener =()=> {
		const{TextInputValue}=this.state;
		console.log("---called buttonClockListener");
		if(TextInputValue == ""){
            console.log("---text input == empty");
            Alert.alert("Oops!", "You need to enter a name for your garden.");
        } else {
            console.log("---text input not empty");
            var lowName = TextInputValue.toLowerCase().trim();  //trim is used to remove spaces before and after
		    if(currentGardens.includes(lowName)){
                console.log("---should show garden name exists alert");
                Alert.alert("Oops!", "That garden name already exists. Please choose a different name.");
            } else {
                console.log("---garden name doesn't exist");
                Alert.alert(
                    //title
                    'Please Confirm:',
                    'Are you sure you want to make \''+TextInputValue.trim()+'\' a new garden?',
                    [
                        {text: 'Yes', onPress: () => this._addGarden(TextInputValue.trim()) },
                        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'}
                    ],
                        { cancelable: true }
                        //clicking out side of alert will cancel
                    );
            }
        }
	}

    _addGarden = (gardenName) => {
        var url = 'http://greenalytics.ga:5000/api/'+userName+'/garden/'+gardenName;
        console.log(url);
        fetch(url, {method: 'POST'})
            .then((response) => {
            console.log('---status code: '+response.statusMessage);
            this.props.navigation.pop();})
        .catch((error) => {
                Alert.alert(
                    'Error:',
                    'There was an error adding '+gardenName);
            console.error(error);
        });
    }

	render() {
		return (
			<ImageBackground source={require('./assets/Background.png')} style={styles.backgroundImage}>
				<View style={styles.container}>
					<Text style={styles.headerText}>
						Add desired garden name:
					</Text>
					<TextInput
						style={styles.Box}
						placeholder="Enter Garden Name"
						onChangeText={TextInputValue => this.setState({TextInputValue})}
						underlineColorAndroid="transparent"
						/>
					<View style={[{width:"95%", margin:15, backgroundColor:"green", top: -225}]}>
						<Button
							style={styles.Box}
							onPress={this.buttonClockListener}
							title="Add Garden"
							color="white"
						/>
					</View>
		        </View>
		    </ImageBackground>



			);
		}
	}

	const styles=StyleSheet.create({
		backgroundImage: {
	        flex: 1,
	        alignSelf: 'stretch',
	        width: null,
	        justifyContent: 'center',
    	},
		container: {
			top: 0,
			flex:20,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "white"
		},
		headerText: {
			top: -240,
			fontSize:30,
			textAlign:"center",
			margin:10,
			fontWeight:'bold'
		},
		Box: {
			top: -230,
			height: 60,
			width: "95%",
			borderColor:"green",
			borderWidth: 3,
			color:"black"
		}
	});
