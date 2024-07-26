import React, {createRef} from 'react';
import {Image, View, Text, Pressable, StyleSheet} from 'react-native';
import {Icons, Images} from '../theme';
import styles from './styles/CustomImagePickerStyle';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Strings} from '../constants';
import {imageSelection} from '../services/Utils';
import FastImageView from './FastImageView';
const CustomImagePicker = ({
  onSelectImage,
  selectedProfile,
  themedStyles,
  profileUrl,
}) => {
  const actionSheetRef = createRef();
  const sheetContainer = StyleSheet.compose(
    styles.actionSheetContainer,
    themedStyles.themeBackground,
  );
  const profileContainerStyle = StyleSheet.compose(
    styles.imageContainer,
    themedStyles.inputBorder,
  );
  return (
    <View style={styles.mainViewImgPicker}>
      <ActionSheet
        id="action_sheet"
        ref={actionSheetRef}
        closeOnPressBack={true}
        containerStyle={sheetContainer}
        closeOnTouchBackdrop={true}>
        <View style={styles.actionSheet}>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              const options = {
                mediaType: 'photo',
                allowsEditing: true,
                base64: true,
                quality: 1,
              };
              imageSelection(false, options)
                .then(res => {
                  onSelectImage(res);
                  SheetManager.hide('action_sheet');
                })
                .catch(err => {
                  console.log('Camera selection ', err);
                  SheetManager.hide('action_sheet');
                });
            }}>
            <Text style={styles.actionBtnText}>{Strings.photoLibrary}</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              const options = {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 550,
                quality: 1,
              };
              imageSelection(true, options)
                .then(res => {
                  onSelectImage(res);
                  SheetManager.hide('action_sheet');
                })
                .catch(err => {
                  console.log('Camera selection ', err);
                  SheetManager.hide('action_sheet');
                });
            }}>
            <Text style={styles.actionBtnText}>{Strings.takePhoto}</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <Text style={styles.actionBtnText}>{Strings.cancel}</Text>
          </Pressable>
        </View>
      </ActionSheet>
      {selectedProfile?.uri ? (
        <>
          <FastImageView
            style={styles.avatarImg}
            uri={selectedProfile?.uri}
            defaultSource={Images.emptyProfile}
          />
          <Pressable
            style={styles.editAvatarButton}
            onPress={() => {
              actionSheetRef.current?.show();
            }}>
            <Image
              style={styles.avatarIcon}
              source={Icons.editProfileImgCamera}
            />
          </Pressable>
        </>
      ) : (
        <>
          <View style={profileContainerStyle}>
            <FastImageView
              style={styles.avatarImg}
              uri={profileUrl}
              defaultSource={Images.emptyProfile}
            />
          </View>
          <Pressable
            style={styles.editAvatarButton}
            onPress={() => {
              actionSheetRef.current?.show();
            }}>
            <Image
              style={styles.avatarIcon}
              source={Icons.editProfileImgCamera}
            />
          </Pressable>
        </>
      )}
    </View>
  );
};
export default CustomImagePicker;
