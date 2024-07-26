import React, {forwardRef} from 'react';
import {View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import ErrorView from './ErrorView';
import styles from './styles/CustomOtpTextInputStyle';

const CustomOtpTextInput = forwardRef(
  (
    {
      style,
      handleChange,
      handleBlur,
      errors,
      error,
      touched,
      values,
      errorStyle,
      inputStyles,
      clearTextOnFocus,
      defaultValue,
      numberOfInputs,
    },
    ref,
  ) => {
    return (
      <>
        <View style={[styles.container, style]}>
          <OtpInputs
            ref={ref}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            values={values}
            numberOfInputs={numberOfInputs}
            defaultValue={defaultValue}
            inputStyles={inputStyles}
            keyboardType={'phone-pad'}
            autoFocus
            clearTextOnFocus={clearTextOnFocus}
          />
        </View>
        {error && <ErrorView {...{error, errorStyle}} />}
      </>
    );
  },
);
export default CustomOtpTextInput;
