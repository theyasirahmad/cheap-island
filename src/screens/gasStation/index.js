import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, StatusBar, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import GasStationCard from '../../Components/GasStataionCard'
import { StationList as STATIONLIST } from '../../dummyData/dummyData'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Colors } from '../../constants/theme'
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native';


const GasStation = () => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [loading, setLoading] = useState(true);


  const [mapLatitude, setMapLatitude] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(null);


  const [paddingTop, setPaddingTop] = useState(0);

  const [locationDenied, setLocationDenied] = useState(true);
  const [showMap, setShowMap] = useState(true);

  const [selectedGasId, setSelectedGasId] = useState('123456789');

  const [gasStations, setGasStations] = useState([]);
  const [viewStation, setViewStation] = useState(
    {
      StationName: '',
      company: '',
      fuel1: '',
      discount1: '',
      fuel2: '',
      discount2: '',
      d: 0,
    }
  )

  const rbSheetRef = useRef();

  const _onMapReady = () => {

    setPaddingTop(0)

  }

  const getMyLocation = () => {
    if (!loading) {
      setLoading(true)
    }

    (async () => {
      try {

        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
          setLocationDenied(true)
          setLoading(false)
          setErrorMsg('Permission to access location was denied');
          return;
        }
        else {
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
          setLoading(false)
          setLocationDenied(false)
        }

      } catch (error) {
        console.log(error);
        setLocationDenied(true)
        setLoading(false)
      }


      // let results = await Location.reverseGeocodeAsync({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude
      // });

    })();
  }

  const sortFunction = (a, b) => {
    const bandA = parseFloat(a.distance)
    const bandB = parseFloat(b.distance)

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  const openSheet = (StationName, company, fuel1, discount1, fuel2, discount2, geo) => {


    const R = 6371e3; // metres
    const φ1 = latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = geo.lat * Math.PI / 180;
    const Δφ = (geo.lat - latitude) * Math.PI / 180;
    const Δλ = (geo.lon - longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres





    setViewStation(
      { StationName, company, fuel1, discount1, fuel2, discount2, d }
    )
    // console.log('View Stationnnnnnnnnnnnn', viewStation)
    rbSheetRef.current.open()
    // gasStations.filter((key)=>)
  }

  const getGasStations = () => {

    axios({
      url: 'https://raw.githubusercontent.com/gasvaktin/gasvaktin/master/vaktin/gas.min.json',
      method: "GET"
    })
      .then((res) => {
        // console.log('Api responsee dataaaaaaaaaaaaa', res.data)
        // setGasStations([...res.data.stations])
        let tempArr = res.data.stations;

        let tempArr2 = [];

        tempArr.map((item) => {

          const R = 6371e3; // metres
          const φ1 = latitude * Math.PI / 180; // φ, λ in radians
          const φ2 = item.geo.lat * Math.PI / 180;
          const Δφ = (item.geo.lat - latitude) * Math.PI / 180;
          const Δλ = (item.geo.lon - longitude) * Math.PI / 180;

          const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          const d = R * c; // in metres

          tempArr2.push({ station: item, distance: d })

        })
        let tempArr3 = tempArr2.sort(sortFunction)

        let tempArr4 = [];

        tempArr3.map((item) => {

          tempArr4.push(item.station)
        })

        setGasStations([...tempArr4])

      })
      .catch((err) => {
        console.log(err)
        alert('Error Getting Gas Stations');
      })
  }

  React.useEffect(() => {
    getGasStations()
    getMyLocation()
  }, [])

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.LinearBlue1} /> */}
      <GlobalHeader
        backgroundColor="blue"
        headingText="GAS STATIONS"
        headingMargin={1}
        fontSize={18}
        color="#fff"
      // isFavouriteLoading={false}
      // RightIcon={true}
      />
      {
        loading ?
          <ActivityIndicator
            style={{
            }} color={Colors.LinearBlue1} />
          :
          <>
            {
              locationDenied ?
                <View>
                  <Text style={{ padding: 20 }}>
                    Location Denied
                </Text>

                  <TouchableOpacity
                    style={[styles.btnLogin, { marginBottom: 20 }]}
                    onPress={getMyLocation}
                  >
                    <Text style={styles.loginTxt}>
                      Refresh
                    </Text>
                  </TouchableOpacity>
                </View>
                :
                <>
                  <View style={styles.viewMapConatiner}>
                    <View style={{ width: "100%", height: Dimensions.get('window').height * 0.5, backgroundColor: "#bbb" }}>
                      {
                        latitude && longitude && showMap &&
                        <MapView
                          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                          showsUserLocation={true}
                          initialRegion={{
                            latitude: mapLatitude ? parseFloat(mapLatitude) : parseFloat(latitude),
                            longitude: mapLongitude ? parseFloat(mapLongitude) : parseFloat(longitude),
                            latitudeDelta: 0.0422,
                            longitudeDelta: 0.0421,
                          }}
                          region={{
                            latitude: mapLatitude ? parseFloat(mapLatitude) : parseFloat(latitude),
                            longitude: mapLongitude ? parseFloat(mapLongitude) : parseFloat(longitude),
                            latitudeDelta: 0.0422,
                            longitudeDelta: 0.0421,
                          }}
                          // onRegionChange={() => {
                          //   alert('region Changed')
                          // }}
                          style={{
                            position: 'relative',
                            minHeight: '100%',
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
                            gasStations.map((item) => {
                              return (
                                <Marker

                                  pinColor={item.key === selectedGasId ? Colors.LinearBlue1 : "red"}
                                  key={(Math.random() * 100) + 10 * Math.random() * 12}

                                  onPress={() => {
                                    // setShowMap(false)
                                    setSelectedGasId(item.key)
                                    setMapLatitude(item.geo.lat)
                                    setMapLongitude(item.geo.lon)
                                    openSheet(
                                      item.name,
                                      item.company,
                                      item.bensin95,
                                      item.bensin95_discount,
                                      item.diesel,
                                      item.diesel_discount,
                                      item.geo
                                    )
                                    // setTimeout(() => {
                                    //   setShowMap(true)
                                    // }, 4)
                                  }}
                                  coordinate={{
                                    latitude: parseFloat(item.geo.lat),
                                    longitude: parseFloat(item.geo.lon)
                                  }}
                                />
                              )
                            })
                          }

                        </MapView>
                      }
                    </View>
                    {/* <ScrollView style={styles.containerList} showsVerticalScrollIndicator={false}> */}
                    <View style={styles.containerList}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={gasStations}
                        keyExtractor={(item) => item.key}
                        renderItem={(itemData) => (
                          <View>
                            <TouchableOpacity
                              key={Math.random() * 1000 * Math.random() + 200}
                              onPress={() => {
                                // setShowMap(false)
                                setSelectedGasId(itemData.item.key)
                                setMapLatitude(itemData.item.geo.lat)
                                setMapLongitude(itemData.item.geo.lon)
                                openSheet(
                                  itemData.item.name,
                                  itemData.item.company,
                                  itemData.item.bensin95,
                                  itemData.item.bensin95_discount,
                                  itemData.item.diesel,
                                  itemData.item.diesel_discount,
                                  itemData.item.geo
                                )




                              }
                              }>
                              <GasStationCard
                                backgroundBlueColor={Colors.LinearBlue1}
                                StationName={itemData.item.name}
                                favourite={itemData.item.favourite}
                                latitude={latitude}
                                longitude={longitude}
                                geo={itemData.item.geo}
                              />
                            </TouchableOpacity>
                          </View>

                        )}
                      />
                    </View>
                  </View>
                  <RBSheet
                    ref={rbSheetRef}
                    height={260}
                    openDuration={0}
                    onClose={() => {
                      setSelectedGasId('123456789')
                    }}
                    // closeOnDragDown={true}
                    // dragFromTopOnly={true}
                    animationType={'fade'}
                    customStyles={{
                      container: {
                        justifyContent: "center",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                        // alignItems: "center"
                      }
                    }}
                  >
                    <View style={{ flex: 1, padding: 15 }}>
                      <Text style={{ fontSize: 18, fontWeight: "bold", color: 'rgba(0,0,0,0.4)' }}>
                        Company: {viewStation.company}
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "bold", color: 'rgba(0,0,0,0.4)' }}>
                        Name: {viewStation.StationName}
                      </Text>
                      <Text style={styles.txtDetail}>
                        Distance: {viewStation.d}
                      </Text>

                      <View style={{ width: '90%', height: 1, backgroundColor: "rgba(0,0,0,0.1)", marginVertical: 15 }} />

                      <Text style={{ fontSize: 18, fontWeight: "bold", color: 'rgba(0,0,0,0.4)' }}>
                        Bension95
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.txtDetail}>Price: {viewStation.fuel1}</Text>
                        <Text style={styles.txtDetail}>Discounted price: {viewStation.discount1}</Text>
                      </View>

                      <View style={{ width: '90%', height: 1, backgroundColor: "rgba(0,0,0,0.1)", marginVertical: 15 }} />

                      <Text style={{ fontSize: 18, fontWeight: "bold", color: 'rgba(0,0,0,0.4)' }}>
                        Diesel
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.txtDetail}>Price: {viewStation.fuel2}</Text>
                        <Text style={styles.txtDetail}>Discounted price: {viewStation.discount2}</Text>
                      </View>
                    </View>
                  </RBSheet>
                  <ImageBackground
                    style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
                    source={require('../../assets/images/inback.png')}
                    resizeMode="cover"
                  />
                </>
            }
          </>
      }

    </View>
  );
};

export default GasStation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
  },
  txtDetail: {
    width: "50%",
    marginTop: 5, fontSize: 15, color: "rgba(0,0,0,0.4)"
  },
  containerList: {
    // padding:10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // paddingBottom:180,
    backgroundColor: "#fff",
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  viewMapConatiner: {
    overflow: "hidden",
    // maxHeight: Dimensions.get('window').height*0.68,
    width: "100%",
    marginTop: -20,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.borderCardColor,
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
  },
  btnLogin: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(36, 142, 255, 1)',
    marginTop: 10,
    borderRadius: 10,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
    borderColor: 'grey',
  },
});
