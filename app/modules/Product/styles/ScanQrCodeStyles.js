import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.transparentBlack,
    paddingHorizontal: moderateScale(10),
  },
  headerText: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    textTransform: 'none',
  },
  backIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  cameraContainer: {
    flex: 0.65,
    alignSelf: 'center',
  },
  cameraStyle: {
    flex: 0.65,
  },
  markerStyle: {
    borderColor: Colors.yellow,
    width: moderateScale(200),
    height: moderateScale(200),
  },
  bottomContainer: {
    flex: 0.35,
    marginTop: Metrics.screenHeight * 0.1,
  },
  skipButtonView: {
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    marginHorizontal: Metrics.screenWidth * 0.2,
  },
  skipbuttonText: {
    fontSize: moderateScale(12),
    color: Colors.black,
  },
  bottomButtonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
    marginTop: Metrics.screenHeight * 0.05,
  },
  iconView: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.transparentBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
});
