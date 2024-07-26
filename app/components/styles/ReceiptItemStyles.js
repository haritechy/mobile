import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';
export default StyleSheet.create({
  contentContainer: {
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
  },
  leftView: {
    flexDirection: 'row',
    flex: 0.2,
    marginRight: 10,
  },
  leftImage: {
    width: horizontalScale(45),
    height: verticalScale(45),
    borderRadius: moderateScale(10),
  },
  centerView: {
    flex: 0.8,
  },
  titleText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
  },
  productCountText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.placeHolderColor,
    marginVertical: verticalScale(5),
  },
  dateText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
  },
  dateValueText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.placeHolderColor,
  },
  rightView: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  rightIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  seperator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.seperatorColor,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectImageView: {
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
});
