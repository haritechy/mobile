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
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
  },
  leftView: {
    flexDirection: 'row',
    flex: 0.2,
    marginRight: horizontalScale(15),
  },
  leftImage: {
    width: horizontalScale(60),
    height: verticalScale(60),
    resizeMode: 'contain',
  },
  centerView: {
    flex: 0.7,
  },
  titleText: {
    color: Colors.black,
    fontSize: 15,
  },
  descriptionText: {
    color: Colors.black,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsMedium,
    flexWrap: 'wrap',
    marginTop: moderateScale(5),
  },
  expiredOnText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.tagTextColor,
    marginVertical: moderateScale(8),
  },
  expireLeftText: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  expireText: {
    color: Colors.red,
  },
  rightView: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  rightIcon: {},
  seperator: {
    height: verticalScale(0.5),
    backgroundColor: Colors.seperatorColor,
  },
  progressStyle: {
    marginTop: moderateScale(5),
  },
});
