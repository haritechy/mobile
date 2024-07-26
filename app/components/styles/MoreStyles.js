import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../theme';

export default StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    marginTop: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.6,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: moderateScale(20),
    right: moderateScale(20),
    position: 'absolute',
    paddingHorizontal: moderateScale(5),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: moderateScale(0.5),
    borderColor: Colors.transparent,
    borderBottomColor: Colors.separatorColor,
    padding: moderateScale(5),
  },
  optionText: {
    textAlign: 'center',
    margin: moderateScale(5),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.small,
  },
  optionIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  seperator: {
    height: moderateScale(0.5),
    backgroundColor: Colors.separator,
    marginVertical: moderateScale(4),
  },
});
