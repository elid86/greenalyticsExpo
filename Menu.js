import React, {Component} from 'react';
import { Button, View, Text, TouchableHighlight, ImageBackground, StyleSheet,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var userName = '';
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

}


//--------- MENU SETUP-----------------

export default class HomeScreen extends Component {

  //- details of the navigation bar on this page
  static navigationOptions = {
        title: 'Menu',
        gesturesEnabled: false,
        headerLeft: null,

    };


 async componentDidMount() {
      const { params } = this.props.navigation.state;
      userName = await params.userName;
  };

    _onPressAdd=(index) => {
  const{navigate, state}=this.props.navigation;
  navigate('GardensPage');
}

  render() {
    const {navigate}= this.props.navigation;
    registerForPushNotificationsAsync();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground source ={require('./assets/Tunnel.jpg')} style={styles.backgroundImage}>
          <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('GardensPage', {userName: userName})} >
          <Text style={styles.fabIcon}>My Gardens</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('Hardware', {userName: userName})} >
            <Text style={styles.fabIcon}>Hardware</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.goBack()} >
            <Text style={styles.fabIcon}>Logout</Text>
            </TouchableOpacity>
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
  },
    fab: {
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fabIcon: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        elevation: 8,
    }
 
});