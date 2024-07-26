import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// LOCAL IMPORTS
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  CustomNavBar,
  CustomSwitch,
  GoogleAdsComponent,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/AuthenticationStyle.js';
import SecureAuthentication from 'react-native-secure-authentication';

const Authentication = () => {
  const dispatch = useDispatch();
  const [isBiometric, setBiometricAuth] = useState(false);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const labelStyle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  useEffect(() => {
    async function configBiometric() {
      AsyncStorage.getItem(AppConstants.IS_BIOMETRIC_AUTHENTICATION).then(val =>
        setBiometricAuth(JSON.parse(val)),
      );
    }
    configBiometric();
  }, [dispatch]);
  const toggleSwitch = useCallback(async () => {
    if (!isBiometric) {
      SecureAuthentication.authenticate({
        reason: 'Melbeez\nAuthentication',
        fallbackToPasscode: true, // fallback to passcode on cancel
      })
        .then(async success => {
          setBiometricAuth(true);
          await AsyncStorage.setItem(
            AppConstants.IS_BIOMETRIC_AUTHENTICATION,
            JSON.stringify(true),
          );
        })
        .catch(error => {});
    } else {
      setBiometricAuth(false);
      await AsyncStorage.setItem(
        AppConstants.IS_BIOMETRIC_AUTHENTICATION,
        JSON.stringify(false),
      );
    }
  }, [isBiometric]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.authentication}
            containerStyle={styles.headerContainer}
          />
          <View style={styles.contentContainer}>
            <Pressable style={styles.rowContainer} onPress={toggleSwitch}>
              <Text style={labelStyle}>{Strings.biometricAuthentication}</Text>
              <CustomSwitch
                isEnabled={isBiometric}
                toggleSwitch={toggleSwitch}
                style={
                  isBiometric ? styles.toggleStyle : styles.disableToggleStyle
                }
              />
            </Pressable>
          </View>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Authentication)}
          />
        </>
      )}
    />
  );
};
export default Authentication;
