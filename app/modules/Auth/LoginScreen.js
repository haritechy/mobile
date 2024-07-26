// THIRD PARTY IMPORTS

import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// LOCAL IMPORTS
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomButton,
  CustomNavBar,
  CustomSocialMediaButton,
  CustomTextInput,
  ErrorPopup,
  loaderRef,
  NewUserVerificationPopup,
  ScreenContainer,
  SeparatorView,
} from '../../components';
import {NavigationRoutes, Strings} from '../../constants';
import {navigate} from '../../navigation/services/navigationServices';
import {registerUserDevice} from '../../redux/actions/notificationActions';
import {clearAll, login} from '../../redux/actions/userActions';
import {requestFcmToken} from '../../services/Utils';
import Schema from '../../services/ValidationService';
import {Colors, ThemeStyles} from '../../theme';
import {
  appleAuthentication,
  facebookLogin,
  googleSignIn,
} from './services/AuthServices';
import styles from './styles/LoginScreenStyle';
import moment from 'moment';
import ApiConstants from '../../constants/ApiConstants';
import {getExistCountries} from '../../redux/actions/addressActions';

const inputRef = {
  email: createRef(),
  password: createRef(),
};

const loginForm = createRef();

const EmailTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    editable
    ref={inputRef.email}
    autoCapitalize={'none'}
    keyboardType={'email-address'}
    caretHidden={false}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={`${Strings.userName}/${Strings.phone}/${Strings.email}`}
    title={Strings.userName}
    value={values.email}
    error={touched.email && errors.email}
    errorStyle={styles.errorStyle}
    onBlur={handleBlur('email')}
    onChangeText={handleChange('email')}
    onSubmitEditing={() => inputRef.password.current.focus()}
  />
);

const PasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  submitForm,
}) => (
  <CustomTextInput
    editable
    secureTextEntry
    showPassword
    ref={inputRef.password}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.password}
    title={Strings.password}
    value={values.password}
    error={touched.password && errors.password}
    errorStyle={styles.errorStyle}
    returnKeyType={'done'}
    onSubmitEditing={submitForm}
    onBlur={handleBlur('password')}
    onChangeText={handleChange('password')}
  />
);

