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
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(10),
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
  },
  receiptContainer: {
    marginVertical: verticalScale(10),
  },
  titleText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: verticalScale(10),
  },
  receiptImage: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight * 0.25,
    borderRadius: moderateScale(10),
  },
  contentListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
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
  detailRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderColor: Colors.transparent,
    borderBottomColor: Colors.extraLightGrey,
  },
  labelText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    flex: 0.5,
  },
  valueText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    flex: 0.5,
  },
});
