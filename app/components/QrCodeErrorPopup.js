import React, {useCallback} from 'react';
import {Text, View, Modal, Pressable} from 'react-native';
import {Strings} from '../constants';
import CustomButton from './CustomButton';
import styles from './styles/QrCodeErrorStyles';
const QrCodeErrorPopup = ({isVisible, setVisible, onCancel, onManualEntry}) => {
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setVisible(!isVisible)}>
          <View style={styles.modalView}>
            <Text style={styles.headerText}>{Strings.barcodeNotScanned}</Text>
            <Text style={styles.subtitleText}>{Strings.qrErrorDesc}</Text>

            <View style={styles.buttonView}>
              <CustomButton
                title={Strings.enterManually}
                style={styles.skipButton}
                onPress={onManualEntry}
              />
              <CustomButton
                title={Strings.cancel}
                style={styles.cancelButton}
                onPress={onCancel}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default QrCodeErrorPopup;
