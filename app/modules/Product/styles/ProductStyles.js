import {StyleSheet} from 'react-native';
import {
  Colors,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
  Fonts,
} from '../../../theme';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(10),
  },
  searchContainer: {
    borderWidth: 1,
    backgroundColor: Colors.inputBackground,
    height: moderateScale(44),
    width: Metrics.screenWidth - 40,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  inputText: {
    fontWeight: 'normal',
    marginLeft: moderateScale(5),
    fontFamily: Fonts.type.PoppinsRegular,
  },
  navContainer: {
    marginHorizontal: moderateScale(20),
  },
  listContainer: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  plusIconView: {
    position: 'absolute',
    bottom: verticalScale(70),
    right: horizontalScale(15),
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
    backgroundColor: Colors.transparentBlack,
    paddingHorizontal: moderateScale(20),
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderTopColor: Colors.seperatorColor,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.blue,
  },
  disableButtonText: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.inputBorder,
  },
  iconStyle: {
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  contentListContainer: {
    flexGrow: 1,
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
  addProduct: {
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
