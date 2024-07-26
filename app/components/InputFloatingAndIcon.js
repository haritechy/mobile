import PropTypes from 'prop-types';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import styles from './styles/InputFloatingAndIconStyles';

const FloatingText = ({textValue, placeholder, themedStyles}) => {
  const floatingLabelText = StyleSheet.compose(
    textValue?.length > 0
      ? styles.floatingTextFocus
      : styles.floatingTextUnfocus,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.nonTouchContainer} pointerEvents={'none'}>
      <Text style={floatingLabelText}>{placeholder}</Text>
    </View>
  );
};

const RightIcon = ({icon, onPress}) => (
  <Pressable style={styles.iconsPress} onPress={onPress}>
    {icon}
  </Pressable>
);

const InputFloatingAndIcon = ({
  value,
  label,
  icon,
  iconPress,
  themedStyles,
}) => (
  <>
    {label && (
      <FloatingText textValue={value} placeholder={label} {...{themedStyles}} />
    )}
    {icon && <RightIcon icon={icon} onPress={iconPress} />}
  </>
);

FloatingText.propTypes = {
  textValue: PropTypes.string,
  placeholder: PropTypes.string,
};

RightIcon.propTypes = {
  icon: PropTypes.element,
  onPress: PropTypes.func,
};

InputFloatingAndIcon.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
  iconPress: PropTypes.func,
};
export default InputFloatingAndIcon;
