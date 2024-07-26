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
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  detailContainer: {
    marginHorizontal: moderateScale(10),
  },
  productImage: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    backgroundColor: Colors.grey,
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  productLocationText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.dustGrey,
    marginVertical: moderateScale(10),
  },
  productNameText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    marginBottom: moderateScale(10),
  },
  detailRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  labelText: {
    flex: 0.4,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  valueText: {
    flex: 0.58,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  boldText: {
    fontFamily: Fonts.type.PoppinsBold,
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
  },
  defaultImage: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.2,
    resizeMode: 'contain',
    marginBottom: moderateScale(10),
    tintColor: Colors.black,
  },
  viewWarrantyBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: verticalScale(50),
    width: Metrics.screenWidth - 50,
    borderWidth: 1,
    borderRadius: horizontalScale(10),
    borderColor: Colors.extraLightGrey,
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  warrantyDisable: {
    backgroundColor: Colors.extraLightGrey,
    opacity: 0.5,
  },
  viewWarrantyText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  rightArrow: {
    width: horizontalScale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
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
