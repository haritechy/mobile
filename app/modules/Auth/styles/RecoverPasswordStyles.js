import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
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
    marginHorizontal: horizontalScale(20),
    // bottom: verticalScale(50),
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
  forgotPwdContainer: {
    width: '100%',
    alignSelf: 'flex-end',
    right: horizontalScale(32),
    paddingBottom: horizontalScale(20),
  },
  forgotPwdOtpText: {
    fontSize: moderateScale(13),
    color: Colors.primary,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  forgotPwdTimerText: {
    fontSize: moderateScale(13),
    textAlign: 'right',
    left: horizontalScale(140),
    color: Colors.primary,
    alignSelf: 'flex-end',
    bottom: verticalScale(45),
  },
  sendOtpButton: {
    bottom: verticalScale(110),
    width: '20%',
    alignSelf: 'flex-end',
    right: horizontalScale(28),
    paddingBottom: horizontalScale(20),
  },
  resendOtpButton: {
    bottom: verticalScale(110),
    width: '20%',
    alignSelf: 'flex-end',
    right: horizontalScale(28),
    paddingBottom: horizontalScale(20),
  },
  marginTextInput: {
    margin: 10,
  },
});

export default styles;
