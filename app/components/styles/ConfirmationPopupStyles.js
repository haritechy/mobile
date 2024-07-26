import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../theme';

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
    paddingVertical: moderateScale(15),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(20),
  },
  alertIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
    marginRight: moderateScale(15),
  },
  titleText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.h6,
    color: Colors.black,
  },
  messageView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginTop: moderateScale(5),
  },
  messageText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
    height: moderateScale(40),
    borderWidth: 1,
    borderColor: Colors.titleBlack,
    flex: 0.45,
  },
  cancelText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
    textTransform: 'uppercase',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: moderateScale(12),
    height: moderateScale(40),
    flex: 0.45,
  },
  confirmText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
    textTransform: 'uppercase',
  },
});
