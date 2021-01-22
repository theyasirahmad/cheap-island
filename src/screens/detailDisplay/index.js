import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import connectionString from '../../api/api';
import GlobalHeader from '../../Components/GlobalHeader';
import { Colors } from '../../constants/theme';

const DetailDisplay = ({ route, navigation }) => {
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
    products
  } = route.params;
  // console.log('navigationnnnnnnnnn', name, descrption)

  const [timesUsed, setTimesUsed] = useState(0)
  const [userId, setUserId] = useState(null)

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
    getUserId()
  }, [])


  const availOffer = async () => {

    let token = await AsyncStorage.getItem('token');
    // console.log(token);
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
        if (res.data.message === "Offer Availed") {
          alert("Offer Availed")
          setTimesUsed(timesUsed + 1)
        }
        else{
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Internal Server Error')
      })
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewDetail}>
          <Image
            source={{
              uri:
                // img
                connectionString + "/" + img
            }}
            style={{ width: "100%", height: 200, backgroundColor: "transparent" }}
          />
          <View style={{ padding: 8 }}>
            {offerAvail !== null && offerAvail !== undefined && offerAvail === true ?
              <TouchableOpacity
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
                <Image
                  source={{
                    uri:
                      connectionString + "/" + itemData.item
                  }}
                  resizeMode={"contain"}
                  style={{
                    width: Dimensions.get('window').width * .9 - 16,
                    height: Dimensions.get('window').width * .9 - 16,
                    backgroundColor: "transparent"
                  }}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <ImageBackground
        style={styles.bgImg}
        source={require('../../assets/images/inback.png')}
        resizeMode='cover'
      />
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
