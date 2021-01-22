import React, { useState } from 'react';
import { Colors } from '../constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import connectionString from '../api/api';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const OfferCard = ({
  favourite,
  navigation,
  offer,
  img,
  id,
  favs,
  setFavs
}) => {


  const updateFavourites = async (tempFavs) => {


    setFavs([...tempFavs])

    let token = await AsyncStorage.getItem('token');

    axios({
      url: `${connectionString}/user/update-favourites`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        favourites: tempFavs
      }
    })
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
        alert('Internal server error')
      })
  }

  console.log(img)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailDisplay', {
        name: offer.name,
        description: offer.description,
        img: img,
        offerAvail: true,
        menuCard: [],
        id: offer._id,
        limit: offer.limit,
        off: offer.off,
        usedBy: offer.used,
        address: offer.address
      })}
      style={styles.container}
    >

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          // source={{ uri: connectionString + "/" + img }}
          source={{ uri: img }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
          resizeMode="cover"
        />
        <View style={{ marginHorizontal: 12 }}>
          <Text style={{ color: "rgba(0,0,0,0.5)" }}>{offer.name}</Text>
          <Text style={{ color: "rgba(0,0,0,0.5)" }}>{offer.off}%</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => {

          let tempFavs = [];
          if (favourite) {
            let favIndex = favs.indexOf(id);
            tempFavs = [...favs];
            tempFavs.splice(favIndex, 1);
          }
          else {
            // setFavs([...favs, id])
            tempFavs = [...favs]
            tempFavs = [...tempFavs, id]
          }
          updateFavourites(tempFavs)
        }}>
          {favourite ?
            <AntDesign name="star" color="gold" size={22} />
            :
            <AntDesign name="staro" color="gold" size={22} />
          }
        </TouchableOpacity>
        <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontWeight: "bold" }}>
          x{offer.limit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBgColor,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.borderCardColor,
    //     shadowColor: "#000",
    // shadowOffset: {
    // 	width: 0,
    // 	height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
});
