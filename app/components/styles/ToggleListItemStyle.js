import {Platform, StyleSheet} from 'react-native';
import {Colors, verticalScale, Fonts, moderateScale} from '../../theme';
export default StyleSheet.create({
  contentContainer: {
    marginHorizontal: moderateScale(15),
    justifyContent: 'center',
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
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.separatorColor,
    marginVertical: Platform.OS === 'ios' ? verticalScale(3) : 0,
  },
  toggleStyle: {
    // borderWidth: 1,
  },
  disableToggleStyle: {
    borderWidth: 2,
  },
  switchButton: {
    justifyContent: 'center',
    marginVertical: verticalScale(5),
  },
  toggleView: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  detailTitle: {
    fontSize: Fonts.size.medium,
    color: Colors.dustGrey,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsMedium,
  },
});
