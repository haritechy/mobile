import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

export default StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: 'transparent',
  },
  actionSheet: {
    height: verticalScale(150),
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    marginBottom: verticalScale(10),
  },
  actionButton: {
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
  },
  actionBtnText: {
    color: Colors.linkBlue,
    fontSize: moderateScale(20),
  },
  separator: {
    height: verticalScale(1),
    backgroundColor: Colors.seperatorColor,
  },
});
