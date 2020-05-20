import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import AccountScreen from './src/screens/AccountScreen';

const ParentStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const TrackListStack = createStackNavigator();

const authFlow = () => {
  return (
    <AuthStack.Navigator
      initialRouteName='Signup'
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name='Signin' component={SigninScreen} />
      <AuthStack.Screen name='Signup' component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const mainFlow = () => {
  return (
    <MainTab.Navigator
    >
      <MainTab.Screen name='trackListFlow' component={trackListFlow} options={{ title: 'Tracks' }}/>
      <MainTab.Screen name='TrackCreate' component={TrackCreateScreen} options={{ title: 'Create' }}/>
      <MainTab.Screen name='Account' component={AccountScreen} options={{ title: 'Account' }}/>
    </MainTab.Navigator>

  );
};

const trackListFlow = () => {
  return (
    <TrackListStack.Navigator>
      <TrackListStack.Screen name ='TrackList' component={TrackListScreen} />
      <TrackListStack.Screen name ='TrackDetail' component={TrackDetailScreen} />
    </TrackListStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <ParentStack.Navigator
        initialRouteName='authFlow'
      >
        <ParentStack.Screen name='authFlow' component={authFlow} options={{ headerShown: false }} />
        <ParentStack.Screen name='mainFlow' component={mainFlow} options={{ headerShown: false }} />
      </ParentStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
