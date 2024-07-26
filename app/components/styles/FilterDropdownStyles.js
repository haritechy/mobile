import {StyleSheet} from 'react-native';
import {
  Colors,
  Metrics,
  moderateScale,
  Fonts,
  horizontalScale,
  verticalScale,
} from '../../theme';

export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Metrics.screenHeight * 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdown: {
    position: 'absolute',
    borderColor: Colors.black,
    margin: moderateScale(20),
    width: Metrics.screenWidth - 40,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    alignSelf: 'center',
    elevation: 2,
    minHeight: Metrics.screenHeight * 0.3,
    maxHeight: Metrics.screenHeight * 0.7,
  },
  closeView: {
    paddingVertical: verticalScale(5),
  },
  closeIcn: {
    width: horizontalScale(15),
    height: verticalScale(15),
    tintColor: Colors.black,
    alignSelf: 'flex-end',
    margin: verticalScale(10),
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  flatListView: {
    flex: 1,
    padding: moderateScale(10),
    borderWidth: 0.5,
    borderColor: Colors.white,
    borderRadius: horizontalScale(10),
  },
  itemText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsMedium,
    marginHorizontal: horizontalScale(10),
  },
  separator: {
    height: verticalScale(1),
    backgroundColor: Colors.white,
  },
  selectIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  unSelectIcn: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
});
