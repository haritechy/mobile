import PropTypes from 'prop-types';
import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './styles/CustomPressableStyles';

const CustomPressable = ({style, textStyle, text, onPress}) => (
  <Pressable style={[styles.buttonTouchable, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </Pressable>
);

CustomPressable.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default CustomPressable;
