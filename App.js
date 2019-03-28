'use strict';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//---- import the other pages ------//
import PlantGroupPage from './PlantGroupPage';
import GardensPage from './GardensPage';
import PlantsPage from './PlantsPage';
import PlantDetailsPage from './PlantDetailsPage';


//-------- Navigation --------//
//Adjust the order of the pages here

const RootStack = createStackNavigator({
  //- set inital page in nav stack
  Home: { screen: PlantGroupPage },
  //- Set up routes for each page
  PlantsPage: { screen: PlantsPage },
  PlantDetailsPage: { screen: PlantDetailsPage}
});

//Javascript 3 requires an appContainer to be made instead of exporting the stackNav directly
const App = createAppContainer(RootStack);
export default App;

