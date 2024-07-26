import {StyleSheet} from 'react-native';
import {Fonts, Colors, verticalScale, moderateScale} from '../../theme';
export default StyleSheet.create({
  contentContainer: {
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 15,
  },
  leftView: {
    flexDirection: 'row',
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  centerView: {},
  titleText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  rightView: {},
  rightIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
  },
});
