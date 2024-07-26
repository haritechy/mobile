import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  imageCardContainer: {
    flex: 1,
    backgroundColor: Colors.themeBackground,
  },
  imageStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    resizeMode: 'contain',
  },
  closeView: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Colors.transparentBlack,
    width: verticalScale(30),
    height: verticalScale(30),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcn: {
    width: horizontalScale(15),
    height: verticalScale(15),
    tintColor: Colors.white,
  },
});

export default styles;
