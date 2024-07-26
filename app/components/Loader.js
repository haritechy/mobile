import React, {createRef, useImperativeHandle, useState} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {Colors} from '../theme';
import styles from './styles/LoaderStyle';
export const loaderRef = createRef();

const Loader = () => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(
    loaderRef,
    () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }),
    [],
  );
  return (
    <Modal
      transparent
      animated
      visible={isVisible}
      style={styles.loaderModalView}
      onRequestClose={() => {}}>
      <View style={styles.opacityContainer} />
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
          color={Colors.appThemeColor}
          style={styles.loaderIndicator}
        />
      </View>
    </Modal>
  );
};
export default Loader;
