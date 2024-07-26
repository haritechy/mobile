import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  moderateScale,
  Metrics,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  contentContainer: {
    paddingHorizontal: moderateScale(30),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  buttonContainer: {
    width: Metrics.screenWidth - 60,
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(16),
    marginTop: moderateScale(15),
  },
  marginTextInput: {
    margin: 5,
  },
  headerTitle: {
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: Fonts.size.h4,
    color: Colors.black,
  },
  headerDesc: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: moderateScale(15),
  },
  resendButton: {
    marginTop: moderateScale(5),
  },
  resendText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.blueText,
    textAlign: 'center',
  },
  DidNotText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: moderateScale(50),
  },
  inputContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 70,
    marginTop: moderateScale(20),
  },
  phoneContainer: {
    width: Metrics.screenWidth - 70,
  },
  formInputs: {
    alignItems: 'center',
  },
  orView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  lineView: {
    flex: 0.4,
    backgroundColor: Colors.lightGrey,
    height: moderateScale(1),
  },
  orText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    textTransform: 'uppercase',
    paddingHorizontal: moderateScale(10),
  },
});

export default styles;
