import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  verticalScale,
  moderateScale,
  ApplicationStyles,
} from '../../../theme';
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(25),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
    marginVertical: Platform.OS === 'ios' ? verticalScale(3) : 0,
  },
  radioButton: {
    justifyContent: 'center',
  },
  selectedIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  unSelectedIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  modalRowText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(56),
    letterSpacing: 0,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  selectedText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(56),
    letterSpacing: 0,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  descriptionText: {
    bottom: verticalScale(15),
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: moderateScale(12),
    color: Colors.black,
  },
  titleText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(56),
    letterSpacing: 0,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
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
});
export default styles;
