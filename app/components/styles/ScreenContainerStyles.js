import {Platform, StatusBar, StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.background,
  mainContainer: {
    paddingTop: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
    }),
  },
  container: {
    flex: 1,
  },
  footerArea: {
    backgroundColor: Colors.white,
  },
});
