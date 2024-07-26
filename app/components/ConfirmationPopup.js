import React from 'react';
import {Text, View, Modal, Pressable, Image, StyleSheet} from 'react-native';
import icons from '../assets/icons';
import {Strings} from '../constants';
import styles from './styles/ConfirmationPopupStyles';
const ConfirmationPopup = ({
  isVisible,
  title = '',
  message = '',
  handleConfirm,
  handleCancel,
  themedStyles,
}) => {
  const modalStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const modalTitle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const descStyle = StyleSheet.compose(
    styles.messageText,
    themedStyles.labelText,
  );
  const cancelStyle = StyleSheet.compose(
    styles.cancelButton,
    themedStyles.inputBorder,
  );
  const cancelTextStyle = StyleSheet.compose(
    styles.cancelText,
    themedStyles.labelText,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={modalStyle}>
            <Text style={modalTitle}>{title}</Text>
            <View style={styles.messageView}>
              <Image style={styles.alertIcon} source={icons.question} />
              <Text style={descStyle}>{message}</Text>
            </View>
            <View style={styles.buttonsView}>
              <Pressable style={cancelStyle} onPress={handleCancel}>
                <Text style={cancelTextStyle}>{Strings.no}</Text>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmText}>{Strings.yes}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ConfirmationPopup;
