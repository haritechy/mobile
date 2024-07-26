import React, {useState} from 'react';
import {Switch, Platform} from 'react-native';
import styles from './styles/CustomSwitchStyle';
import {Colors} from '../theme';
const CustomSwitch = ({
  defaultValue,
  disabled = false,
  toggleSwitch,
  isEnabled,
  style,
}) => {
  return (
    <>
      <Switch
        style={style ? style : styles.toggleButton}
        trackColor={{
          false: Platform.OS === 'android' ? Colors.inputBorder : Colors.white,
          true: defaultValue ? Colors.appThemeColor : Colors.appThemeColor,
        }}
        thumbColor={
          isEnabled
            ? defaultValue
              ? Colors.white
              : Colors.white
            : Colors.black
        }
        disabled={disabled}
        borderColor={Colors.black}
        ios_backgroundColor={Colors.white}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </>
  );
};
export default CustomSwitch;
