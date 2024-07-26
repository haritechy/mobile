import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../../theme';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContianer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(20),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(20),
  },
  imageView: {
    flex: 0.7,
    alignSelf: 'center',
  },
  logoStyle: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight * 0.4,
    resizeMode: 'contain',
  },
  detailView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.h4,
    color: Colors.black,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: moderateScale(15),
  },
  topView: {
    flex: 0.8,
  },
  bottomView: {
    flex: 0.2,
    paddingHorizontal: moderateScale(20),
  },
  buttonView: {
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: moderateScale(10),
  },
  buttonText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  lableText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    textAlign: 'center',
    marginVertical: moderateScale(20),
  },
  signInText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.blueText,
  },
  paginationContainer: {
    backgroundColor: Colors.transparent,
    marginVertical: moderateScale(10),
  },
  dotContainerStyle: {
    marginHorizontal: moderateScale(5),
  },
  dotStyle: {
    width: moderateScale(14),
    height: moderateScale(8),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.blue,
  },
  inactiveDotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.grey,
  },
  buttonStyle: {
    position: 'absolute',
    bottom: moderateScale(10),
  },
  prevButtonStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    position: 'absolute',
    bottom: moderateScale(0),
    left: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  nextButtonStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    position: 'absolute',
    bottom: moderateScale(0),
    right: moderateScale(20),
    borderRadius: moderateScale(20),
  },
});

export default styles;
