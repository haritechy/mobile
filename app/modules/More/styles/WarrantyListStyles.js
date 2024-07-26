import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  moderateScale,
  verticalScale,
  Colors,
  horizontalScale,
  Metrics,
  Fonts,
} from '../../../theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    backgroundColor: Colors.transparent,
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
  contentListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  addProduct: {
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(8),
  },
});
