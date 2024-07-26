import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {reminderData} from '../constants/Mockdata';
import {ThemeStyles} from '../theme';
import CustomButton from './CustomButton';
import styles from './styles/ReminderPopupStyle';
const ReminderPopup = ({
  isVisible,
  setVisible,
  handleCloseReminder,
  handleSendVerification,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const descriptionTextStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const closeIconStyle = StyleSheet.compose(
    styles.closeIcon,
    themedStyles.navIcon,
  );
  const alertIconStyle = StyleSheet.compose(
    styles.alertIcon,
    themedStyles.navIcon,
  );
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer} onPress={handleCloseReminder}>
          <View style={modalViewStyle}>
            <View style={styles.closeIconView}>
              <Image style={closeIconStyle} source={Icons.closeIcon} />
            </View>
            <View style={styles.alertIconView}>
              <Image style={alertIconStyle} source={Icons.notifications} />
            </View>
            <Text style={descriptionTextStyle}>{reminderData.description}</Text>
            <View style={styles.buttonView}>
              <CustomButton
                title={Strings.clickHere}
                style={styles.buttonContainer}
                onPress={handleSendVerification}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default ReminderPopup;
