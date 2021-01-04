import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import Color from '../../constants/Color';

const Verification = ({
  navigation,
}) => {
    const [loading, setLoading] = useState(false)
  const [error, setError] = useState([]);
  const verificationHandle = (e, code) => {
    // console.log(e);
    // console.log(code);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.upper}>
          <Image
            style={styles.img}
            source={require('../../assets/images/cheaplogo3.png')}
            resizeMode={'cover'}
          />
          <View style={styles.mid}>
            <Text style={styles.txtEnterVerf}>
              VERIFICATION
            </Text>
          </View>
        </View>

        <CodeInput
          //   ref="codeInputRef2"
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
            color: Color.primaryColor,
            backgroundColor: '#DCDCDC',
          }}
          onFulfill={(isValid, code) => 
            // verificationHandle(isValid, code)
            console.log('On Verify')
        }
          //   onFulfill={(isValid, code) =>
          //     this._onFinishCheckingCode2(isValid, code)
          //   }
        />
        {error ? (
          <Text style={styles.errTxt}>{errors && errors[0]}</Text>
        ) : null}

        {loading && (
          <ActivityIndicator size="large" color={Color.primaryColor} />
        )}

        <TouchableOpacity 
        // onPress={resendHandler}
         style={styles.btn}
         >
          <Text style={{color: Color.primaryColor, fontSize: 18}}>
            Resend Verification Code
          </Text>
        </TouchableOpacity>
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
    marginTop: 100,
    marginBottom: 30,
    fontSize: 24,
    color: 'rgba(36, 142, 255, 1)',
  },
  img: {
    alignSelf: 'center',
    marginVertical: '10%',
    width: 100,
    height: 70,
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
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    marginVertical: 40,
  },
});
