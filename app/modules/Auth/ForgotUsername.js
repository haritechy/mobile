import React, {createRef, useCallback, useMemo, useState} from 'react';
import {Text, Pressable, View, Modal, Keyboard, StyleSheet} from 'react-native';

// LOCAL IMPORTS
import Strings from '../../constants/Strings';
import {
  CustomTextInput,
  CustomButton,
  CustomNavBar,
  loaderRef,
  InvalidUserPasswordPopup,
  ErrorPopup,
  CustomPhoneInput,
  ScreenContainer,
} from '../../components';

// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';

// LOCAL IMPORTS
import Schema from '../../services/ValidationService';
import styles from './styles/ForgotUsernameStyles';
import {forgotUsername} from '../../redux/actions/userActions';
import {validateEmail, validatePhone} from '../../utils/helper';
import {goBack} from '../../navigation/services/navigationServices';
import {ThemeStyles} from '../../theme';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const inputRef = {
  emailOrPhone: createRef(),
};

const ResetLinkPopup = ({
  isResetPopup,
  setResetPop,
  handleResend,
  handleOk,
  themedStyles,
}) => {
  const textStyle = StyleSheet.compose(
    styles.resetPopupText,
    themedStyles.labelText,
  );
  const modalStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  return (
    <Modal animationType="fade" transparent={true} visible={isResetPopup}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => setResetPop(!isResetPopup)}>
        <View style={styles.opacityView} />
        <View style={modalStyle}>
          <Text style={textStyle}>
            {`${Strings.resetLinkSentTo}`}
            <Text
              suppressHighlighting={false}
              style={styles.resetLink}
              onPress={handleResend}>{` ${Strings.clickHere} `}</Text>
            <Text style={textStyle}>{Strings.toResend}</Text>
          </Text>
          <Pressable style={styles.okButton} onPress={handleOk}>
            <Text style={styles.okText}>{Strings.ok}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
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
      title={Strings.recover}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};
const RenderForgotUsrPwdInputs = ({
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

const formRef = createRef();
export const ForgotUsername = ({route}) => {
  const [isVisible, setVisible] = useState(false);
  const [isResetPopup, setResetPop] = useState(false);
  const [isInvalidPopup, setInvalidPopup] = useState(false);
  const [inputValue, setInput] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const dispatch = useDispatch();
  const {recoverUserError} = useSelector(state => state.userReducer);
  const {listCountries} = useSelector(state => state.addressReducer);
  const submitRequest = useCallback(
    data => {
      const {user, code} = data;
      loaderRef.current.show();
      dispatch(
        forgotUsername(user, code, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result) {
              setResetPop(true);
            } else {
              setInvalidPopup(true);
            }
          } else {
            setVisible(true);
          }
        }),
      );
      setInput(user);
    },
    [dispatch],
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
  const handleResend = useCallback(() => {
    setResetPop(false);
    loaderRef.current.show();
    dispatch(forgotUsername(inputValue, countryCode));
  }, [countryCode, dispatch, inputValue]);
  const handleOk = useCallback(() => goBack(), []);
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
            <Text style={headerTitle}>{Strings.recoverUsername}</Text>
            <Text style={headerDesc}>{Strings.forgotUsrDesc}</Text>
            <Formik
              initialValues={{email: '', phone: ''}}
              validationSchema={Schema.forgotPassword}
              innerRef={formRef}
              onSubmit={onSubmit}>
              {({...params}) => (
                <>
                  <RenderForgotUsrPwdInputs
                    {...{
                      params,
                      countryCode,
                      setCountryCode,
                      themedStyles,
                      listCountries,
                    }}
                  />
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
          <InvalidUserPasswordPopup
            isVisible={isInvalidPopup}
            setVisible={setInvalidPopup}
            isForUsername={true}
            {...{themedStyles}}
          />
          <ErrorPopup
            {...{isVisible, setVisible}}
            errorText={recoverUserError}
          />
          <ResetLinkPopup
            {...{
              isResetPopup,
              setResetPop,
              handleResend,
              handleOk,
              themedStyles,
            }}
          />
        </>
      )}
    />
  );
};

export default ForgotUsername;
