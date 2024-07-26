import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  countryCodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.35,
    height: moderateScale(60),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: Colors.inputBorder,
    marginRight: moderateScale(10),
    paddingHorizontal: horizontalScale(10),
  },

  codeText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.lightGrey,
  },
  downIcon: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
  },
  inputContainer: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(8),
    height: moderateScale(60),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  paddingTop: {
    paddingTop: moderateScale(12),
  },
  errorView: {
    alignSelf: 'flex-start',
    marginTop: moderateScale(5),
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
