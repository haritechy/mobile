import React, {useCallback} from 'react';
import {Image, Text, Pressable, View, StyleSheet} from 'react-native';
import {NavigationRoutes, Strings} from '../constants';
import {navigate} from '../navigation/services/navigationServices';
import {Icons} from '../theme';
import styles from './styles/AccountItemStyle';

const CustomAccountItem = ({
  item,
  userInfo,
  themedStyles,
  navigation,
  setDeleteAccount,
  setSureToDelete,
  isSocialLogin,
}) => {
  const navigateTo = useCallback(
    setting => {
      switch (setting.title) {
        case Strings.profile:
          return navigation.navigate(NavigationRoutes.ProfileScreen);
        case Strings.changePassword:
          return navigate(NavigationRoutes.ChangePassword);
        case Strings.alertAndNotifications:
          return navigate(NavigationRoutes.AlertAndNotification, {
            data: setting.value,
          });
        case Strings.authentication:
          return navigate(NavigationRoutes.Authentication);
        case Strings.theme:
          return navigate(NavigationRoutes.ThemeScreen);
        case Strings.policies:
          return navigate(NavigationRoutes.PrivacyScreen);
        case Strings.deleteAccount:
          if (isSocialLogin) {
            setSureToDelete(true);
          } else {
            setDeleteAccount(true);
          }
          break;
        default:
          break;
      }
    },
    [isSocialLogin, navigation, setDeleteAccount, setSureToDelete],
  );

  const itemText = StyleSheet.compose(styles.titleText, themedStyles.labelText);
  const seperator = StyleSheet.compose(
    styles.separator,
    themedStyles.seperator,
  );
  const rigtArrowStyle = StyleSheet.compose(
    styles.rightIcn,
    themedStyles.navIcon,
  );
  const isItemVisible = () => {
    if (item.title === Strings.changePassword) {
      return !userInfo?.isSocialLogIn;
    } else {
      return true;
    }
  };
  return isItemVisible() ? (
    <View style={styles.contentContainer}>
      <Pressable style={styles.rowContainer} onPress={() => navigateTo(item)}>
        <View style={styles.leftView}>
          <Text style={itemText}>{item.title}</Text>
        </View>
        <Image source={Icons.arrowRight} style={rigtArrowStyle} />
      </Pressable>
      <View style={seperator} />
    </View>
  ) : null;
};
export default CustomAccountItem;
