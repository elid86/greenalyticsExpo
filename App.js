'use strict';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//---- import the other pages ------//
import PlantGroupPage from './PlantGroupPage';
import GardensPage from './GardensPage';


//-------- Navigation --------//
//Adjust the order of the pages here

const RootStack = createStackNavigator({
  //- set GardensPage as inital page in nav stack
  Home: { screen: GardensPage },
});

//Javascript 3 requires an appContainer to be made instead of exporting the stackNav directly
const App = createAppContainer(RootStack);
export default App;

