// import from files insteed of index to remove Require cycle warning to avoid
// uninitialized values.
import {Dimensions, Platform} from 'react-native';
import Colors from './Colors';
import {
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from './Metrics';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  platform: Platform.OS,
  platformIOS: Platform.OS === 'ios',
  background: {
    appBackgroundStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      height: Dimensions.get('screen').height,
      width: Metrics.screenWidth,
    },
  },
  screen: {
    appBackgroundStyle: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: verticalScale(20),
    },
    content: {
      flex: 1,
    },
    contentWithBottomPadding: {
      flex: 1,
      paddingBottom: moderateScale(10),
    },
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
    },
    fullSpace: {
      flex: 1,
    },
    centeredContent: {
      flex: 1,
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    whiteContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    whiteContainerCenter: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    noBorderStyle: {
      borderBottomWidth: Metrics.zero,
    },
    topBorderRadius: {
      borderTopLeftRadius: Metrics.textFieldRadius,
      borderTopRightRadius: Metrics.textFieldRadius,
    },
    bottomBorderRadius: {
      borderBottomLeftRadius: Metrics.textFieldRadius,
      borderBottomRightRadius: Metrics.textFieldRadius,
    },
    topLeftBorderRadius: {
      borderTopLeftRadius: Metrics.textFieldRadius,
    },
    topRightBorderRadius: {
      borderTopRightRadius: Metrics.textFieldRadius,
    },
    viewCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    horizontallyCenterContent: {
      alignItems: 'center',
    },
    hitSlop: {
      bottom: moderateScale(5),
      left: moderateScale(5),
      right: moderateScale(5),
      top: moderateScale(5),
    },
    pressable: pressed => {
      return {opacity: pressed ? 0.8 : 1};
    },
    messageTitleContainer: {
      alignSelf: 'center',
      marginTop: verticalScale(18),
      marginHorizontal: horizontalScale(39),
    },
    messageTitleText: {
      fontSize: moderateScale(18),
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: 0,
      textAlign: 'center',
      color: Colors.blackText,
    },
    messageDescriptionContainer: {
      alignSelf: 'center',
      marginTop: verticalScale(5),
      marginHorizontal: horizontalScale(30),
    },
    messageDescriptionText: {
      fontSize: moderateScale(14),
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: verticalScale(20),
      letterSpacing: 0,
      textAlign: 'center',
      color: Colors.greyText,
    },
    tabContent: {
      paddingHorizontal: horizontalScale(16),
      paddingBottom: moderateScale(16),
    },
    rightNavigationIcon: {
      marginEnd: horizontalScale(15),
    },
  },
  form: {
    textInput: {
      paddingLeft: horizontalScale(10),
    },
    formContainer: {
      alignItems: 'center',
      padding: horizontalScale(10),
    },
    formInputs: {
      marginTop: verticalScale(30),
      alignItems: 'center',
      marginHorizontal: horizontalScale(20),
    },
    labelText: {
      fontSize: moderateScale(14),
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: Colors.blackWith53,
    },
    inputContainer: {
      height: moderateScale(60),
      borderRadius: moderateScale(16),
    },
  },
  disabled: {
    opacity: 0.5,
  },
  global: {
    textCenter: {
      textAlign: 'center',
    },
    popupText: {
      fontSize: moderateScale(14),
      textAlign: 'center',
      color: Colors.white,
    },
  },
};

export default ApplicationStyles;
