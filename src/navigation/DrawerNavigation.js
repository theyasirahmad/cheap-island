// import * as React from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Home from '../screens/home';
// import Linear from 'react-native-linear-gradient';
// import Color from '../constants/theme';
// // import {bindActionCreators} from 'redux';
// // import {connect} from 'react-redux';
// // import * as authActions from '../redux/actions/authActions';

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = (props) => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(prop) => <DrawerContent {...prop} {...props} />}>
//       <Drawer.Screen name="Home" component={Home} />
//       {/* <Drawer.Screen name="Cart" component={Cart} /> */}
//     </Drawer.Navigator>
//   );
// };

// function DrawerContent(props) {
//   return (
//     <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
//       <View style={{width: '100%', height: 160}}>
//         <Linear
//           useAngle={true}
//           angle={180}
//           colors={[Color.linearColor2, Color.linearColor1]}
//           style={styles.linear}>
//           <View style={styles.viewTopImg}>
//             <Image
//               source={require('../assets/images/MrCoupons.png')}
//               resizeMode="contain"
//               style={{width: 142, height: 36}}
//             />
//           </View>
//           <View style={styles.viewProfileDetail}>
//             <Image
//               source={
//                 {
//                   //   uri: `${props.user?.image}`,
//                 }
//               }
//               style={styles.imgStyle}
//             />
//             <View style={{}}>
//               <Text style={styles.textName}>
//                 Zain hasan
//                 {/* {props.user?.userName} */}
//               </Text>
//               <TouchableOpacity>
//                 <Text style={styles.textEmail}>
//                   View Profile
//                   {/* {props.user?.email} */}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Linear>
//       </View>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <TouchableOpacity
//           //   onPress={() => props.navigation.navigate('Favourite')}
//           style={styles.button}>
//           <FontAwesome5
//             name="home"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           //   onPress={() => props.navigation.navigate('Favourite')}
//           style={styles.button}>
//           <FontAwesome
//             name="heart"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Favourite</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           //   onPress={() => props.navigation.navigate('PastOrders')}
//           style={styles.button}>
//           <FontAwesome5
//             name="question"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Help</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           //   onPress={() => props.navigation.navigate('PastOrders')}
//           style={styles.button}>
//           <FontAwesome5
//             name="info"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Info</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           //   onPress={() => props.navigation.navigate('Setting')}
//           style={styles.button}>
//           <FontAwesome5
//             name="cog"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Settings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           //   onPress={() => props.authActions.logout(props.navigation)}
//           style={[styles.button, {marginTop: 30}]}>
//           <FontAwesome5
//             name="sign-out-alt"
//             size={25}
//             color="#D16EF3"
//             style={styles.icon}
//           />
//           <Text style={styles.textButton}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// // const mapStateToProps = (state) => {
// //   return {
// //     isLoading: state.userReducer.isLoading,
// //     isError: state.userReducer.isError,
// //     errorMessage: state.userReducer.errorMessage,
// //     user: state.authReducer.user,
// //     online: state.userReducer.online,
// //     random: Math.random(),
// //   };
// // };

// // const mapDispatchToProps = (dispatch) => ({
// //   authActions: bindActionCreators(authActions, dispatch),
// // });

// // export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

// export default DrawerNavigator;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   icon: {
//     width: 40,
//     // backgroundColor: 'red',
//   },
//   viewProfileDetail: {
//     flexDirection: 'row',
//     marginHorizontal: 20,
//     marginVertical: 25,
//   },
//   viewTopImg: {
//     width: '100%',
//     paddingVertical: 10,
//     borderBottomColor: 'rgba(255, 255, 255, 0.5)',
//     borderBottomWidth: 1,
//     paddingHorizontal: 20,
//   },
//   imgStyle: {
//     width: 55,
//     height: 55,
//     borderRadius: 50,
//     backgroundColor: 'grey',
//     marginRight: 10,
//   },
//   textButton: {
//     fontFamily: 'Poppins-SemiBold',
//     color: '#222222',
//     // marginLeft: 15,
//   },
//   button: {
//     height: 60,
//     alignItems: 'center',
//     paddingLeft: 30,
//     backgroundColor: '#fff',
//     borderBottomColor: 'rgba(112, 112, 112, 0.3)',
//     borderBottomWidth: 1,
//     flexDirection: 'row',
//   },
//   textEmail: {
//     color: '#fff',
//     opacity: 0.5,
//     fontFamily: 'Poppins-Medium',
//   },
//   linear: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   textName: {
//     color: '#fff',
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//   },
// });
