import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SecureAuthentication from 'react-native-secure-authentication';
import VersionCheck from 'react-native-version-check';
import {useDispatch, useSelector} from 'react-redux';
import {AppUpdate, connectionRef} from '../components';
import {AppConstants} from '../constants';
import {setUpdateApp} from '../redux/actions/settingActions';
import {clearAll} from '../redux/actions/userActions';
import {Colors} from '../theme';
import {getSemanticVersion} from '../utils/helper';
import {navigationRef} from './services/navigationServices';
import {AuthStackScreens} from './stacks/AuthStack';
import {MainAppScreens} from './stacks/MainStack';

const PrimaryNav = () => {
  const {userInfo} = useSelector(state => state.userReducer);
  const routeNameRef = useRef();
  const [isWalkThrough, setWalkThrough] = useState(false);
  const [asyncUser, setAsyncUser] = useState(null);
  const [isBiometric, setBiometricAuth] = useState(false);
  const dispatch = useDispatch();
  const {mode, isUpdateNeeded} = useSelector(state => state.settingReducer);
  const themType = mode === 'dark' ? Colors.darkTheme : Colors.lightTheme;

  const clickHandler = useCallback(() => {
    return SecureAuthentication.authenticate({
      reason: 'Melbeez\nAuthentication',
      fallbackToPasscode: true, // fallback to passcode on cancel
    })
      .then(async success => {
        await AsyncStorage.setItem(AppConstants.IS_ASYNC_USER, 'true');
        checkAsyncUser();
        await AsyncStorage.removeItem(AppConstants.IS_ASYNC_USER);
      })
      .catch(error => {
        console.log('auth error', error);
      });
  }, []);

  async function checkAsyncUser() {
    const asyncData = await AsyncStorage.getItem(AppConstants.IS_ASYNC_USER);
    setAsyncUser(asyncData);
  }
  function checkWalkThrough() {
    AsyncStorage.getItem(AppConstants.IS_WALKTHROUGH).then(val =>
      setWalkThrough(JSON.parse(val)),
    );
  }
  useEffect(() => {
    checkAsyncUser();
    checkWalkThrough();
  }, [userInfo]);

  useEffect(() => {
    async function checkBioMetric() {
      AsyncStorage.getItem(AppConstants.IS_BIOMETRIC_AUTHENTICATION).then(val =>
        setBiometricAuth(JSON.parse(val)),
      );
    }
    checkBioMetric();
    isBiometric && userInfo && clickHandler();
  }, [clickHandler, isBiometric]);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected && state.isInternetReachable;
      if (isConnected != null && !isConnected) {
        connectionRef.current.show();
      } else {
        connectionRef.current.hide();
      }
    });
    return () => removeNetInfoSubscription();
  }, []);
  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        VersionCheck.getLatestVersion()
          .then(latestVersion => {
            if (latestVersion) {
              const storeVersion = getSemanticVersion(latestVersion);
              const storeVersionNum = parseFloat(storeVersion);
              const currentVersion = DeviceInfo.getVersion();
              const currentVersionNum = parseFloat(currentVersion);
              dispatch(setUpdateApp(storeVersionNum > currentVersionNum));
            }
          })
          .catch(error => {
            console.error('Store VersionCheck ', error);
          });
      } catch (e) {
        console.log(Platform.OS, 'checkVersion ', e);
      }
    };
    checkForUpdate();
  }, [dispatch]);

  return isUpdateNeeded ? (
    <AppUpdate />
  ) : (
    <NavigationContainer
      ref={navigationRef}
      theme={themType}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}>
      {asyncUser && userInfo ? (
        <MainAppScreens {...{mode}} />
      ) : (
        <AuthStackScreens {...{mode}} isWalkthroughVisited={isWalkThrough} />
      )}
    </NavigationContainer>
  );
};

export default PrimaryNav;
