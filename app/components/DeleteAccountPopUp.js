import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {createRef, useCallback, useMemo} from 'react';
import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import Schema from '../services/ValidationService';
import {ThemeStyles} from '../theme';
import CustomTextInput from './CustomTextInput';
import styles from './styles/DeleteAccountPopupStyle';

const inputRef = {
  confirmPassword: createRef(),
};
const DeleteAccountPopUp = ({isVisible, setVisible, onDelete}) => {
  const onCancel = useCallback(() => setVisible(false), [setVisible]);
  const onSubmit = useCallback(
    params => onDelete(params.confirmPassword),
    [onDelete],
  );

  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const headerTextStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer}>
          <View style={modalViewStyle}>
            <View style={styles.alertIconView}>
              <Image style={styles.alertIcon} source={Icons.warningTriangle} />
            </View>
            <Text style={headerTextStyle}>{Strings.deleteAccount}</Text>
            <Formik
              initialValues={{confirmPassword: ''}}
              validationSchema={Schema.deleteAccount}
              onSubmit={onSubmit}>
              {({
                errors,
                touched,
                values,
                handleBlur,
                handleChange,
                submitForm,
              }) => {
                return (
                  <>
                    <CustomTextInput
                      editable
                      secureTextEntry
                      showPassword
                      ref={inputRef.confirmPassword}
                      inputStyle={styles.textInput}
                      containerStyle={styles.inputContainer}
                      floatingLabel={Strings.confirmPasswordPlaceHolder}
                      title={Strings.confirmPasswordPlaceHolder}
                      value={values.confirmPassword}
                      error={touched.confirmPassword && errors.confirmPassword}
                      returnKeyType={'done'}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      onBlur={handleBlur('confirmPassword')}
                      onChangeText={handleChange('confirmPassword')}
                    />
                    <View style={styles.buttonView}>
                      <Pressable
                        style={styles.deleteButton}
                        onPress={submitForm}>
                        <Text style={styles.deleteText}>{Strings.delete}</Text>
                      </Pressable>
                      <Pressable style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.cancelText}>{Strings.cancel}</Text>
                      </Pressable>
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default DeleteAccountPopUp;
