import React, {useState} from 'react';
import {Colors} from '../constants/theme';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const GasStationCard = ({StationName, favourite}) => {
  // alert(cardSelect)
  return (
    <View style={styles.container}>
      <Text style={{marginHorizontal: 10,color:"rgba(0,0,0,0.4)"}}>
          {StationName}
      </Text>
      <TouchableOpacity onPress={()=>{}}>
        { favourite ? 
          <AntDesign name="star" color="gold" size={20} /> :
          <AntDesign name="staro" color="gold" size={20} />
        }
      </TouchableOpacity>
    </View>
  );
};

export default GasStationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:50,
    alignItems:"center",
    justifyContent:'space-between',
    paddingHorizontal:15,
    flexDirection:'row',
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
