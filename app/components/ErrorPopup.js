import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, View, Modal, Pressable, Image, StyleSheet} from 'react-native';
import icons from '../assets/icons';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/ErrorPopupStyles';
const ErrorPopup = ({isVisible, setVisible, errorText}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const handleOk = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const errorTextStyle = StyleSheet.compose(
    styles.errorText,
    themedStyles.headerTitle,
  );
  const modalStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={modalStyle}>
            <Image
              style={styles.alertIcon}
              source={icons.exclamationTriangleCircle}
            />
            <Text style={errorTextStyle}>
              {errorText || Strings.somethingWentWrong}
            </Text>
            <Pressable style={styles.okButton} onPress={handleOk}>
              <Text style={styles.okText}>{Strings.ok}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ErrorPopup;
