import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {Text, View, Modal, Image, Pressable, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {invalidPhoneEmailData} from '../constants/Mockdata';
import {ThemeStyles} from '../theme';
import CustomButton from './CustomButton';
import styles from './styles/InvalidUserPasswordStyles';
const InvalidUserPasswordPopup = ({isVisible, setVisible, isForUsername}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const handleOk = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const textStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  const descriptionTextStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const modalStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer} onPress={handleOk}>
          <View style={styles.opacityView} />
          <View style={modalStyle}>
            <Image
              style={styles.alertIcon}
              source={Icons.exclamationTriangleCircle}
            />
            <Text style={textStyle}>{Strings.invalidPhoneEmail}</Text>
            <Text style={descriptionTextStyle}>
              {invalidPhoneEmailData.description}
              <Text style={styles.errorType}>
                {` ${isForUsername ? Strings.userName : Strings.password}`}
              </Text>
            </Text>
            <View style={styles.buttonView}>
              <CustomButton
                title={Strings.ok}
                textStyle={styles.oktext}
                style={styles.buttonContainer}
                onPress={handleOk}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default InvalidUserPasswordPopup;
