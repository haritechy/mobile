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
  },
  headerContainer: {
    marginLeft: horizontalScale(10),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  titleText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.h5,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  subText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  infoLabelText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    flex: 0.5,
  },
  infoValueText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    flex: 0.5,
  },
});
export default styles;
