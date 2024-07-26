import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryZoomContainer,
} from 'victory-native';
import {Icons} from '../../assets';
import {
  AddressPopup,
  CustomButton,
  CustomNavBar,
  GoogleAdsComponent,
  ReminderPopup,
  ScreenContainer,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {navigate} from '../../navigation/services/navigationServices';
import {getExistCountries} from '../../redux/actions/addressActions';
import {getChartsData} from '../../redux/actions/chartActions';
import {getExistsLocation} from '../../redux/actions/locationsActions';
import {
  getAllNotificationPreference,
  getAllNotifications,
} from '../../redux/actions/notificationActions';
import {
  sendVerificationToEmail,
  sendVerificationToPhone,
  setVerificationReminder,
} from '../../redux/actions/userActions';
import {Colors, Metrics, moderateScale} from '../../theme';
import {dayDifference, getAddUnitId} from '../../utils/helper';
import styles from './styles/HomeScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../../constants/Strings';

const HomeScreen = ({navigation}) => {
  const [isShowAddressPopup, setAddressPopup] = useState(false);
  const [isShowReminderPopup, setReminderPopup] = useState(false);
  const [isCategoryChart, setCategoryChart] = useState(true);

  const dispatch = useDispatch();
  //selector
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {notificationPage} = useSelector(state => state.notificationReducer);
  const {reminderDate, reminderCount} = useSelector(state => state.userReducer);
  const {userInfo, isFirstLogin} = useSelector(state => state.userReducer);
  const {listCharts} = useSelector(state => state.chartReducer);
  const barChartData =
    listCharts?.assetValuesPerYearBarChart?.data?.datasets[0]?.data.map(
      (val, index) => {
        return {x: index + 1, y: val};
      },
    );
  const zeroAssetValue =
    listCharts?.assetValuesPerYearBarChart?.data?.datasets[0]?.data.filter(
      zeroData => {
        return zeroData;
      },
    );
  const assetsValue = (value, decPlaces) => {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't'];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= value) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        value = Math.round((value * decPlaces) / size) / decPlaces;
        // Handle special case where we round up to the next abbreviation
        if (value === 1000 && i < abbrev.length - 1) {
          value = 1;
          i++;
        }
        // Add the letter for the abbreviation
        value += abbrev[i];
        // We are done... stop
        break;
      }
    }
    return value;
  };
  //useCallback
  const onPressWarrantyCoverage = useCallback(() => {
    navigate(NavigationRoutes.WarrantyListScreen);
  }, []);

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);
  }, [navigation]);
  const categoryOnPress = useCallback(() => setCategoryChart(true), []);
  const locationOnPress = useCallback(() => setCategoryChart(false), []);
  //useEffect
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getExistCountries());
      dispatch(getChartsData());
      dispatch(getExistsLocation());
      dispatch(getAllNotifications());
      dispatch(getAllNotificationPreference());
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);

  useEffect(() => {
    if (userInfo?.isFirstLoginAttempt && isFirstLogin) {
      setAddressPopup(true);
    } else {
      resetAsyncUser();
      dispatch({type: 'FIRST_ATTEMPT'});
    }
    notifyVerificationReminder();
  }, [
    userInfo?.isFirstLoginAttempt,
    isFirstLogin,
    notifyVerificationReminder,
    dispatch,
  ]);

  const notifyVerificationReminder = useCallback(() => {
    const isVerificationComplete =
      userInfo?.phoneNumberConfirmed && userInfo?.emailConfirmed;
    if (!isVerificationComplete && !isFirstLogin) {
      if (reminderCount === 0) {
        setReminderPopup(true);
      } else if (reminderCount <= 4) {
        const diff = dayDifference(reminderDate || new Date());
        diff > 0 && setReminderPopup(true);
      }
    }
  }, [
    isFirstLogin,
    reminderCount,
    reminderDate,
    userInfo?.emailConfirmed,
    userInfo?.phoneNumberConfirmed,
  ]);

  const resetAsyncUser = async () => {
    await AsyncStorage.removeItem(AppConstants.IS_ASYNC_USER);
  };

  const handleCloseReminder = useCallback(() => {
    setReminderPopup(false);
    reminderCount <= 4 && dispatch(setVerificationReminder(reminderCount + 1));
  }, [dispatch, reminderCount]);
  const handleSendVerification = useCallback(() => {
    setReminderPopup(false);
    const {emailConfirmed, phoneNumberConfirmed, email, phoneNumber} = userInfo;
    if (!emailConfirmed) {
      dispatch(sendVerificationToEmail(email));
    } else if (!phoneNumberConfirmed) {
      dispatch(sendVerificationToPhone(userInfo?.countryCode, phoneNumber));
    }
    reminderCount <= 4 && dispatch(setVerificationReminder(reminderCount + 1));
  }, [dispatch, reminderCount, userInfo]);
  const RenderWarranty = () => (
    <Pressable style={styles.warrantyView} onPress={onPressWarrantyCoverage}>
      <Progress.Circle
        style={styles.progressCircle}
        size={Platform.OS === 'android' ? 70 : 90}
        indeterminate={false}
        animated={false}
        progress={listCharts?.warrentyCoverage?.warrentyCoveragePercentage}
        color={Colors.white}
        fill={Colors.transparent}
        borderWidth={1}
        direction={'clockwise'}
        showsText
        textStyle={styles.percentageText}
        formatText={() => {
          return (
            <View style={styles.percentageTextView}>
              <Text style={styles.percentageText}>
                {`${
                  listCharts?.warrentyCoverage?.warrentyCoveragePercentage || 0
                }%`}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.warrantyTextView}>
        <Text
          adjustsFontSizeToFit
          style={styles.warrantyText}
          numberOfLines={1}>
          {Strings.warrantyCoverage}
        </Text>
      </View>
    </Pressable>
  );
  const RenderPieChart = () => {
    const pieChart = isCategoryChart
      ? listCharts?.productByCategoriesPieChart?.data
      : listCharts?.productByLocationsPieChart?.data;
    const firstIndicator = StyleSheet.compose(
      styles.selectView,
      !isCategoryChart ? styles.hiddenLine : {},
    );
    const secondIndicator = StyleSheet.compose(
      styles.selectView,
      isCategoryChart ? styles.hiddenLine : {},
    );
    const selectedPieChart = () => {
      const PieChart = () => (
        <>
          <VictoryPie
            style={{
              labels: styles.pieChartLabel,
            }}
            labels={pieChart?.datasets[0]?.data}
            labelPosition={'centroid'}
            labelRadius={
              Platform.OS === 'ios' ? moderateScale(52) : moderateScale(45)
            }
            colorScale={pieChart?.datasets[0]?.backgroundColor}
            width={Metrics.screenWidth * 0.45}
            height={Metrics.screenHeight * 0.22}
            innerRadius={
              Platform.OS === 'android' ? moderateScale(65) : moderateScale(80)
            }
            data={pieChart?.datasets[0]?.data}
          />
          <View style={styles.typeDetailsView}>
            <ScrollView
              nestedScrollEnabled={true}
              style={styles.typeDetailsScrollView}
              showsVerticalScrollIndicator={false}>
              {pieChart?.labels?.map((label, i) => {
                const allColors =
                  pieChart?.datasets[0]?.backgroundColor || Colors.grey;
                const bottomLine = StyleSheet.compose(styles.firstBottomView, {
                  backgroundColor: allColors[i],
                });
                return (
                  <View key={i} style={styles.childView}>
                    <Pressable
                      onPress={() => {
                        if (isCategoryChart) {
                          navigate(NavigationRoutes.ProductScreen, {
                            isFromHome: true,
                          });
                        } else {
                          const locationDetail = listLocations?.find(
                            e => e?.name === label,
                          );
                          navigate(NavigationRoutes.DeliveryLocationScreen, {
                            locationDetail,
                          });
                        }
                      }}>
                      <Text
                        style={styles.pieChartDetailTitleText}
                        numberOfLines={1}>
                        {label}
                      </Text>
                      <View style={bottomLine} />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </>
      );
      switch (isCategoryChart) {
        case true:
          if (
            listCharts?.productByCategoriesPieChart?.data?.labels?.length > 0
          ) {
            return <PieChart />;
          } else {
            return <Text style={styles.noItem}>{Strings.noCategoryData}</Text>;
          }
        case false:
          if (
            listCharts?.productByLocationsPieChart?.data?.labels?.length > 0
          ) {
            return <PieChart />;
          } else {
            return <Text style={styles.noItem}>{Strings.noLocation}</Text>;
          }
      }
    };
    return (
      <View style={styles.mainChartView}>
        <View style={styles.chartButtonView}>
          <Pressable style={styles.typeButton} onPress={categoryOnPress}>
            <Text style={styles.typeText}>{Strings.categories}</Text>
            <View style={firstIndicator} />
          </Pressable>
          <Pressable style={styles.typeButton} onPress={locationOnPress}>
            <Text style={styles.typeText}>{Strings.locations}</Text>
            <View style={secondIndicator} />
          </Pressable>
        </View>
        <View style={styles.chartMainView}>{selectedPieChart()}</View>
      </View>
    );
  };
  const RenderBarChart = () => (
    <View style={styles.mainBarChartView}>
      <View style={styles.barChartHeaderText}>
        <Text style={styles.typeText}>{Strings.assetsValue}</Text>
      </View>
      <View style={styles.barChartView}>
        {listCharts !== null &&
        zeroAssetValue !== [] &&
        zeroAssetValue?.length !== 0 &&
        listCharts?.assetValuesPerYearBarChart?.data?.labels?.length > 0 ? (
          <VictoryChart
            containerComponent={
              <VictoryZoomContainer
                allowZoom={false}
                zoomDimension={'x'}
                zoomDomain={
                  listCharts?.assetValuesPerYearBarChart?.data?.labels?.length >
                  5
                    ? {x: [0, 5]}
                    : null
                }
              />
            }
            domainPadding={15}
            height={280}
            width={
              Platform.OS === 'ios'
                ? Metrics.screenWidth * 0.89
                : Metrics.screenWidth * 0.95
            }
            animate={{
              duration: 500,
              onLoad: {duration: 200},
            }}>
            <VictoryAxis
              padding={{top: 20, bottom: 60}}
              dependentAxis={true}
              tickFormat={y => assetsValue(y, 2)}
              style={{
                axis: {stroke: 'transparent'},
                ticks: {stroke: 'transparent'},
                tickLabels: {
                  fill: Colors.black,
                  fontSize: moderateScale(10),
                },
                grid: {
                  stroke: Colors.unFilledYellow,
                  strokeWidth: 0.6,
                },
              }}
            />
            <VictoryAxis
              tickFormat={x => moment(x).year()}
              style={{
                ticks: {stroke: 'transparent'},
                tickLabels: {
                  fill: Colors.black,
                  fontSize: moderateScale(10),
                },
                grid: {
                  stroke: Colors.transparent,
                  strokeWidth: 0.6,
                },
              }}
            />
            <VictoryBar
              barWidth={15}
              style={{data: {fill: Colors.appliancesColor}}}
              data={barChartData}
              categories={{
                x: listCharts?.assetValuesPerYearBarChart?.data?.labels,
                y: listCharts?.assetValuesPerYearBarChart?.data?.datasets[0]
                  .data,
              }}
              alignment="middle"
            />
          </VictoryChart>
        ) : (
          <Text style={styles.noItem}>{Strings.noAssertData}</Text>
        )}
      </View>
    </View>
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.home}
            isRightActionVisible={true}
            isBackVisible={false}
            isRightButton={true}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.notifications]}
            onAction={handleActions}
            isNotificationCount={true}
            notificationCount={notificationPage?.unreadNotificationCount}
          />
          <View style={styles.mainContainer}>
            <ScrollView
              nestedScrollEnabled={true}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <RenderWarranty />
              <RenderPieChart />
              <RenderBarChart />

              <TouchableOpacity
                style={styles1.customButton}
                onPress={() => navigation.navigate('PlanScreen')}>
                <Text style={styles1.buttonText}>Buy Akko Warranty</Text>
              </TouchableOpacity>
            </ScrollView>
            <GoogleAdsComponent
              isHome
              adContainerStyle={styles.bannerView}
              unitId={getAddUnitId(AppConstants.Banners.Home)}
            />
            <AddressPopup
              isVisible={isShowAddressPopup}
              setVisible={setAddressPopup}
            />
            <ReminderPopup
              isVisible={isShowReminderPopup}
              setVisible={setReminderPopup}
              {...{
                reminderDate,
                reminderCount,
                handleCloseReminder,
                handleSendVerification,
              }}
            />
          </View>
        </>
      )}
    />
  );
};
export default HomeScreen;
const styles1 = StyleSheet.create({
  // other styles...

  customButton: {
    width: moderateScale(250),
    marginLeft: moderateScale(50),
    backgroundColor: Colors.backgroundBlue,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white, // Ensure button text is white
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
