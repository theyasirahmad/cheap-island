import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import RestaurantCard from '../../Components/RestaurantCard';
import { Colors } from '../../constants/theme';
import { RestaurantList as RESTAURANTLIST } from '../../dummyData/dummyData';

const Restaurants = ({ navigation }) => {
  // const [cardSelect, setcardSelect] = useState(false);
  // const onPressCard = () => {
  //   setcardSelect(!cardSelect)
  // }
  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText="RESTAURANTS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
      />
      <View style={styles.viewFlatlist}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={RESTAURANTLIST}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <RestaurantCard
              img={itemData.item.img}
              name={itemData.item.name}
              descrption={itemData.item.descrption}
              navigation={navigation}
            />
          )}
        />
      </View>
      <ImageBackground
        style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
        source={require('../../assets/images/inback.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
  },
  viewFlatlist: {
    width: '90%',
    maxHeight: Dimensions.get('window').height * 0.68,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderCardColor,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,

    // elevation: 24,
  },
});
