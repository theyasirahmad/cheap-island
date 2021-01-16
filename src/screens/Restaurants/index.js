import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import RestaurantCard from '../../Components/RestaurantCard';
import { Colors } from '../../constants/theme';
import { RestaurantList as RESTAURANTLIST } from '../../dummyData/dummyData';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import connectionString from '../../api/api';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Restaurants = ({ navigation }) => {
  // const [cardSelect, setcardSelect] = useState(false);
  // const onPressCard = () => {
  //   setcardSelect(!cardSelect)
  // }

  const [resturants, setResturants] = useState([])

  const getResturants = async () => {

    let type = "resturant"
    let token = AsyncStorage.getItem('token');

    axios({
      url: `${connectionString}/user/get-vendors`,
      method: "POST",
      data: {
        type
      }
    })
      .then((res) => {
        // console.log(res.data.vendors)
        setResturants([...res.data.vendors])
      })
      .catch((err) => {
        console.log(err);
        alert("internal server error")
      })
  }

  React.useEffect(() => {
    getResturants()
  })

  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText="RESTAURANTS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
        isFavouriteLoading={false}
        RightIcon={true}
      />
      <View style={styles.searchbarStyle}>
        <TextInput placeholder="Search restaurant" style={styles.inputStyle} />
        <TouchableOpacity style={styles.btnSearch}>
          <FontAwesome name="search" size={23} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewFlatlist}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={resturants}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <RestaurantCard
              img={itemData.item.logo}
              name={itemData.item.name}
              description={itemData.item.description}
              address={itemData.item.address}
              navigation={navigation}
              favourite={false}
              menuCard={itemData.item.menuCard}
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
  searchbarStyle: {
    backgroundColor: '#fff',
    height: HEIGHT * 0.09,
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 0
  },
  inputStyle: {
    flex: 1,
    backgroundColor: "#fff",
    height: HEIGHT * 0.09,
    paddingHorizontal: 15,
    paddingVertical: 0
  },
  btnSearch: {
    backgroundColor: "#bbb", justifyContent: "center", alignItems: "center",
    paddingHorizontal: 12, height: HEIGHT * 0.09
  }
});
