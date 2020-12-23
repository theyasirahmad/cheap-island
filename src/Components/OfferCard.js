import React, {useState} from 'react';
import {Colors} from '../constants/theme';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const OfferCard = ({img, name, descrption, navigation}) => {
  return (
    <TouchableOpacity 
      onPress={()=> navigation.navigate('DetailDisplay', {name: name, descrption: descrption, img: img})} 
      style={styles.container}
    >
      <Image
        source={{uri: img}}
        style={{width: 50, height: 50, borderRadius: 30}}
        resizeMode="cover"
      />
      <View style={{marginHorizontal: 12}}>
        <Text style={{color:"rgba(0,0,0,0.5)"}}>Subway</Text>
        <Text style={{color:"rgba(0,0,0,0.5)"}}>15% of everything</Text>
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
    padding: 15,
    borderWidth:1,
    borderColor:Colors.borderCardColor,
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
