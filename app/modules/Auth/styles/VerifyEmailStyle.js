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
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    height: verticalScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    marginHorizontal: horizontalScale(20),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  marginTextInput: {
    margin: 10,
  },
  headerTitle: {
    fontSize: moderateScale(25),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsBold,
    left: horizontalScale(30),
    top: verticalScale(20),
  },
  headerDesc: {
    color: Colors.extraLightGrey,
    top: verticalScale(20),
    paddingHorizontal: horizontalScale(30),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  textInput: {
    marginTop: 30,
    marginHorizontal: horizontalScale(10),
  },
  resendOtpButton: {
    width: '20%',
    marginTop: verticalScale(10),
  },
  Container: {
    width: '100%',
    alignSelf: 'flex-end',
    right: horizontalScale(32),
  },
  resendOtpText: {
    fontSize: moderateScale(13),
    color: Colors.linkBlue,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsRegular,
  },
  TimerText: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    fontSize: moderateScale(13),
    textAlign: 'center',
    color: Colors.extraLightGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  DidNotText: {
    color: Colors.extraLightGrey,
    marginTop: verticalScale(30),
    fontFamily: Fonts.type.PoppinsRegular,
  },
});

export default styles;
