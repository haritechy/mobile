import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  moderateScale,
  verticalScale,
  horizontalScale,
  Metrics,
  Fonts,
} from '../../../theme';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
  },
  searchContainer: {
    borderWidth: 1,
    marginHorizontal: moderateScale(15),
    backgroundColor: Colors.inputBackground,
    height: moderateScale(44),
    width: Metrics.screenWidth - 60,
    borderRadius: moderateScale(10),
  },
  listContainer: {},
  contentListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontWeight: 'normal',
    marginLeft: moderateScale(5),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  iconStyle: {
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(-5),
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
  bannerView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    height: moderateScale(10),
    width: moderateScale(10),
    tintColor: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: Colors.lightGrey,
    borderRadius: moderateScale(1),
  },
});
