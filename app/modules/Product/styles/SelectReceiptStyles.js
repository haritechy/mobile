import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  searchContainer: {
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    height: moderateScale(44),
    marginHorizontal: moderateScale(20),
    width: Metrics.screenWidth - 40,
    borderRadius: moderateScale(10),
  },
  inputText: {
    fontWeight: 'normal',
    marginLeft: moderateScale(5),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  mainContainer: {
    height: Metrics.screenHeight * 0.7,
  },
  listContainer: {
    flex: 0.85,
  },
  contentListContainer: {
    flexGrow: 1,
  },
  receiptContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  receiptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderBottomColor: Colors.extraLightGrey,
    paddingHorizontal: horizontalScale(10),
  },
  leftView: {
    width: '90%',
  },
  receiptName: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  selectIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  unSelectIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyData: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  bottomView: {
    flex: 0.15,
    justifyContent: 'center',
  },
  submitButtonStyle: {
    height: verticalScale(50),
    width: Metrics.screenWidth - 60,
    borderRadius: horizontalScale(10),
    backgroundColor: Colors.appThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
});
