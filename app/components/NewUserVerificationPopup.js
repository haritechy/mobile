import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {Text, View, Modal, Image, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../assets';
import {NewUserVerificationDataSource, Strings} from '../constants';
import {goBack} from '../navigation/services/navigationServices';
import {
  sendVerificationToEmail,
  sendVerificationToPhone,
} from '../redux/actions/userActions';
import {ThemeStyles} from '../theme';
import {CustomButton, loaderRef} from './../components';
import styles from './styles/NewUserVerificationStyles';

const SubmitButton = ({handleResend}) => {
  return (
    <CustomButton
      title={Strings.resend}
      style={styles.buttonContainer}
      onPress={handleResend}
    />
  );
};

const RadioButton = ({selectedIndex, setSelectedIndex, themedStyles}) => {
  const radioTitleTextStyle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const radioTitleDescTextStyle = StyleSheet.compose(
    styles.titleDesc,
    themedStyles.placeholder,
  );
  return (
    <View>
      {NewUserVerificationDataSource.map((ele, index) => {
        const isSelected = index === selectedIndex;
        return (
          <View key={index}>
            <Pressable
              style={styles.rowContainer}
              onPress={() => {
                setSelectedIndex(index);
              }}>
              <Image
                source={
                  isSelected ? Icons.radioSelected : Icons.radioUnSelected
                }
                style={isSelected ? styles.selectedIcon : styles.unSelectedIcon}
              />
              <View style={styles.rightView}>
                <Text style={radioTitleTextStyle}>{ele.value}</Text>
              </View>
            </Pressable>
            {isSelected && (
              <View style={styles.descView}>
                <Text style={radioTitleDescTextStyle}>{ele.desc}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const NewUserVerificationPopup = ({
  isVisible,
  setVisible,
  countryCode,
  email,
  phoneNumber,
}) => {
  const [verificationMessage, setVerificationStatus] = useState(undefined);
  const [isError, setError] = useState(false);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const dispatch = useDispatch();
  const {emailVerificationError, phoneVerificationError} = useSelector(
    state => state.userReducer,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleRedirectLogin = useCallback(() => {
    setVisible(false);
    goBack();
  }, [setVisible]);
  const handleResend = useCallback(() => {
    dispatch({type: 'CLEAR_PROFILE_STATE'});
    setVerificationStatus(undefined);
    loaderRef.current.show();
    if (selectedIndex === 0) {
      dispatch(
        sendVerificationToEmail(email, (isSuccess, data) => {
          if (isSuccess) {
            setError(!data?.result);
            setVerificationStatus(data?.message);
          } else {
            setError(true);
            setVerificationStatus(emailVerificationError);
          }
        }),
      );
    } else {
      dispatch(
        sendVerificationToPhone(countryCode, phoneNumber, (isSuccess, data) => {
          if (isSuccess) {
            setError(!data?.result);
            setVerificationStatus(data?.message);
          } else {
            setError(true);
            setVerificationStatus(phoneVerificationError);
          }
        }),
      );
    }
  }, [
    countryCode,
    dispatch,
    email,
    emailVerificationError,
    phoneNumber,
    phoneVerificationError,
    selectedIndex,
  ]);

  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const headerTitleStyle = StyleSheet.compose(
    styles.headerTitle,
    themedStyles.headerTitle,
  );
  const headerDescStyle = StyleSheet.compose(
    styles.headerDesc,
    themedStyles.placeholder,
  );
  const didNotTextStyle = StyleSheet.compose(
    styles.didNotText,
    themedStyles.labelText,
  );
  const verificationStyle = StyleSheet.compose(
    styles.verificationText,
    isError ? styles.invalidErrorText : {},
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer}>
          <View style={styles.opacityView} />
          <View style={modalViewStyle}>
            <View styles={styles.headerView}>
              <Text style={headerTitleStyle}>{Strings.newUsrVerification}</Text>
              <Text style={headerDescStyle}>
                {Strings.newUsrVerificationHeaderDesc}
              </Text>
            </View>
            <View>
              <Text style={didNotTextStyle}>{Strings.doNotReceive}</Text>
              <RadioButton
                {...{selectedIndex, setSelectedIndex, themedStyles}}
              />
              <SubmitButton {...{handleResend}} />
              {verificationMessage ? (
                <Text style={verificationStyle}>{verificationMessage}</Text>
              ) : null}
              <Pressable
                style={styles.redirectLoginButton}
                onPress={handleRedirectLogin}>
                <Text style={styles.redirectLoginText}>
                  {Strings.redirectToLogin}
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default NewUserVerificationPopup;
