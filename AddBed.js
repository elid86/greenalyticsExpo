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
    Alert
} from 'react-native';

var userName = "zlef"; //temp til we get user info
var currentBedsNames = [];
var gardenNameToPass = '';
export default class AddGarden extends Component<Props> {
	static navigationOptions = {
        title: 'Add Bed',
    };

	constructor(props){
		super(props)
		this.state={
			TextInputValue: ''	}
	}

	//--load existing Beds
	componentDidMount(){
		const {params} = this.props.navigation.state;
		gardenNameToPass = params.gardenName;
		currentBedsNames = params.currentBeds;
		console.log("*** current garden: "+gardenNameToPass);
		console.log("*** current beds: "+currentBedsNames);
	}

	buttonClockListener =()=> {
		const{TextInputValue}=this.state;
		console.log("---called buttonClockListener");
		if(TextInputValue == ""){
			console.log("---text input == empty");
			Alert.alert("Oops!", "You need to enter a name for your bed.");
		} else {
			console.log("---text input not empty");
			var lowName = TextInputValue.toLowerCase().trim();  //trim is used to remove spaces before and after
			if(currentBedsNames.includes(lowName)){
				console.log("---should show bed name exists alert");
				Alert.alert("Oops!", "That bed name already exists. Please choose a different name.");
			} else {
				console.log("---bed name doesn't exist");
				Alert.alert(
					//title
					'Please Confirm:',
					'Are you sure you want to make \''+TextInputValue.trim()+'\' a new bed?',
					[
						{text: 'Yes', onPress: () => this._addBed(TextInputValue.trim()) },
						{text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'}
			],
				{ cancelable: true }
				//clicking out side of alert will cancel
			);
			}
		}
	}

	_addBed = (bedName) => {
		var url = 'http://greenalytics.ga:5000/api/'+userName+'/garden/'+gardenNameToPass+'/plantGroup/'+bedName;
		console.log(url);
		fetch(url, {method: 'POST'})
			.then((response) => {
			console.log('---status code: '+response.statusMessage);
		this.props.navigation.pop();})
		.catch((error) => {
				Alert.alert(
					'Error:',
					'There was an error adding '+bedName);
			console.error(error);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.headerText}>
					Add desired bed name:
				</Text>
				<TextInput
					style={styles.Box}
					placeholder="Enter Bed Name"
					onChangeText={TextInputValue => this.setState({TextInputValue})}
					underlineColorAndroid="transparent"
					/>
				<View style={[{width:"95%", margin:15, backgroundColor:"green", top: 0}]}>
					<Button
						style={styles.Box}
						onPress={this.buttonClockListener}
						title="Add Bed"
						color="white"
					/>
				</View>
	        </View>


			);
		}
	}

	const styles=StyleSheet.create({
		container: {
			top: 0,
			flex:20,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "white"
		},
		headerText: {
			top: 0,
			fontSize:30,
			textAlign:"center",
			margin:10,
			fontWeight:'bold'
		},
		Box: {
			top: 0,
			height: 60,
			width: "95%",
			borderColor:"green",
			borderWidth: 3,
			color:"black"
		}
	});
