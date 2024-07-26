import {StyleSheet} from 'react-native';
import {
  Metrics,
  Colors,
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../theme';
const styles = StyleSheet.create({
  opacityContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.transparentBlack,
    opacity: 0.5,
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.transparent,
  },
  loaderModalView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.transparent,
  },
  loaderIndicator: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.white,
  },
});
export default styles;
