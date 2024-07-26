import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  modalView: {
    width: Metrics.screenWidth,
    height: Platform.select({
      ios: Metrics.screenHeight * 0.75,
      android: Metrics.screenHeight * 0.45,
    }),
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(20),
    position: 'absolute',
    bottom: moderateScale(0),
    paddingBottom: Metrics.screenHeight * 0.05,
  },
  headerText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: moderateScale(15),
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listSort: {
    marginTop: moderateScale(10),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  countryName: {
    fontSize: Fonts.size.regular,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  selectedType: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  flagIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
  },
  seperator: {
    height: moderateScale(1),
    backgroundColor: Colors.seperatorColor,
    marginVertical: moderateScale(2),
  },
  searchContainer: {
    borderWidth: 1,
    backgroundColor: Colors.themeBackground,
    height: verticalScale(44),
    marginHorizontal: horizontalScale(20),
    width: Metrics.screenWidth - 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeIcn: {
    width: horizontalScale(15),
    height: verticalScale(15),
  },
});
