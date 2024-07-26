import {StyleSheet, Platform} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(15),
  },
  bannerView: {
    flex: 1,
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
  contentContainer: {
    paddingHorizontal: horizontalScale(25),
    marginTop: verticalScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: verticalScale(5),
  },
  titleText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
    marginVertical: Platform.OS === 'ios' ? verticalScale(3) : 0,
  },
  toggleStyle: {
    // borderWidth: 1,
  },
  disableToggleStyle: {
    borderWidth: 2,
  },
});
export default styles;
