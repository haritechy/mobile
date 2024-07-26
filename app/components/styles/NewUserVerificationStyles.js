import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
  Metrics,
} from '../../theme';

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  opacityView: {
    backgroundColor: Colors.black,
    opacity: 0.8,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalView: {
    width: Metrics.screenWidth * 0.85,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  mainView: {
    marginHorizontal: horizontalScale(30),
  },
  buttonContainer: {
    height: verticalScale(50),
    width: (Metrics.screenWidth - horizontalScale(80)) / 2,
    marginHorizontal: horizontalScale(35),
    backgroundColor: Colors.appThemeColor,
    alignSelf: 'center',
    borderRadius: 20,
    fontFamily: Fonts.type.PoppinsRegular,
    marginTop: moderateScale(20),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  headerView: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: Fonts.size.h5,
    color: Colors.black,
  },
  headerDesc: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: moderateScale(10),
  },
  Container: {
    width: '100%',
    alignSelf: 'flex-end',
    right: horizontalScale(32),
  },
  didNotText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    marginTop: moderateScale(30),
  },
  rowContainer: {
    marginTop: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    justifyContent: 'center',
  },
  selectedIcon: {
    tintColor: Colors.appThemeColor,
    height: moderateScale(25),
    width: moderateScale(25),
  },
  unSelectedIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  modalRowText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(56),
    letterSpacing: 0,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  selectedText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(56),
    letterSpacing: 0,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  descriptionText: {
    bottom: verticalScale(15),
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: moderateScale(12),
    color: Colors.black,
  },
  rightView: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    marginLeft: horizontalScale(10),
  },
  titleDesc: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.small,
    color: Colors.placeHolderColor,
    marginLeft: horizontalScale(5),
    marginTop: verticalScale(5),
  },
  descView: {
    marginHorizontal: horizontalScale(30),
  },
  verificationText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.filledGreen,
    marginTop: moderateScale(15),
  },
  invalidErrorText: {
    color: Colors.red,
  },
  redirectLoginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(50),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: Colors.black,
    marginTop: moderateScale(30),
  },
  redirectLoginText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
});

export default styles;
