import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
  Metrics,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  buttonContainer: {
    height: verticalScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    marginHorizontal: horizontalScale(20),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  bottomView: {
    height: verticalScale(50),
    marginTop: horizontalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  accountText: {
    fontSize: moderateScale(13),
  },
  forgotUsrContainer: {
    width: '20%',
    alignSelf: 'flex-end',
    right: horizontalScale(32),
    paddingBottom: horizontalScale(20),
  },
  marginTextInput: {
    margin: 5,
  },
  headerTitle: {
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: Fonts.size.h4,
    color: Colors.black,
    paddingHorizontal: moderateScale(20),
  },
  headerDesc: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  textInput: {
    height: verticalScale(50),
    width: Metrics.screenWidth - horizontalScale(40), //'90%',
    borderColor: Colors.grey,
    paddingLeft: horizontalScale(10),
  },
  errorStyle: {
    marginHorizontal: moderateScale(30),
  },
  inputContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    marginTop: moderateScale(2),
  },
});

export default styles;
