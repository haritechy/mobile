import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  moderateScale,
  horizontalScale,
  Fonts,
  verticalScale,
  Metrics,
} from '../../../theme';
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  subjectText: {
    fontSize: moderateScale(14),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  fromText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  subjectInputText: {
    fontWeight: 'normal',
    marginLeft: moderateScale(0),
    borderWidth: 0,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  inputText: {
    marginLeft: moderateScale(0),
    borderWidth: 0,
    alignSelf: 'flex-start',
    fontFamily: Fonts.type.PoppinsRegular,
  },
  subjectContainer: {
    height: moderateScale(40),
    marginHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderBottomColor: Colors.inputBorder,
  },
  detailContainer: {
    borderWidth: 0,
    height: verticalScale(150),
    marginHorizontal: moderateScale(15),
    justifyContent: 'flex-start',
    paddingTop: moderateScale(10),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  errorStyle: {
    marginHorizontal: moderateScale(20),
  },
  attachmentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: verticalScale(50),
    width: Metrics.screenWidth - 40,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: horizontalScale(10),
    marginVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  attachmentIcn: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
    flex: 0.1,
  },
  cancelView: {
    padding: verticalScale(10),
    flex: 0.1,
  },
  cancelIcn: {
    width: horizontalScale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  attachmentText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.black,
    flex: 0.8,
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
  errorText: {
    color: Colors.red,
    marginLeft: horizontalScale(20),
  },
});
