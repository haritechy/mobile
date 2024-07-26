import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  warrantyContainer: {
    flex: 1,
    marginTop: verticalScale(10),
    marginHorizontal: verticalScale(10),
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? verticalScale(80) : verticalScale(0),
    alignItems: 'center',
  },
  headerTextStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  headerContainer: {
    marginLeft: horizontalScale(15),
  },
  dateContainer: {
    justifyContent: 'space-between',
    height: verticalScale(60),
    borderRadius: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.grey,
    marginTop: 0,
    width: Metrics.screenWidth - 60,
  },
  warrantyDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  dateFlex: {
    flex: 0.48,
  },
  flexDateContainer: {
    justifyContent: 'space-between',
    height: verticalScale(60),
    borderRadius: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.grey,
    marginTop: 0,
  },
  inputContentContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
  },
  inputText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    marginLeft:
      Platform.OS === 'android' ? horizontalScale(8) : horizontalScale(12),
  },
  dropDownStyle: {
    height: moderateScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    borderRadius: moderateScale(16),
  },
  dropDownSelectedTextStyle: {
    color: Colors.black,
  },
  uploadButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    width: Metrics.screenWidth - 60,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: horizontalScale(10),
    marginVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  uploadSlipText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    width: Metrics.screenWidth * 0.7,
  },
  addItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  addIcn: {
    width: horizontalScale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  addItemText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    textDecorationLine: 'underline',
  },
  attachmentIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  productPartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  productPartText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.grey,
  },
  checkIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
    borderColor: Colors.extraLightGrey,
    borderWidth: 1,
    borderRadius: 5,
  },
  viewCheckIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
    backgroundColor: Colors.inputBorder,
    borderRadius: 5,
  },
  warrantyPartLabel: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginVertical: verticalScale(10),
  },
  submitButtonStyle: {
    height: verticalScale(50),
    width: Metrics.screenWidth - 60,
    backgroundColor: Colors.appThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  saveText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    bottom: moderateScale(10),
  },
  unCheckIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
});
