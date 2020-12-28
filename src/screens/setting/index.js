import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import SettingOption from '../../Components/SettingOption';
import Linear from 'expo-linear-gradient';
import { Colors } from '../../constants/theme';

const Setting = () => {
  return <View style={styles.container}>
    <GlobalHeader
      backgroundColor="#42B1F8"
      headingText="SETTINGS"
      headingMargin={1}
      fontSize={18}
      color="#fff"
    />
       <View style={styles.viewTop}>
         <Text style={{ color: '#fff', fontSize: 18 }}>
           Gunnluger Geir Getsson
         </Text>
       </View>
       <View style={styles.viewOptionContainer}>
         <SettingOption optionTxt={'Gas Stations'} baseline={true} />
         <SettingOption optionTxt={'Restaurants'} baseline={true} />
         <SettingOption optionTxt={'Interesting points'} baseline={true} />
         <SettingOption optionTxt={'Others'} baseline={false} />
       </View>
       <TouchableOpacity style={styles.btnLogout}>
         {/* <Linear colors={[Colors.LinearBlue1, Colors.LinearBlue2]} style={styles.linearStyle}> */}
           <Text style={{ color: '#fff', fontSize: 16 }}>Log Out</Text>
         {/* </Linear> */}
      </TouchableOpacity>
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
    justifyContent:"center", alignItems:"center"
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
    marginVertical: 30,
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
