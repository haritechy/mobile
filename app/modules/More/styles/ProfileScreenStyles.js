import {StyleSheet} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginHorizontal: horizontalScale(20),
  },
  headerStyle: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.input,
  },
  headerContainer: {
    marginHorizontal: horizontalScale(15),
  },
  profileView: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    marginTop: verticalScale(15),
  },
  profileContainer: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderWidth: 1,
    borderRadius: moderateScale(100),
    borderColor: Colors.placeHolderColor,
  },
  profileImage: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(100),
  },
  profileText: {
    fontFamily: Fonts.type.PoppinsBold,
    fontSize: Fonts.size.h4,
    color: Colors.black,
    textAlign: 'center',
    marginVertical: verticalScale(15),
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  personalInfoIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  headerTitle: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: moderateScale(16),
    color: Colors.dustGrey,
  },
  nameView: {
    justifyContent: 'center',
    marginLeft: moderateScale(30),
    marginTop: verticalScale(10),
  },
  nameLabel: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.placeHolderColor,
  },
  nameText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  emailInfoContainer: {
    marginLeft: moderateScale(30),
  },
  emailView: {
    marginTop: verticalScale(10),
  },
  emailRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emailTextView: {
    flex: 0.65,
  },
  emailText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  verifiedView: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    height: moderateScale(20),
    width: horizontalScale(20),
    marginRight: horizontalScale(8),
  },
  verifiedText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.small,
    color: Colors.verified,
  },
  arrowRightButton: {
    flex: 0.32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowRightText: {
    fontFamily: Fonts.type.PoppinsSemiBold,
    fontSize: Fonts.size.small,
    color: Colors.blueText,
  },
  pendingVerificationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginRight: horizontalScale(8),
  },
  pendingVerificationText: {
    fontFamily: Fonts.type.PoppinsRegular,
    fontSize: Fonts.size.small,
    color: Colors.pending,
  },
  savedAddressIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  addrressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: moderateScale(30),
  },
  addressView: {
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  addressTypeText: {
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.dustGrey,
  },
  addressText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: Fonts.size.medium,
    color: Colors.black,
  },
  separator: {
    backgroundColor: Colors.extraLightGrey,
    height: 1,
    marginVertical: verticalScale(10),
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
  noAddressMainView: {
    flexDirection: 'row',
  },
  noAddressView: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  noAddressText: {
    fontFamily: Fonts.type.PoppinsMedium,
    fontSize: moderateScale(16),
    color: Colors.dustGrey,
  },
});

export default styles;
