import React, {Component} from 'react';
import { Button, View, Text, TouchableHighlight, ImageBackground, StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


//------ PUSH NOTIFICATIONS --------

import { Permissions, Notifications } from 'expo';

//- where the users info is sent in db to know which phone to send notification
//const PUSH_ENDPOINT = 'https://your-server.com/users/push-token';

//- setup
async function registerForPushNotificationsAsync() {
    const {status: existingStatus} = await
    Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await
        Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("---- NOTIFICATION TOKEN: "+token);

}


//--------- MENU SETUP-----------------

export default class HomeScreen extends Component {

  //- details of the navigation bar on this page
  static navigationOptions = {
        title: 'Menu',
        gesturesEnabled: false,
        headerLeft: null,

    };


  render() {
      registerForPushNotificationsAsync();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground source ={require('./assets/Tunnel.jpg')} style={styles.backgroundImage}>
          <Button style={styles.input}
            title="My Gardens"
            color='white'
            fontWeight= 'bold'
            onPress={() => this.props.navigation.navigate('GardensPage')}
          />
          <Button
            title="Hardware"
            color='white'
            fontWeight= 'bold'
            onPress={() => this.props.navigation.navigate('Hardware')}
          />
          <Button
            title="Logout"
            color='white'
            fontWeight= 'bold'
            onPress={() => this.props.navigation.goBack()}
          />
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create ({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
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