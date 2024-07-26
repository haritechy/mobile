import {Platform, StyleSheet} from 'react-native';
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
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginLeft: horizontalScale(15),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    height: verticalScale(60),
    width:
      Platform.OS === 'android'
        ? Metrics.screenWidth - horizontalScale(70)
        : Metrics.screenWidth - horizontalScale(60),
    marginHorizontal: horizontalScale(20),
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    marginHorizontal: horizontalScale(12),
  },
  marginTextInput: {
    margin: 10,
  },
  headerDesc: {
    color: Colors.dustGrey,
    marginTop: verticalScale(30),
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize:
      Platform.OS === 'android' ? moderateScale(13.5) : moderateScale(13),
  },
  textInputView: {
    marginHorizontal: horizontalScale(20),
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  errorStyle: {
    marginHorizontal: moderateScale(20),
  },
  inputContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
  },
  bannerView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    height: moderateScale(10),
    width: moderateScale(10),
    tintColor: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: Colors.lightGrey,
    borderRadius: moderateScale(1),
  },
});

export default styles;
