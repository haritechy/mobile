import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator, Text, Pressable} from 'react-native';
import {Colors} from '../theme';
import styles from './styles/CustomButtonStyle';

const CustomButton = ({
  onPress,
  disabled,
  isLoading,
  style,
  title,
  textStyle,
}) => (
  <Pressable
    activeOpacity={0.7}
    disabled={disabled || isLoading}
    style={[styles.buttonTouchable, style]}
    onPress={onPress}>
    {isLoading ? (
      <ActivityIndicator size={'small'} color={Colors.white} />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    )}
  </Pressable>
);

CustomButton.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string,
  textStyle: PropTypes.object,
};

export default CustomButton;
