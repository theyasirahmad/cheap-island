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
import { Colors } from '../../constants/theme'
import * as Animatable from 'react-native-animatable';

const imgLogo = require('../../assets/images/cheaplogo4.png')

const Profile = ({navigation}) => {
const [editable, seteditable] = useState(false)
const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.LinearBlue1} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.upper}>
          <Image
            style={styles.img}
            source={imgLogo}
            resizeMode={'contain'}
          />
          <View style={styles.mid}>
            <Animatable.Text animation={'fadeInDown'} style={styles.loginText1}>
              Profile
            </Animatable.Text>
          </View>
        </View>

        {editable ?
        <TextInput
        //   value={email}
          //   onChangeText={(text) => setEmail(text)}
          placeholder='Name'
          style={styles.input}
        /> :
        <View style={styles.viewDetail}>
            <Text style={{fontSize:16, color:"rgba(0,0,0,0.5)"}}>Name: </Text>
            <Text style={{fontSize:18, color:"#bbb", marginLeft:5}}>user123</Text>
        </View>
        }
        {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

        {editable ?
        <TextInput
        //   value={email}
          //   onChangeText={(text) => setEmail(text)}
          placeholder='Email address'
          style={styles.input}
        /> :
        <View style={styles.viewDetail}>
            <Text style={{fontSize:16, color:"rgba(0,0,0,0.5)"}}>Email: </Text>
            <Text style={{fontSize:18, color:"#bbb", marginLeft:5}}>user123@gmail.com</Text>
        </View>
        }
        {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

        {editable ?
        <TextInput
        //   value={email}
          //   onChangeText={(text) => setEmail(text)}
          placeholder='Phone number'
          style={styles.input}
        /> :
        <View style={styles.viewDetail}>
            <Text style={{fontSize:16, color:"rgba(0,0,0,0.5)"}}>Contact: </Text>
            <Text style={{fontSize:18, color:"#bbb", marginLeft:5}}>+923 90078601</Text>
        </View>
        }
        {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}


        <Animatable.View animation={'fadeInDown'}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => seteditable(!editable)}
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
  viewDetail:{
    flexDirection:'row', width:'80%', alignSelf:"center", marginTop:30,
    alignItems:"flex-end"
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
    marginVertical: 25,
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
    marginTop:45,
    width: 150,
    height: 60,
  },
  mid: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  btnLogin: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(36, 142, 255, 1)',
    marginTop: 50,
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
