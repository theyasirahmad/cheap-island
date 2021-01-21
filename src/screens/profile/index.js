import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../constants/theme'
import * as Animatable from 'react-native-animatable';

import Axios from 'axios';
import connectingString from '../../api/api'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native';
import * as Location from 'expo-location';


const imgLogo = require('../../assets/images/cheaplogo4.png')

const Profile = ({ navigation }) => {
  const [editable, seteditable] = useState(false);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');

  const [token, setToken] = useState('');


  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [curentCity, setCurrentCity] = useState('');

  const [locationLoading, setLocationLoading] = useState(false);


  const getCurrentLocation = () => {

    (async () => {
      setLocationLoading(true)
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        setLocationLoading(false)
        alert('Permission to access location was denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setCurrentLatitude(location.coords.latitude)
      setCurrentLongitude(location.coords.longitude)

      // console.log('Locationnnnn ' + location.coords.latitude)
      let results = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      // alert(JSON.stringify(results.city))
      setCurrentCity(results[0].city)
      setLocationLoading(false)
    })();
  }

  const updateCurrentLocation = () => {

    setLatitude(currentLatitude);
    setLongitude(currentLongitude);
    setCity(curentCity);

  }

  const getUser = async () => {
    setLoading(true)
    let tok = await AsyncStorage.getItem('token');
    setToken(tok)

    Axios({
      url: `${connectingString}/user/get-user`,
      method: "POST",
      headers: {
        Authorization: tok
      },
      data: {
        get: "latitude longitude city email fullName"
      }
    })
      .then((res) => {
        setLoading(false)
        setName(res.data.user.fullName);
        setLongitude(res.data.user.longitude);
        setLatitude(res.data.user.latitude);
        setEmail(res.data.user.email);
        setCity(res.data.user.city);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        alert('Error Getting Vendor Try Again Later');
      })
  }

  React.useEffect(() => {

    getUser()
    getCurrentLocation()


  }, [])


  const updateProfile = () => {

    setLoading(true);
    seteditable(false);

    Axios({
      url: `${connectingString}/user/update-profile`,
      method: "POST",
      headers: {
        Authorization: token
      },
      data: {
        name,
        city,
        latitude,
        longitude
      }
    })
      .then((res) => {


        setLoading(false)
        AsyncStorage.setItem('profileUpdated', 'true')
        // navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response)
        seteditable(false);
        getUser()
        setLoading(false)
        alert('error occured')
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.LinearBlue1} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 20, left: 15, zIndex: 100 }}>
        <MaterialIcons
          name={'arrow-back'}
          size={28}
          color='#fff'
        />
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
        <View style={styles.upper}>
          <Image
            style={styles.img}
            source={require('../../assets/images/cheaplogo4.png')}
            resizeMode={'contain'}
          />
          <View style={styles.mid}>
            <Animatable.Text animation={'fadeInDown'} style={styles.loginText1}>
              Profile
            </Animatable.Text>
          </View>
        </View>
        {
          locationLoading &&
          <ActivityIndicator
            style={{
              zIndex: 10000,
              flex: 1,
              alignSelf: 'center'
            }} color={Colors.LinearBlue1} />
        }

        {
          loading ? <ActivityIndicator /> :
            <>
              {false ?
                <TextInput
                  //   value={email}
                  //   onChangeText={(text) => setEmail(text)}
                  placeholder='Email address'
                  style={styles.input}
                /> :
                <View style={styles.viewDetail}>
                  <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Email: </Text>
                  <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>{email}</Text>
                </View>
              }

              {editable ?
                <TextInput
                  //   value={email}
                  //   onChangeText={(text) => setEmail(text)}
                  placeholder='Name'
                  style={styles.input}
                  value={name}
                  onChangeText={(e) => { setName(e) }}
                /> :
                <View style={styles.viewDetail}>
                  <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Name: </Text>
                  <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>{name}</Text>
                </View>
              }
              {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}


              {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}
              {/* 
        {editable ?
          <TextInput
            //   value={email}
            //   onChangeText={(text) => setEmail(text)}
            placeholder='Phone number'
            style={styles.input}
          /> :
          <View style={styles.viewDetail}>
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Contact: </Text>
            <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>+923 90078601</Text>
          </View>
        } */}
              {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}


              {editable ?
                <TextInput
                  //   value={email}
                  //   onChangeText={(text) => setEmail(text)}
                  placeholder='Latitude'
                  value={latitude.toString()}
                  editable={false}
                  style={styles.input}
                /> :
                <View style={styles.viewDetail}>
                  <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>latitude: </Text>
                  <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>{latitude}</Text>
                </View>
              }


              {editable ?
                <TextInput
                  //   value={email}
                  //   onChangeText={(text) => setEmail(text)}
                  placeholder='Longitude'
                  editable={false}
                  value={longitude.toString()}
                  style={styles.input}
                /> :
                <View style={styles.viewDetail}>
                  <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Longitude: </Text>
                  <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>{longitude}</Text>
                </View>
              }


              {editable ?
                <TextInput
                  //   value={email}
                  //   onChangeText={(text) => setEmail(text)}
                  editable={false}
                  placeholder='City'
                  value={city.toString()}
                  style={styles.input}
                /> :
                <View style={styles.viewDetail}>
                  <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>City: </Text>
                  <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>{city}</Text>
                </View>
              }
            </>
        }
        {
          editable &&
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={updateCurrentLocation}
          >
            <Text style={styles.loginTxt}>
              Get Current Location
              </Text>
          </TouchableOpacity>
        }

        <Animatable.View animation={'fadeInDown'}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={
              editable ?
                () => {
                  updateProfile()
                } :
                () => {
                  seteditable(true)
                }
            }
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
                editable ?
                  <Text style={styles.loginTxt}>
                    Update
                </Text>
                  :
                  <Text style={styles.loginTxt}>
                    Edit
                </Text>
              )}
          </TouchableOpacity>
        </Animatable.View>


        {
          editable &&
          <TouchableOpacity
            style={[styles.btnLogin, { marginBottom: 20 }]}
            onPress={() => {
              seteditable(false);
              getUser()
            }}
          >
            <Text style={styles.loginTxt}>
              Cancel
              </Text>
          </TouchableOpacity>

        }


      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  viewDetail: {
    flexDirection: 'row', width: '80%', alignSelf: "center", marginTop: 30,
    alignItems: "flex-end"
  },
  errTxt: {
    fontSize: 12,
    color: 'red',
    width: '80%',
    alignSelf: 'center',
    marginTop: 3,
  },
  loginText1: {
    fontSize: 28,
    color: 'rgba(36, 142, 255, 1)',
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  upper: {
    backgroundColor: 'rgba(36, 142, 255, 1)',
    width: '100%',
    overflow: 'visible',
  },
  img: {
    alignSelf: 'center',
    marginVertical: 35,
    marginTop: 45,
    width: 150,
    height: 60,
  },
  mid: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
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
  input: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 55,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    // textAlign: isRTL ? 'right' : 'left',
  },
});




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
//   Dimensions,
//   ActivityIndicator,
//   StatusBar
// } from 'react-native';
// import { Colors } from '../../constants/theme'
// import * as Animatable from 'react-native-animatable';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// const imgLogo = require('../../assets/images/cheaplogo4.png')

