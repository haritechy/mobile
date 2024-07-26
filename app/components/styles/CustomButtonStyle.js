import {StyleSheet} from 'react-native';
import {
  Fonts,
  Colors,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  buttonTouchable: {
    height: verticalScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    marginHorizontal: horizontalScale(20),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  disabledButton: {
    backgroundColor: Colors.rosyBrown,
  },
  buttonText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
    color: Colors.black,
    textAlign: 'center',
  },
});

export default styles;
