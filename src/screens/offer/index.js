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
import { ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Offer = ({ navigation, route }) => {

  const [loading, setLoading] = useState(true);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [offers, setOffers] = useState([]);
  const [favs, setFavs] = useState([]);
  const [favsOnly, setFavsOnly] = useState(false);
  const [query, setQuery] = useState('')


  const intilization = () => {
    setQuery('');
    setFavsOnly(false)
    setOffers([])
    setToggleBtn(true)
    setLoading(true)
  }

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
        let favourites = res.data.user.favourites
        setFavs(favourites)
      })
      .catch((err) => {
        console.log(err);
        alert('Error Getting User Details')
      })
  }

  const getOffers = async () => {

    setLoading(true);

    let token = await AsyncStorage.getItem('token');
    axios({
      url: `${connectionString}/offer/get-offers`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        query: query
      }
    })
      .then((res) => {
        setOffers(res.data.offers)
        console.log('offersssssssssssssssss', res.data.offers)
        setLoading(false)

      })
      .catch((err) => {
        console.log(err);
        alert('Internal Server Error')
        setLoading(false)
      })
  }

  const getUsedOffers = async () => {

    let token = await AsyncStorage.getItem('token');
    setLoading(true)
    axios({
      url: `${connectionString}/offer/get-used-offers`,
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setOffers(res.data.offers)
        setLoading(false)

      })
      .catch((err) => {
        console.log(err);
        alert('Internal Server Error')
        setLoading(false)
      })
  }

  const getFavOffers = async () => {

    let token = await AsyncStorage.getItem('token');
    setLoading(true)
    axios({
      url: `${connectionString}/offer/get-fav-offers`,
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data)
        setOffers([...res.data.offers])
        setFavsOnly(true)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        alert("internal server error")
        setLoading(false)

      })
  }

  const getFavUsedOffers = async () => {

    let token = await AsyncStorage.getItem('token');

    axios({
      url: `${connectionString}/offer/get-fav-used-offers`,
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data)
        setOffers([...res.data.offers])
        setFavsOnly(true)
      })
      .catch((err) => {
        console.log(err);
        alert("internal server error")
      })
  }

  const getFavsOnly = async () => {

    if (!favsOnly) {
      if (toggleBtn) {
        getFavOffers()
      }
      else {
        getFavUsedOffers()
      }
    }
    else {
      if (toggleBtn) {
        getOffers()
      }
      else {
        getUsedOffers()
      }
      setFavsOnly(false)
    }
  }


  React.useEffect(() => {
    getUserDetails()
    navigation.addListener('focus', () => {
      route && route.params && route.params.used ? (setToggleBtn(false), getUsedOffers())
        :
        getOffers()
      // if (route && route.params && route.params.used) {
      //   setToggleBtn(false)
      //   getUsedOffers()
      // }
      // else {
      //   getOffers()
      // }
    });
    navigation.addListener('blur', () => {
      intilization()
    });


  }, [])

  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText="OFFERS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
        arrow={false}
        BackIconColor='#fff'
        navigation={navigation}
        isFavouriteLoading={false}
        RightIcon={true}
        favsOnly={favsOnly}
        getFavsOnly={getFavsOnly}
      />
      <>
        <View style={styles.topBtnsView}>
          {/* {toggleBtn ? */}
          <TouchableOpacity
            onPress={() => {
              setToggleBtn(true)
              setFavsOnly(false)
              getOffers()
            }}
            style={[styles.btnTop, { backgroundColor: toggleBtn ? Colors.LinearBlue1 : 'transparent' }]}
          >
            <Text style={{ color: "#fff" }}>Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToggleBtn(false)
              setFavsOnly(false)
              getUsedOffers()
            }}
            style={[styles.btnTop, { backgroundColor: toggleBtn ? 'transparent' : Colors.LinearBlue1 }]}
          >
            <Text style={{ color: "#fff" }}>Used offers</Text>
          </TouchableOpacity>
          {/* } */}
        </View>
        {
          favsOnly === false &&
          toggleBtn &&
          <View style={styles.searchbarStyle}>
            <TextInput
              onChangeText={(e) => { setQuery(e) }}
              placeholder="Search offer" style={styles.inputStyle} />
            <TouchableOpacity onPress={getOffers} style={styles.btnSearch}>
              <FontAwesome name="search" size={23} color="#fff" />
            </TouchableOpacity>
          </View>
        }
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={40}
                style={{ marginTop: -70 }}
                color={Colors.LinearBlue1} />
            </View>
            :
            // {
            offers.length == 0 ?
              <Text style={{ alignSelf: 'center', fontSize: 22, color: "#bbb", marginTop: HEIGHT * 0.2 }}>No result found</Text>
              :
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={offers}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) =>
                  <OfferCard
                    img={itemData.item.logo}
                    favourite={(favs.indexOf(itemData.item._id.toString()) !== -1)}
                    navigation={navigation}
                    offer={itemData.item}
                    id={itemData.item._id}
                    favs={favs}
                    setFavs={setFavs}
                  />}
              />
          // }
        }
        <ImageBackground
          style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
          source={require('../../assets/images/inback.png')}
          resizeMode='cover'
        />
      </>
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
