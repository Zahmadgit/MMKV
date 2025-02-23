import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import './src/localization/i18n'

import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import InfoScreen from './src/screens/InfoScreen';
import SignupScreen from './src/screens/SignupScreen';
import { Provider } from 'react-redux';
import store from './src/store/store';
import LoginScreen from './src/screens/LoginScreen';
import GoalScreen from './src/screens/GoalScreen';

const Stack = createNativeStackNavigator()



function App(): React.JSX.Element {


  return (
    <Provider store = {store}>
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen}/>
        <Stack.Screen name="InfoScreen" component={InfoScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="GoalScreen" component={GoalScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
});

export default App;
