import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createRootNavigator, Switch } from './src/Routing/MainRoute';
import { Provider } from 'react-redux'
import store from './src/Store/index';

import AsyncStorage from '@react-native-community/async-storage'

export default class App extends Component{
  

  render() {
    const AppContainer = createAppContainer(Switch);
    console.disableYellowBox = true;  
    return (
      <Provider store={store}>        
        
        <AppContainer/>
        
       </Provider>
    )
  }
}

