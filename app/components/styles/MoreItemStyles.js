import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';
export default StyleSheet.create({
  contentContainer: {
    marginHorizontal: horizontalScale(15),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(5),
  },
  leftView: {
    flexDirection: 'row',
  },
  leftIcon: {
    width: horizontalScale(23),
    height: verticalScale(23),
    marginRight: horizontalScale(10),
    resizeMode: 'contain',
  },
  rightIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  centerView: {},
  titleText: {
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  rightView: {},
  rightIcon: {},
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
  },
});
