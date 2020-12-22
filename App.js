import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/src/integration/react';
// import {store, persister} from './src/redux/store';
import RootNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persister}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
    //   </PersistGate>
    // </Provider>
  );
}
