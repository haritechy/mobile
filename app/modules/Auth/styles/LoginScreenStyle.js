import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  conttentPadding: {
    paddingHorizontal: moderateScale(10),
  },
  alignCenter: {
    alignItems: 'center',
  },
  formInputs: {
    marginTop: moderateScale(10),
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
  },
  titleText: {
    fontSize: moderateScale(33),
    color: Colors.blackWith53,
    marginTop: horizontalScale(27),
  },
  redBorder: {
    borderColor: Colors.red,
  },
  buttonContainer: {
    marginHorizontal: horizontalScale(30),
    marginVertical: verticalScale(12),
  },
  signInTextStyle: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(8),
    fontSize: Fonts.size.h3,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsBold,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  bottomView: {
    height: verticalScale(50),
    marginTop: horizontalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  accountText: {
    fontSize: moderateScale(13),
  },
  socialMediaViewContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  forgotContainer: {
    alignSelf: 'flex-start',
    marginTop: -5,
    marginBottom: verticalScale(10),
    marginHorizontal: horizontalScale(30),
  },
  forgotText: {
    fontSize: Fonts.size.medium,
    color: Colors.blueText,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  separatorViewStyle: {
    width: Metrics.screenWidth * 0.3,
    height: moderateScale(1),
    backgroundColor: Colors.lightGrey,
    alignSelf: 'center',
    marginVertical: verticalScale(20),
  },
  googleContainerStyle: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderColor: Colors.titleBlack,
    borderWidth: 1,
    borderRadius: 12,
  },
  googleBtnTextStyle: {
    color: Colors.titleBlack,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  facebookContainerStyle: {
    backgroundColor: Colors.backgroundBlue,
    elevation: 5,
    borderRadius: 12,
  },
  facebookBtnTextStyle: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  appleContainerStyle: {
    backgroundColor: Colors.black,
    borderRadius: 12,
  },
  appleBtnTextStyle: {
    color: Colors.white,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  errorStyle: {
    marginHorizontal: moderateScale(30),
  },
  termView: {
    marginVertical: verticalScale(5),
  },
  termTextStyle: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    textAlign: 'center',
    maxHeight: verticalScale(200),
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.placeHolderColor,
  },
});

export default styles;
