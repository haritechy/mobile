import React, {forwardRef, useCallback, useMemo} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './styles/ImagePickerStyles';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../theme';
import {imageSelection} from '../services/Utils';
import {Strings} from '../constants';
const ImagePickerPopup = forwardRef(({onSelectImage}, ref) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const actionSheetStyle = StyleSheet.compose(
    styles.actionSheet,
    themedStyles.themeBackground,
  );
  const cameraAccess = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: Strings.cameraPermission,
            message: Strings.appNeedCameraPermission,
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        alert(Strings.appNeedCameraPermission, error);
        return false;
      }
    } else {
      return true;
    }
  };

  const storageAccess = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: Strings.externalStoragePermission,
            message: Strings.appNeedStoragePermission,
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        alert(Strings.appNeedStoragePermission, error);
      }
      return false;
    } else {
      return true;
    }
  };
  const onSelection = useCallback(
    async isCamera => {
      const options = {
        mediaType: 'photo',
        allowsEditing: true,
        base64: true,
        quality: 1,
      };
      let isCameraPermitted;
      let isStoragePermitted;
      if (isCamera) {
        isCameraPermitted = await cameraAccess();
        if (isCameraPermitted) {
          imageSelection(true, options)
            .then(res => {
              onSelectImage(res);
              SheetManager.hide('picker_sheet');
            })
            .catch(() => SheetManager.hide('picker_sheet'));
        }
      } else {
        isStoragePermitted = await storageAccess();
        if (isStoragePermitted) {
          imageSelection(false, options)
            .then(res => {
              onSelectImage(res);
              SheetManager.hide('picker_sheet');
            })
            .catch(() => SheetManager.hide('picker_sheet'));
        }
      }
    },
    [onSelectImage],
  );
  return (
    <ActionSheet
      id="picker_sheet"
      ref={ref}
      closable
      containerStyle={styles.actionSheetContainer}
      closeOnPressBack={true}
      closeOnTouchBackdrop={true}>
      <View style={actionSheetStyle}>
        <Pressable
          style={styles.actionButton}
          onPress={() => onSelection(false)}>
          <Text style={styles.actionBtnText}>{Strings.photoLibrary}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={styles.actionButton}
          onPress={() => onSelection(true)}>
          <Text style={styles.actionBtnText}>{Strings.takePhoto}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={styles.actionButton}
          onPress={() => {
            ref.current?.hide();
          }}>
          <Text style={styles.actionBtnText}>{Strings.cancel}</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
});
export default ImagePickerPopup;
