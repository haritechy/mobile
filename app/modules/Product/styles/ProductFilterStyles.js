import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Metrics,
  moderateScale,
  Fonts,
  horizontalScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  scrollContainer: {
    flex: 1,
  },
  topView: {
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
  scrollView: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    bottom: verticalScale(12),
  },
  filterView: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  filterTitleText: {
    fontSize: moderateScale(16),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsMedium,
    textTransform: 'uppercase',
    marginVertical: moderateScale(10),
  },
  filterDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromDateView: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
  },
  fromDateText: {
    fontSize: moderateScale(12),
    color: Colors.grey,
  },
  toDateView: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
  },
  dateContainer: {
    marginVertical: 0,
    height: moderateScale(50),
    width: Metrics.screenWidth * 0.42 - 15,
    borderColor: Colors.grey,
    borderRadius: moderateScale(10),
  },
  inputContainer: {
    flex: 0.45,
    justifyContent: 'space-between',
    height: verticalScale(55),
    width: horizontalScale(75),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.dustGrey,
    marginTop: 0,
  },
  inputText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsMedium,
    marginLeft: Platform.OS === 'ios' ? moderateScale(12) : moderateScale(10),
  },
  bottomView: {
    flex: 0.1,
  },
  bottomButton: {
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  applyFilterText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
  buttonContainer: {
    height: moderateScale(55),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    width: Metrics.screenWidth - 60,
    marginTop: verticalScale(15),
  },
});
