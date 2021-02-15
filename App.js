import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/src/integration/react';
import { store, persister } from './src/redux/store';
import RootNavigator from './src/navigation/AppNavigator';
import { Root } from 'native-base';

// import { Platform } from 'react-native';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';


// import connectionString from './src/api/api';
// import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


export default function App() {


  // const registerForPushNotificationsAsync = async () => {

  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // }



  // const _handleNotification = notification => {
  //   // this.setState({ notification: notification });
  //   console.log(notification);
  // };

  // const _handleNotificationResponse = response => {
  //   console.log(response);
  // };

  // React.useEffect(() => {

  //   const saveToken = async () => {

  //     let authToken = await AsyncStorage.getItem('token')

  //     registerForPushNotificationsAsync().then(token => {
  //       console.log(token)
  //       axios({
  //         url: `${connectionString}/user/save-token`,
  //         method: "POST",
  //         headers: {
  //           Authorization: authToken,
  //         },
  //         data: {
  //           token: token
  //         }
  //       })
  //         .then((res) => {
  //           console.log('then')
  //           console.log(res.data.message)
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           console.log('catch')

  //           alert('Internal server error')
  //         })

  //     });

  //   }

  //   saveToken()

  //   Notifications.addNotificationReceivedListener(_handleNotification);

  //   Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);


  // }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer>
          <Root>
            <RootNavigator />
          </Root>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
