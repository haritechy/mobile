import React from 'react';
import {View} from 'react-native';

import styles from './styles/SeapratorViewStyle';
const SeparatorView = ({style}) => {
  return <View style={[styles.container, style]} />;
};
export default SeparatorView;