// const WidthDevice = Dimensions.get('window').width;
// const HeightDevice = Dimensions.get('window').height;

// const Profile = ({ navigation }) => {
//   const [editable, seteditable] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [editPass, setEditPass] = useState(false)

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={Colors.LinearBlue1} />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.upper}>
//           <Image
//             style={styles.img}
//             source={imgLogo}
//             resizeMode={'contain'}
//           />
//           <View style={styles.mid}>
//             <Animatable.Text animation={'fadeInDown'} style={styles.loginText1}>
//               Profile
//             </Animatable.Text>
//           </View>
//         </View>

//         {editable ?
//           <TextInput
//             //   value={email}
//             //   onChangeText={(text) => setEmail(text)}
//             placeholder='Name'
//             style={styles.input}
//           /> :
//           <View style={styles.viewDetail}>
//             <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Name: </Text>
//             <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>user123</Text>
//           </View>
//         }
//         {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

//         {editable ?
//           null
//           :
//           <View style={styles.viewDetail}>
//             <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Email: </Text>
//             <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>user123@gmail.com</Text>
//           </View>
//         }
//         {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

//         {editable ?
//           <TextInput
//             //   value={email}
//             //   onChangeText={(text) => setEmail(text)}
//             placeholder='Phone number'
//             style={styles.input}
//           /> :
//           <View style={styles.viewDetail}>
//             <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Contact: </Text>
//             <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>+923 90078601</Text>
//           </View>
//         }
//         {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

