import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, View, Modal, Pressable, StyleSheet} from 'react-native';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/SuccessPopupStyles';
const SuccessPopup = ({isVisible, setVisible, successText, onOkPress}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const handleOk = useCallback(() => {
    setVisible(false);
    onOkPress && onOkPress();
  }, [onOkPress, setVisible]);
  const successTextStyle = StyleSheet.compose(
    styles.successText,
    themedStyles.labelText,
  );
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={modalViewStyle}>
            <Text style={successTextStyle}>{successText}</Text>
            <Pressable style={styles.okButton} onPress={handleOk}>
              <Text style={styles.okText}>{Strings.ok}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SuccessPopup;
