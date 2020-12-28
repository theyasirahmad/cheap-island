import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNav from '../navigation/BottomTab'
import SplashScreen from '../screens/splashScreen'
import Login from '../screens/login'
import Signup from '../screens/signup'
import DetailDisplay from '../screens/detailDisplay'
import Profile from '../screens/profile'
import TermsConditions from '../screens/termsConditions'
// import Settings from '../screens/setting'

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="DetailDisplay" component={DetailDisplay} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />

      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
