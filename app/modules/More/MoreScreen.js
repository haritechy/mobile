import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '@react-navigation/native';
import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {FlatList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmationPopup,
  CustomMoreItem,
  CustomNavBar,
  loaderRef,
  ScreenContainer,
} from '../../components';
import {AppConstants, MoreDataSource, Strings} from '../../constants';
import {deleteRegisterDevice} from '../../redux/actions/notificationActions';
import {clearAll} from '../../redux/actions/userActions';
import {ThemeStyles} from '../../theme';
import styles from './styles/MoreStyle';

const MoreScreen = ({navigation}) => {
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {loginType} = useSelector(state => state.userReducer);
  const handleCancel = useCallback(() => setVisible(false), []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_CONTACT_STATE'});
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);
  const handleConfirm = useCallback(async () => {
    setVisible(false);
    const udId = await DeviceInfo.getUniqueId();
    loaderRef.current.show();
    dispatch(
      deleteRegisterDevice(udId, async isSuccess => {
        if (isSuccess) {
          await AsyncStorage.setItem(
            AppConstants.IS_WALKTHROUGH,
            JSON.stringify(true),
          );
          if (loginType === 'google') {
            await GoogleSignin.signOut()
              .then(() => {
                dispatch(clearAll());
              })
              .catch(err => {
                console.log('google logout error ', err);
              });
          } else if (loginType === 'facebook') {
            LoginManager.logOut();
            const token = await AccessToken.getCurrentAccessToken();
            if (!token) {
              dispatch(clearAll());
            }
          } else {
            dispatch(clearAll());
          }
        } else {
          dispatch(clearAll());
        }
      }),
    );
  }, [dispatch, loginType]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            isBackVisible={false}
            title={Strings.more}
            containerStyle={styles.headerContainer}
          />
          <FlatList
            style={styles.flatList}
            data={MoreDataSource}
            keyExtractor={item => item.id}
            renderItem={item => (
              <CustomMoreItem
                item={item.item}
                {...{setVisible, themedStyles}}
              />
            )}
          />
          <ConfirmationPopup
            {...{
              isVisible,
              setVisible,
              handleConfirm,
              handleCancel,
              themedStyles,
            }}
            title={Strings.confirmLogout}
            message={Strings.logoutConfirmationMessage}
          />
        </>
      )}
    />
  );
};
export default MoreScreen;
