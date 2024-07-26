import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';
export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  imageView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(50),
  },
  image: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenHeight * 0.4,
    resizeMode: 'contain',
  },
  updateText: {
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  titleText: {
    color: Colors.linkBlue,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  descView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descTitle: {
    marginVertical: verticalScale(10),
    color: Colors.black,
    fontSize: moderateScale(20),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  descText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsMedium,
    marginHorizontal: horizontalScale(10),
  },
  updateButtonView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    height: verticalScale(50),
    width: Metrics.screenWidth * 0.8,
    backgroundColor: Colors.appThemeColor,
    marginVertical: verticalScale(10),
  },
  notNowButton: {
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    height: verticalScale(50),
    width: Metrics.screenWidth * 0.8,
    marginVertical: verticalScale(5),
  },
});
