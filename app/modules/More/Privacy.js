import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// LOCAL IMPORTS
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomNavBar,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import ApiConstants from '../../constants/ApiConstants';
import {privacyPreference} from '../../constants/Mockdata';
import {
  getAllNotificationPreference,
  updateAllNotificationPreference,
} from '../../redux/actions/notificationActions';
import {Icons, ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/PrivacyStyle';

const Privacy = ({navigation}) => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {notificationPreferenceData} = useSelector(
    state => state.notificationReducer,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loaderRef.current.show();
      dispatch(getAllNotificationPreference());
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);
  const onMarketing = useCallback(() => {
    if (notificationPreferenceData) {
      const preferenceData = {
        ...notificationPreferenceData,
        isMarketingValueAlert:
          !notificationPreferenceData.isMarketingValueAlert,
      };
      loaderRef.current.show();
      dispatch(
        updateAllNotificationPreference(preferenceData, isSuccess => {
          if (isSuccess) {
            onPreferenceUpdate();
          }
        }),
      );
    }
  }, [dispatch, notificationPreferenceData, onPreferenceUpdate]);
  const onThirdParty = useCallback(() => {
    if (notificationPreferenceData) {
      const preferenceData = {
        ...notificationPreferenceData,
        isThirdPartyServiceAllowed:
          !notificationPreferenceData.isThirdPartyServiceAllowed,
      };
      loaderRef.current.show();
      dispatch(
        updateAllNotificationPreference(preferenceData, isSuccess => {
          if (isSuccess) {
            onPreferenceUpdate();
          }
        }),
      );
    }
  }, [dispatch, notificationPreferenceData, onPreferenceUpdate]);
  const onBiometrics = useCallback(() => {
    if (notificationPreferenceData) {
      const preferenceData = {
        ...notificationPreferenceData,
        isBiometricAllowed: !notificationPreferenceData.isBiometricAllowed,
      };
      loaderRef.current.show();
      dispatch(
        updateAllNotificationPreference(preferenceData, isSuccess => {
          if (isSuccess) {
            onPreferenceUpdate();
          }
        }),
      );
    }
  }, [dispatch, notificationPreferenceData, onPreferenceUpdate]);
  const onPreferenceUpdate = useCallback(() => {
    dispatch(getAllNotificationPreference());
  }, [dispatch]);
  const descriptionTextStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const onPolicyClick = useCallback(
    (title, url) =>
      navigation.navigate(NavigationRoutes.TermsScreen, {
        title,
        webUrl: url,
      }),
    [navigation],
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.policies}
            containerStyle={styles.headerContainer}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.policyView}>
              <Text
                style={styles.policyLinkText}
                onPress={() =>
                  onPolicyClick(Strings.privacyPolicy, ApiConstants.PrivacyUrl)
                }>
                {Strings.privacyPolicy}
              </Text>
              <Text
                style={styles.policyLinkText}
                onPress={() =>
                  onPolicyClick(Strings.terms, ApiConstants.TermsConditionUrl)
                }>
                {Strings.termsAndConditions}
              </Text>
              <Text
                style={styles.policyLinkText}
                onPress={() =>
                  onPolicyClick(Strings.cookiePolicy, ApiConstants.CookieUrl)
                }>
                {Strings.cookiePolicy}
              </Text>
              {Platform.OS === 'ios' ? (
                <Text
                  style={styles.policyLinkText}
                  onPress={() =>
                    onPolicyClick(Strings.eula, ApiConstants.EulaPolicyUrl)
                  }>
                  {Strings.eulaPolicy}
                </Text>
              ) : null}
            </View>
            <View style={styles.bottomContainer}>
              {
                // TO DO In Next Phase
                /* <Pressable style={styles.termsView} onPress={onMarketing}>
                <Image
                  style={styles.checkIcon}
                  source={
                    notificationPreferenceData?.isMarketingValueAlert
                      ? Icons.checkbox
                      : Icons.checkboxUncheck
                  }
                />
                <Text style={descriptionTextStyle}>
                  {privacyPreference.allowMarketing}
                </Text>
              </Pressable> */
              }
              <Pressable style={styles.termsView} onPress={onThirdParty}>
                {notificationPreferenceData?.isThirdPartyServiceAllowed ? (
                  <Image style={styles.checkIcon} source={Icons.checkbox} />
                ) : (
                  <View style={styles.viewCheckIcon} />
                )}
                <Text style={descriptionTextStyle}>
                  {privacyPreference.allowThirdParty}
                </Text>
              </Pressable>
              <Pressable style={styles.termsView} onPress={onBiometrics}>
                {notificationPreferenceData?.isBiometricAllowed ? (
                  <Image style={styles.checkIcon} source={Icons.checkbox} />
                ) : (
                  <View style={styles.viewCheckIcon} />
                )}
                <Text style={descriptionTextStyle}>
                  {privacyPreference.allowBiometrics}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Privacy)}
          />
        </>
      )}
    />
  );
};
export default Privacy;
