import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { View, Modal, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ImageBackground, Image, Dimensions, StatusBar } from 'react-native';
import connectionString from '../../api/api';
import GlobalHeader from '../../Components/GlobalHeader';
import { Colors } from '../../constants/theme';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import RBSheet from "react-native-raw-bottom-sheet";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Toast } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, Entypo } from '@expo/vector-icons';
const DetailDisplay = ({ route, navigation }) => {


  const [intervalRef, setIntervalRef] = useState(null);

  const [progress, setProgress] = useState(0)

  const rbSheetRef = useRef();

  const [loading, setLoading] = useState(false);

  const [offerName, setOfferName] = useState('"setOfferName"');
  const [offerOff, setOfferOff] = useState('"setOfferOff"');
  const [offerDescription, setOfferDescription] = useState('"setOfferDescription"');


  const {
    img,
    name,
    description,
    offerAvail,
    address,
    menuCard,
    id,
    limit,
    off,
    usedBy,
    city,
    products,
    latitude,
    longitude,
    offerScreen
  } = route.params;

  const [imageSelected, setImageSelected] = useState(null);

  // console.log('navigationnnnnnnnnn', name, descrption)

  const [timesUsed, setTimesUsed] = useState(0)
  const [userId, setUserId] = useState(null)
  const [paddingTop, setPaddingTop] = useState(0)


  React.useEffect(() => {

    const getUserId = async () => {

      let userId = await AsyncStorage.getItem('userId')
      setUserId(userId)

      if (usedBy) {

        usedBy.map((item) => {
          if (item.user.toString() === userId.toString()) {
            setTimesUsed(item.times)
          }
        })
      }
    }

    const loadFont = async () => {
      await Font.loadAsync({
        'Roboto': require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        'Roboto_medium': require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
    }
    loadFont()
    getUserId()
  }, [])


  const [timer, setTimer] = useState(0)

  React.useEffect(() => {

    if (route.params.offerScreen) {
      openRBSheet()
    }

  }, [])

  const openRBSheet = async () => {

    // rbSheetRef.current.open()
    let timeout = await AsyncStorage.getItem('timeout');
    let offerNameVar = await AsyncStorage.getItem('offerName');
    let offerOffVar = await AsyncStorage.getItem('offerOff');
    let offerDescriptionVar = await AsyncStorage.getItem('offerDescription');

    let d = new Date();
    let millisec = d.getTime()
    let difference = parseFloat(timeout) - millisec;

    if (difference > 0) {
      rbSheetRef.current.open()
      startTimer(difference / 1000)
      setOfferName(offerNameVar);
      setOfferOff(offerOffVar)
      setOfferDescription(offerDescriptionVar)

    }

  }

  const startTimer = (duration) => {
    let interRef;

    var start = Date.now(),
      diff,
      minutes,
      seconds;
    function timer() {
      // get the number of seconds that have elapsed since 
      // startTimer() was called

      setProgress(((600000 - parseFloat((minutes * 60)) + parseFloat(seconds)) / 6000000).toFixed(2))

      if (parseFloat((minutes * 60)) + parseFloat(seconds) <= 0) {
        if (rbSheetRef.current) {
          rbSheetRef.current.close()
          clearInterval(intervalRef)
          clearInterval(interRef)
        }

      }

      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // display.textContent = minutes + ":" + seconds;
      setTimer(minutes + ":" + seconds)

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    interRef = setInterval(timer, 1000);
    setIntervalRef(interRef)

  }

  const availOffer = async () => {

    let token = await AsyncStorage.getItem('token');
    // console.log(token);
    setLoading(true)
    console.log(id)
    axios({
      url: `${connectionString}/offer/use-offer`,
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        offerId: id
      }
    })
      .then((res) => {
        setLoading(false)
        if (res.data.message === "Offer Availed") {
          // alert("Offer Availed")
          setTimesUsed(timesUsed + 1)
          let d = new Date();
          let millisec = d.getTime();
          millisec = millisec + 600000
          AsyncStorage.setItem('timeout', JSON.stringify(millisec))
          AsyncStorage.setItem('offerName', JSON.stringify(name));
          AsyncStorage.setItem('offerOff', JSON.stringify(off));
          AsyncStorage.setItem('offerDescription', JSON.stringify(description));

          openRBSheet()
        }
        else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        alert('Internal Server Error')
      })
  }

  const _onMapReady = () => {
    setPaddingTop(0)
  }

  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText={name}
        headingMargin={1}
        fontSize={18}
        color="#fff"
        arrow={true}
        BackIconColor='#fff'
        navigation={navigation}
      />
      <StatusBar backgroundColor={'transparent'} translucent={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewDetail}>
          <Image

            source={{
              uri:
                img
              // connectionString + "/" + img
            }}
            resizeMode={'contain'}
            style={{ width: "100%", height: 200, backgroundColor: "transparent" }}
          />
          <View style={{ padding: 8 }}>
            {offerAvail !== null && offerAvail !== undefined && offerAvail === true ?
              <TouchableOpacity
                disabled={loading}
                onPress={availOffer}
                style={styles.btnAvail}>
                <Text style={{ color: "#fff" }}>Use offer</Text>
              </TouchableOpacity> : null
            }
            <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
              {description}
            </Text>
            <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
              {address}
            </Text>
            {
              city &&
              <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                {city}
              </Text>
            }
            {
              products && products.length > 0 &&
              <>
                <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                  Products
                </Text>
                {
                  products.map((item) => {
                    return (
                      < View key={Math.random() * 100} style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={{ width: '70%' }}>
                          {item.productName}
                        </Text>
                        <Text style={{ width: '30%' }}>
                          {item.price}
                        </Text>
                      </View>
                    )
                  })
                }
              </>
            }
            {
              offerAvail &&
              <>
                <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                  Off {off}%
                </Text>

                <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                  Limit {limit}
                </Text>
                <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                  Times Used {timesUsed}
                </Text>
              </>
            }
            {
              menuCard.length > 0 &&
              <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
                Menu
              </Text>
            }

            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={menuCard}
              keyExtractor={(item) => img.toString()}
              horizontal={true}
              pagingEnabled={true}
              renderItem={(itemData) => (
                <TouchableOpacity onPress={() => {

                  Toast.show({
                    text: 'Swipe Down Image To Close Fullscreen',
                    buttonText: '',
                    type: "danger"
                  })
                  setImageSelected(itemData.item)

                }}>
                  <Image
                    source={{
                      uri:
                        itemData.item
                    }}
                    resizeMode={"contain"}
                    style={{
                      width: Dimensions.get('window').width * .9 - 16,
                      height: Dimensions.get('window').width * .9 - 16,
                      backgroundColor: "black"
                    }}
                  />
                </TouchableOpacity>
              )}
            />

            {
              route.params.displayMap &&
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                // showsMyLocationButton={true}
                // showsUserLocation={true}

                initialRegion={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  latitudeDelta: 0.0422,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  position: 'relative',
                  minHeight: Dimensions.get('window').height * 0.4,
                  width: '100%',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginBottom: 1,
                  borderWidth: 2,
                  marginTop: 20
                }}
                onMapReady={_onMapReady}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                  }}
                />
              </MapView>
            }
          </View>
        </View>
      </ScrollView>
      <ImageBackground
        style={styles.bgImg}
        source={require('../../assets/images/inback.png')}
        resizeMode='cover'
      />
      <RBSheet
        ref={rbSheetRef}
        height={260}
        openDuration={0}
        // onClose={() => {
        //   setSelectedGasId('123456789')
        // }}
        closeOnPressMask={false}
        // closeOnDragDown={true}
        // dragFromTopOnly={true}
        animationType={'fade'}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
            // alignItems: "center"
          }
        }}
      >
        <View style={{ alignItems: 'center', }}>


          <Text style={{
            color: Colors.LinearBlue1,
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10
          }}>
            OFFER IS ACTIVE
          </Text>
          <Text style={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 0
          }}>
            Show employee your screen
          </Text>
          <Text style={{
            color: Colors.LinearBlue1,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
            paddingLeft:15,
            paddingRight:15,
            textAlign:'center',
            width:'100%',

          }}>
           You have {timer} to show employee your screen
          </Text>

          <Text style={{
            color: Colors.LinearBlue1,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10
          }}>
         <Text style={{color:'black'}}>
         Offer Name:
         </Text> {offerName ? JSON.parse(offerName) : ""}
          </Text>
          <Text style={{
            color: Colors.LinearBlue1,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign:'center'
          }}>
          <Text style={{color:"black"}}>
          Discount Percentage:
            </Text> {offerOff}
          </Text>
          {/* <Text style={{
            color: Colors.LinearBlue1,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10
          }}>
            {offerDescription ? JSON.parse(offerDescription) : ""}
          </Text> */}

        </View>
      </RBSheet>
      {
        imageSelected &&
        <Modal visible={true} transparent={true} >
          {/* <View style={{backgroundColor:'rgba(0,0,0,0.6)'}}> */}
          <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row-reverse', }}>
            <TouchableOpacity onPress={() => { setImageSelected(null) }}>
              <Entypo style={{ backgroundColor: 'transparent', padding: 10 }}
                size={30}
                color="white"
                name={'cross'}
              />
            </TouchableOpacity>
          </View>
          <ImageViewer
            renderIndicator={() => { return null }}
            backgroundColor='rgba(0,0,0,0.6)'
            enableSwipeDown={true}
            onCancel={() => { setImageSelected(null) }} imageUrls={[{ url: imageSelected }]} />

          {/* </View> */}
        </Modal>
      }
    </View >
  );
};

export default DetailDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
  },
  viewDetail: {
    width: "90%", alignSelf: "center", overflow: 'hidden', borderRadius: 20, paddingBottom: 15,
    backgroundColor: "#fff", marginBottom: 30
  },
  bgImg: {
    width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000
  },
  btnAvail: {
    paddingHorizontal: 20, paddingVertical: 10, backgroundColor: Colors.LinearBlue1,
    alignSelf: "center", borderRadius: 10, marginTop: 5
  }
});
