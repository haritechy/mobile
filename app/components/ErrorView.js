import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles/ErrorViewStyle';

const ErrorView = ({error, errorStyle}) => (
  <View style={[styles.errorView, errorStyle]}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

export default ErrorView;

ErrorView.propTypes = {
  error: PropTypes.string,
};
