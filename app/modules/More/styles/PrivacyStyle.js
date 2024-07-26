import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  headerStyle: {
    marginLeft: horizontalScale(30),
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  titleText: {
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsMedium,
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.extraLightGrey,
    marginVertical: Platform.OS === 'ios' ? verticalScale(3) : 0,
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
  termsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
    width: '90%',
  },
  checkIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
    borderColor: Colors.extraLightGrey,
    borderWidth: 1,
    borderRadius: 5,
  },
  viewCheckIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
    backgroundColor: Colors.inputBorder,
    borderRadius: 5,
  },
  termsText: {
    fontSize: moderateScale(16),
    color: Colors.grey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  webViewIndicator: {
    right: Platform.OS === 'ios' ? moderateScale(170) : moderateScale(150),
    top: moderateScale(300),
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.5,
    paddingHorizontal: horizontalScale(15),
  },
  webview: {
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(15),
  },
  policyView: {
    marginHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    flex: 0.5,
  },
  policyLinkText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.medium,
    color: Colors.linkBlue,
    textDecorationLine: 'underline',
    marginTop: verticalScale(5),
  },
});
export default styles;
