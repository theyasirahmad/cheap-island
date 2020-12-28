import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native';
import GlobalHeader from '../../Components/GlobalHeader';
import { Colors } from '../../constants/theme';

const DetailDisplay = ({ route, navigation }) => {
  const { img, name, descrption, offerAvail } = route.params;
  console.log('navigationnnnnnnnnn', name, descrption)
  return (
    <View style={styles.container}>
      <GlobalHeader
        backgroundColor="#42B1F8"
        headingText={name}
        headingMargin={1}
        fontSize={18}
        color="#fff"
        arrow={true}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewDetail}>
          <Image
            source={{ uri: img }}
            style={{ width: "100%", height: 200, backgroundColor: "lightblue" }}
          />
          <View style={{ padding: 8 }}>
            {offerAvail !== null && offerAvail !== undefined && offerAvail === true ?
              <TouchableOpacity style={styles.btnAvail}>
                <Text style={{ color: "#fff" }}>Avail offer</Text>
              </TouchableOpacity> : null
            }
            <Text style={{ fontSize: 15, color: "rgba(0,0,0,0.4)", marginTop: 10 }}>
              {descrption}
            </Text>
          </View>
        </View>
      </ScrollView>
      <ImageBackground
        style={styles.bgImg}
        source={require('../../assets/images/inback.png')}
        resizeMode='cover'
      />
    </View>
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
