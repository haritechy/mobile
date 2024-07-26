import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../theme';

export default StyleSheet.create({
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
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
  headerText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginVertical: moderateScale(5),
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  discardButton: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appThemeColor,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    height: moderateScale(50),
  },
  discardText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  cancelButton: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    height: moderateScale(50),
  },
  cancelText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
});
