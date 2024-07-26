import React, {createRef, useImperativeHandle, useState} from 'react';
import {Modal, View, Text} from 'react-native';
import {Strings} from '../constants';
import styles from './styles/NoInternetStyles';
export const connectionRef = createRef();

const NoInternet = () => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(
    connectionRef,
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
      style={styles.connectionModalView}
      onRequestClose={() => {}}>
      <View style={styles.mainView}>
        <View style={styles.opacityContainer} />
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{Strings.noInternet}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default NoInternet;
