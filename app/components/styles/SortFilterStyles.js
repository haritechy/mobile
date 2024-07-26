import {StyleSheet} from 'react-native';
import {Colors, Fonts, moderateScale} from '../../theme';

export default StyleSheet.create({
  topSortFilterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderTopColor: Colors.separatorColor,
    borderBottomColor: Colors.seperatorColor,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  sortFilterSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.45,
  },
  sortSignal: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: Colors.backgroundBlue,
  },
  sortIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(8),
  },
  filterIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(8),
  },
  verticalSeperator: {
    width: moderateScale(1),
    height: moderateScale(30),
    backgroundColor: Colors.separatorColor,
    alignSelf: 'center',
  },
  sortColumView: {
    width: '85%',
  },
  sortByText: {
    fontSize: Fonts.size.medium,
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsRegular,
  },
  sortTypeText: {
    fontSize: Fonts.size.small,
    color: Colors.dustGrey,
    fontFamily: Fonts.type.PoppinsRegular,
  },
});
