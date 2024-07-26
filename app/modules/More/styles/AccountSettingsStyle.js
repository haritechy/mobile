import {StyleSheet} from 'react-native';
import {
  Colors,
  moderateScale,
  horizontalScale,
  Fonts,
  ApplicationStyles,
} from '../../../theme';
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
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
    color: Colors.black,
  },
  text: {
    color: Colors.black,
  },
  toggleStyle: {
    marginLeft: 50,
  },
  flatList: {
    marginTop: moderateScale(10),
    marginHorizontal: horizontalScale(10),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
});
export default styles;
