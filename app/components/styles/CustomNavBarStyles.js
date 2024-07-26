import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';
export default StyleSheet.create({
  mainView: {
    marginTop: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(30),
    justifyContent: 'center',
    height: verticalScale(80),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(5),
    height: moderateScale(60),
    marginTop: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(30),
  },
  centerView: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  mainHeader: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
  },
  title: {
    fontSize: moderateScale(25),
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  subtitleText: {
    fontSize: Fonts.size.small,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: moderateScale(10),
  },
  backButtonContainer: {
    flex: 0.1,
    paddingVertical: moderateScale(10),
    paddingRight: moderateScale(5),
  },
  backButtonStyle: {
    height: verticalScale(20),
    width: horizontalScale(20),
    resizeMode: 'contain',
  },
  rightButtonView: {
    flex: 0.1,
  },
  rightButtonStyle: {alignSelf: 'center'},
  rightButtonTextStyle: {color: '#105ad0', fontWeight: '600'},
  rightButtonContainer: {
    flex: 0.1,
    right: 20,
    height: verticalScale(80),
    justifyContent: 'center',
  },
  headerImageStyle: {
    height: verticalScale(80),
    width: horizontalScale(80),
    backgroundColor: Colors.appThemeColor,
    borderRadius: 40,
    alignSelf: 'center',
  },
  actionContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconView: {
    marginLeft: moderateScale(10),
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginHorizontal: horizontalScale(5),
  },
  buttonView: {},
  buttonText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.blueText,
  },
  centerFlex: {
    flex: 0.65,
  },
  notificationCountView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(20),
    width: horizontalScale(20),
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(10),
    bottom: 10,
    left: 10,
    right: 0,
    position: 'absolute',
  },
  notificationCountText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(10),
    color: Colors.black,
    textAlign: 'center',
  },
});
