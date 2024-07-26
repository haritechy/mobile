import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  rightButtonStyle: {
    color: Colors.blueText,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  editIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    fontSize: moderateScale(25),
    marginHorizontal: horizontalScale(8),
  },
});
export default styles;
