import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    flex: 1,
    // backgroundColor: Colors.grey,
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
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    // backgroundColor: Colors.primary,
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
    // color: Colors.darkNavyBlue,
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
    right: horizontalScale(32),
    color: Colors.primary,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});

export default styles;
