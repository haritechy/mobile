import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, View, Modal, Image, Pressable, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/VerifyDeleteAccountStyle';

const VerifyDeleteAccountPopup = ({isVisible, setVisible, onVerifyDelete}) => {
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
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer}>
          <View style={modalViewStyle}>
            <View style={styles.alertIconView}>
              <Image style={styles.alertIcon} source={Icons.warningTriangle} />
            </View>
            <Text style={headerTextStyle}>{Strings.areYouSure}</Text>
            <View style={styles.buttonView}>
              <Pressable style={styles.deleteButton} onPress={onVerifyDelete}>
                <Text style={styles.deleteText}>{Strings.yes}</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelText}>{Strings.no}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default VerifyDeleteAccountPopup;
