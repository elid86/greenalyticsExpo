import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Image} from 'react-native';

export default class Login extends Component {

	static navigationOptions = {
        gesturesEnabled: false,
        
    };

	constructor(props) {
    super(props);
    this.state = {
        //- setting page settings
        isLoading: true,
    };
}

	_onPressLogin = (index) => {
		const {navigate,state} = this.props.navigation;
		navigate('Menu')
	}
	render() {
		const{params} =this.props.navigation.state;
    	if (this.state.isLoading) {

		return (		
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Image 
						style={styles.logo}
						source={require('./assets/leaf_logo.png')}/>
					<Text style={styles.title}> Greenalytics </Text>
				</View>
				<View style={styles.logoContainer}>
				</View>
			<View style={styles.container1}>
				<TextInput 
					placeholder=" username"
					placeholderTextColor= "grey"
					style={styles.input} />
				<TextInput
					placeholder=" password" 
					placeholderTextColor= "grey"
					secureTextEntry
					style={styles.input} />

				<TouchableOpacity onPress={this._onPressLogin} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
			</View>
		</View>
		); }
	}
}

const styles=StyleSheet.create({
	container: {
		flex: 1,
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 200,
		height: 200,
		top: 10,
	},
	title: {
		color: 'green',
		marginTop: 10,
		width: 160,
		fontSize: 29,
		textAlign: 'center'
	},
	container1: {
		padding: 20
	},
	input: {
		height: 50,
		top: -130,
		backgroundColor:'rgba(255,255,255, 0.7)',
		marginBottom: 20,
		borderColor:"green",
		borderWidth: 3,
		color: 'black'
	},
	buttonContainer: {
		backgroundColor: 'green',
		paddingVertical: 15,
	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontWeight: '700'
	}



});

