// THIRD PARTY IMPORTS
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {Keyboard, Text, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {NavigationRoutes, Strings} from '../../constants';

// LOCAL IMPORTS
import {
  CustomButton,
  CustomNavBar,
  CustomPhoneInput,
  CustomTextInput,
  ErrorPopup,
  InvalidUserPasswordPopup,
  loaderRef,
  ScreenContainer,
} from '../../components';
import Schema from '../../services/ValidationService';
import styles from './styles/ForgotPasswordStyles';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtp} from '../../redux/actions/userActions';
import {validateEmail, validatePhone} from '../../utils/helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const inputRef = {
  email: createRef(),
  phone: createRef(),
};

const EmailTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    ref={inputRef.email}
    autoCapitalize={'none'}
    keyboardType={'default'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.email}
    title={Strings.emailPlaceholder}
    value={values.email}
    error={touched.email && errors.email}
    errorStyle={styles.errorStyle}
    onBlur={handleBlur('email')}
    onChangeText={handleChange('email')}
    onSubmitEditing={() => Keyboard.dismiss()}
  />
);

const PhoneTextInput = ({
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
    ref={inputRef.phone}
    autoCapitalize={'none'}
    keyboardType={'phone-pad'}
    inputStyle={styles.textInput}
    phoneContainer={styles.phoneContainer}
    floatingLabel={Strings.phone}
    title={Strings.phone}
    value={values.phone}
    error={touched.phone && errors.phone}
    errorStyle={styles.errorStyle}
    onBlur={handleBlur('phone')}
    onChangeText={handleChange('phone')}
    countryCode={countryCode}
    setCountryCode={val => {
      setCountryCode(val);
    }}
    listCountries={listCountries}
    onSubmitEditing={() => Keyboard.dismiss()}
  />
);

const MarginTextInput = () => {
  return <View style={styles.marginTextInput} />;
};

const SubmitButton = ({submitForm}) => {
  return (
    <CustomButton
      title={Strings.sendOtp}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};

const RenderForgotPasswordInputs = ({
  params,
  countryCode,
  setCountryCode,
  themedStyles,
  listCountries,
}) => {
  const orTextStyle = StyleSheet.compose(styles.orText, themedStyles.labelText);
  const orLineStyle = StyleSheet.compose(
    styles.lineView,
    themedStyles.seperator,
  );
  return (
    <View style={styles.formInputs}>
      <MarginTextInput />
      <EmailTextInput {...params} />
      <View style={styles.orView}>
        <View style={orLineStyle} />
        <Text style={orTextStyle}>{Strings.or}</Text>
        <View style={orLineStyle} />
      </View>
      <PhoneTextInput
        {...params}
        {...{countryCode, setCountryCode, listCountries}}
      />
      <MarginTextInput />
      <SubmitButton {...params} />
    </View>
  );
};

const resetForm = createRef();
export const ForgotPassword = ({route, navigation}) => {
  const {themedStyles} = route?.params;
  const [isVisible, setVisible] = useState(false);
  const [isInvalidPopup, setInvalidPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const dispatch = useDispatch();
  const {listCountries} = useSelector(state => state.addressReducer);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      resetForm.current.resetForm();
    });
  }, [dispatch, navigation]);
  const submitRequest = useCallback(
    data => {
      const {user, code} = data;
      loaderRef.current.show();
      dispatch(
        sendOtp(user, code, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result) {
              navigation.navigate(NavigationRoutes.VerifyPhoneEmail, {
                isResetPassword: true,
                countryCode,
                emailOrPhone: user,
                themedStyles,
              });
            } else {
              setErrorMessage(response?.message);
              setInvalidPopup(true);
            }
          } else {
            setVisible(true);
            setErrorMessage(response?.message || Strings.somethingWentWrong);
          }
        }),
      );
    },
    [countryCode, dispatch, navigation, themedStyles],
  );
  const onSubmit = useCallback(
    params => {
      if (validateEmail(params?.email)) {
        const user = params?.email;
        const code = null;
        submitRequest({user, code});
      } else if (validatePhone(params?.phone)) {
        const user = params?.phone;
        const code = countryCode;
        submitRequest({user, code});
      } else {
        setInvalidPopup(true);
      }
    },
    [countryCode, submitRequest],
  );
  const headerTitle = StyleSheet.compose(
    styles.headerTitle,
    themedStyles.labelText,
  );
  const headerDesc = StyleSheet.compose(
    styles.headerDesc,
    themedStyles.placeholder,
  );
  const headerContainerStyle = StyleSheet.compose(
    styles.headerContainer,
    themedStyles.navIcon,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar containerStyle={headerContainerStyle} />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <Text style={headerTitle}>{Strings.resetPassword}</Text>
            <Text style={headerDesc}>{Strings.forgotPwdDesc}</Text>
            <Formik
              initialValues={{email: '', phone: ''}}
              validationSchema={Schema.forgotPassword}
              innerRef={resetForm}
              onSubmit={onSubmit}>
              {({...params}) => (
                <>
                  <RenderForgotPasswordInputs
                    {...{
                      params,
                      countryCode,
                      setCountryCode,
                      themedStyles,
                      listCountries,
                    }}
                  />
                  <InvalidUserPasswordPopup
                    isVisible={isInvalidPopup}
                    setVisible={setInvalidPopup}
                    isForUsername={false}
                  />
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
          <ErrorPopup {...{isVisible, setVisible}} errorText={errorMessage} />
        </>
      )}
    />
  );
};

export default ForgotPassword;
