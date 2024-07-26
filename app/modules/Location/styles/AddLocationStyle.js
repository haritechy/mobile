import {Platform, StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Metrics,
  moderateScale,
  verticalScale,
  Fonts,
  horizontalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    backgroundColor: Colors.white,
  },
  locationDetails: {
    marginHorizontal: horizontalScale(30),
  },
  dropDownStyle: {
    height: moderateScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    borderRadius: moderateScale(16),
  },
  scrollView: {
    bottom: verticalScale(12),
  },
  detailHeaderText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: moderateScale(10),
  },
  inputContentContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
  },
  addressInputContainer: {
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    justifyContent: 'flex-start',
    paddingTop: moderateScale(10),
  },
  inputContainer: {
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    marginLeft:
      Platform.OS === 'android' ? horizontalScale(5) : horizontalScale(10),
  },
  fromInputs: {
    marginTop: verticalScale(15),
    alignItems: 'center',
  },
  infoView: {
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
  },
  toggleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  toggleButtonView: {
    marginVertical: verticalScale(10),
  },
  setDefaultText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  toggleStyle: {
    // borderWidth: 1,
  },
  disableToggleStyle: {
    borderWidth: 2,
  },
  bottomButton: {
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(16),
  },
  addLocationText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontWeight: '600',
    color: Colors.black,
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
  alignStyle: {
    alignItems: 'center',
  },
  bottomView: {
    marginHorizontal: horizontalScale(30),
  },
  submitView: {
    marginTop: horizontalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonStyle: {
    height: verticalScale(50),
    width: horizontalScale(320),
    backgroundColor: Colors.appThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
  },
  selectedDropDown: {
    color: Colors.black,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    bottom: verticalScale(10),
  },
});

export default styles;
