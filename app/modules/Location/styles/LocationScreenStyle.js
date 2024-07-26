import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  Metrics,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  navContainer: {
    marginHorizontal: moderateScale(20),
  },
  searchContainer: {
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    height: moderateScale(44),
    marginHorizontal: moderateScale(20),
    width: Metrics.screenWidth - 40,
    borderRadius: moderateScale(10),
  },
  inputText: {
    fontWeight: 'normal',
    marginLeft: moderateScale(5),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  listContainer: {
    flex: 1,
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  contentListContainer: {
    flexGrow: 1,
  },
  plusIconView: {
    position: 'absolute',
    bottom: verticalScale(70),
    right: moderateScale(15),
    backgroundColor: Colors.yellow,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.grey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  selectOperationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(60),
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(20),
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderTopColor: Colors.separator,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.blue,
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.PoppinsBold,
    color: Colors.black,
    fontSize: moderateScale(25),
    marginHorizontal: horizontalScale(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyData: {
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  addLocation: {
    fontFamily: Fonts.type.PoppinsRegular,
    color: Colors.black,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(8),
  },
  bannerView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    height: moderateScale(10),
    width: moderateScale(10),
    tintColor: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: Colors.lightGrey,
    borderRadius: moderateScale(1),
  },
});

export default styles;
