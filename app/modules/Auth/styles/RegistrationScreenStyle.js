import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
  Fonts,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  mainContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: moderateScale(20),
  },
  titleText: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Colors.appThemeColor,
  },
  signupTextStyle: {
    marginVertical: verticalScale(8),
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    marginHorizontal: horizontalScale(30),
    marginVertical: verticalScale(12),
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(15),
  },
  backButton: {
    tintColor: Colors.black,
  },
  profileImageBase: {
    padding: 10,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
    marginBottom: verticalScale(0),
    bottom: verticalScale(40),
  },
  checkboxBase: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(8),
  },
  checkbox: {
    flex: 1,
    top: verticalScale(3),
    left: horizontalScale(0),
    height: verticalScale(30),
    width: horizontalScale(30),
    borderRadius: 20,
  },
  checkboxIcon: {
    top: verticalScale(3),
    left: horizontalScale(2),
    height: verticalScale(18),
    width: horizontalScale(18),
    zIndex: 1,
  },
  termsTextBase: {
    top: verticalScale(3),
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
    left: horizontalScale(15),
    right: horizontalScale(8),
    maxHeight: verticalScale(200),
    alignItems: 'center',
  },
  termTextStyle: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    textAlign: 'center',
    maxHeight: verticalScale(200),
  },
  linkTextContainer: {
    backgroundColor: Colors.linkBlue,
  },
  alreadyUserBase: {
    alignItems: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.placeHolderColor,
  },
  text: {},
  passwordTextInput: {
    height: verticalScale(40),
    width: horizontalScale(335),
    borderRadius: 5,
    borderWidth: horizontalScale(1),
    borderColor: Colors.lightGrey,
    paddingLeft: horizontalScale(10),
    paddingRight: horizontalScale(40),
  },
  disabledButton: {
    opacity: 0.5,
  },
  termView: {
    marginVertical: verticalScale(20),
  },
  formInputs: {
    alignItems: 'center',
  },
});

export default styles;
