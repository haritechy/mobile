import {Platform, StyleSheet} from 'react-native';
import {
  Metrics,
  Colors,
  moderateScale,
  verticalScale,
  Fonts,
  horizontalScale,
} from '../../theme';
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  opacityContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.transparentBlack,
    opacity: 0.5,
  },
  connectionModalView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.transparent,
  },
  modalContainer: {
    backgroundColor: Colors.appThemeColor,
    paddingHorizontal: verticalScale(10),
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 2,
  },
  modalText: {
    fontSize: moderateScale(15),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
    marginTop: horizontalScale(14),
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(10),
    paddingBottom: verticalScale(10),
  },
});
export default styles;
