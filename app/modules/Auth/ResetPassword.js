import PropTypes from 'prop-types';
import React, {createRef, useCallback, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';

// LOCAL IMPORTS
import Strings from '../../constants/Strings';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
// LOCAL IMPORTS
import Schema from '../../services/ValidationService';
import styles from './styles/ResetPasswordStyles';
// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import {
  CustomNavBar,
  ErrorPopup,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {reset} from '../../navigation/services/navigationServices';
import {NavigationRoutes} from '../../constants';
import {useDispatch} from 'react-redux';
import {resetPassword} from '../../redux/actions/userActions';

const inputRef = {
  password: createRef(),
  rePassword: createRef(),
};

const PasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    secureTextEntry
    ref={inputRef.password}
    autoCapitalize={'none'}
    keyboardType={'default'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.enterNewPassword}
    title={Strings.enterNewPassword}
    value={values.password}
    showPassword={true}
    error={touched.password && errors.password}
    errorStyle={styles.errorStyle}
    onBlur={handleBlur('password')}
    onChangeText={handleChange('password')}
    onSubmitEditing={() => inputRef.rePassword.current.focus()}
  />
);

const RePasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  submitForm,
}) => (
  <CustomTextInput
    secureTextEntry
    ref={inputRef.rePassword}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.reEnterNewPassword}
    title={Strings.reEnterNewPassword}
    value={values.rePassword}
    showPassword={true}
    error={touched.rePassword && errors.rePassword}
    errorStyle={styles.errorStyle}
    returnKeyType={'done'}
    keyboardType={'default'}
    onSubmitEditing={submitForm}
    onBlur={handleBlur('rePassword')}
    onChangeText={handleChange('rePassword')}
  />
);

const MarginTextInput = () => {
  return <View style={styles.marginTextInput} />;
};

const SubmitButton = ({submitForm}) => {
  return (
    <CustomButton
      title={Strings.reset}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};

const RenderResetPasswordInputs = params => (
  <View style={styles.formInputs}>
    <PasswordTextInput {...params} />
    <RePasswordTextInput {...params} />
    <MarginTextInput />
    <SubmitButton {...params} />
  </View>
);

export const ResetPassword = ({navigation, route}) => {
  const {emailOrPhone, resetPasswordToken} = route.params;
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [isErrorPrompt, setErrorPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successText, setSuccessText] = useState('');
  const onBack = useCallback(() => navigation.pop(2), [navigation]);
  const onOkPress = useCallback(() => {
    setVisible(false);
    reset(NavigationRoutes.LoginScreen);
  }, []);
  const onSubmit = useCallback(
    params => {
      loaderRef.current.show();
      const data = {
        password: params?.password,
        confirmpassword: params?.rePassword,
        emailorphone: emailOrPhone,
        token: resetPasswordToken,
      };
      dispatch(
        resetPassword(data, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result) {
              setVisible(true);
              setSuccessText(response?.message);
            } else {
              setErrorPrompt(true);
              setErrorMessage(response?.message);
            }
          } else {
            setErrorPrompt(true);
            setErrorMessage(response?.message || Strings.somethingWentWrong);
          }
        }),
      );
    },
    [dispatch, emailOrPhone, resetPasswordToken],
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            containerStyle={styles.headerContainer}
            onBackPress={onBack}
          />
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps={'handled'}>
            <Text style={styles.headerTitle}>{Strings.resetPassword}</Text>
            <Text style={styles.headerDesc}>{Strings.pwdHeaderDesc}</Text>
            <Formik
              initialValues={{
                password: '',
                rePassword: '',
              }}
              validationSchema={Schema.resetPwd}
              onSubmit={onSubmit}>
              {({...params}) => (
                <>
                  <View style={[styles.contentContainerStyle]}>
                    <RenderResetPasswordInputs {...params} />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
          <SuccessPopup
            {...{isVisible, setVisible}}
            successText={successText}
            onOkPress={onOkPress}
          />
          <ErrorPopup
            isVisible={isErrorPrompt}
            setVisible={setErrorPrompt}
            errorText={errorMessage}
          />
        </>
      )}
    />
  );
};

export default ResetPassword;
PasswordTextInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
