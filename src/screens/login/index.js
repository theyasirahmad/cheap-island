import React, { useState, useEffect } from 'react';
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
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../constants/theme'

import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import connectionString from '../../api/api'

const LoginScreen = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false)

  const [emailErr, setemailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);

  // useEffect(() => {
  //   checkAuthLocal()
  // }, [])

  // const checkAuthLocal = async () => {
  //   AsyncStorage.getItem('isAuth', jsonValue)
  //   jsonValue ?
  //   navigation.navigate('BottomTabNav') : 
  //   null
  // }


  const loginHandler = () => {
    //   setLoading(true);
    if (email == '' || email == ' ') {
      setemailErr(true);
    } else {
      setemailErr(false);
    }
    if (password == '' || password == ' ') {
      setpasswordErr(true);
    } else {
      setpasswordErr(false);
    }
    if (emailErr == false && passwordErr == false) {

      // alert('Logged Function triggering')
      setLoading(true)
      // console.log('Connecting STringgggggggggggggggggg',connectionString)

      Axios({
        url: `${connectionString}/auth/login`,
        method: 'POST',
        data: {
          email, password
        }
      })
        .then((res) => {
          // console.log('resssss', res.data.token)
          // const jsonValue = JSON.stringify(true)
          AsyncStorage.setItem('token', res.data.token)

          setLoading(true)
          // navigation.navigate('BottomTabNav')
          // console.log('Done loginnnnnnnn')
          setEmail('')
          setpassword('')
          setLoading(false);
          navigation.navigate('BottomTabNav')
        })
        .catch((err) => {
          setLoading(false)
          alert(err)
        })
    }
    // setLoading(false);
    // navigation.navigate('BottomTabNav')
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.LinearBlue1} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.upper}>
          <Image
            style={styles.img}
            source={require('../../assets/images/cheaplogo4.png')}
            resizeMode={'contain'}
          />
          <View style={styles.mid}>
            <Animatable.Text animation={'fadeInDown'} style={styles.loginText1}>
              LOGIN
            </Animatable.Text>
          </View>
        </View>

        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder='Email address'
          style={styles.input}
        />
        {emailErr && <Text style={styles.errTxt}>Invalid email</Text>}

        <TextInput
          value={password}
          onChangeText={(text) => setpassword(text)}
          secureTextEntry={true}
          placeholder='Password'
          style={styles.input}
        />
        {passwordErr && (
          <Text style={styles.errTxt}>
            Something went wrong
          </Text>
        )}

        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('ForgetPasswordVerification');
          }}>
          <Text style={styles.text2}>
            Forget password?
          </Text>
        </TouchableOpacity>
        <Animatable.View animation={'fadeInDown'}>
          <TouchableOpacity style={styles.btnLogin}
            onPress={loginHandler}
            // onPress={() => navigation.navigate('Profile')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.loginTxt}>
                  Login
                </Text>
              )}
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation={'fadeInDown'} style={styles.bot}>
          <Text style={styles.text3}>
            Dont have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text style={styles.text4}>
              Join us now
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  txtLoginWithGoogle: {
    color: '#222222',
    fontSize: 12,
    marginLeft: 10,
  },
  btnStyle2: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 54,
    borderRadius: 27,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
    marginVertical: 20,
    alignSelf: 'center',
  },
  upper: {
    backgroundColor: 'rgba(36, 142, 255, 1)',
    width: '100%',
    overflow: 'visible',
  },
  img: {
    alignSelf: 'center',
    marginVertical: 40,
    marginTop: 55,
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

  text2: {
    fontSize: 13,
    color: 'rgba(36, 142, 255, 1)',
    marginTop: 10,
    marginHorizontal: '10%',
  },
  text3: {
    fontSize: 15,
    color: '#ABB8C3',
    alignSelf: 'center',
  },
  text4: {
    fontSize: 15,
    color: 'rgba(36, 142, 255, 1)',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
