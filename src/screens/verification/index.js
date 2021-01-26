import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { Colors } from '../../constants/theme';
import { CommonActions } from '@react-navigation/native';

import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import connectionString from '../../api/api'


const Verification = ({
  navigation,
}) => {

  const [email, setEmail] = useState('');
  // const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  // const verificationHandle = (e, code) => {
  //   console.log(e);
  //   console.log(code);
  // };

  useEffect(() => {
    const handleBackButtonClick = () => {
      return true;
    };

    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    });

  }, [])

  useEffect(() => {
    const getEmail = async () => {
      const tokenEmail = await AsyncStorage.getItem('email')
      console.log(tokenEmail)
      setEmail(tokenEmail)
    }
    getEmail()
    console.log('email getting success', email)
  }, [])

  const verifyEmail = (code) => {

    console.log('Verify Code')
    setLoading(true)


    Axios({
      url: `${connectionString}/auth/verify-code`,
      method: 'POST',
      data: {
        email:email.toLowerCase(), code
      }
    })
      .then((res) => {
        if (res.data.emailVerified) {
          setLoading(false)
          AsyncStorage.setItem('emailVerified', "true")
          AsyncStorage.removeItem('email')
          navigation.replace('BottomTabNav')
        }
        else {
          alert('Somthing Went Wrong Try Agin Later')
          setLoading(false);
          setError(true)

        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 422) {
          alert('Wrong Code Inserted')
          setError(true)
        }
        else {
          alert('Internal Server Error')
          setError(true)
        }

        console.log(err)
        setLoading(false)

      })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.upper}>
          <Image
            style={styles.img}
            source={require('../../assets/images/cheaplogo4.png')}
            resizeMode={'cover'}
          />
          <View style={styles.mid}>
            <Text style={styles.txtEnterVerf}>
              Email Verification
            </Text>
          </View>
        </View>

        <CodeInput
          keyboardType="numeric"
          codeLength={4}
          className="border-circle"
          compareWithCode="1234"
          autoFocus={false}
          size={50}
          codeInputStyle={{
            fontWeight: 'bold',
            fontSize: 20,
            borderWidth: 3,
            color: Colors.LinearBlue1,
            backgroundColor: '#DCDCDC',
          }}
          onFulfill={(isValid, code) =>
            verifyEmail(code)
          }
        />
        {error ? (
          <Text style={styles.errTxt}>Invalid verification code</Text>
        ) : null}

        {loading && (
          <ActivityIndicator size="large" color={Colors.LinearBlue1} />
        )}

        {/* <TouchableOpacity
          // onPress={resendHandler}
          style={styles.btn}
        >
          <Text style={{ color: Colors.LinearBlue1, fontSize: 18 }}>
            Resend Code
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  upper: {
    backgroundColor: 'rgba(36, 142, 255, 1)',
    width: '100%',
    overflow: 'visible',
  },
  errTxt: {
    fontSize: 12,
    color: 'red',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  txtEnterVerf: {
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 30,
    fontSize: 24,
    color: 'rgba(36, 142, 255, 1)',
    fontWeight: "bold"
  },
  img: {
    alignSelf: 'center',
    marginVertical: 30,
    marginTop: 50,
    width: 150,
    height: 60,
    tintColor: '#fff',
  },
  mid: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    // flexDirection: 'row',
    alignSelf: 'center',
    // width: ,
    marginVertical: 40,
  },
});
