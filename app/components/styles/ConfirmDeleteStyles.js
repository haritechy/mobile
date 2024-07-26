import {StyleSheet} from 'react-native';
import {Colors, Metrics, moderateScale, Fonts, verticalScale} from '../../theme';

export default StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  modalView: {
    marginTop: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth * 0.9,
    backgroundColor: Colors.transparent,
    borderRadius: moderateScale(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: Metrics.screenHeight * 0.1,
    position: 'absolute',
    marginVertical: moderateScale(10),
  },
  topView: {
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    borderColor: Colors.white,
    borderWidth: 1,
  },
  bottomView: {
    marginTop: moderateScale(10),
    backgroundColor: Colors.white,
    height: moderateScale(50),
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    borderColor: Colors.white,
    borderWidth: 1,
  },
  separator: {
    height: moderateScale(0.5),
    backgroundColor: Colors.separator,
    marginVertical: verticalScale(15),
  },
  confirmText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.grey,
    textAlign: 'center',
    padding: moderateScale(10),
  },
  cancelText: {
    fontSize: moderateScale(16),
    color: Colors.blue,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  deleteText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.red,
    textAlign: 'center',
  },

  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderBottomColor: Colors.seperatorColor,
    paddingVertical: moderateScale(2),
  },
  optionText: {
    textAlign: 'center',
    margin: moderateScale(5),
    color: Colors.black,
  },
  optionIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
});
