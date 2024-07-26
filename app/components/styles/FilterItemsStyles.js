import {StyleSheet} from 'react-native';
import {Colors, moderateScale, Fonts, verticalScale} from '../../theme';

export default StyleSheet.create({
  filterSelectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    minHeight: moderateScale(50),
    maxHeight: moderateScale(180),
    borderColor: Colors.grey,
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: moderateScale(14),
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
  },
  selectedItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    marginRight: moderateScale(5),
    marginVertical: moderateScale(4),
    backgroundColor: Colors.filterItemColor,
    borderWidth: 0.5,
    borderColor: Colors.extraLightGrey,
  },
  selectedItemText: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsMedium,
  },
  downIconView: {
    justifyContent: 'center',
    padding: verticalScale(10),
  },
  downIcn: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  cancelView: {
    marginLeft: moderateScale(4),
  },
  cancelIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
});
