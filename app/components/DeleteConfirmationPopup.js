import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {Text, View, Modal, Image, Pressable, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {deleteLocationInfo} from '../constants/Util';
import {ThemeStyles} from '../theme';
import styles from './styles/DeletePopupStyles';
const DeleteConfirmationPopup = ({
  isVisible,
  setVisible,
  onDelete,
  data,
  title,
  message,
  isLocation = false,
}) => {
  const [isTermsAccept, setTerms] = useState(false);
  const onCancel = useCallback(() => setVisible(false), [setVisible]);
  const onModalPress = useCallback(
    () => setVisible(prev => !prev),
    [setVisible],
  );
  const onTermsClick = useCallback(() => setTerms(prev => !prev), []);
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
  const descriptionTextStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const deleteInfo = deleteLocationInfo(data);
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer} onPress={onModalPress}>
          <View style={modalViewStyle}>
            <View style={styles.alertIconView}>
              <Image style={styles.alertIcon} source={Icons.warningTriangle} />
            </View>
            <Text style={headerTextStyle}>{title}</Text>
            <Text style={descriptionTextStyle}>{message}</Text>
            {isLocation ? (
              <Pressable style={styles.termsView} onPress={onTermsClick}>
                {isTermsAccept ? (
                  <Image style={styles.checkIcon} source={Icons.checkbox} />
                ) : (
                  <View style={styles.viewCheckIcon} />
                )}
                <Text style={descriptionTextStyle}>{deleteInfo.termsText}</Text>
              </Pressable>
            ) : null}
            <View style={styles.buttonView}>
              <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelText}>{Strings.cancel}</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={isTermsAccept || !isLocation ? onDelete : null}>
                <Text style={styles.deleteText}>{Strings.delete}</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default DeleteConfirmationPopup;
