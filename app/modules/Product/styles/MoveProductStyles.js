import {StyleSheet} from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(10),
  },
  headerContainer: {
    paddingHorizontal: moderateScale(10),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.regular,
  },
  productView: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(15),
    paddingLeft: horizontalScale(30),
  },
  leftView: {},
  leftImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: 'center',
    borderRadius: moderateScale(10),
  },
  productDetail: {
    width: '70%',
    marginLeft: moderateScale(15),
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: Colors.black,
  },
  productCount: {
    fontSize: moderateScale(12),
    color: Colors.grey,
    marginTop: moderateScale(5),
  },
  listContainer: {
    flex: 1,
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  buttonView: {
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: Colors.black,
  },
  seperator: {
    height: moderateScale(0.5),
    backgroundColor: Colors.seperatorColor,
  },
  topView: {
    flex: 0.92,
  },
  bottomView: {
    flex: 0.08,
    marginTop: verticalScale(10),
    backgroundColor: Colors.transparent,
  },
});
