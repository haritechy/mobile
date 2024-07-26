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
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
    left: moderateScale(-5),
  },
  errorText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    marginVertical: moderateScale(15),
  },
  okButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: moderateScale(12),
    height: moderateScale(40),
  },
  okText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.black,
    textTransform: 'uppercase',
  },
});
