import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../constants/theme'

import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import connectionString from '../../api/api'


const SignupScreen = ({
  navigation
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const [passDontMatchErr, setpassDontMatchErr] = useState(false);

  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    // navigation.navigate('BottomTabNav')
    if (username == '' || username == ' ') {
      setUsernameErr(true)
    } else {
      setUsernameErr(false)
    }
    if (email == '' || email == ' ') {
      setemailErr(true);
    } else {
      setemailErr(false);
    }
    if (password == '' || password == ' ' || confirmPassword == '' || confirmPassword == ' ') {
      setpasswordErr(true);
    } else {
      setpasswordErr(false);
    }
    if (password !== confirmPassword) {
      passDontMatchErr(true)
    } else {
      passDontMatchErr(false)
    }

    if (usernameErr == false && emailErr == false && passwordErr == false && passDontMatchErr == false) {
      setLoading(true)

      Axios({
        url: `${connectionString}/auth/signup`,
        method: 'POST',
        data: {
          username, email, password
        }
      })
        .then((res) => {
          console.log('resssssponseee', res.data)
          console.log(res.data)
          AsyncStorage.setItem('token', res.data.token)

          setLoading(false)
          // navigation.navigate('BottomTabNav')
          console.log('Done registering')
          setEmail('')
          setpassword('')
          navigation.navigate('BottomTabNav')
        })
        .catch((err) => {
          setLoading(false)
          alert("Some error occured while Registering user")
        })
      setLoading(false);
    }
  }


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
            <Animatable.Text animation={'fadeInDown'} style={styles.txtSignup}>
              SIGN UP
            </Animatable.Text>
          </View>
        </View>
        <TextInput
          placeholder='User name'
          name="username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername('username', text)}
        />
        {usernameErr && (
          <Text style={styles.errTxt}>First name is invalid</Text>
        )}

        <TextInput
          placeholder='Email address'
          name="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail('email', text)}
        />
        {emailErr && <Text style={styles.errTxt}>Email is invalid</Text>}

        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => setpassword('password', text)}
        />
        <TextInput
          placeholder='Confirm Password'
          secureTextEntry={true}
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword('confirmPassword', text)}
        />
        {passwordErr && (
          <Text style={styles.errTxt}>
            Something went wrong
          </Text>
        )}
        {passDontMatchErr && (
          <Text style={styles.errTxt}>Password does not match</Text>
        )}

        <TouchableOpacity
          // onPress={onSubmit}
          onPress={()=> navigation.navigate('BottomTabNav')}
          style={styles.btnLogin}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
              <Text style={styles.loginTxt}>
                Sign up
              </Text>
            )}
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{ flexDirection:"row", alignSelf:"center"}}
        >
          <Text style={styles.text3}>
          Already have an account -
          </Text>
          <Text style={styles.text4}>
            Login
          </Text>
        </TouchableOpacity>

        <View  style={styles.bot}>
          <Text style={styles.text3}>
            Agree to our
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TermsConditions');
            }}
          >
            <Text style={styles.text4}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  bot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:20
  },
  text3: {
    fontSize: 15,
    color: '#ABB8C3',
    alignSelf: 'center',
  },
  upper: {
    backgroundColor: 'rgba(36, 142, 255, 1)',
    width: '100%',
    overflow: 'visible',
  },
  viewDatepicker: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 0,
    backgroundColor: '#fff',
    height: 50,
  },
  errTxt: {
    fontSize: 12,
    color: 'red',
    width: '80%',
    alignSelf: 'center',
    marginTop: 3,
  },
  img: {
    alignSelf: 'center',
    marginVertical: 35,
    marginTop: 50,
    width: 150,
    height: 60,
  },
  mid: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
  },
  txtSignup: {
    fontSize: 28,
    color: 'rgba(36, 142, 255, 1)',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  roleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '76%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnLogin: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(36, 142, 255, 1)',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  txtLogin: {
    color: 'black',
    fontSize: 23,
    alignSelf: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  text4: {
    fontSize: 15,
    color: 'rgba(36, 142, 255, 1)',
    alignSelf: 'center',
    marginHorizontal: 5,
    // marginBottom: 30
  },
});
