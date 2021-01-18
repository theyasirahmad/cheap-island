import React, { useState } from 'react';
import { Colors } from '../constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const GasStationCard = ({ StationName, favourite, latitude, longitude, geo }) => {
  // alert(cardSelect)

  const R = 6371e3; // metres
  const φ1 = latitude * Math.PI / 180; // φ, λ in radians
  const φ2 = geo.lat * Math.PI / 180;
  const Δφ = (geo.lat - latitude) * Math.PI / 180;
  const Δλ = (geo.lon - longitude) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 10, color: "rgba(0,0,0,0.4)" }}>
        {StationName}
      </Text>

      <Text style={{ marginHorizontal: 10, color: "rgba(0,0,0,0.4)" }}>
        {d.toFixed(3)} m
      </Text>

      {/* <TouchableOpacity onPress={()=>{}}>
        { favourite ? 
          <AntDesign name="star" color="gold" size={20} /> :
          <AntDesign name="staro" color="gold" size={20} />
        }
      </TouchableOpacity> */}
    </View>
  );
};

export default GasStationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 50,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
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