//         {editPass ?
//           null :
//           editable ?
//             <Animatable.View animation={'fadeInDown'} style={styles.viewChangePass}>
//               <Text style={{ color: "rgba(0,0,0,0.4)" }}>Change Password</Text>
//               <TouchableOpacity onPress={() => setEditPass(!editPass)} style={styles.btnEdit}>
//                 <MaterialIcons name="edit" color="#fff" size={18} />
//               </TouchableOpacity>
//             </Animatable.View> : null
//         }
//         {
//           editPass ?
//             <Animatable.View animation={'fadeInDown'}>
//               <TextInput
//                 //   value={email}
//                 //   onChangeText={(text) => setEmail(text)}
//                 placeholder='Old password'
//                 style={styles.input}
//               />
//               <TextInput
//                 //   value={email}
//                 //   onChangeText={(text) => setEmail(text)}
//                 placeholder='New password'
//                 secureTextEntry={true}
//                 style={styles.input}
//               />
//               <TextInput
//                 //   value={email}
//                 //   onChangeText={(text) => setEmail(text)}
//                 placeholder='Confirm password'
//                 secureTextEntry={true}
//                 style={styles.input}
//               />
//               <TouchableOpacity onPress={() => setEditPass(!editPass)} style={styles.btnDone}>
//                 <Text style={{ color: "#fff" }}>Done</Text>
//               </TouchableOpacity>
//             </Animatable.View>
//             : null
//         }


//         <Animatable.View animation={'fadeInDown'}>
//           <TouchableOpacity
//             style={styles.btnLogin}
//             onPress={() => seteditable(!editable)}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//                 editable ?
//                   <Text style={styles.loginTxt}>
//                     Update
//                 </Text>
//                   :
//                   <Text style={styles.loginTxt}>
//                     Edit
//                 </Text>
//               )}
//           </TouchableOpacity>
//         </Animatable.View>

//       </ScrollView>
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // paddingHorizontal: 20,
//   },
//   btnEdit: {
//     width: 30, height: 30, borderRadius: 20, backgroundColor: Colors.LinearBlue1,
//     justifyContent: "center", alignItems: "center"
//   },
//   btnDone: {
//     height: 40, borderRadius: 20, backgroundColor: Colors.LinearBlue1,
//     justifyContent: "center", alignItems: "center", alignSelf: "center",
//     paddingHorizontal: 20, marginTop: 20
//   },
//   viewChangePass: {
//     flexDirection: "row", width: WidthDevice * 0.8, alignSelf: "center", height: 50,
//     marginTop: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)', borderRadius: 10,
//     alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15
//   },
//   viewDetail: {
//     flexDirection: 'row', width: '80%', alignSelf: "center", marginTop: 30,
//     alignItems: "flex-end"
//   },
//   errTxt: {
//     fontSize: 12,
//     color: 'red',
//     width: '80%',
//     alignSelf: 'center',
//     marginTop: 3,
//   },
//   loginText1: {
//     fontSize: 28,
//     color: 'rgba(36, 142, 255, 1)',
//     fontWeight: 'bold',
//     marginVertical: 25,
//     alignSelf: 'center',
//   },
//   upper: {
//     backgroundColor: 'rgba(36, 142, 255, 1)',
//     width: '100%',
//     overflow: 'visible',
//   },
//   img: {
//     alignSelf: 'center',
//     marginVertical: 35,
//     marginTop: 45,
//     width: 150,
//     height: 60,
//   },
//   mid: {
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     backgroundColor: 'white',
//   },
//   btnLogin: {
//     width: '80%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 15,
//     backgroundColor: 'rgba(36, 142, 255, 1)',
//     marginVertical: 25,
//     borderRadius: 10,
//   },
//   loginTxt: {
//     color: '#fff',
//     fontSize: 16,
//     borderColor: 'grey',
//   },
//   input: {
//     width: '80%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     height: 55,
//     paddingVertical: 0,
//     paddingHorizontal: 15,
//     marginTop: 10,
//     borderRadius: 10,
//     borderColor: '#DCDCDC',
//     borderWidth: 1,
//     // textAlign: isRTL ? 'right' : 'left',
//   },
// });
