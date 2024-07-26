/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import messaging from '@react-native-firebase/messaging';
import React, {useCallback, useEffect, useRef} from 'react';
import {AppState, LogBox, View, Text, TextInput} from 'react-native';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Loader, NoInternet} from '../components';
import AppNavigation from '../navigation/AppNavigation';
import {persistor, store} from '../redux/store';
import {ApplicationStyles} from '../theme';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
PushNotification.configure({
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'melbeez-channel', // required
    channelName: 'melbeez-channel', // required
    channelDescription: 'A channel to display notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log('createChannel returned ', created),
);

// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const App = () => {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = useCallback(nextAppState => {
    if (nextAppState === 'active') {
    }
    if (appState.current.match(/background/) && nextAppState === 'active') {
    }
    appState.current = nextAppState;
  }, []);
  useEffect(() => {
    SplashScreen.hide();
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription?.remove();
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in background ', remoteMessage);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      displayLocalNotification(remoteMessage?.data);
    });
    return unsubscribe;
  }, []);
  // Display Push notification as local notification when App is open
  const displayLocalNotification = data => {
    try {
      PushNotification.localNotification({
        channelId: 'melbeez-channel',
        title: data?.title,
        message: data?.body,
        bigPictureUrl: data?.android?.imageUrl,
        smallIcon: data?.android?.imageUrl,
        //channelId: true,
        vibrate: true,
      });
    } catch (error) {
      // console.log(JSON.stringify(error));
    }
  };
  return (
    <View style={[ApplicationStyles.screen.mainContainer]}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
          <Loader />
          <NoInternet />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;
