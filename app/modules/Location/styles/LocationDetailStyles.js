import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  detailContainer: {
    marginHorizontal: moderateScale(10),
  },
  locationImage: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  titleText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  detailRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(15),
  },
  detailColumView: {
    flex: 0.48,
  },
  columnView: {
    marginVertical: moderateScale(5),
  },
  labelText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  labelValueText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    marginTop: moderateScale(2),
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
    marginVertical: moderateScale(15),
  },
  toggleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  setDefaultText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  toggleStyle: {
    color: Colors.setValueToggleColor,
  },
  setValuetoggleStyle: {
    color: Colors.setValueToggleColor,
  },
  disableToggleStyle: {},
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
