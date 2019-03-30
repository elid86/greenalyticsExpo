'use strict';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//---- import the other pages ------//
import PlantGroupPage from './PlantGroupPage';
import GardensPage from './GardensPage';
import PlantsListPage from './PlantsListPage';
import PlantDetailsPage from './PlantDetailsPage';
import AllPlantsPage from './AllPlantsPage';


//-------- Navigation --------//
//Adjust the order of the pages here

const RootStack = createStackNavigator({
  //- set inital page in nav stack
  Home: { screen: GardensPage },
  //- Set up routes for each page
  PlantGroupPage: {screen: PlantGroupPage},
  PlantsListPage: { screen: PlantsListPage },
  PlantDetailsPage: { screen: PlantDetailsPage},
  AllPlantsPage: { screen: AllPlantsPage}
});

//Javascript 3 requires an appContainer to be made instead of exporting the stackNav directly
const App = createAppContainer(RootStack);
export default App;

