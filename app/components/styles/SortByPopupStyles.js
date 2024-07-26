import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics, moderateScale} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparentBlack,
  },
  modalView: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(30),
    position: 'absolute',
    bottom: moderateScale(0),
    paddingBottom: Metrics.screenHeight * 0.05,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  headerText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginTop: moderateScale(15),
  },
  listSort: {
    marginTop: moderateScale(10),
  },
  sortTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10),
  },
  sortName: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  selectedType: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
  sortIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
    tintColor: Colors.blue,
  },
});
