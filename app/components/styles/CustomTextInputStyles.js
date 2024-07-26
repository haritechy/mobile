import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  textInput: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    marginLeft: horizontalScale(2),
  },
  placeholderStyle: {
    fontWeight: '900',
    borderColor: Colors.red,
  },
  shadowContainer: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 3,
  },
  inputContainer: {
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  paddingTop: {
    paddingTop: verticalScale(12),
  },
  visibleTextStyle: {
    color: Colors.blue,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  visible: {
    alignItems: 'center',
    right: horizontalScale(8),
    justifyContent: 'center',
  },
  rightButtonView: {
    alignItems: 'center',
    marginHorizontal: horizontalScale(5),
    justifyContent: 'center',
  },
  rightButtonText: {
    color: Colors.inputButtonColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  leftIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: horizontalScale(5),
  },
  rightIconView: {},
  rightIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  rightAction: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  errorView: {
    alignSelf: 'flex-start',
    marginBottom: verticalScale(10),
    width: '100%',
  },
  errorText: {
    fontSize: Fonts.size.medium,
    color: Colors.red,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
});

export default styles;
