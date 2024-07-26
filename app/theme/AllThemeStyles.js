import {StyleSheet} from 'react-native';

const styles = colors =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerTitle: {
      color: colors.black,
    },
    labelText: {
      color: colors.black,
    },
    seperator: {
      backgroundColor: colors.lightGray,
    },
    themeBackground: {
      backgroundColor: colors.themeBackground,
    },
    navIcon: {
      tintColor: colors.black,
    },
    inputText: {
      color: colors.black,
    },
    inputBorder: {
      borderColor: colors.inputBorder,
    },
    placeholder: {
      color: colors.placeHolderColor,
    },
    navWhiteIcon: {
      tintColor: colors.navWhiteIcon,
    },
    defaultText: {
      color: colors.black,
    },
    tabBackGround: {
      backgroundColor: colors.white,
    },
  });

export default styles;
