import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
	ImageBackground,
	AsyncStorage,
	Alert
} from 'react-native';
import {Notifications} from "expo";

var userID = "";
var password = "";

export default class Login extends Component {

	static navigationOptions = {
        gesturesEnabled: false,
        
    };

	constructor(props) {
    super(props);
    this.state = {
        //- setting page settings
        isLoading: true,
         username: "",
		password :"",
        
    };
}

	_onPressLogin = async (index) => {
		//const {navigate,state} = this.props.navigation;
		//navigate('Menu')
		if (userID == "" || password == ""){
			Alert.alert(
				'Whoops!',
				'Make sure you\'ve entered your username and password.',
				{ cancelable: true }
				//clicking out side of alert will cancel
			);
		} else {

			this.state = {
				isLoading: true,
			}

			// Get the token that uniquely identifies this device
			let token = await Notifications.getExpoPushTokenAsync();
			console.log("---- NOTIFICATION TOKEN: " + token);

			var url = 'http://greenalytics.ga:5000/api/auth/login/' + userID + '/' + password + '/' + token;
			console.log(url);
			fetch(url, {method: 'POST'})
				.then((response) => {
					console.log(JSON.stringify(response, null, 4));
					return response.text();
				})
				.then((responseText) => {
					console.log('---response: ' + responseText);
					if (responseText == userID) {
						this.state = {
							isLoading: false,
						}
						const { navigate } = this.props.navigation;
						navigate('Menu', {userName: userID});
					} else {
						this.state = {
							isLoading: false,
						}
						Alert.alert(
							'Whoops!',
							'Your username or password incorrect. Please, try again.'
							,
							{cancelable: true}
							//clicking out side of alert will cancel
						);
					}
				})
				.catch((error) => {
					Alert.alert(
						'Error:',
						'There was an error logging in');
					console.error(error);
				});
		}
	}


	render() {
		const{params} =this.props.navigation.state;
    	if (this.state.isLoading) {
		return (		
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<ImageBackground source={require('./assets/Garden.jpg')} style={styles.backgroundImage}>
						<View style={styles.content}>
							<Text style={styles.logo}>-GreenAlytics-</Text>
							<View style={styles.container1}>
								<TextInput underlineColorAndroid='transparent'
									style={styles.input}
									onChangeText={TextInputValue => {userID = TextInputValue}}
									placeholder=" username"
										/>

								<TextInput
									secureTextEntry={true}
									underlineColorAndroid='transparent'
									style={styles.input}
									onChangeText={TextInputValue => {password = TextInputValue}}
									placeholder=" password"
										/>

								<TouchableOpacity onPress={this._onPressLogin} style={styles.buttonContainer}>
									<Text style={styles.buttonText}>LOGIN</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ImageBackground>
				</View>
			</View>
		); }
	}
}
const styles = StyleSheet.create ({
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		color: 'white',
		fontSize: 40,
		fontStyle: 'italic',
		fontWeight: 'bold',
		textShadowColor: '#252525',
		textShadowOffset: {width: 2, height: 2},
		textShadowRadius: 15,
		marginBottom: 20,
	},

	container1: {
		margin: 20,
		marginBottom: 0,
		padding: 20,
		paddingBottom:10,
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: 'rgba(255,255,255,0.7)',
		color: 'grey',
		borderColor: 'green',
	},

	input: {
		fontSize: 16,
		height: 40,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		borderColor: 'green',
		color: 'grey',

	},

	buttonContainer: {
		alignSelf: 'stretch',
		margin: 20,
		padding: 20,
		color: 'green',
		borderWidth: 1,
		borderColor: 'green',
		backgroundColor: 'rgba(255,255,255,0.6)',
	},

	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign:'center',
		color: 'green',
	},

	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center',
	},

	content: {
		alignItems: 'center',
	},
	container: {
		flex: 1,
	}
});
