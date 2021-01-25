import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/theme'
import PointOfInterest from '../screens/pointOfInterest';
import Restaurants from '../screens/Restaurants';
import More from '../screens/more';
import Offers from '../screens/offer';
import GasStations from '../screens/gasStation';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'
// import { Fonts } from '../constants/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarVisible={true}
      tabBar={(tabProps) => <MyTabBar {...tabProps} {...props} />}>
      <Tab.Screen name={'Restaurants'} component={Restaurants}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name={'Intresting Points'} component={PointOfInterest}
      />
      <Tab.Screen name={'Gas Stations'} component={GasStations} />
      <Tab.Screen name={'Offers'} component={Offers}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name={'More'} component={More} />
    </Tab.Navigator>
  );
};

const MyTabBar = ({ state, descriptors, navigation, carts }) => {
  // console.log('RouteNameeeeee............', state);
  return (
    <View
      style={{ backgroundColor: '#F4FEFF' }}
    // style={{backgroundColor: state.routes.name == 'Home' ? 'red' : '#fff'}}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          let isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name, { favs: false, used: false });
              // alert(JSON.stringify(index.length))
            }
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabButtons}
              key={index}>
              {index === 0 && (
                <Image
                  style={{
                    width: 53, height: 23, marginTop: index === 2 ? 0 : -10,
                    tintColor: isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)'
                  }}
                  source={require('../assets/images/pot.png')}
                  resizeMode='cover'
                />
              )}
              {index === 1 && (
                <FontAwesome5
                  name="hotel"
                  size={22}
                  color={isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)'}
                  style={{ marginTop: -10 }}
                />

              )}
              {index === 2 && (
                <FontAwesome5
                  name="gas-pump"
                  size={22}
                  color={isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)'}
                  style={{ marginTop: -10 }}
                />
              )}
              {index == 3 && (
                <Image style={{
                  width: 30, height: 23, marginTop: index === 2 ? 0 : -10,
                  tintColor: isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)'
                }}
                  source={require('../assets/images/offerIcon.png')}
                  resizeMode='contain'
                />
              )}
              {index == 4 && (
                <Feather
                  name={"more-horizontal"}
                  size={25}
                  color={isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)'}
                  style={{ marginTop: index === 2 ? 0 : -12 }}
                />
              )}

              <Text
                style={{
                  color: isFocused ? Colors.LinearBlue1 : 'rgba(188, 188, 188, 1)',
                  fontSize: 10,
                  // fontFamily: Fonts.bold,
                  top: carts?.length && label === 'CART' ? -7 : 0,
                  textAlign: "center",
                  marginTop: index === 2 ? 0 : 3,
                  // marginTop:10
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  notification: {
    width: 17,
    height: 17,
    backgroundColor: '#D12553',
    borderRadius: 10,
    zIndex: 100,
    right: -15,
    top: 3,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtons: {
    alignItems: 'center',
    bottom: -3,
    width: "20%"
  },
});
