import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  verticalScale,
  horizontalScale,
  moderateScale,
  Fonts,
} from '../../theme';
export default StyleSheet.create({
  contentContainer: {
    marginHorizontal: horizontalScale(0),
    marginTop: verticalScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    marginHorizontal: horizontalScale(15),
  },
  rightView: {
    flexDirection: 'column',
    marginLeft: horizontalScale(10),
    flex: 0.95,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  notificationAvatar: {
    height: verticalScale(50),
    width: horizontalScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
  },
  unReadText: {
    fontFamily: Fonts.type.PoppinsBold,
  },
  timeText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.grey,
    marginTop: verticalScale(5),
  },
  separator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.extraLightGrey,
    marginVertical: Platform.OS === 'ios' ? verticalScale(3) : 0,
    marginHorizontal: horizontalScale(-20),
  },
  unMarkReadDot: {
    backgroundColor: Colors.linkBlue,
    height: verticalScale(10),
    width: horizontalScale(10),
    alignContent: 'center',
    borderRadius: 30,
    marginHorizontal: horizontalScale(10),
  },
  markReadDot: {
    backgroundColor: Colors.transparent,
    height: verticalScale(10),
    width: horizontalScale(10),
    alignContent: 'center',
    borderRadius: 30,
  },
  deleteItem: {
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.red,
    paddingHorizontal: horizontalScale(15),
    marginHorizontal: horizontalScale(15),
    borderRadius: 10,
  },
  deleteText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.white,
  },
});
