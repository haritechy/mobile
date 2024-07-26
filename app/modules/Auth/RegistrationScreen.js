import {Formik} from 'formik';
import React, {createRef, useCallback, useState} from 'react';
import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  CustomButton,
  CustomNavBar,
  CustomPhoneInput,
  CustomTextInput,
  ErrorPopup,
  loaderRef,
  NewUserVerificationPopup,
  ScreenContainer,
} from '../../components';
import {NavigationRoutes, Strings} from '../../constants';
import ApiConstants from '../../constants/ApiConstants';
import {navigate} from '../../navigation/services/navigationServices';
import {createAccount} from '../../redux/actions/userActions';
import Schema from '../../services/ValidationService';
import styles from './styles/RegistrationScreenStyle';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  username: createRef(),
  firstname: createRef(),
  lastname: createRef(),
  email: createRef(),
  mobile_no: createRef(),
  password: createRef(),
  confirmPassword: createRef(),
  address: createRef(),
  mailingAddress: createRef(),
};

const RenderFirstNameTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    title={Strings.firstNamePlaceholder}
    ref={inputRef.firstname}
    autoCapitalize={'words'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.firstNamePlaceholder}
    value={values.firstname}
    error={touched.firstname && errors.firstname}
    onBlur={handleBlur('firstname')}
    onChangeText={handleChange('firstname')}
    onSubmitEditing={() => inputRef.lastname.current.focus()}
  />
);
const RenderLastNameTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    title={Strings.lastNamePlaceholder}
    ref={inputRef.lastname}
    autoCapitalize={'words'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.lastNamePlaceholder}
    value={values.lastname}
    error={touched.lastname && errors.lastname}
    onBlur={handleBlur('lastname')}
    onChangeText={handleChange('lastname')}
    onSubmitEditing={() => inputRef.username.current.focus()}
  />
);

const RenderUserNameTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    title={Strings.userName}
    ref={inputRef.username}
    autoCapitalize={'none'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.userName}
    value={values.username}
    error={touched.username && errors.username}
    onBlur={handleBlur('username')}
    onChangeText={handleChange('username')}
    onSubmitEditing={() => inputRef.email.current.focus()}
  />
);

const RenderPasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    secureTextEntry
    showPassword
    title={Strings.password}
    ref={inputRef.password}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.password}
    value={values.password}
    error={touched.password && errors.password}
    onBlur={handleBlur('password')}
    onChangeText={handleChange('password')}
    onSubmitEditing={() => inputRef.confirmPassword.current.focus()}
  />
);
const RenderConfirmPasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    secureTextEntry
    showPassword
    title={Strings.confirmPasswordPlaceHolder}
    ref={inputRef.confirmPassword}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.confirmNewPassword}
    value={values.confirmPassword}
    error={touched.password && errors.confirmPassword}
    onBlur={handleBlur('confirmPassword')}
    onChangeText={handleChange('confirmPassword')}
    onSubmitEditing={() => Keyboard.dismiss()}
  />
);

const RenderEmailTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    title={Strings.emailPlaceholder}
    ref={inputRef.email}
    autoCapitalize={'none'}
    keyboardType={'email-address'}
    caretHidden={false}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.emailPlaceholder}
    value={values.email}
    error={touched.email && errors.email}
    onChangeText={handleChange('email')}
    onBlur={handleBlur('email')}
    onSubmitEditing={() => inputRef.mobile_no.current.focus()}
  />
);

const RenderMobileTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  countryCode,
  setCountryCode,
  listCountries,
}) => (
  <CustomPhoneInput
    ref={inputRef.mobile_no}
    autoCapitalize={'none'}
    keyboardType={'number-pad'}
    returnKeyType={'done'}
    inputStyle={styles.textInput}
    floatingLabel={Strings.mobileNumberPlaceholder}
    value={values.mobile_no}
    listCountries={listCountries}
    error={touched.mobile_no && errors.mobile_no}
    onChangeText={handleChange('mobile_no')}
    onBlur={handleBlur('mobile_no')}
    countryCode={countryCode}
    setCountryCode={val => {
      setCountryCode(val);
    }}
    onSubmitEditing={() => inputRef.password.current.focus()}
  />
);
const RenderSignupButton = ({handleSubmit}) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton title={Strings.createAccount} onPress={handleSubmit} />
    </View>
  );
};
const RenderFormInputs = ({
  params,
  isVisible,
  setVisible,
  countryCode,
  setCountryCode,
  themedStyles,
  onTermsPolicyClick,
  listCountries,
}) => {
  const headerTitle = StyleSheet.compose(
    styles.signupTextStyle,
    themedStyles.labelText,
  );
  return (
    <View style={styles.formInputs}>
      <Text style={headerTitle}>{Strings.createAccount}</Text>
      <RenderFirstNameTextInput {...params} />
      <RenderLastNameTextInput {...params} />
      <RenderUserNameTextInput {...params} />
      <RenderEmailTextInput {...params} />
      <RenderMobileTextInput
        {...params}
        {...{countryCode, setCountryCode, listCountries}}
      />
      <RenderPasswordTextInput {...params} />
      <RenderConfirmPasswordTextInput {...params} />
      <View style={styles.termView}>
        <Text style={[styles.termTextStyle]}>
          {Strings.termAndPolicyDeclaration} {'\n'}
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
      <RenderSignupButton {...params} />
      <NewUserVerificationPopup
        {...{isVisible, setVisible}}
        countryCode={countryCode}
        email={params?.values?.email}
        phoneNumber={params?.values?.mobile_no}
      />
    </View>
  );
};

