'use strict';
import React, {Component} from 'react';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

//---- import the other pages ------//
import PlantGroupPage from './PlantGroupPage';
import AddBed from './AddBed';
import GardensPage from './GardensPage';
import AddGardenPage from './AddGardenPage';
import PlantsListPage from './PlantsListPage';
import PlantDetailsPage from './PlantDetailsPage';
import AllPlantsPage from './AllPlantsPage';
import Login from './Login'



//-------- Navigation --------//
//Adjust the order of the pages here

const RootStack = createStackNavigator({
  //- set inital page in nav stack
  Home: { screen: Login }, 
  GardensPage: { screen: GardensPage },
  //- Set up routes for each page
  AddGardenPage: {screen: AddGardenPage},
  PlantGroupPage: {screen: PlantGroupPage},
  AddBed: {screen:AddBed},
  PlantsListPage: { screen: PlantsListPage },
  PlantDetailsPage: { screen: PlantDetailsPage},
  AllPlantsPage: { screen: AllPlantsPage},

});

//Javascript 3 requires an appContainer to be made instead of exporting the stackNav directly
const App = createAppContainer(RootStack);
export default App;


