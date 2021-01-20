import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNav from '../navigation/BottomTab'
import SplashScreen from '../screens/splashScreen'
import Login from '../screens/login'
import Signup from '../screens/signup'
import DetailDisplay from '../screens/detailDisplay'
import Profile from '../screens/profile'
import TermsConditions from '../screens/aboutUs'
import Offer from '../screens/offer';
import Restaurant from '../screens/Restaurants';
import Mores from '../screens/more'
import Settings from '../screens/setting';
import forgetPassword from '../screens/forgetPassword';
import verification from '../screens/verification';

// import Settings from '../screens/setting'

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="verification" component={verification} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="DetailDisplay" component={DetailDisplay} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="Offer" component={Offer} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Mores" component={Mores} />
      <Stack.Screen name="forgetPassword" component={forgetPassword} />


      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
