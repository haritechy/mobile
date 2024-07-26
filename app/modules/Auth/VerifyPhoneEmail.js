// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

// LOCAL IMPORTS
import {
  CustomButton,
  CustomNavBar,
  CustomOtpTextInput,
  ErrorPopup,
  ErrorView,
  loaderRef,
  ScreenContainer,
} from '../../components';
import Schema from '../../services/ValidationService';
import styles from './styles/VerifyPhoneEmailStyles';
// THIRD PARTY IMPORTS
import {useDispatch} from 'react-redux';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {sendOtp, verifyOtp} from '../../redux/actions/userActions';

const OtpTextInput = ({params, themedStyles, otpInput}) => {
  const textInputStyle = StyleSheet.compose(
    styles.inputStyle,
    themedStyles.inputText,
  );

  return (
    <CustomOtpTextInput
      ref={otpInput}
      style={styles.inputText}
      inputStyles={textInputStyle}
      handleChange={params.handleChange('otpInput')}
      handleBlur={params.handleBlur('otpInput')}
      errors={params.errors.otpInput}
      error={params.touched.otpInput && params.errors.otpInput}
      errorStyle={styles.errorStyle}
      touched={params.touched.otpInput}
      values={params.values.otpInput}
      numberOfInputs={6}
    />
  );
};

const ResendOtpButton = ({
  setMinutes,
  setSeconds,
  countryCode,
  emailOrPhone,
  dispatch,
  verificationMessage,
  setVerificationStatus,
}) => {
  const verificationStyle = StyleSheet.compose(styles.verificationText);
  const onResend = useCallback(() => {
    setMinutes(1);
    setSeconds(30);
    setVerificationStatus(undefined);
    loaderRef.current.show();
    dispatch(
      sendOtp(emailOrPhone, countryCode, (isSuccess, response) => {
        if (isSuccess) {
          if (response?.result) {
            setVerificationStatus(response?.message);
          }
        }
      }),
    );
  }, [
    countryCode,
    dispatch,
    emailOrPhone,
    setMinutes,
    setSeconds,
    setVerificationStatus,
  ]);
  return (
    <>
      <Pressable onPress={onResend} style={styles.resendOtpButton}>
        <Text style={styles.resendOtpText}>{Strings.resend}</Text>
      </Pressable>
      {verificationMessage ? (
        <Text style={verificationStyle}>{verificationMessage}</Text>
      ) : null}
    </>
  );
};

const Timer = ({minutes, setMinutes, seconds, setSeconds, themedStyles}) => {
  const timerTextStyle = StyleSheet.compose(
    styles.timerText,
    themedStyles.labelText,
  );
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, seconds, setMinutes, setSeconds]);

  return (
    <>
      <Text style={timerTextStyle}>
        {`0${minutes}`} : {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      {minutes === 0 && seconds === 0 ? (
        <ErrorView error={Strings.resendOTP} errorStyle={styles.errorStyle} />
      ) : null}
    </>
  );
};

const DidNotText = ({themedStyles}) => {
  const textStyle = StyleSheet.compose(
    styles.didNotText,
    themedStyles.labelText,
  );
  return <Text style={textStyle}>Didn’t receive the code?</Text>;
};
const MarginTextInput = () => {
  return <View style={styles.marginTextInput} />;
};

const SubmitButton = ({submitForm}) => {
  return (
    <CustomButton
      title={Strings.verify}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};

const RenderOtpInputs = ({
  params,
  countryCode,
  emailOrPhone,
  dispatch,
  themedStyles,
  otpInput,
  verificationMessage,
  setVerificationStatus,
}) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  return (
    <View style={styles.formInputs}>
      <OtpTextInput {...{params, themedStyles, otpInput}} />
      <Timer {...{minutes, setMinutes, seconds, setSeconds, themedStyles}} />
      <MarginTextInput />
      <SubmitButton {...params} />
      <DidNotText {...{themedStyles}} />
      <ResendOtpButton
        {...params}
        {...{
          setMinutes,
          setSeconds,
          countryCode,
          emailOrPhone,
          dispatch,
          verificationMessage,
          setVerificationStatus,
        }}
      />
    </View>
  );
};

const otpForm = createRef();
export const VerifyPhoneEmail = ({route, navigation}) => {
  const otpInput = useRef(null);
  const {countryCode, emailOrPhone, themedStyles} = route.params;
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationMessage, setVerificationStatus] = useState(undefined);
  useEffect(() => {
    return navigation.addListener('focus', _e => {
      setVerificationStatus(undefined);
    });
  }, [dispatch, navigation]);
  const onSubmit = useCallback(
    params => {
      loaderRef.current.show();
      const userData = {
        otp: params?.otpInput,
        emailorphone: emailOrPhone,
        purpose: AppConstants.RESET_PASSWORD,
      };
      dispatch(
        verifyOtp(userData, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result?.isSuccess) {
              navigation.navigate(NavigationRoutes.ResetPassword, {
                emailOrPhone,
                resetPasswordToken: response?.result?.resetPasswordToken,
              });
            }
            if (response?.result === false) {
              setErrorMessage(response?.message);
              setVisible(true);
              otpInput?.current.reset();
            }
          } else {
            setVisible(true);
            setErrorMessage(response?.message || Strings.somethingWentWrong);
          }
        }),
      );
    },
    [dispatch, emailOrPhone, navigation],
  );

  const headerDescStyle = StyleSheet.compose(
    styles.headerDesc,
    themedStyles.labelText,
  );
  const headerTitleStyle = StyleSheet.compose(
    styles.headerTitle,
    themedStyles.labelText,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar containerStyle={styles.headerContainer} />
          <View style={styles.container}>
            <Text style={headerTitleStyle}>{Strings.confirmtOTP}</Text>
            <Text style={headerDescStyle}>
              {Strings.verifyPhoneOrEmailDesc}
            </Text>
            <Formik
              initialValues={{otpInput: ''}}
              validationSchema={Schema.newUsrVerify}
              innerRef={otpForm}
              onSubmit={onSubmit}>
              {({...params}) => (
                <>
                  <View style={[styles.contentContainerStyle]}>
                    <RenderOtpInputs
                      {...{
                        params,
                        countryCode,
                        emailOrPhone,
                        dispatch,
                        themedStyles,
                        otpInput,
                        onSubmit,
                        verificationMessage,
                        setVerificationStatus,
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>
            <ErrorPopup {...{isVisible, setVisible}} errorText={errorMessage} />
          </View>
        </>
      )}
    />
  );
};

export default VerifyPhoneEmail;
OtpTextInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
