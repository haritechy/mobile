import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
  Fonts,
  Metrics,
} from '../../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  container: {
    marginHorizontal: moderateScale(20),
  },
  headerView: {
    backgroundColor: Colors.extraLightGrey,
    height: verticalScale(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  infoView: {
    alignItems: 'flex-start',
  },
  infoText: {
    color: Colors.black,
    textAlign: 'center',
    marginHorizontal: horizontalScale(30),
    fontSize: moderateScale(15),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  errorStyle: {
    marginHorizontal: horizontalScale(30),
  },
  basicInfoView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    left: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProductView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    marginTop: verticalScale(10),
  },
  submitView: {
    margin: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: Colors.white,
    alignItems: 'center',
    fontSize: moderateScale(18),
  },
  scrollView: {
    bottom: verticalScale(12),
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: verticalScale(10),
    marginHorizontal: verticalScale(10),
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? verticalScale(80) : verticalScale(0),
    alignItems: 'center',
  },
  receiptButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(60),
    width: Metrics.screenWidth - 60,
    borderWidth: 1,
    borderRadius: horizontalScale(16),
    borderColor: Colors.extraLightGrey,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    paddingHorizontal: horizontalScale(20),
  },
  addReceiptText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    textTransform: 'capitalize',
    width: Metrics.screenWidth * 0.6,
  },
  rightArrow: {
    width: horizontalScale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
  },
  submitButtonStyle: {
    height: verticalScale(50),
    width: Metrics.screenWidth - 60,
    backgroundColor: Colors.appThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
  },
  textInput: {
    padding: horizontalScale(10),
    left: horizontalScale(28),
    color: Colors.black,
    width: horizontalScale(320),
    height: verticalScale(50),
    fontSize: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    bottom: moderateScale(20),
    marginVertical: verticalScale(10),
  },
  errorReceiptText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: Colors.red,
    marginVertical: verticalScale(5),
  },
  errorInfoText: {
    color: Colors.red,
    fontSize: moderateScale(14),
    marginTop: Platform.OS === 'ios' ? verticalScale(5) : verticalScale(0),
  },
  datePickerButton: {
    flexDirection: 'row',
    width: horizontalScale(360),
    justifyContent: 'center',
  },
  datePicketText: {
    textAlignVertical: 'center',
    color: Colors.black,
    width: horizontalScale(160),
    top: Platform.OS === 'ios' ? verticalScale(17) : verticalScale(0),
    fontSize: moderateScale(15),
  },
  datePickerView: {
    // left: horizontalScale(28),
    color: Colors.black,
    height: verticalScale(50),
    fontSize: moderateScale(15),
    borderRadius: moderateScale(10),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    alignItems: 'center',
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(15),
  },
  inputContentContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
  },
  inputText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: moderateScale(15),
    marginLeft:
      Platform.OS === 'android' ? horizontalScale(8) : horizontalScale(12),
  },
  inputTextAreaContentContainer: {
    height: moderateScale(80),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
  },
  dateContainer: {
    height: moderateScale(60),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.grey,
    borderRadius: moderateScale(10),
  },
  inputTextArea: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: moderateScale(15),
    height: moderateScale(60),
    marginLeft:
      Platform.OS === 'android' ? horizontalScale(5) : horizontalScale(10),
  },
  dropDownStyle: {
    height: moderateScale(55),
    width: Metrics.screenWidth - 60,
    borderRadius: moderateScale(16),
  },
  addReceiptButtonStyle: {
    marginVertical: verticalScale(5),
    justifyContent: 'center',
    borderWidth: 1,
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.avatarEditColor,
  },
  addReceiptInputText: {
    textAlign: 'center',
    color: Colors.avatarEditColor,
    fontFamily: Fonts.type.PoppinsMedium,
    marginVertical: verticalScale(5),
    justifyContent: 'center',
    borderWidth: 1,
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.avatarEditColor,
  },
  receiptErrorView: {
    alignItems: 'flex-start',
    width: Metrics.screenWidth - 60,
  },
  selectedDropDown: {
    color: Colors.black,
  },
  imgPreViewButton: {
    justifyContent: 'center',
    height: verticalScale(50),
    width: horizontalScale(50),
    marginLeft: horizontalScale(-15),
  },
  previewReceiptImg: {
    height: verticalScale(45),
    width: horizontalScale(45),
    borderRadius: moderateScale(10),
  },
});

export default styles;
