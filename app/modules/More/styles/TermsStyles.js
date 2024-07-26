import {Platform, StyleSheet} from 'react-native';
import {Fonts, horizontalScale, moderateScale} from '../../../theme';
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  headerStyle: {
    marginLeft: horizontalScale(30),
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  webViewIndicator: {
    right: Platform.OS === 'ios' ? moderateScale(170) : moderateScale(150),
    top: moderateScale(300),
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    paddingHorizontal: horizontalScale(15),
  },
  webview: {
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(15),
  },
});
export default styles;