const LoginButton = ({submitForm}) => {
  return (
    <CustomButton
      title={Strings.signIn}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};

const Terms = () => {
  const onTermsPolicyClick = useCallback(
    (title, url) =>
      navigate(NavigationRoutes.TermsScreen, {
        title,
        webUrl: url,
      }),
    [],
  );
  return (
    <View style={styles.termView}>
      <Text style={[styles.termTextStyle]}>
        {Strings.signInTermAndPolicyDeclaration} {'\n'}
        <Text
          style={styles.linkText}
          suppressHighlighting={true}
          onPress={() =>
            onTermsPolicyClick(Strings.terms, ApiConstants.TermsConditionUrl)
          }>
          {Strings.terms}
        </Text>
        {Strings.and}
        <Text
          style={styles.linkText}
          suppressHighlighting={true}
          onPress={() =>
            onTermsPolicyClick(Strings.privacyPolicy, ApiConstants.PrivacyUrl)
          }>
          {Strings.privacyPolicy}
        </Text>
        {' , \n'}
        <Text
          style={styles.linkText}
          suppressHighlighting={true}
          onPress={() => {
            onTermsPolicyClick(Strings.cookiePolicy, ApiConstants.CookieUrl);
          }}>
          {Strings.cookiePolicy}
        </Text>
        {Platform.OS === 'ios' ? (
          <>
            {` ${Strings.and}`}
            <Text
              style={styles.linkText}
              suppressHighlighting={true}
              onPress={() =>
                onTermsPolicyClick(Strings.eula, ApiConstants.EulaPolicyUrl)
              }>
              {Strings.eula}
            </Text>
          </>
        ) : null}
      </Text>
    </View>
  );
};
const ForgotUsernameText = ({themedStyles}) => {
  return (
    <Pressable
      style={styles.forgotContainer}
      onPress={() => navigate(NavigationRoutes.ForgotUsername, {themedStyles})}>
      <Text style={styles.forgotText}>{Strings.forgotUsername}</Text>
    </Pressable>
  );
};
const ForgotPasswordText = ({themedStyles}) => {
  return (
    <Pressable
      style={styles.forgotContainer}
      onPress={() => navigate(NavigationRoutes.ForgotPassword, {themedStyles})}>
      <Text style={styles.forgotText}>{Strings.forgotPassword}</Text>
    </Pressable>
  );
};

const RenderLoginFormInputs = ({params, themedStyles}) => (
  <View style={styles.formInputs}>
    <EmailTextInput {...params} />
    <ForgotUsernameText {...{themedStyles}} />
    <PasswordTextInput {...params} />
    <ForgotPasswordText {...{themedStyles}} />
    <LoginButton {...params} />
  </View>
);

const SocialMediaButtons = ({dispatch, handleSocialLogin}) => {
  return (
    <View style={styles.socialMediaViewContainer}>
      <CustomSocialMediaButton
        signinOption={'Google'}
        onPress={() => {
          googleSignIn(dispatch, handleSocialLogin);
        }}
        image={Icons.google}
        containerStyle={styles.googleContainerStyle}
        textStyle={styles.googleBtnTextStyle}
      />
      <CustomSocialMediaButton
        signinOption={'Facebook'}
        onPress={() => {
          facebookLogin(dispatch, handleSocialLogin);
        }}
        image={Icons.facebook}
        containerStyle={styles.facebookContainerStyle}
        textStyle={styles.facebookBtnTextStyle}
        tintColor={Colors.white}
      />
      {Platform.OS === 'ios' ? (
        <CustomSocialMediaButton
          signinOption={'Apple'}
          onPress={() => {
            appleAuthentication(dispatch, handleSocialLogin);
          }}
          image={Icons.apple}
          containerStyle={styles.appleContainerStyle}
          textStyle={styles.appleBtnTextStyle}
          tintColor={Colors.white}
        />
      ) : null}
      <Terms />
    </View>
  );
};

const registerLoginDevice = async dispatch => {
  const token = await requestFcmToken();
  const uid = await DeviceInfo.getUniqueId();
  const deviceData = {
    id: 0,
    deviceToken: token,
    uId: uid,
    deviceType: Platform.OS === 'android' ? 1 : 2,
    appVersion: DeviceInfo.getVersion(),
    osVersion: DeviceInfo.getSystemVersion(),
    latitude: 0,
    longitude: 0,
  };
  dispatch(registerUserDevice(deviceData));
};

export const LoginScreen = ({navigation}) => {
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowVerification, setVerifyPopup] = useState(false);
  const [authResponse, setResponse] = useState(undefined);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const dispatch = useDispatch();
  useEffect(() => {
    return navigation.addListener('focus', _e => {
      loginForm.current.resetForm();
      dispatch(getExistCountries());
    });
  }, [dispatch, navigation]);
  const handleAction = useCallback(
    () =>
      navigate(NavigationRoutes.RegistrationScreen, {
        themedStyles: themedStyles,
      }),
    [themedStyles],
  );
  const handleSocialLogin = useCallback(
    async result => {
      const {isSuccess, responseData} = result;
      if (isSuccess && responseData?.result) {
        const response = responseData?.result;
        const emailOrPhoneVerified =
          response?.emailConfirmed || response?.phoneNumberConfirmed;
        if (!emailOrPhoneVerified) {
          setResponse(responseData);
          setVerifyPopup(true);
        }
        registerLoginDevice(dispatch);
      } else {
        setVisible(true);
        setErrorMessage(responseData?.message);
      }
    },
    [dispatch],
  );
  const onSubmit = useCallback(
    async params => {
      Keyboard.dismiss();
      loaderRef.current.show();
      const authData = {
        username: params.email,
        password: params.password,
      };
      dispatch(clearAll());
      dispatch(
        login(authData, async (isSuccess, responseData) => {
          if (isSuccess) {
            const response = responseData?.result;
            const emailOrPhoneVerified =
              response?.emailConfirmed || response?.phoneNumberConfirmed;
            if (responseData != null && !emailOrPhoneVerified) {
              setResponse(responseData);
              setVerifyPopup(true);
            }
            registerLoginDevice(dispatch);
            dispatch({
              type: 'SAVE_REMINDER',
              date: moment(response?.verificationRemindedOn),
              count: response?.verificationReminderCount,
            });
          } else {
            setVisible(true);
            setErrorMessage(
              !responseData?.result
                ? responseData?.message
                : Strings.somethingWentWrong,
            );
          }
        }),
      );
    },
    [dispatch],
  );
  const signInTitle = StyleSheet.compose(
    styles.signInTextStyle,
    themedStyles.labelText,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            isBackVisible={false}
            isRightButton={true}
            rightButtonText={Strings.signup}
            containerStyle={styles.headerContainer}
            onAction={handleAction}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.conttentPadding}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <Text style={signInTitle}>{Strings.signIn}</Text>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={Schema.login}
              innerRef={loginForm}
              onSubmit={onSubmit}>
              {({...params}) => {
                return (
                  <View style={[styles.contentContainerStyle]}>
                    <RenderLoginFormInputs {...{params}} {...{themedStyles}} />
                  </View>
                );
              }}
            </Formik>
            <SeparatorView style={styles.separatorViewStyle} />
            <SocialMediaButtons {...{dispatch, handleSocialLogin}} />
            <ErrorPopup {...{isVisible, setVisible}} errorText={errorMessage} />
            <NewUserVerificationPopup
              isVisible={isShowVerification}
              setVisible={setVerifyPopup}
              countryCode={authResponse?.result?.countryCode}
              email={authResponse?.result?.email}
              phoneNumber={authResponse?.result?.phoneNumber}
            />
          </KeyboardAwareScrollView>
        </>
      )}
    />
  );
};

export default LoginScreen;
EmailTextInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
