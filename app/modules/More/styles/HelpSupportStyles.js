import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  Fonts,
  ApplicationStyles,
  Colors,
  verticalScale,
} from '../../../theme';
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(25),
    marginTop: verticalScale(10),
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  supportLabelText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  connectLabelText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    marginTop: verticalScale(10),
  },
  emailText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
});
export default styles;
