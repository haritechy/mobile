import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  Metrics,
  moderateScale,
  horizontalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  topView: {
    flex: 0.9,
    marginHorizontal: moderateScale(10),
  },
  filter: {
    marginHorizontal: moderateScale(10),
  },
  filterView: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  filterTitleText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.grey,
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
    fontSize: Fonts.size.small,
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
  bottomView: {
    flex: 0.1,
  },
  bottomButton: {
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  applyFilterText: {
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    color: Colors.black,
  },
  spaceBox: {
    height: moderateScale(20),
  },
  inputText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    marginLeft: moderateScale(10),
  },
  inputContainer: {
    flex: 0.48,
    justifyContent: 'space-between',
    height: moderateScale(55),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.grey,
    marginTop: 0,
  },
  buttonContainer: {
    height: moderateScale(55),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(16),
    fontFamily: Fonts.type.PoppinsExtraLight,
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
  dropDownStyle: {
    height: moderateScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    borderRadius: moderateScale(12),
  },
  selectedDropDown: {
    color: Colors.black,
  },
});
