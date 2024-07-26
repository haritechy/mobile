import {Platform, PermissionsAndroid, Alert, Dimensions} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Strings} from '../constants';
export const cameraAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: Strings.cameraPermission,
          message: Strings.appNeedCameraPermission,
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      Alert.alert(Strings.appNeedCameraPermission, error);
      return false;
    }
  } else {
    return true;
  }
};

export const storageAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: Strings.externalStoragePermission,
          message: Strings.appNeedStoragePermission,
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      Alert.alert(Strings.appNeedStoragePermission, error);
    }
    return false;
  } else {
    return true;
  }
};

export const imageSelection = (isCamera, options = {}) => {
  let imageProps = {
    mediaType: 'photo',
    ...options,
  };
  if (isCamera) {
    return new Promise((resolve, reject) => {
      launchCamera(imageProps)
        .then(image => resolve(image))
        .catch(err => reject(err.message));
    });
  } else {
    return new Promise((resolve, reject) => {
      launchImageLibrary(imageProps)
        .then(image => resolve(image))
        .catch(err => reject(err.message));
    });
  }
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  console.log('fcmToken ', fcmToken);
  if (fcmToken) {
    return fcmToken;
  } else {
    return '';
  }
};

export const requestFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return getFcmToken();
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};
export const isIpadOrTablet = () => {
  if (Platform.OS === 'ios') {
    // Check for iPad using the userInterfaceIdiom property
    return Platform.isPad;
  } else if (Platform.OS === 'android') {
    // Check for tablet using the dimensions of the device screen
    const {width, height} = Dimensions.get('window');
    const aspectRatio = width / height;

    // Typical aspect ratio for tablets is 4:3 or 3:4
    return aspectRatio <= 1.33 || aspectRatio >= 0.75;
  }

  return false;
};