const RenderForm = ({
  isVisible,
  setVisible,
  dispatch,
  countryCode,
  setCountryCode,
  themedStyles,
  setErrorMessage,
  setErrorPopup,
  onTermsPolicyClick,
  listCountries,
}) => {
  return (
    <View
      style={styles.profileImageBase}
      contentContainerStyle={styles.scrollViewContentContainerStyle}>
      <RenderRegisterForm
        {...{
          isVisible,
          setVisible,
          dispatch,
          countryCode,
          setCountryCode,
          themedStyles,
          setErrorMessage,
          setErrorPopup,
          onTermsPolicyClick,
          listCountries,
        }}
      />
    </View>
  );
};

const RenderRegisterForm = ({
  isVisible,
  setVisible,
  dispatch,
  countryCode,
  setCountryCode,
  themedStyles,
  setErrorMessage,
  setErrorPopup,
  onTermsPolicyClick,
  listCountries,
}) => {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        mobile_no: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Schema.register}
      onSubmit={useCallback(
        params => {
          Keyboard.dismiss();
          const data = {
            userName: params?.username,
            firstName: params?.firstname,
            lastName: params?.lastname,
            email: params?.email,
            countryCode: countryCode,
            phoneNumber: params?.mobile_no,
            password: params?.password,
            confirmPassword: params?.confirmPassword,
          };
          loaderRef.current.show();
          dispatch(
            createAccount(data, (isSuccess, response) => {
              if (isSuccess) {
                if (response?.result) {
                  setVisible(true);
                } else {
                  setErrorPopup(true);
                  setErrorMessage(response?.message);
                }
              } else {
                setErrorPopup(true);
                setErrorMessage(response?.message);
              }
            }),
          );
        },
        [countryCode, dispatch, setErrorMessage, setErrorPopup, setVisible],
      )}>
      {({...params}) => {
        return (
          <RenderFormInputs
            {...{
              params,
              isVisible,
              setVisible,
              countryCode,
              setCountryCode,
              themedStyles,
              setErrorMessage,
              setErrorPopup,
              onTermsPolicyClick,
              listCountries,
            }}
          />
        );
      }}
    </Formik>
  );
};

const RegisterScreen = ({route}) => {
  const {themedStyles} = route?.params;
  const [isVisible, setVisible] = useState(false);
  const [isErrorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const {listCountries} = useSelector(state => state.addressReducer);
  const {disableAdjustPan} = updateSoftInputMode();
  useFocusEffect(
    useCallback(() => {
      disableAdjustPan();
    }, [disableAdjustPan]),
  );
  const handleAction = useCallback(
    () => navigate(NavigationRoutes.LoginScreen),
    [],
  );
  const onTermsPolicyClick = useCallback(
    (title, url) =>
      navigate(NavigationRoutes.TermsScreen, {
        title,
        webUrl: url,
      }),
    [],
  );
  const dispatch = useDispatch();
  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.mainContainer}>
          <CustomNavBar
            isRightButton={true}
            rightButtonText={Strings.signIn}
            containerStyle={styles.headerContainer}
            onAction={handleAction}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.contentPadding}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <RenderForm
              {...{
                isVisible,
                setVisible,
                dispatch,
                countryCode,
                setCountryCode,
                themedStyles,
                setErrorMessage,
                setErrorPopup,
                onTermsPolicyClick,
                listCountries,
              }}
            />
            <ErrorPopup
              isVisible={isErrorPopup}
              setVisible={setErrorPopup}
              errorText={errorMessage}
            />
          </KeyboardAwareScrollView>
        </View>
      )}
    />
  );
};

export default RegisterScreen;
