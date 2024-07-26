import {StyleSheet} from 'react-native';
import {Colors, horizontalScale, verticalScale} from '../../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: verticalScale(60),
    backgroundColor: Colors.lightGrey,
    marginVertical: verticalScale(8),
    marginHorizontal: horizontalScale(20),
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(20),
  },
  signinText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.darkNavyBlue,
  },
  image: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(20),
    alignSelf: 'center',
  },
  iconForwardContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    right: 12,
  },
  arrowIconStyle: {alignSelf: 'center'},
});

export default styles;
