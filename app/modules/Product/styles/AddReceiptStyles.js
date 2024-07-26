import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(10),
  },
  receiptContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  scrollContainer: {
    alignItems: 'center',
  },
  imagePickerContainer: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(20),
  },
  imagePicker: {
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight * 0.25,
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    justifyContent: 'space-between',
    height: moderateScale(55),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.grey,
    marginTop: 0,
    width: Metrics.screenWidth - 60,
  },
  inputText: {
    marginLeft: moderateScale(10),
  },
  inputContentContainer: {
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    width: Metrics.screenWidth - 60,
    borderColor: Colors.inputBorder,
  },
  cameraView: {
    alignItems: 'center',
  },
  cameraIcn: {
    width: moderateScale(25),
    height: moderateScale(25),
    resizeMode: 'contain',
  },
  addPhotoText: {
    fontSize: moderateScale(14),
    color: Colors.grey,
    marginTop: moderateScale(5),
    fontFamily: Fonts.type.PoppinsMedium,
  },
  submitButtonStyle: {
    height: verticalScale(50),
    width: Metrics.screenWidth - 60,
    backgroundColor: Colors.appThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  saveText: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    bottom: moderateScale(10),
  },
});
