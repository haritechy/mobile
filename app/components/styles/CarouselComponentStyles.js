import {StyleSheet} from 'react-native';
import {Colors, Metrics, moderateScale, verticalScale} from '../../theme';

export default StyleSheet.create({
  carousalContainer: {
    marginTop: moderateScale(10),
  },
  snapContainer: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(16),
  },
  snapImage: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  paginationContainer: {backgroundColor: Colors.transparent},
  dotContainerStyle: {
    marginHorizontal: moderateScale(5),
  },
  dotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.black,
  },
  inactiveDotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.grey,
  },
});
