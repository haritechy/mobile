import {useTheme} from '@react-navigation/native';
import React, {createRef, useMemo} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {FastImageView} from '.';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/AddImagePickerStyle';

const AddImagePicker = ({
  onSelectImage,
  data,
  imageUrl = '',
  isMultiple = false,
  setImageList = undefined,
  setImageChanged = undefined,
  isEdit = false,
  handleDeleteImage = undefined,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const cameraIcnStyle = StyleSheet.compose(
    styles.cameraIcn,
    themedStyles.navWhiteIcon,
  );
  const addPhotoTextStyle = StyleSheet.compose(
    styles.addPhotoText,
    themedStyles.placeholder,
  );
  const actionSheetStyle = StyleSheet.compose(
    styles.actionSheet,
    themedStyles.themeBackground,
  );

  const actionSheetRef = createRef();
  const cameraAccess = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App need camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn(error);
        alert('Camera Permission needs', error);
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
            title: 'External Storage Write Permission',
            message: 'App needs  storage Access',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn(error);
        alert('storage Permission needs', error);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    var options = {
      mediaType: type,
      maxWidth: 360,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    var isCameraPermitted = await cameraAccess();
    var isStoragePermitted = await storageAccess();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          return SheetManager.hide('action_sheet');
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not Satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }
        onSelectImage(response);
        SheetManager.hide('action_sheet');
      });
    }
  };
  const fileSelection = type => {
    var options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return SheetManager.hide('action_sheet');
      } else if (response.errorCode == 'camera_available') {
        alert('Storage does not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not given');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      onSelectImage(response);
      SheetManager.hide('action_sheet');
    });
  };
  const handleRemove = image => {
    const index = data.indexOf(image);
    if (index !== -1) {
      data.splice(index, 1);
      setImageList([...data]);
      isEdit && setImageChanged(true);
    }
  };
  return (
    <View>
      <ActionSheet
        id="action_sheet"
        ref={actionSheetRef}
        closable
        containerStyle={styles.actionSheetContainer}
        closeOnPressBack={true}
        closeOnTouchBackdrop={true}>
        <View style={actionSheetStyle}>
          <Pressable
            style={styles.actionButton}
            onPress={() => fileSelection('photo')}>
            <Text style={styles.actionBtnText}>{Strings.photoLibrary}</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={styles.actionButton}
            onPress={() => captureImage('photo')}>
            <Text style={styles.actionBtnText}>{Strings.takePhoto}</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionBtnText}>{Strings.cancel}</Text>
          </Pressable>
        </View>
      </ActionSheet>
      {isMultiple ? (
        <Pressable
          style={styles.multiImagesContainer}
          onPress={() => {
            data?.length === 0 && actionSheetRef.current?.show();
          }}>
          {data?.length === 0 ? (
            <Pressable
              style={styles.cameraView}
              onPress={() => {
                actionSheetRef.current?.show();
              }}>
              <Image style={cameraIcnStyle} source={Icons.camera} />
              <Text style={addPhotoTextStyle}>{Strings.addPhoto}</Text>
            </Pressable>
          ) : (
            <View style={styles.imageHorizontalView}>
              {data?.map((image, index) => {
                return (
                  <View key={index}>
                    <FastImageView
                      style={styles.multipleImageItm}
                      uri={
                        image?.isNew
                          ? image?.uri
                          : image?.imageUrl || image?.uri
                      }
                    />
                    <Pressable
                      style={[styles.cancelView, {zIndex: index}]}
                      onPress={() =>
                        isEdit ? handleDeleteImage(image) : handleRemove(image)
                      }>
                      <Image style={styles.cancelIcn} source={Icons.cross} />
                    </Pressable>
                  </View>
                );
              })}
              {data?.length < 4 && (
                <Pressable
                  style={styles.addImageView}
                  onPress={() => actionSheetRef.current?.show()}>
                  <Image style={cameraIcnStyle} source={Icons.plus} />
                </Pressable>
              )}
            </View>
          )}
        </Pressable>
      ) : (
        <Pressable
          style={styles.imagePickerContainer}
          onPress={() => {
            actionSheetRef.current?.show();
          }}>
          {data || imageUrl ? (
            <FastImageView style={styles.imagePicker} uri={data || imageUrl} />
          ) : null}
          {!(data || imageUrl) && (
            <Pressable
              style={styles.cameraView}
              onPress={() => {
                actionSheetRef.current?.show();
              }}>
              <Image style={cameraIcnStyle} source={Icons.camera} />
              <Text style={addPhotoTextStyle}>{Strings.addPhoto}</Text>
            </Pressable>
          )}
        </Pressable>
      )}
    </View>
  );
};
export default AddImagePicker;
