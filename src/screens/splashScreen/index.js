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

const imgSplash = require('../../assets/images/cheaplogo4.png')


export default function SplashScreen(props) {

  const [springValue] = React.useState(new Animated.Value(0.5))

  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      );
    }, 3200) 

    // const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start()
    // }
  }, [])

  return (
      <View style={styles.container}>
          <StatusBar hidden={true} />
          <ImageBackground 
          style={{
            width:Dimensions.get('window').width*0.7,
            height:Dimensions.get('screen').width*0.3
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


