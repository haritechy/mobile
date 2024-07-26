import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
  Metrics,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginHorizontal: moderateScale(20),
    alignItems: 'center',
  },
  marginTextInput: {
    margin: 10,
  },
  headerTitle: {
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: Fonts.size.h4,
    color: Colors.black,
    paddingHorizontal: moderateScale(20),
  },
  headerDesc: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  inputText: {
    marginTop: 30,
    marginHorizontal: horizontalScale(10),
    color: Colors.white,
  },
  resendOtpButton: {
    marginTop: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInputs: {
    marginTop: verticalScale(10),
  },
  resendOtpText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.blueText,
    textAlign: 'center',
  },
  timerText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  didNotText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: verticalScale(40),
    textAlign: 'center',
  },
  buttonContainer: {
    height: verticalScale(60),
    width: Metrics.screenWidth - 70,
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(16),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  errorStyle: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
  inputStyle: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.h6,
    color: Colors.black,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    width: moderateScale(44),
    height: moderateScale(50),
    padding: moderateScale(0),
    borderColor: Colors.inputBorder,
    textAlign: 'center',
  },
  verificationText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.filledGreen,
    textAlign: 'center',
    marginVertical: moderateScale(10),
  },
});

export default styles;
