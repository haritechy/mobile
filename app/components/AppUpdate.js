import React, {Fragment, useCallback} from 'react';
import {Image, Linking, Platform, Pressable, Text, View} from 'react-native';
import {Images} from '../assets';
import {ScreenContainer} from '.';
import {Strings} from '../constants';
import strings from '../constants/Strings';
import ApiConstants from '../constants/ApiConstants';
import {useDispatch} from 'react-redux';
import {setUpdateApp} from '../redux/actions/settingActions';
import styles from './styles/AppUpdateStyles';

const renderContent =
  ({onUpdate, onNotNowPress}) =>
  () =>
    (
      <Fragment>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <Image source={Images.appUpdate} style={styles.image} />
          </View>
          <View style={styles.descView}>
            <Text style={styles.descTitle}>{Strings.timeToUpdate}</Text>
            <Text style={styles.descText}>{Strings.appUpdateDescription}</Text>
          </View>
          <View style={styles.updateButtonView}>
            <Pressable style={styles.updateButton} onPress={onUpdate}>
              <Text style={styles.updateText}>{Strings.update}</Text>
            </Pressable>
            <Pressable style={styles.notNowButton} onPress={onNotNowPress}>
              <Text style={styles.titleText}>{strings.notNow}</Text>
            </Pressable>
          </View>
        </View>
      </Fragment>
    );

const AppUpdate = () => {
  const dispatch = useDispatch();
  const onUpdate = useCallback(() => {
    Platform.OS === 'ios'
      ? Linking.openURL(ApiConstants.appStoreUrl)
      : Linking.openURL(ApiConstants.playStoreUrl);
  }, []);

  const onNotNowPress = useCallback(
    () => dispatch(setUpdateApp(false)),
    [dispatch],
  );
  return (
    <ScreenContainer renderContent={renderContent({onUpdate, onNotNowPress})} />
  );
};
export default AppUpdate;
