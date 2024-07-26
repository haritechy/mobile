import {StyleSheet} from 'react-native';
import {Colors, Metrics, verticalScale} from '../../theme';

const styles = StyleSheet.create({
  container: {
    height: verticalScale(1),
    width: Metrics.screenWidth - 24,
    backgroundColor: Colors.lightGrey,
    margin: 8,
    opacity: 0.5,
  },
});
export default styles;
