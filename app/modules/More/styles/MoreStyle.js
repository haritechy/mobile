import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, moderateScale} from '../../../theme';
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginLeft: moderateScale(25),
  },
  flatList: {
    marginHorizontal: 10,
  },
});
export default styles;
