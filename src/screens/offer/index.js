import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import OfferCard from '../../Components/OfferCard';
import {OfferList as OFFERLIST} from '../../dummyData/dummyData';
import {Colors} from '../../constants/theme';

const Offer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText="OFFERS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
        isFavouriteLoading={false}
        RightIcon={true}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={OFFERLIST}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <OfferCard 
          img={itemData.item.img} 
        name={itemData.item.name}
        descrption={itemData.item.descrption}
        favourite={itemData.item.favourite}
        offerAvail={itemData.item.offer}
        navigation={navigation}
      />}
      />
      <ImageBackground 
        style={{width:100, height:130, position:"absolute", alignSelf:"center", bottom:10, zIndex: -1000000}} 
        source={require('../../assets/images/inback.png')} 
        resizeMode='cover'
      />
    </View>
  );
};

export default Offer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
  },
});
