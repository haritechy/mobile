import {StyleSheet} from 'react-native';
import {Colors, moderateScale} from '../../theme';
const styles = StyleSheet.create({
  contentContainer: {marginHorizontal: 8},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  colorViewStyle: {
    height: 20,
    width: 20,
    borderRadius: 2,
  },
  sectionHeader: {
    backgroundColor: Colors.lightGrey,
    padding: 12,
  },
  sectionHeaderTextStyle: {
    fontSize: moderateScale(16),
  },
  text: {
    color: Colors.black,
  },
});

export default styles;
