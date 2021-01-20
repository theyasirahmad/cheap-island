import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import SettingOption from '../../Components/SettingOption';
import AntDesign from 'react-native-vector-icons/AntDesign'
// import Linear from 'expo-linear-gradient';
import { Colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage'

const WidthDevice = Dimensions.get('window').width;
const HeightDevice = Dimensions.get('window').height;

const Setting = ({ navigation }) => {
  return <View style={styles.container}>
    <GlobalHeader
      backgroundColor="#42B1F8"
      headingText="SETTINGS"
      headingMargin={1}
      fontSize={18}
      color="#fff"
      arrow={true}
      BackIconColor='#fff'
      navigation={navigation}
    />
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.navigate('TermsConditions')} style={styles.btnAboutus}>
        <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 15 }}>About Us</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={[styles.btnAboutus,{marginTop:10}]}>
        <Text style={{color:'rgba(0,0,0,0.5)', fontSize:15}}>Profile</Text>
        <AntDesign name="doubleright" color="rgba(0,0,0,0.3)" size={20} />
      </TouchableOpacity> */}
      <View style={styles.viewOptionContainer}>
        <SettingOption optionTxt={'Notifications'} baseline={true} />
        <SettingOption optionTxt={'Location'} baseline={false} />
      </View>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.clear();
          navigation.navigate("Login")
        }}
        style={styles.btnLogout}>
        {/* <Linear colors={[Colors.LinearBlue1, Colors.LinearBlue2]} style={styles.linearStyle}> */}
        <Text style={{ color: '#fff', fontSize: 16 }}>Log Out</Text>
        {/* </Linear> */}
      </TouchableOpacity>
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
    // f7faff background
    //#fafbfe card background
    // #ebeff6 card border
    // #8595ad card text
    // Gradient #6399ff #8371ff
    // #6194ff selective text
    // #bfd9ff setting name card
    // #24eff #f64fff button gradient
  },
  btnAboutus: {
    width: WidthDevice * 0.9,
    alignSelf: "center",
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 20, flexDirection: "row", justifyContent: "space-between",
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
    justifyContent: "center", alignItems: "center"
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
  },
});

{/* <View style={styles.viewOptionContainer}>
  <SettingOption optionTxt={'Gas Stations'} baseline={true} />
  <SettingOption optionTxt={'Restaurants'} baseline={true} />
  <SettingOption optionTxt={'Interesting points'} baseline={true} />
  <SettingOption optionTxt={'Others'} baseline={false} />
</View> */}