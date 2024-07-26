import {StyleSheet} from 'react-native';
import {Colors, moderateScale, Fonts} from '../../theme';
export default StyleSheet.create({
  errorView: {
    alignSelf: 'flex-start',
    marginBottom: moderateScale(10),
    width: '100%',
  },
  errorText: {
    fontSize: Fonts.size.medium,
    color: Colors.red,
  },
});
