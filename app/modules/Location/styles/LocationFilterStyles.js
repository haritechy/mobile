import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  Metrics,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  topView: {
    flex: 1,
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
    fontSize: moderateScale(16),
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
  propertyFilterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  propertyTypeView: {
    flex: 0.48,
    height: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.outBorderColor,
    borderRadius: moderateScale(10),
  },
  selectedView: {
    borderColor: Colors.appThemeColor,
  },
  typeIcn: {
    width: moderateScale(25),
    height: moderateScale(25),
    resizeMode: 'contain',
    tintColor: Colors.dustGrey,
  },
  selectedIcn: {
    tintColor: Colors.appThemeColor,
  },
  typeText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: moderateScale(5),
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
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
  },
  spaceBox: {
    height: moderateScale(20),
  },
  inputText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsMedium,
    marginLeft: moderateScale(5),
  },
  inputContainer: {
    flex: 0.45,
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
    alignSelf: 'center',
    borderRadius: moderateScale(16),
    fontFamily: Fonts.type.PoppinsExtraLight,
    marginTop: verticalScale(15),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
});
