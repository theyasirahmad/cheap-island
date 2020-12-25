import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
// import Color from '../../constants/Color';

const SignupScreen = ({
  navigation
}) => {
  const [radio, setradio] = useState(false);
  console.log(radio);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const [passDontMatchErr, setpassDontMatchErr] = useState(false);

  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    navigation.navigate('BottomTabNav')
  }


  return (
    <View style={styles.container}>
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
          // value={firstName}
        />
        {firstNameErr && (
          <Text style={styles.errTxt}>First name is invalid</Text>
        )}

        <TextInput
          placeholder='Email address'
          name="email"
          style={styles.input}
          // value={email}
        />
        {emailErr && <Text style={styles.errTxt}>Email is invalid</Text>}

        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          // value={password}
        //   onChangeText={(text) => handleOnTextChange('password', text)}
        />
        <TextInput
          placeholder='Confirm Password'
          secureTextEntry={true}
          style={styles.input}
          // value={confirmPassword}
        //   onChangeText={(text) => handleOnTextChange('confirmPassword', text)}
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
        onPress={onSubmit}
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
          >
            <Text style={styles.text4}>
              Already have an account - Login
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
// export default connect(mapStateToProps, {register})(SignupScreen);

const styles = StyleSheet.create({
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
    marginTop:50,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  roleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '76%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  radio2: {
    backgroundColor: 'rgba(36, 142, 255, 1)',
    flex: 1,
    borderRadius: 10,
  },
  radio1: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 2,
    marginTop: 10,
  },
  btnLogin: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(36, 142, 255, 1)',
    marginTop: 30,
    marginBottom:20,
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
    marginBottom:30
  },
});
