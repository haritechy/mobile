import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors, Icons, ThemeStyles} from '../theme';
import {InputFloatingAndIcon} from './';
import {CountryListPopup} from './../components';
import styles from './styles/CustomPhoneInputStyles';

const ErrorView = ({error, errorStyle}) => (
  <View style={[styles.errorView, errorStyle]}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);
const InputCountryCode = ({
  codeTextStyle,
  countryCode,
  onSelect,
  themedStyles,
}) => {
  const downIconStyle = StyleSheet.compose(
    styles.downIcon,
    themedStyles.navWhiteIcon,
  );
  return (
    <Pressable style={styles.countryCodeView} onPress={onSelect}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={codeTextStyle}>{`${
        countryCode || ''
      }`}</Text>
      <Image style={downIconStyle} source={Icons.arrowDown} />
    </Pressable>
  );
};
const CustomPhoneInput = forwardRef(
  (
    {
      error,
      floatingLabel,
      rightIcon,
      leftIcon,
      placeholderTextColor = Colors.grey,
      blurOnSubmit = false,
      returnKeyType = 'next',
      isShadow = false,
      shouldInputMask = false,
      containerStyle = {},
      inputStyle = {},
      errorStyle = {},
      onPress,
      leftText = null,
      leftTextStyle = {},
      multiline,
      phoneContainer,
      countryCode,
      setCountryCode,
      listCountries,
      ...otherProps
    },
    ref,
  ) => {
    const colors = useTheme();
    const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
    const {value} = otherProps;
    const isFloatingEnable = floatingLabel && value;
    const inputContainer = StyleSheet.compose(styles.inputContainer, [
      containerStyle,
      isShadow && styles.shadowContainer,
      isFloatingEnable && styles.paddingTop,
      error && styles.errorBorder,
    ]);
    const mainContainer = StyleSheet.compose(styles.container, phoneContainer);
    const inputTextStyle = StyleSheet.compose(styles.textInput, [
      inputStyle,
      themedStyles.labelText,
    ]);
    const onSelect = useCallback(() => setVisible(true), []);
    const [isVisible, setVisible] = useState(false);
    const codeTextStyle = StyleSheet.compose(
      styles.codeText,
      themedStyles.labelText,
    );
    return (
      <>
        <View style={mainContainer}>
          <InputCountryCode
            {...{
              codeTextStyle,
              countryCode,
              onSelect,
              themedStyles,
            }}
          />
          <Pressable style={inputContainer} onPress={onPress}>
            {leftIcon && <Image source={leftIcon} style={styles.leftIcon} />}
            {leftText && <Text style={leftTextStyle}>{leftText}</Text>}
            {!shouldInputMask && (
              <TextInput
                ref={ref}
                style={inputTextStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholderTextColor={placeholderTextColor}
                blurOnSubmit={blurOnSubmit}
                returnKeyType={returnKeyType}
                maxLength={10}
                {...otherProps}
                multiline={multiline}
              />
            )}
            {rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
            <InputFloatingAndIcon
              value={value}
              label={floatingLabel}
              {...{themedStyles}}
            />
          </Pressable>
        </View>
        <CountryListPopup
          {...{isVisible, setVisible, setCountryCode, listCountries}}
        />
        {error && <ErrorView {...{error, errorStyle}} />}
      </>
    );
  },
);

CustomPhoneInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
  floatingLabel: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  onIconPress: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  returnKeyType: PropTypes.string,
  isShadow: PropTypes.bool,
  shouldInputMask: PropTypes.bool,
};

export default CustomPhoneInput;
