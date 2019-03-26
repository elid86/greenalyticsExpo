'use strict';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//------- All the pages -------//

//-Gardens Page
class GardensPage extends Component<Props> {
  static navigationOptions = {
    title: 'My Gardens',
  };
  render() {
    return <Text style={styles.description}>Your gardens will appear here!</Text>;
  }
}

//-------- Navigation --------//
//Adjust the order of the pages here

const RootStack = createStackNavigator({
  Home: { screen: GardensPage },
});

//Javascript 3 requires an appContainer to be made
const App = createAppContainer(RootStack);
export default App;


//--------- Styles ------------//
//here is object styles. written similar to CSS
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
});
