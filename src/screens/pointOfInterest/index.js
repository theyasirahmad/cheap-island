import React, {useState} from 'react';
import {View,StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, StatusBar, ImageBackground} from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import GasStationCard from '../../Components/GasStataionCard'
import {PointList as STATIONLIST} from '../../dummyData/dummyData'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Colors } from '../../constants/theme'

const PointOfInterest = () => {
  const [latitude,setLatitude] = useState('1')
  const [longitude,setLongitude] = useState('1')
  const [paddingTop,setPaddingTop] = useState(0)

  const  _onMapReady = () => {

    setPaddingTop(0)
  
  }

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
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.viewSearch}>
        <TextInput  
        placeholder="Search"
        style={styles.inputSearch}/>
        <TouchableOpacity style={styles.btnSearch}>
          <FontAwesome color="#fff" size={23} name="search" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewMapConatiner}>
        <View style={{width:"100%", height:Dimensions.get('window').height*0.57}}>
          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            initialRegion={{
              latitude:  40.758896,
              longitude:  -73.985130,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
            style={{
              position: 'relative',
              minHeight: Dimensions.get('window').height*0.57,
              width: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginBottom: 1,
              borderWidth: 2,
            }}
            onMapReady={_onMapReady}
          />
        </View>
      </View>
    </ScrollView>
    <ImageBackground 
        style={{width:100, height:130, position:"absolute", alignSelf:"center", bottom:10, zIndex: -1000000}} 
        source={require('../../assets/images/inback.png')} 
        resizeMode="cover"
      />
    </View>
  );
};

export default PointOfInterest;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.backgroundBlueColor,
    // paddingBottom:30
  },
  btnSearch:{
    paddingHorizontal:12, backgroundColor:"#bbb",
    height:Dimensions.get('window').height*0.09,
    alignItems:"center", justifyContent:"center"
  },
  inputSearch:{
    backgroundColor:"#fff", height:Dimensions.get('window').height*0.09,
    flex:1, paddingHorizontal:15, paddingVertical:0
  },
  viewSearch:{
    width:Dimensions.get('window').width*0.9, height:Dimensions.get('window').height*0.09, 
    backgroundColor:"#fff", alignSelf:"center", marginBottom:10, borderRadius:8,
    borderWidth:1, borderColor:'rgba(0,0,0,0.1)', overflow:"hidden", flexDirection:"row",
    alignItems:"center"
  },
  containerList:{
    // padding:10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    // paddingBottom:180,
    // backgroundColor:"#fff",
    maxHeight: Dimensions.get('window').height*0.38,

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
  viewMapConatiner:{
    overflow:"hidden", 
    // maxHeight: Dimensions.get('window').height*0.68,
    width:"90%", 
    borderRadius:20, 
    alignSelf:"center",
    borderWidth:1, 
    borderColor:Colors.borderCardColor,
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
