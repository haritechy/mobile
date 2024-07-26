import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {forwardRef, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import {InputFloatingAndIcon} from './';
import styles from './styles/CustomTextInputStyles';

const ErrorView = ({error, errorStyle}) => (
  <View style={[styles.errorView, errorStyle]}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

const ShowPasswordView = ({showPassword, setShowPassword}) => (
  <Pressable
    style={styles.rightButtonView}
    onPress={() => {
      setShowPassword(!showPassword);
    }}>
    <Text style={styles.rightButtonText}>
      {showPassword ? Strings.show : Strings.hide}
    </Text>
  </Pressable>
);
const ShowEditView = ({showEditable, onRightAction}) => (
  <Pressable style={styles.rightButtonView} onPress={onRightAction}>
    <Text style={styles.visibleTextStyle}>
      {showEditable ? null : Strings.edit}
    </Text>
  </Pressable>
);
const CustomTextInput = forwardRef(
  (
    {
      style,
      error,
      floatingLabel,
      rightIcon,
      leftIcon,
      secureTextEntry,
      placeholderTextColor,
      blurOnSubmit = false,
      returnKeyType = 'next',
      isShadow = false,
      shouldInputMask = false,
      containerStyle,
      inputStyle,
      errorStyle,
      onPress,
      onRightAction,
      editable,
      maxLength,
      leftText = null,
      leftTextStyle = {},
      multiline,
      isBorder = true,
      rightActionIcn = undefined,
      ...otherProps
    },
    ref,
  ) => {
    const colors = useTheme();
    const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
    const {value} = otherProps;
    const [showPassword, setShowPassword] = useState(secureTextEntry);
    const [showEditable, setShowEditable] = useState(editable);

    useEffect(() => {
      setShowEditable(editable);
    }, [editable]);

    const isFloatingEnable = floatingLabel && value;
    const inputContainer = StyleSheet.compose(styles.inputContainer, [
      containerStyle,
      isShadow && styles.shadowContainer,
      isFloatingEnable && styles.paddingTop,
      isBorder && themedStyles.inputBorder,
      error && styles.errorBorder,
    ]);
    const inputTextStyle = StyleSheet.compose(styles.textInput, [
      themedStyles.inputText,
      inputStyle,
    ]);
    const leftIconStyle = StyleSheet.compose(
      styles.leftIcon,
      themedStyles.navWhiteIcon,
    );
    const rightIconStyle = StyleSheet.compose(
      styles.rightIcon,
      themedStyles.navIcon,
    );
    const rightActionStyle = StyleSheet.compose(
      styles.rightAction,
      themedStyles.navIcon,
    );
    return (
      <>
        <Pressable style={inputContainer} onPress={onPress}>
          {leftIcon && <Image source={leftIcon} style={leftIconStyle} />}
          {leftText && <Text style={leftTextStyle}>{leftText}</Text>}
          {!shouldInputMask && (
            <TextInput
              ref={ref}
              style={inputTextStyle}
              placeholderStyle={styles.placeholderStyle}
              placeholderTextColor={
                colors.placeHolderColor || placeholderTextColor
              }
              blurOnSubmit={blurOnSubmit}
              returnKeyType={returnKeyType}
              secureTextEntry={showPassword}
              editable={showEditable}
              {...otherProps}
              multiline={multiline}
              maxLength={maxLength}
            />
          )}
          {rightIcon && <Image source={rightIcon} style={rightIconStyle} />}
          {rightActionIcn && (
            <Pressable onPress={onRightAction}>
              <Image source={rightActionIcn} style={rightActionStyle} />
            </Pressable>
          )}
          <InputFloatingAndIcon
            value={value}
            label={floatingLabel}
            {...{themedStyles}}
          />
          {otherProps.showPassword && (
            <ShowPasswordView
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          {otherProps.showEditable && (
            <ShowEditView
              showEditable={showEditable}
              setShowEditable={setShowEditable}
              onRightAction={onRightAction}
            />
          )}
        </Pressable>
        {error ? <ErrorView {...{error, errorStyle}} /> : null}
      </>
    );
  },
);

CustomTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
  floatingLabel: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  rightIcon: PropTypes.any,
  leftIcon: PropTypes.any,
  secureTextEntry: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  returnKeyType: PropTypes.string,
  isShadow: PropTypes.bool,
  shouldInputMask: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onRightAction: PropTypes.func,
  editable: PropTypes.bool,
  maxLength: PropTypes.number,
  leftText: PropTypes.string,
  leftTextStyle: PropTypes.object,
  multiline: PropTypes.bool,
  isBorder: PropTypes.bool,
};

export default CustomTextInput;
