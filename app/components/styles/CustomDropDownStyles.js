import {Platform, StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../theme';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(55),
    width: Metrics.screenWidth - 60,
    paddingHorizontal: horizontalScale(20),
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(10),
  },
  buttonView: {
    marginHorizontal: horizontalScale(5),
  },
  placeHolderText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.small,
    color: Colors.placeHolderColor,
  },
  selectedText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  buttonText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    width: Metrics.screenWidth - 60,
    minHeight: Metrics.screenHeight * 0.15,
    maxHeight: Metrics.screenHeight * 0.3,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 5,
    marginTop: Platform.OS === 'android' ? verticalScale(-25) : 0,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  item: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: Colors.seperatorColor,
  },
  itemView: {
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  selectedTextStyle: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    marginLeft: Platform.OS === 'ios' ? horizontalScale(2) : horizontalScale(0),
    color: Colors.black,
    paddingTop: verticalScale(12),
  },
  textItem: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black,
  },
  downArrow: {
    width: 15,
    height: 15,
    tintColor: Colors.grey,
  },
  errorStyle: {
    marginBottom: 0,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
});
