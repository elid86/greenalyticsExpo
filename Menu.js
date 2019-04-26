import React, {Component} from 'react';
import { Button, View, Text, TouchableHighlight, ImageBackground, StyleSheet,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class HomeScreen extends Component {

  //- details of the navigation bar on this page
  static navigationOptions = {
        title: 'Menu',
        gesturesEnabled: false,
        headerLeft: null,

    };


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground source ={require('./assets/Tunnel.jpg')} style={styles.backgroundImage}>
          <Button 
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