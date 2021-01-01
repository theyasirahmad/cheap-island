import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import SettingOption from '../../Components/SettingOption';
import AntDesign from 'react-native-vector-icons/AntDesign'
// import Linear from 'expo-linear-gradient';
import { Colors } from '../../constants/theme';

const WidthDevice = Dimensions.get('window').width;
const HeightDevice = Dimensions.get('window').height;

const Setting = ({navigation}) => {
  return <View style={styles.container}>
    <GlobalHeader
      backgroundColor="#42B1F8"
      headingText="MORE"
      headingMargin={1}
      fontSize={18}
      color="#fff"
    />
    <View style={styles.viewTop}>
      <Text style={{ color: '#fff', fontSize: 18 }}>
        Gunnluger Geir Getsson
      </Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={styles.btnAboutus}>
        <Text style={{color:'rgba(0,0,0,0.5)', fontSize:15}}>Profile</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Offers')} style={[styles.btnAboutus,{marginTop:10}]}>
        <Text style={{color:'rgba(0,0,0,0.5)', fontSize:15}}>Used Offers</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Restaurants')} style={[styles.btnAboutus,{marginTop:10}]}>
        <Text style={{color:'rgba(0,0,0,0.5)', fontSize:15}}>Favourite Restaurants</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Settings')} style={[styles.btnAboutus,{marginTop:10}]}>
        <Text style={{color:'rgba(0,0,0,0.5)', fontSize:15}}>Settings</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity>
      
      {/* <TouchableOpacity style={styles.btnLogout}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Log Out</Text>
      </TouchableOpacity> */}
    </ScrollView>
    <ImageBackground
      style={{ width: 100, height: 130, position: "absolute", alignSelf: "center", bottom: 10, zIndex: -1000000 }}
      source={require('../../assets/images/inback.png')}
      resizeMode="cover"
    />
  </View>
}
export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlueColor,
  },
  btnAboutus: {
    width: WidthDevice * 0.9,
    alignSelf: "center",
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 20, flexDirection: "row", justifyContent:"space-between",
    alignItems: "center", paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.borderCardColor,
  },
  linearStyle: {
    flex: 1, width: "100%", justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogout: {
    width: 150,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.LinearBlue1,
    justifyContent: "center", alignItems: "center",
    marginTop:25
  },
  viewTop: {
    width: '99.5%',
    alignSelf: "center",
    alignContent: "center",
    height: 55,
    backgroundColor: "#bfd9ff",
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOptionContainer: {
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 20,

    borderWidth: 1,
    borderColor: Colors.borderCardColor,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.41,
    // shadowRadius: 9.11,

    // elevation: 14,
  },
});
