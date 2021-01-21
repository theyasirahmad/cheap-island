import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, StatusBar, ImageBackground, Text } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import GasStationCard from '../../Components/GasStataionCard'
import { PointList as STATIONLIST } from '../../dummyData/dummyData'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Colors } from '../../constants/theme'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import connectionString from '../../api/api';


const PointOfInterest = ({ navigation }) => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [paddingTop, setPaddingTop] = useState(0)

  const [vendors, setVendors] = useState([]);

  const [selectedVendor, setSelectedVendor] = useState(null);

  const [query, setQuery] = useState('');

  const initilization = () => {
    setLatitude(null);
    setLongitude(null);
    setCity("");
    setVendors([]);
    setSelectedVendor(null);
    setQuery('')
  }

  const _onMapReady = () => {
    setPaddingTop(0)
  }

  const getPOI = async (city2) => {

    let token = await AsyncStorage.getItem('token');

    let myCity = city2 ? city2 : city;
    axios({
      url: `${connectionString}/user/get-vendor-by-city`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        city: myCity,
        query
      }
    })
      .then((res) => {
        console.log(res.data.vendors)
        setVendors([...res.data.vendors])
      })
      .catch((err) => {
        console.log(err);
        alert("internal server error")
      })
  }

  const getMyLocation = async () => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)

      let results = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      setCity(results[0].city)
      getPOI(results[0].city)
    })();

  }

  const getUser = async () => {
    // setLoading(true)
    let tok = await AsyncStorage.getItem('token');

    axios({
      url: `${connectionString}/user/get-user`,
      method: "POST",
      headers: {
        Authorization: tok
      },
      data: {
        get: "latitude longitude city email fullName"
      }
    })
      .then((res) => {
        setLatitude(res.data.user.latitude)
        setLongitude(res.data.user.longitude)
        setCity(res.data.user.city)
        getPOI(res.data.user.city)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        alert('Error Getting Vendor Try Again Later');
      })
  }

  React.useEffect(() => {
    const getLocationToggle = async () => {
      let locationToggle = await AsyncStorage.getItem('locationEnabled')
      if (locationToggle === "true") {
        getMyLocation()
      }
      else {
        getUser()
      }
    }
    // getLocationToggle()

    navigation.addListener('focus', () => {
      getLocationToggle()
      // alert(locationToggle)
    });
    navigation.addListener('blur', () => {
      initilization()
    });


  }, [])




  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="blue"
        headingText="INTERESTING POINTS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
      />
      {/* <StatusBar backgroundColor={Colors.LinearBlue1} /> */}
      {/* <ScrollView showsVerticalScrollIndicator={false} > */}
      {/* <View style={styles.viewSearch}>
          <TextInput
            placeholder="Search"
            style={styles.inputSearch} />
          <TouchableOpacity style={styles.btnSearch}>
            <FontAwesome color="#fff" size={23} name="search" />
          </TouchableOpacity>
        </View> */}
      <View style={styles.viewSearch}>
        <TextInput
          onChangeText={(e) => { setQuery(e) }}
          placeholder="Search"
          style={styles.inputSearch} />
        <TouchableOpacity onPress={() => { getPOI(city) }} style={styles.btnSearch}>
          <FontAwesome color="#fff" size={23} name="search" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewMapConatiner}>
        {/* <View style={{ width: "100%", height: Dimensions.get('window').height * 0.70}}> */}
        {
          latitude && longitude &&
          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            showsMyLocationButton={true}
            showsUserLocation={true}

            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
            style={{
              position: 'relative',
              minHeight: Dimensions.get('window').height * 0.80,
              // zIndex:-100,
              width: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginBottom: 1,
              borderWidth: 2,
            }}
            onMapReady={_onMapReady}
          >
            {
              vendors.map((item) => {
                return (
                  <Marker
                    onPress={() => {
                      // setCardSelected(!cardSelected),
                      navigation.navigate('DetailDisplay', {
                        name: item.name,
                        description: item.description,
                        img: item.logo,
                        city: item.city,
                        address: item.address,
                        menuCard: [],
                        products: item.products
                      })
                    }}
                    key={item.latitude.toString() + item.longitude.toString()}
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude)
                    }}
                  />
                )
              })
            }
          </MapView>
        }
        {/* </View> */}
      </View>

      {/* </ScrollView> */}
      <ImageBackground
        style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
        source={require('../../assets/images/inback.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default PointOfInterest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
    // paddingBottom:30
  },
  btnSearch: {
    paddingHorizontal: 12, backgroundColor: "#bbb",
    height: Dimensions.get('window').height * 0.09,
    alignItems: "center", justifyContent: "center"
  },
  inputSearch: {
    backgroundColor: "#fff", height: Dimensions.get('window').height * 0.09,
    flex: 1, paddingHorizontal: 15, paddingVertical: 0
  },
  viewSearch: {
    width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.08,
    backgroundColor: "#fff", alignSelf: "center", marginBottom: 10, borderRadius: 8,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', overflow: "hidden", flexDirection: "row",
    alignItems: "center",
    position: "absolute", top: 80, zIndex: 100
  },
  containerList: {
    // padding:10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // paddingBottom:180,
    // backgroundColor:"#fff",
    maxHeight: Dimensions.get('window').height * 0.38,

    // marginBottom:5,
    //     overflow:"hidden",
    //     shadowColor: "#000",
    // shadowOffset: {
    // 	width: 0,
    // 	height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  viewMapConatiner: {
    overflow: "hidden",
    maxHeight: Dimensions.get('window').height * 0.75,
    width: "100%",
    borderRadius: 25,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.borderCardColor,
    // backgroundColor: 'red',
    marginTop: -20
    // justifyContent:"center",
    // padding:1,
    // paddingBottom:10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,
    // elevation: 24,
  }
});
