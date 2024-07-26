import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {AccountSettingDataSource, Strings} from '../../constants';
import styles from './styles/AccountSettingsStyle';
import {
  CustomAccountItem,
  CustomNavBar,
  ScreenContainer,
  DeleteAccountPopUp,
  VerifyDeleteAccountPopup,
  ErrorPopup,
  loaderRef,
} from '../../components';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {clearSettingState} from '../../redux/actions/settingActions';
import {
  clearAll,
  deleteAccount,
  deleteAccountMatchPassword,
} from '../../redux/actions/userActions';

const AccountSettings = ({navigation}) => {
  const [isDeleteAccount, setDeleteAccount] = useState(false);
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isSureToDelete, setSureToDelete] = useState(false);

  const dispatch = useDispatch();
  const colors = useTheme();
  const {userInfo} = useSelector(state => state.userReducer);
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(clearSettingState());
      dispatch({type: 'CLEAR_PROFILE_STATE'});
    });
  }, [dispatch, navigation]);
  const onDelete = useCallback(
    val => {
      loaderRef.current.show();
      dispatch(
        deleteAccountMatchPassword(val, (isSuccess, data) => {
          loaderRef.current.hide();
          if (isSuccess && data?.result) {
            console.log('on success match', data);
            setDeleteAccount(false);
            setSureToDelete(true);
          } else {
            console.log('on fail match', data);
            setDeleteAccount(false);
            setError(true);
            setErrorText(data?.message || Strings.somethingWentWrong);
          }
        }),
      );
    },
    [dispatch],
  );
  const onVerifyDelete = useCallback(() => {
    setSureToDelete(false);
    dispatch(
      deleteAccount(userInfo?.id, isSuccess => {
        if (isSuccess) {
          dispatch(clearAll());
        }
      }),
    );
  }, [dispatch, userInfo]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.accountSettings}
            containerStyle={styles.headerContainer}
          />
          <FlatList
            style={styles.flatList}
            data={AccountSettingDataSource}
            keyExtractor={item => item.id}
            renderItem={item => (
              <CustomAccountItem
                item={item.item}
                {...{
                  userInfo,
                  themedStyles,
                  navigation,
                  setDeleteAccount,
                  setSureToDelete,
                }}
                isSocialLogin={userInfo?.isSocialLogIn}
              />
            )}
          />
          <DeleteAccountPopUp
            isVisible={isDeleteAccount}
            setVisible={setDeleteAccount}
            {...{onDelete}}
          />
          <ErrorPopup
            errorText={errorText}
            isVisible={isError}
            setVisible={setError}
          />
          <VerifyDeleteAccountPopup
            isVisible={isSureToDelete}
            setVisible={setSureToDelete}
            {...{onVerifyDelete}}
          />
        </>
      )}
    />
  );
};
export default AccountSettings;
