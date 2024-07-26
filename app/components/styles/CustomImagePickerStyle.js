import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mainViewImgPicker: {
    alignItems: 'center',
    height: verticalScale(100),
    width: horizontalScale(100),
  },
  actionSheetContainer: {
    borderTopLeftRadius: verticalScale(40),
    borderTopRightRadius: verticalScale(40),
    paddingVertical: moderateScale(30),
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: -10,
  },
  actionSheet: {
    height: Metrics.screenHeight * 0.2,
    bottom: verticalScale(12),
  },
  actionButton: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(20),
    backgroundColor: Colors.transparent,
  },
  actionBtnText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.h6,
    color: Colors.blueText,
  },
  imageContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderWidth: 1,
    borderRadius: moderateScale(100),
    borderColor: Colors.placeHolderColor,
    backgroundColor: Colors.transparent,
  },
  avatarImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(100),
  },
  editAvatarButton: {
    height: verticalScale(35),
    width: horizontalScale(35),
    bottom: verticalScale(35),
    left: horizontalScale(25),
  },
  avatarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(32),
    width: horizontalScale(30),
    top: verticalScale(5),
    left: horizontalScale(5),
  },
});
export default styles;
