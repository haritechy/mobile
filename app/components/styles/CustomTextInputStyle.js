import {Platform, StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  containerView: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.extraLightGrey,
    width:
      Platform.OS === 'android'
        ? Metrics.screenWidth - 75
        : Metrics.screenWidth - 60,
    paddingHorizontal: horizontalScale(8),
    height: 64,
    marginVertical: verticalScale(8),
    justifyContent: 'center',
  },
  visibleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(-8),
  },
  leftIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(5),
  },
  rightIconView: {},
  rightIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  title: {
    fontSize: moderateScale(14),
    color: Colors.extraLightGrey,
    fontFamily: Fonts.type.PoppinsRegular,
    paddingHorizontal: horizontalScale(8),
    marginVertical: verticalScale(5),
  },
  visible: {
    alignItems: 'center',
    position: 'absolute',
    right: horizontalScale(8),
    justifyContent: 'center',
  },
  visibleEdit: {
    alignItems: 'center',
    position: 'absolute',
    right: horizontalScale(8),
    justifyContent: 'center',
  },
  visibleTextStyle: {
    color: Colors.blue,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  textInput: isEditable => {
    return {
      color: isEditable ? Colors.textColor : Colors.black,
      fontFamily: Fonts.type.PoppinsMedium,
    };
  },
  errorView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: horizontalScale(20),
  },
  redBorder: {
    borderColor: Colors.red,
  },
});

export default styles;
