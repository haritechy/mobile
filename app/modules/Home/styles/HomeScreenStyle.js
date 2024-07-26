import {Platform, StyleSheet} from 'react-native';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  Metrics,
  moderateScale,
  verticalScale,
} from '../../../theme';
const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.form,
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  navContainer: {
    marginHorizontal: moderateScale(20),
  },
  scrollView: {
    flex: 1,
    bottom: verticalScale(12),
    top: verticalScale(5),
  },
  headerView: {
    flexDirection: 'column',
  },
  warrantyView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.facebookBlue,
    height: Metrics.screenHeight * 0.12,
    borderRadius: moderateScale(15),
    paddingHorizontal: horizontalScale(15),
    marginTop: verticalScale(10),
  },
  progressCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageTextView: {
    marginTop: verticalScale(-5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  percentageText: {
    marginTop: verticalScale(2),
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.white,
  },
  warrantyTextView: {
    flexShrink: 1,
  },
  warrantyText: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.PoppinsMedium,
    color: Colors.white,
    marginLeft: horizontalScale(15),
  },
  mainChartView: {
    backgroundColor: Colors.extraLightGrey,
    marginVertical: verticalScale(15),
    borderRadius: moderateScale(20),
    elevation: 1,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
  },
  typeDetailsScrollView: {
    flexWrap: 'wrap',
    width: Metrics.screenWidth * 0.4,
  },
  typeDetailsView: {
    height: Metrics.screenHeight * 0.18,
  },
  chartButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  selectView: {
    height: verticalScale(4),
    width: horizontalScale(40),
    marginRight: horizontalScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.black,
    marginTop: verticalScale(2),
  },
  hiddenLine: {
    backgroundColor: Colors.transparent,
  },
  mainBarChartView: {
    backgroundColor: Colors.extraLightGrey,
    width: Metrics.screenWidth * 0.89,
    height:
      Platform.OS === 'android'
        ? Metrics.screenHeight * 0.38
        : Metrics.screenHeight * 0.32,
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(8),
    elevation: 1,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
  },
  barChartHeaderText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:
      Platform.OS === 'android' ? verticalScale(20) : verticalScale(10),
    marginHorizontal:
      Platform.OS === 'android' ? horizontalScale(15) : horizontalScale(20),
  },
  barChartView: {
    alignItems: 'center',
    justifyContent: 'center',
    width:
      Platform.OS === 'android'
        ? Metrics.screenWidth * 0.82
        : Metrics.screenWidth * 0.78,
    height: Metrics.screenHeight * 0.13,
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(40),
  },
  typeButton: {
    marginHorizontal: horizontalScale(5),
  },
  typeText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
  },
  firstBottomView: {
    backgroundColor: Colors.electronicsColor,
    height: verticalScale(4),
    width: horizontalScale(30),
    marginLeft: horizontalScale(4),
    borderRadius: moderateScale(12),
    bottom: verticalScale(15),
  },
  bannerView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight * 0.22,
  },
  pieChartDetailTitleText: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.PoppinsSemiBold,
    color: Colors.black,
    marginHorizontal: horizontalScale(5),
    marginVertical: verticalScale(15),
    height: verticalScale(20),
    flexWrap: 'wrap',
  },
  columnView: {
    marginVertical: verticalScale(0),
  },
  childView: {
    marginVertical: verticalScale(-5),
  },
  pieChartLabel: {fontSize: moderateScale(13), fill: Colors.white},
  closeIcon: {
    height: moderateScale(10),
    width: moderateScale(10),
    tintColor: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: Platform.OS === 'android' ? 0 : 15,
    top: 1,
    height: moderateScale(20),
    width: moderateScale(20),
    backgroundColor: Colors.lightGrey,
    borderRadius: moderateScale(1),
  },
  noItem: {
    color: Colors.tagTextColor,
    fontFamily: Fonts.type.PoppinsMedium,
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
  productContainer: {
    width: screenWidth,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.5,
    borderRadius: 10,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  productSpec: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productRate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default styles;
