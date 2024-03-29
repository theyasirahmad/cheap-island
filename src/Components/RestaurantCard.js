import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import connectionString from '../api/api';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const RestaurantCard = ({
  img,
  name,
  description,
  favourite,
  navigation,
  address,
  menuCard,
  id,
  favs,
  city,
  setFavs,
  latitude,
  longitude
}) => {

  const [cardSelected, setCardSelected] = useState(false)
  // alert(cardSelect)
  // alert(onPressCard)

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

  return (
    <TouchableOpacity
      key={id}
      onPress={() => {
        // setCardSelected(!cardSelected),
        navigation.navigate('DetailDisplay', {
          name,
          description,
          img,
          address,
          menuCard,
          city,
          displayMap: true,
          latitude,
          longitude,
        })
      }}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {cardSelected ?
            <View style={{ width: 2, height: 50, backgroundColor: Colors.LinearBlue1, marginRight: 8 }}></View>
            : null
          }
          {img == '' || img == 'undefined' || img == 'null' ? (
            <View
              style={styles.imgReplaceView}
            />
          ) : (
              <Image
                source={{
                  uri: img

                  // uri: connecionString + "/" + img
                }}
                style={styles.imgstyle}
                resizeMode="cover"
              />
            )}
        </View>
        <Text numberOfLines={1} style={{ marginHorizontal: 10, color: cardSelected ? Colors.LinearBlue1 : "rgba(0,0,0,0.5)" }}>
          {name}
        </Text>
      </View>
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
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  imgReplaceView: {
    width: 55,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'rgba(44, 130, 201, 0.25)',
  },
  imgstyle: {
    width: 55,
    height: 60,
    borderRadius: 5,
  }
});
