import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Dimensions, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import OfferCard from '../../Components/OfferCard';
import { OfferList as OFFERLIST } from '../../dummyData/dummyData';
import { Colors } from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import connectionString from '../../api/api';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Offer = ({ navigation }) => {
  const [toggleBtn, setToggleBtn] = useState(true);


  const [offers, setOffers] = useState([]);


  const getUserDetails = async () => {

    let token = await AsyncStorage.getItem('token');

    axios({
      url: `${connectionString}/user/get-user`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        get: "favourites"
      }
    })
      .then((res) => {
        // console.log(res.data.user)
        AsyncStorage.setItem('userId', res.data.user._id)
        // let favourites = res.data.user.favourites
        // setFavs(favourites)
      })
      .catch((err) => {
        console.log(err);
        alert('Error Getting User Details')
      })
  }
  React.useEffect(() => {
    getUserDetails()
  }, [])


  React.useEffect(() => {

    const getOffers = async () => {

      let token = await AsyncStorage.getItem('token');

      axios({
        url: `${connectionString}/offer/get-offers`,
        method: "POST",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setOffers(res.data.offers)
        })
        .catch((err) => {
          console.log(err);
          alert('Internal Server Error')
        })
    }
    getOffers()
  })

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
      <View style={styles.topBtnsView}>
        {/* {toggleBtn ? */}
        <TouchableOpacity
          onPress={() => setToggleBtn(true)}
          style={[styles.btnTop, { backgroundColor: toggleBtn ? Colors.LinearBlue1 : 'transparent' }]}
        >
          <Text style={{ color: "#fff" }}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setToggleBtn(false)}
          style={[styles.btnTop, { backgroundColor: toggleBtn ? 'transparent' : Colors.LinearBlue1 }]}
        >
          <Text style={{ color: "#fff" }}>Used offers</Text>
        </TouchableOpacity>
        {/* } */}
      </View>
      <View style={styles.searchbarStyle}>
        <TextInput placeholder="Search offer" style={styles.inputStyle} />
        <TouchableOpacity style={styles.btnSearch}>
          <FontAwesome name="search" size={23} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <OfferCard
          img={OFFERLIST[0].img}
          favourite={false}
          navigation={navigation}
          offer={itemData.item}
        />}
      />
      <ImageBackground
        style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
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
  topBtnsView: {
    flexDirection: 'row', height: 40, alignSelf: "center", backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20, width: 240
  },
  btnTop: {
    paddingHorizontal: 15,
    backgroundColor: Colors.LinearBlue1, width: 120,
    justifyContent: "center", alignItems: "center", borderRadius: 20
  },
  searchbarStyle: {
    backgroundColor: '#fff',
    height: HEIGHT * 0.08,
    width: WIDTH * 0.9,
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 0
  },
  inputStyle: {
    flex: 1,
    backgroundColor: "#fff",
    height: HEIGHT * 0.08,
    paddingHorizontal: 15,
    paddingVertical: 0
  },
  btnSearch: {
    backgroundColor: "#bbb", justifyContent: "center", alignItems: "center",
    paddingHorizontal: 12, height: HEIGHT * 0.08
  }
});
