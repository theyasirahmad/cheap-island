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
import { Colors } from '../../constants/theme'
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const imgLogo = require('../../assets/images/cheaplogo4.png')

const WidthDevice = Dimensions.get('window').width;
const HeightDevice = Dimensions.get('window').height;

const Profile = ({ navigation }) => {
  const [editable, seteditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editPass, setEditPass] = useState(false)

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
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Name: </Text>
            <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>user123</Text>
          </View>
        }
        {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

        {editable ?
          null
          :
          <View style={styles.viewDetail}>
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Email: </Text>
            <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>user123@gmail.com</Text>
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
            <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.5)" }}>Contact: </Text>
            <Text style={{ fontSize: 18, color: "#bbb", marginLeft: 5 }}>+923 90078601</Text>
          </View>
        }
        {/* {emailErr && <Text style={styles.errTxt}>Invalid email</Text>} */}

        {editPass ?
          null :
          editable ?
            <Animatable.View animation={'fadeInDown'} style={styles.viewChangePass}>
              <Text style={{ color: "rgba(0,0,0,0.4)" }}>Change Password</Text>
              <TouchableOpacity onPress={() => setEditPass(!editPass)} style={styles.btnEdit}>
                <MaterialIcons name="edit" color="#fff" size={18} />
              </TouchableOpacity>
            </Animatable.View> : null
        }
        {
          editPass ?
            <Animatable.View animation={'fadeInDown'}>
              <TextInput
                //   value={email}
                //   onChangeText={(text) => setEmail(text)}
                placeholder='Old password'
                style={styles.input}
              />
              <TextInput
                //   value={email}
                //   onChangeText={(text) => setEmail(text)}
                placeholder='New password'
                secureTextEntry={true}
                style={styles.input}
              />
              <TextInput
                //   value={email}
                //   onChangeText={(text) => setEmail(text)}
                placeholder='Confirm password'
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setEditPass(!editPass)} style={styles.btnDone}>
                <Text style={{ color: "#fff" }}>Done</Text>
              </TouchableOpacity>
            </Animatable.View>
            : null
        }


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
  btnEdit: {
    width: 30, height: 30, borderRadius: 20, backgroundColor: Colors.LinearBlue1,
    justifyContent: "center", alignItems: "center"
  },
  btnDone: {
    height: 40, borderRadius: 20, backgroundColor: Colors.LinearBlue1,
    justifyContent: "center", alignItems: "center", alignSelf: "center",
    paddingHorizontal: 20, marginTop: 20
  },
  viewChangePass: {
    flexDirection: "row", width: WidthDevice * 0.8, alignSelf: "center", height: 50,
    marginTop: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)', borderRadius: 10,
    alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15
  },
  viewDetail: {
    flexDirection: 'row', width: '80%', alignSelf: "center", marginTop: 30,
    alignItems: "flex-end"
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
    marginTop: 45,
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
    marginVertical: 25,
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
