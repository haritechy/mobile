import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Icons} from '../assets';
import {goBack} from '../navigation/services/navigationServices';
import {ThemeStyles} from '../theme';
import styles from './styles/CustomNavBarStyles';

const RightButton = ({
  rightButtonText,
  rightButtonTextStyle,
  onAction,
  isDisable = false,
}) => {
  const rightBtnTextStyle = StyleSheet.compose(styles.buttonText, [
    rightButtonTextStyle,
  ]);
  return (
    <Pressable style={styles.buttonView} onPress={() => onAction()}>
      <Text style={rightBtnTextStyle}>{rightButtonText}</Text>
    </Pressable>
  );
};
const RightActions = ({
  listRightIcons,
  onAction,
  isRightActionVisible,
  isRightButton,
  rightButtonText,
  rightButtonTextStyle,
  themedStyles,
  isNotificationCount,
  notificationCount,
}) => (
  <View style={styles.actionContainer}>
    {isRightActionVisible
      ? listRightIcons.map((icon, i) => (
          <Pressable
            style={styles.iconView}
            key={i}
            onPress={() => onAction(i)}>
            <Image
              source={icon}
              style={StyleSheet.compose(styles.iconStyle, themedStyles.navIcon)}
            />
            {isNotificationCount && notificationCount > 0 ? (
              <View style={styles.notificationCountView}>
                <Text style={styles.notificationCountText}>
                  {notificationCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ))
      : isRightButton && (
          <RightButton {...{rightButtonText, rightButtonTextStyle, onAction}} />
        )}
  </View>
);

const CustomNavBar = ({
  title,
  backIcon = Icons.backArrow,
  isBackVisible = true,
  containerStyle = {},
  isRightActionVisible = false,
  listRightIcons = [],
  isRightButton = false,
  rightButtonText = '',
  isSubtitleVisible = false,
  subtitle = '',
  leftIconStyle,
  headerTextStyle,
  onAction,
  isNotificationCount = false,
  notificationCount,
  onBackPress,
  rightButtonTextStyle,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const headerTitleStyle = StyleSheet.compose(styles.title, [
    !isBackVisible ? styles.mainHeader : {},
    headerTextStyle,
    themedStyles.headerTitle,
  ]);
  const headerContainer = StyleSheet.compose(styles.header, [containerStyle]);
  const backIconStyle = StyleSheet.compose(styles.backButtonStyle, [
    leftIconStyle,
    themedStyles.navIcon,
  ]);
  const mainViewStyle = StyleSheet.compose(
    styles.mainView,
    //themedStyles.themeBackground,
  );
  const centerViewStyle = StyleSheet.compose(
    styles.centerView,
    isBackVisible && styles.centerFlex,
  );
  return (
    <SafeAreaView style={mainViewStyle}>
      <>
        <View style={headerContainer}>
          {isBackVisible ? (
            <Pressable
              style={styles.backButtonContainer}
              onPress={() => {
                onBackPress ? onBackPress() : goBack();
              }}>
              <Image source={backIcon} style={backIconStyle} />
            </Pressable>
          ) : null}
          {
            <View style={centerViewStyle}>
              {isSubtitleVisible ? (
                <Text style={styles.subtitleText}>{subtitle}</Text>
              ) : null}
              <Text style={headerTitleStyle} numberOfLines={1}>
                {title}
              </Text>
            </View>
          }
          <RightActions
            {...{
              listRightIcons,
              onAction,
              isRightActionVisible,
              isRightButton,
              rightButtonText,
              rightButtonTextStyle,
              themedStyles,
              isNotificationCount,
              notificationCount,
            }}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

CustomNavBar.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object,
};

export default CustomNavBar;
