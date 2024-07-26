import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  floatingTextUnfocus: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? horizontalScale(15) : horizontalScale(10),
    top: verticalScale(17),
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginLeft: Platform.OS === 'ios' ? 5 : 10,
  },
  floatingTextFocus: {
    position: 'absolute',
    left: Platform.OS === 'ios' ? horizontalScale(15) : horizontalScale(10),
    bottom: verticalScale(32),
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.small,
    color: Colors.placeHolderColor,
    marginLeft: Platform.OS === 'ios' ? 5 : 10,
  },
  iconsPress: {
    padding: verticalScale(10),
  },
  nonTouchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Colors.transparent,
  },
});

export default styles;
