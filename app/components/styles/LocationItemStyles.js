import {StyleSheet} from 'react-native';
import {verticalScale, Fonts, moderateScale} from '../../theme';
import {Colors} from '../../theme/';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
    paddingVertical: verticalScale(10),
  },
  defaultContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.yellow,
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
  unSelectIcn: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  locationImageView: {
    flex: 0.25,
    marginRight: moderateScale(10),
  },
  locationImage: {
    height: moderateScale(80),
    width: moderateScale(80),
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
  },
  locationDetailView: {
    flex: 0.7,
    justifyContent: 'center',
    marginLeft: moderateScale(15),
  },
  topAddressView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  locationStateText: {
    fontSize: moderateScale(12),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  locationNameText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginVertical: moderateScale(5),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(5),
  },
  priceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: moderateScale(15),
    marginRight: moderateScale(10),
  },
  priceText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.white,
  },
  qntityText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.dustGrey,
  },
  seperator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.seperatorColor,
    marginVertical: verticalScale(0),
  },
  itemHighOpacity: {
    opacity: 1,
  },
  itemLowOpacity: {
    opacity: 0.5,
  },
});
export default styles;
