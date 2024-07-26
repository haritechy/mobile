import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flatList: {
    marginVertical: moderateScale(10),
    marginHorizontal: horizontalScale(15),
  },
  detailTitle: {
    fontSize: Fonts.size.medium,
    color: Colors.dustGrey,
    textAlign: 'center',
    fontFamily: Fonts.type.PoppinsMedium,
  },
  headerView: {
    height: verticalScale(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: moderateScale(15),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  headerContainer: {
    marginHorizontal: horizontalScale(15),
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
});
export default styles;
