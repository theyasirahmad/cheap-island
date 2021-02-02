import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useFonts } from 'expo-font'
import { Colors } from '../../constants/theme'
import AsyncStorage from '@react-native-community/async-storage';

const imgSplash = require('../../assets/images/cheaplogo4.png')


export default function SplashScreen(props) {

  const [springValue] = React.useState(new Animated.Value(0.5))

  const delayedNavigation = (name) => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name }],
        }),
      );
    }, 3200)
  }


  React.useEffect(() => {


    const getStatus = async () => {

      let token = await AsyncStorage.getItem('token');
      let emailVerified = await AsyncStorage.getItem('emailVerified');

      if (token) {
        if (emailVerified === "true") {
          delayedNavigation('BottomTabNav')
        }
        else {
          delayedNavigation('verification')
        }
      }
      else {
        delayedNavigation('Login')
      }
    }
    getStatus()

    // const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start()
    // }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar  translucent={true} />
      <ImageBackground
        style={{
          width: Dimensions.get('window').width * 0.7,
          height: Dimensions.get('screen').width * 0.3
        }}
        resizeMode="contain"
        source={imgSplash}></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LinearBlue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


