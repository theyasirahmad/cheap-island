import React, {useState} from 'react';
import {Colors} from '../constants/theme';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const GasStationCard = ({StationName}) => {
  // alert(cardSelect)
  return (
    <View style={styles.container}>
      <Text style={{marginHorizontal: 10,color:"rgba(0,0,0,0.4)"}}>
          {StationName}
      </Text>
    </View>
  );
};

export default GasStationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:50,
    justifyContent:"center",
    paddingHorizontal:15,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
  },
});
