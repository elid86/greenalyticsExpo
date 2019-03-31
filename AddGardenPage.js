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

export default class AddGarden extends Component<Props> {
	static navigationOptions = {
        title: 'Add Garden',
    };



	constructor(props){
		super(props)
		this.state={
			TextInputValue: ''	}
	}

	buttonClockListener =()=> {
		const{TextInputValue}=this.state;
		Alert.alert(TextInputValue);
	}

	render() {
		return (
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
				<View style={[{width:"95%", margin:15, backgroundColor:"green", top: 0}]}>
					<Button
						style={styles.Box}
						onPress={this.buttonClockListener}
						title="Add Garden"
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
