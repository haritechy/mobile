import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
  Fonts,
  Metrics,
} from '../../theme';
import Colors from '../../theme/Colors';
const styles = StyleSheet.create({
  addReceiptButtonStyle: {
    backgroundColor: Colors.appThemeColor,
    marginVertical: verticalScale(5),
    justifyContent: 'center',
    // borderWidth: moderateScale(2),
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    width: Metrics.screenWidth - 60,
    // borderColor: Colors.avatarEditColor,
  },
  addReceiptText: {
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
});
export default styles;
