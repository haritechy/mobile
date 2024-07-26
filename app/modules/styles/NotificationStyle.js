import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';
export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  flatList: {
    marginVertical: moderateScale(10),
  },
  detailTitle: {
    color: Colors.black,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(5),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },
  titleText: {
    color: Colors.linkBlue,
    fontSize: 16,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  headerContainer: {
    marginHorizontal: horizontalScale(15),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyData: {
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  contentListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: horizontalScale(20),
  },
  deleteAllText: {
    color: Colors.linkBlue,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  headerText: {
    color: Colors.linkBlue,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
});
