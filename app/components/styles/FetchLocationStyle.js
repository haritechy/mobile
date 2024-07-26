import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  Colors,
} from '../../theme';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  textStyle: {
    left: moderateScale(20),
    fontSize: moderateScale(15),
    textAlign: 'left',
    color: Colors.black,
    margin: moderateScale(20),
  },
  locationButton: {
    left: horizontalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: verticalScale(40),
    width: horizontalScale(300),
    borderRadius: moderateScale(30),
  },
  buttontext: {
    fontSize: moderateScale(20),
    color: Colors.darkNavyBlue,
  },
});
export default styles;
