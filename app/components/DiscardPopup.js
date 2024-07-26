import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/DiscardPopupStyle';

const DiscardPopup = ({isVisible, setVisible, onDiscardPress}) => {
  const onCancel = useCallback(() => setVisible(false), [setVisible]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const headerTextStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  const cancelTextStyle = StyleSheet.compose(
    styles.cancelText,
    themedStyles.labelText,
  );
  const cancelButtonStyle = StyleSheet.compose(
    styles.cancelButton,
    themedStyles.inputBorder,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer}>
          <View style={modalViewStyle}>
            <Text style={headerTextStyle}>{Strings.doYouDiscard}</Text>
            <View style={styles.buttonView}>
              <Pressable style={styles.discardButton} onPress={onDiscardPress}>
                <Text style={styles.discardText}>{Strings.discard}</Text>
              </Pressable>
              <Pressable style={cancelButtonStyle} onPress={onCancel}>
                <Text style={cancelTextStyle}>{Strings.cancel}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default DiscardPopup;
