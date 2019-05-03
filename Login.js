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

var currentAccount=[];

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

buttonClockListener =()=> {
		const {username} =this.state;
		const {password} =this.state;
		console.log("---called buttonClockListener");
		if(username == "" &&  password==""){
            console.log("---text input == empty");
            Alert.alert("Oops!", "You need to enter a username and password");
        } else {
            console.log("---text input not empty");
            var lowName = username.toLowerCase().trim();  //trim is used to remove spaces before and after
		    if(currentAccount.includes(lowName)){
                console.log("---should show garden name exists alert");
                Alert.alert("Oops!", "That username already exists. Please choose a different name.");
            } else {
                console.log("---garden name doesn't exist");
                Alert.alert(
                    //title
                    'Please Confirm:',
                    'Are you sure you want to make \''+username.trim()+'\' your username and \''+password.trim()+'\' your password?',
                    [
                        {text: 'Yes', onPress: () => this._Login(username.trim()), onPress: () => this._Login(password.trim())},

                        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'}
                    ],
                        { cancelable: true }
                        //clicking out side of alert will cancel
                    );
            }
        }
	}

	_onPressLogin = (index) => {
		const {navigate,state} = this.props.navigation;
		navigate('Menu')
	} 

	_Login = () => {
		 var url = 'http://greenalytics.ga:5000/api/login/'+username+'/'+password;
		 console.log(url);
		 fetch(url, {method: 'POST'})
		 	.then((response)=> {
		 	console.log('---status code: '+response.statusMessage);
            this.props.navigation.push();})
        /*.catch((error) => {
                Alert.alert(
                    'Error:',
                    'There was an error adding '+username+password);
            console.error(error);
        });*/
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
								<TextInput underlineColorAndroid='transparent' style={styles.input}
									onChangeText={username=> this.setState({username})}
									value={this.state.username} placeholder='Username'>
								</TextInput>
								<TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input}
									onChangeText={password=> this.setState({password})}
									value={this.state.password} placeholder='password'>
								</TextInput>

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
