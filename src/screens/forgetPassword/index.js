import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, ActivityIndicator, StatusBar, TouchableOpacity, TextInput, Text } from 'react-native';
import { Colors } from '../../constants/theme'
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AsyncStorage from '@react-native-community/async-storage'
import connectionString from '../../api/api'
import axios from 'axios';

const imgLogo = require('../../assets/images/cheaplogo4.png')

const ForgetPassword = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('');

    const [code, setCode] = useState('')
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const [emailErr, setemailErr] = useState(false);
    // const [passwordErr, setpasswordErr] = useState(false);
    // const [passDontMatchErr, setpassDontMatchErr] = useState(false);


    const [recoveryCode, setRecoveryCode] = useState('');


    const [screenState, setScreenState] = useState(0);



    const RequestCode = () => {

        setLoading(true)
        if (email !== '') {

            axios({
                url: `${connectionString}/auth/send-code`,
                method: "POST",
                data: {
                    email: email.toLowerCase()
                }
            })
                .then((res) => {
                    if (res.data.message === "No User Found") {
                        alert('no user found for this email')
                        setLoading(false)

                    }
                    else {
                        setScreenState(1)
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    alert('Internal server error')
                })
        }
        else {
            alert('email required');
        }

    }
    const SubmitCode = () => {
        setLoading(true)
        if (email !== '' && code !== '') {

            axios({
                url: `${connectionString}/auth/verify-code`,
                method: "POST",
                data: {
                    email: email.toLowerCase(),
                    code,
                }
            })
                .then((res) => {

                    console.log(res.data)
                    setRecoveryCode(res.data.recoveryToken)
                    setScreenState(2);
                    setLoading(false)

                })
                .catch((err) => {
                    // console.log(err.response.status)
                    if (err.response.status === 422) {
                        setLoading(false)

                        alert('Recovery Code Incorrect')
                    }
                    else {
                        setLoading(false)
                        alert('Internal Server Error')
                    }
                })
        }
        else {
            setLoading(false)
            alert('recovery code required');
        }

    }
    const changePassword = () => {
        setLoading(true)

        if (password !== '' && (password === confirmPassword)) {


            console.log(email)
            console.log(recoveryCode)
            console.log(confirmPassword)
            console.log(password)


            axios({
                url: `${connectionString}/auth/change-password`,
                method: "POST",
                data: {
                    email: email.toLowerCase(),
                    recoveryToken: recoveryCode,
                    confirmPassword,
                    newPassword: password
                }
            })
                .then((res) => {

                    alert('Password Change Successfully');
                    navigation.navigate('Login')

                })
                .catch((err) => {

                    if (err.response.status === 422) {
                        setLoading(false)
                        alert(err.response.data.message)

                    }
                    else if (err.response.status === 401) {
                        setLoading(false)
                        alert('Vendor Not Found')

                    }
                    else {
                        setLoading(false)
                        alert('Internal Server Error')
                    }
                })
        }
        else {
            setLoading(false)
            alert("Password didn't match ");
        }

    }


    const renderRequestCode = () => {
        return (
            <>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    onChangeText={(e) => { setEmail(e) }}
                />

                <TouchableOpacity onPress={RequestCode} style={styles.btnLogin}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                            <Text style={styles.loginTxt}>
                                Request code
                            </Text>
                        )}
                </TouchableOpacity>
            </>

        )

    }

    const renderEnterCode = () => {
        return (
            <>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    editable={false}
                />
                <TextInput
                    placeholder='Input code'
                    keyboardType={'numeric'}

                    style={styles.input}
                    value={code}
                    onChangeText={(text) => setCode(text)}
                />
                <TouchableOpacity onPress={SubmitCode} style={styles.btnLogin}>
                    {
                        loading ?
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={styles.loginTxt}>
                                Submit
                   </Text>
                    }
                </TouchableOpacity>
            </>
        )
    }


    const renderChangePassword = () => {
        return (
            <>

                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    editable={false}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setpassword(text)}
                />
                <TextInput
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity
                    onPress={changePassword}
                    style={styles.btnLogin}>
                    {
                        loading ?
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={styles.loginTxt}>
                                Confirm
                         </Text>
                    }
                </TouchableOpacity>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.LinearBlue1} />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 20, left: 15, zIndex: 100 }}>
                <MaterialIcons
                    name={'arrow-back'}
                    size={28}
                    color='#fff'
                />
            </TouchableOpacity>
            <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                <View style={styles.upper}>
                    <Image
                        style={styles.img}
                        source={imgLogo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.mid}>
                        <Animatable.Text animation={'fadeInDown'} style={styles.txtSignup}>
                            FORGOT PASSWORD
                    </Animatable.Text>
                    </View>
                </View>
                {
                    screenState === 0 ?

                        renderRequestCode()
                        :
                        screenState === 1 ?

                            renderEnterCode()
                            :
                            renderChangePassword()

                }
            </ScrollView>
        </View>
    )
}
export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bbb",
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
        fontSize: 24,
        color: 'rgba(36, 142, 255, 1)',
        fontWeight: 'bold',
        marginVertical: 14,
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
    btnLogin: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: 'rgba(36, 142, 255, 1)',
        marginTop: 30,
        // marginBottom: 20,
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
        marginBottom: 30
    },
});



// <TextInput
// placeholder='Email'
// style={styles.input}
// value={email}
// />
// {btnRequestCode ?
// <TouchableOpacity onPress={ReqCode} style={styles.btnLogin}>
//     {loading ? (
//         <ActivityIndicator size="large" color="#fff" />
//     ) : (
//             <Text style={styles.loginTxt}>
//                 Request code
//             </Text>
//         )}
// </TouchableOpacity> : null
// }
// {
// btnRequestCode ? null :
//     <TextInput
//         placeholder='Input code'
//         style={styles.input}
//         value={code}
//         onChangeText={(text) => setCode(text)}
//     />
// }
// {
// btnRequestSubmitCode ? null :
//     code == '' ? null :
//         <TouchableOpacity onPress={SubmitCode} style={styles.btnLogin}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#fff" />
//             ) : (
//                     <Text style={styles.loginTxt}>
//                         Submit
//                     </Text>
//                 )}
//         </TouchableOpacity>
// }
// {
// btnRequestSubmitCode ?
//     <>
//         <TextInput
//             placeholder='Password'
//             secureTextEntry={true}
//             style={styles.input}
//             value={password}
//             onChangeText={(text) => setpassword(text)}
//         />
//         <TextInput
//             placeholder='Confirm Password'
//             secureTextEntry={true}
//             style={styles.input}
//             value={confirmPassword}
//             onChangeText={(text) => setConfirmPassword(text)}
//         />
//         <TouchableOpacity
//             // onPress={
//             //     // onSubmit
//             // }
//             style={styles.btnLogin}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#fff" />
//             ) : (
//                     <Text style={styles.loginTxt}>
//                         Confirm
//                     </Text>
//                 )}
//         </TouchableOpacity>
//     </> : null
// }