import {StyleSheet} from 'react-native';
import {Colors, Fonts, moderateScale} from '../../theme';

const styles = StyleSheet.create({
  buttonTouchable: {
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  buttonText: {
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
});

export default styles;
