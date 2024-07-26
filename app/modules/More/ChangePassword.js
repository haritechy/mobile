// THIRD PARTY IMPORTS
import PropTypes from 'prop-types';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// LOCAL IMPORTS
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Strings from '../../constants/Strings';
// LOCAL IMPORTS
import Schema from '../../services/ValidationService';
import styles from './styles/ChangePasswordStyle';
// THIRD PARTY IMPORTS
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomNavBar,
  ErrorPopup,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants} from '../../constants';
import {changePassword} from '../../redux/actions/settingActions';
import {ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  currentPassword: createRef(),
  newPassword: createRef(),
  confirmNewPassword: createRef(),
};

const CurrentPasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    secureTextEntry
    showPassword
    editable
    ref={inputRef.currentPassword}
    autoCapitalize={'none'}
    returnKeyType={'next'}
    keyboardType={'default'}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.currentPassword}
    title={Strings.currentPassword}
    value={values.currentPassword}
    error={touched.currentPassword && errors.currentPassword}
    errorStyle={styles.errorStyle}
    onBlur={handleBlur('currentPassword')}
    onChangeText={handleChange('currentPassword')}
    onSubmitEditing={() => inputRef.newPassword.current.focus()}
  />
);

const NewPasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}) => (
  <CustomTextInput
    secureTextEntry
    showPassword
    editable
    ref={inputRef.newPassword}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.newPassword}
    title={Strings.newPassword}
    value={values.newPassword}
    error={touched.newPassword && errors.newPassword}
    errorStyle={styles.errorStyle}
    returnKeyType={'next'}
    keyboardType={'default'}
    onBlur={handleBlur('newPassword')}
    onChangeText={handleChange('newPassword')}
    onSubmitEditing={() => inputRef.confirmNewPassword.current.focus()}
  />
);

const ConfirmNewPasswordTextInput = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
  submitForm,
}) => (
  <CustomTextInput
    secureTextEntry
    showPassword
    editable
    ref={inputRef.confirmNewPassword}
    inputStyle={styles.textInput}
    containerStyle={styles.inputContainer}
    floatingLabel={Strings.confirmNewPassword}
    title={Strings.confirmNewPassword}
    value={values.confirmNewPassword}
    error={touched.confirmNewPassword && errors.confirmNewPassword}
    errorStyle={styles.errorStyle}
    returnKeyType={'done'}
    keyboardType={'default'}
    onBlur={handleBlur('confirmNewPassword')}
    onChangeText={handleChange('confirmNewPassword')}
    onSubmitEditing={submitForm}
  />
);

const MarginTextInput = () => {
  return <View style={styles.marginTextInput} />;
};

const SubmitButton = ({submitForm}) => {
  return (
    <CustomButton
      title={Strings.saveChanges}
      style={styles.buttonContainer}
      onPress={submitForm}
    />
  );
};

const RenderResetPasswordInputs = params => (
  <View style={styles.formInputs}>
    <CurrentPasswordTextInput {...params} />
    <NewPasswordTextInput {...params} />
    <ConfirmNewPasswordTextInput {...params} />
    <MarginTextInput />
    <SubmitButton {...params} />
  </View>
);
const changePass = createRef();
export const ChangePassword = () => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const {changePasswordData, changePasswordError} = useSelector(
    state => state.settingReducer,
  );
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  const [isVisible, setVisible] = useState(false);
  const [isSuccess, setSuccessPopup] = useState(false);
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const headerDescStyle = StyleSheet.compose(
    styles.headerDesc,
    themedStyles.placeholder,
  );
  useEffect(() => {
    changePasswordError && setVisible(true);
    if (changePasswordData?.result) {
      setSuccessPopup(true);
      changePass.current.resetForm();
    } else {
      changePasswordData?.result === false && setVisible(true);
    }
  }, [changePasswordData, changePasswordError]);
  useFocusEffect(
    useCallback(() => {
      enableAdjustPan();
      return () => disableAdjustPan();
    }, [disableAdjustPan, enableAdjustPan]),
  );
  const onSubmit = useCallback(
    async params => {
      console.log('params ', params);
      loaderRef.current.show();
      const passData = {
        oldPassword: params?.currentPassword,
        newPassword: params?.newPassword,
        confirmPassword: params?.confirmNewPassword,
      };
      dispatch(changePassword(passData));
    },
    [dispatch],
  );

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.changePassword}
            containerStyle={styles.headerContainer}
          />
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={Schema.changePwd}
              innerRef={changePass}
              onSubmit={onSubmit}>
              {({...params}) => (
                <View style={styles.container}>
                  <View style={[styles.contentContainerStyle]}>
                    <Text style={headerDescStyle}>
                      {Strings.changePwdHeaderDesc}
                    </Text>
                    <RenderResetPasswordInputs {...params} />
                  </View>
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
          <ErrorPopup
            {...{isVisible, setVisible}}
            errorText={
              changePasswordError
                ? changePasswordError
                : changePasswordData?.message
            }
          />
          <SuccessPopup
            isVisible={isSuccess}
            setVisible={setSuccessPopup}
            successText={changePasswordData?.message}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.ChangePassword)}
          />
        </>
      )}
    />
  );
};

export default ChangePassword;
CurrentPasswordTextInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
};
