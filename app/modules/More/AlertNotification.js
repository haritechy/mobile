import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

// LOCAL IMPORTS
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmationPopup,
  CustomNavBar,
  CustomToggleListItem,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
} from '../../components';
import {
  AlertNotificationDataSource,
  AppConstants,
  Strings,
} from '../../constants';
import {
  getAllNotificationPreference,
  updateAllNotificationPreference,
} from '../../redux/actions/notificationActions';
import {ThemeStyles} from '../../theme/index.js';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/AlertNotificationStyle.js';

const AlertNotification = ({navigation}) => {
  const [isVisible, setVisible] = useState(false);
  const [preference, setPreference] = useState(undefined);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const dispatch = useDispatch();
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
  const handleCancel = useCallback(() => setVisible(false), []);
  const handleConfirm = useCallback(() => {
    setVisible(false);
    if (notificationPreferenceData) {
      const preferenceData = {
        ...notificationPreferenceData,
        [statusKey(preference)]:
          !notificationPreferenceData[statusKey(preference)],
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
  }, [
    dispatch,
    notificationPreferenceData,
    onPreferenceUpdate,
    preference,
    statusKey,
  ]);
  const onToggleChange = useCallback(item => {
    setPreference(item);
    setVisible(true);
  }, []);
  const statusKey = useCallback(item => {
    switch (item?.subTitle) {
      case Strings.warrantyExpiry:
        return 'isWarrantyExpireAlert';
      case Strings.locationUpdate:
        return 'isLocationUpdateAlert';
      case Strings.productUpdate:
        return 'isProductUpdateAlert';
      case Strings.deviceActivation:
        return 'isDeviceActivationAlert';
      case Strings.marketingAlert:
        return 'isMarketingValueAlert';
      case Strings.pushNotification:
        return 'isPushNotification';
      case Strings.emailNotification:
        return 'isEmailNotification';
      case Strings.textNotification:
        return 'isTextNotification';
      default:
        return false;
    }
  }, []);
  const screenContainer = StyleSheet.compose(
    styles.mainView,
    themedStyles.themeBackground,
  );
  const headerText = StyleSheet.compose(
    styles.detailTitle,
    themedStyles.placeholder,
  );
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomToggleListItem
          {...{
            item,
            notificationPreferenceData,
            onToggleChange,
            themedStyles,
          }}
        />
      );
    },
    [onToggleChange, notificationPreferenceData, themedStyles],
  );
  const onPreferenceUpdate = useCallback(() => {
    dispatch(getAllNotificationPreference());
  }, [dispatch]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.alertAndNotifications}
            isRightActionVisible={true}
            containerStyle={styles.headerContainer}
          />
          <SectionList
            style={styles.flatList}
            sections={AlertNotificationDataSource}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.headerView}>
                <Text style={headerText}>{title}</Text>
              </View>
            )}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.AlertNotification)}
          />
          <ConfirmationPopup
            {...{
              isVisible,
              setVisible,
              handleConfirm,
              handleCancel,
              themedStyles,
            }}
            title={Strings.confirmChangePreference}
            message={Strings.preferenceConfirmationMessage}
          />
        </>
      )}
    />
  );
};
export default AlertNotification;
