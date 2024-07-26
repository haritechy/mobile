import {StyleSheet, Dimensions, Platform} from 'react-native';
import {
  Colors,
  Fonts,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../theme';
import { isIpadOrTablet } from '../../services/Utils';
export default StyleSheet.create({
  backButtonStyle: {
    paddingStart: 13,
  },
  headerStyle: {
    backgroundColor: Colors.white,
    elevation: 0,
  },
  headerText: {
    fontSize: 13,
    fontFamily: Fonts.type.PoppinsSemiBold,
    letterSpacing: 0,
    color: Colors.appThemeColor,
    alignSelf: 'center',
    width: Dimensions.get('screen').width,
    textAlign: 'center',
  },
  tabIconLabel: {
    letterSpacing: 0,
  },
  horizontalMargin: {marginHorizontal: horizontalScale(4)},
  tabBarStyle: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'android' ? verticalScale(60) : verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    borderTopWidth: 1,
  },
  tabBarLabelStyle: {
    bottom: Platform.OS === 'android' ? verticalScale(5) : verticalScale(0),
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsMedium,
    paddingLeft: isIpadOrTablet() ? moderateScale(5) : 0,
  },
});
