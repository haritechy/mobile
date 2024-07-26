import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, View, Modal, Pressable, StyleSheet} from 'react-native';
import {AppConstants, Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/ConfirmDeleteStyles';
const ConfirmDeletePopup = ({isVisible, setVisible, onDelete, type = ''}) => {
  const warningType = () => {
    const {deleteTypes} = AppConstants;
    switch (type) {
      case deleteTypes.Location:
        return Strings.locations;
      case deleteTypes.Product:
        return Strings.products;
      case deleteTypes.Receipt:
        return Strings.receipt;
      default:
        return '';
    }
  };
  const onCancel = useCallback(() => setVisible(false), [setVisible]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const confirmTextStyle = StyleSheet.compose(
    styles.confirmText,
    themedStyles.labelText,
  );
  const bottomViewStyle = StyleSheet.compose(
    styles.bottomView,
    themedStyles.themeBackground,
  );
  const topViewStyle = StyleSheet.compose(
    styles.topView,
    themedStyles.themeBackground,
  );
  const {deleteTypes} = AppConstants;
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setVisible(!isVisible)}>
          <Pressable style={styles.modalView}>
            <View style={topViewStyle}>
              <Text style={confirmTextStyle}>
                {`${
                  type === deleteTypes.Receipt
                    ? Strings.sureToDeleteThis
                    : Strings.sureToDeleteThese
                } ${warningType() + ' ?'} ${
                  type === deleteTypes.Location
                    ? Strings.deleteLocationDescription
                    : ''
                }`}
              </Text>
              <View style={styles.separator} />
              <Text
                suppressHighlighting={true}
                style={styles.deleteText}
                onPress={onDelete}>
                {Strings.delete}
              </Text>
            </View>
            <Pressable style={bottomViewStyle} onPress={onCancel}>
              <Text style={styles.cancelText}>{Strings.cancel}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
export default ConfirmDeletePopup;
