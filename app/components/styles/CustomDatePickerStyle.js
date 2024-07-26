import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../theme';
const styles = StyleSheet.create({
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(20),
    backgroundColor: 'red',
    //alignSelf: 'center',
  },
  dateIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
  },
});
export default styles;
