import React, { useState } from 'react';
import { Colors } from '../constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const OfferCard = ({ img, name, descrption, favourite, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailDisplay', { name: name, descrption: descrption, img: img })}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: img }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
          resizeMode="cover"
        />
        <View style={{ marginHorizontal: 12 }}>
          <Text style={{ color: "rgba(0,0,0,0.5)" }}>{name}</Text>
          <Text style={{ color: "rgba(0,0,0,0.5)" }}>15% of everything</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => { }}>
        {favourite ?
          <AntDesign name="star" color="gold" size={22} />
          :
          <AntDesign name="staro" color="gold" size={22} />
        }
      </TouchableOpacity>
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
