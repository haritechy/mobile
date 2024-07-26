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
  scrollViewStyle: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(30),
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
  marginTextInput: {
    margin: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsRegular,
    left: 30,
    top: verticalScale(20),
  },
  headerDesc: {
    color: Colors.lightGrey,
    left: 10,
    top: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  updateButton: {
    backgroundColor: Colors.appThemeColor,
    height: verticalScale(50),
    width: Metrics.screenWidth / 3, //'90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
  },
  avatarView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    marginTop: verticalScale(15),
  },
  avatarNameText: {
    marginVertical: verticalScale(15),
    color: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: moderateScale(25),
  },
  headerView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },
  personalInfoIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  savedAddressIcon: {
    height: moderateScale(24),
    width: moderateScale(18),
  },
  detailTitle: {
    color: Colors.dustGrey,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsMedium,
    marginHorizontal: horizontalScale(8),
    fontSize: moderateScale(16),
  },
  dropDownStyle: {
    height: moderateScale(60),
    width: Metrics.screenWidth - horizontalScale(60),
    borderRadius: moderateScale(16),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: moderateScale(18),
  },
  headerContainer: {
    marginLeft: horizontalScale(15),
    marginHorizontal: horizontalScale(15),
  },
  infoView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
  },
  addressTypeText: {
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsMedium,
    marginVertical: verticalScale(5),
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
  labelStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
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
  userInputView: {
    height: moderateScale(40),
    marginHorizontal: moderateScale(15),
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderBottomColor: Colors.inputBorder,
  },
  userInputText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
  },
  userNameError: {
    marginHorizontal: horizontalScale(10),
  },
  inputStyle: {
    paddingLeft: horizontalScale(10),
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  selectedDropDown: {
    color: Colors.black,
  },
  buttonText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.dustGrey,
  },
});

export default styles;
