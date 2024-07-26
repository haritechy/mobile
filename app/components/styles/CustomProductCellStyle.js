import {StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
  Fonts,
} from '../../theme';
import {Colors} from '../../theme/';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: verticalScale(8),
  },
  selectImageView: {
    flex: 0.1,
    alignSelf: 'center',
    marginRight: moderateScale(10),
  },
  selectIcn: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  cellImageViewStyle: {
    flex: 0.3,
    justifyContent: 'center',
  },
  cellImageStyle: {
    height: verticalScale(100),
    width: horizontalScale(100),
    borderRadius: 4,
    resizeMode: 'contain',
  },
  productDetailViewStyle: {
    flex: 0.65,
    marginLeft: horizontalScale(15),
    justifyContent: 'center',
  },
  moreIconView: {
    flex: 0.05,
    height: moderateScale(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  moreIcn: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
  },
  productLocationText: {
    fontSize: moderateScale(12),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  productNameText: {
    fontSize: moderateScale(15),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  purchasedLabelText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginVertical: verticalScale(5),
  },
  purchasedDateText: {
    fontSize: moderateScale(12),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: Colors.facebookBlue,
    paddingHorizontal: moderateScale(15),
    marginRight: moderateScale(10),
  },
  priceText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.white,
  },
  unitText: {
    fontSize: moderateScale(12),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  seperator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.seperatorColor,
    marginTop: moderateScale(10),
  },
  unSelectIcn: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  productImage: {
    height: moderateScale(80),
    width: moderateScale(80),
    borderRadius: moderateScale(5),
    resizeMode: 'contain',
  },
});
export default styles;
