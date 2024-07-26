import {StyleSheet} from 'react-native';
import {
  Colors,
  Metrics,
  moderateScale,
  Fonts,
  verticalScale,
} from '../../theme';

export default StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  modalView: {
    width: Metrics.screenWidth * 0.85,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(30),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    marginTop: moderateScale(15),
  },
  subtitleText: {
    fontSize: moderateScale(14),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
    marginVertical: moderateScale(20),
  },
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(10),
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(10),
    backgroundColor: Colors.white,
    width: Metrics.screenWidth - 100,
  },
  cancelText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
  },
  skipButton: {
    width: Metrics.screenWidth - 100,
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(16),
  },
  skipText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
  },
  buttonContainer: {
    width: Metrics.screenWidth - 100,
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(16),
  },
});
