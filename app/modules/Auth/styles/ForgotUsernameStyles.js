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
  contentContainer: {
    paddingHorizontal: moderateScale(30),
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
  //Modal Styles
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
    padding: moderateScale(20),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resetPopupText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  resetLink: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.blue,
  },
  okButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(12),
    height: moderateScale(40),
    marginTop: moderateScale(15),
  },
  okText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    textTransform: 'uppercase',
  },
});

export default styles;
