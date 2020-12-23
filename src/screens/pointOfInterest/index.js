import React, {useState} from 'react';
import {View,StyleSheet, ScrollView, FlatList, Dimensions, StatusBar, ImageBackground} from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import GasStationCard from '../../Components/GasStataionCard'
import {PointList as STATIONLIST} from '../../dummyData/dummyData'
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
      {/* <StatusBar backgroundColor={Colors.LinearBlue1} /> */}
    <GlobalHeader 
        backgroundColor="blue"
        headingText="POINTS OF INTEREST" 
        headingMargin={1}
        fontSize={18}
        color="#fff"
    />
    <View style={styles.viewMapConatiner}>
      <View style={{width:"100%", height:Dimensions.get('window').height*0.3, backgroundColor:"#bbb"}}>
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
      />
      </View>
      {/* <ScrollView style={styles.containerList} showsVerticalScrollIndicator={false}> */}
      <View style={styles.containerList}>
      <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={STATIONLIST}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GasStationCard 
              StationName={itemData.item.name}
            />
          )}
        />
        </View>
      {/* </ScrollView> */}
    </View>
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
    paddingBottom:30
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


// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Dimensions} from 'react-native';
// import GlobalHeader from '../../Components/GlobalHeader';
// import HotelCard from '../../Components/HotelCard';
// import {Colors} from '../../constants/theme';
// import {HotelList as HOTELLIST} from '../../dummyData/dummyData';

// const Hotels = ({navigation}) => {
//   // const [cardSelect, setcardSelect] = useState(false);
//   // const onPressCard = () => {
//   //   setcardSelect(!cardSelect)
//   // }
//   return (
//     <View style={styles.container}>
//       <GlobalHeader
//         backgroundColor="#42B1F8"
//         headingText="HOTELS"
//         headingMargin={1}
//         fontSize={18}
//         color="#fff"
//       />
//       <View style={styles.viewFlatlist}>
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           numColumns={1}
//           data={HOTELLIST}
//           keyExtractor={(item) => item.id}
//           renderItem={(itemData) => (
//             <HotelCard 
//               img={itemData.item.img} 
//               name={itemData.item.name} 
//               descrption={itemData.item.descrption}
//               navigation={navigation}
//             />
//           )}
//         />
//       </View>
//       <ImageBackground 
//         style={{width:100, height:130, position:"absolute", alignSelf:"center", bottom:10, zIndex: -1000000}} 
//         source={require('../../assets/images/inback.png')} 
//         resizeMode="cover"
//       />
//     </View>
//   );
// };

// export default Hotels;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.backgroundBlueColor,
//   },
//   viewFlatlist: {
//     width: '90%',
//     maxHeight: Dimensions.get('window').height*0.68,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     overflow: 'hidden',
//     padding: 10,
//     borderWidth:1, 
//     borderColor:Colors.borderCardColor,
//     zIndex:10000000
//     // shadowColor: "#000",
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 12,
//     // },
//     // shadowOpacity: 0.58,
//     // shadowRadius: 16.00,

//     // elevation: 24,
//   },
// });
