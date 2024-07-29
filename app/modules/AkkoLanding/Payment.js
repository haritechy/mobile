import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icons} from '../../assets';
import {CustomButton, CustomNavBar, ScreenContainer} from '../../components';
import colors from '../../theme/Colors';
import {Colors, moderateScale} from '../../theme';
import {AppConstants, NavigationRoutes} from '../../constants';

const {width: screenWidth} = Dimensions.get('window');

const Payment = ({route, navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (route.params && route.params.product) {
      setSelectedPlan(route.params.product);
    }
  }, [route.params]);

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);
  }, [navigation]);

  const handleSubscribe = () => {
    // Pass selected plan details to BuyPlan screen
    navigation.navigate('TermsPayment', {
      planName:
        selectedPlan.type === 'monthly' ? 'Monthly Plan' : 'Annual Plan',
      planAmount:
        selectedPlan.type === 'monthly'
          ? `$${selectedPlan.monthlyPrice} / month`
          : `$${selectedPlan.annualPrice} / year`,
    });
  };

  if (!selectedPlan) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={'Payment Plan'}
            isRightActionVisible={true}
            isBackVisible={true}
            isRightButton={true}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.notifications]}
            onAction={handleActions}
            isNotificationCount={true}
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Choose Your Subscription Plan</Text>
            <View style={styles.plansContainer}>
              <TouchableOpacity
                style={[
                  styles.planButton,
                  selectedPlan.type === 'monthly' && styles.selectedPlan,
                ]}
                onPress={() =>
                  setSelectedPlan({...selectedPlan, type: 'monthly'})
                }>
                <Text
                  style={[
                    styles.planText,
                    selectedPlan.type === 'monthly' && styles.selectedPlanText,
                  ]}>
                  Monthly Plan
                </Text>
                <Text style={styles.planPrice}>
                  ${selectedPlan.monthlyPrice} / month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.planButton,
                  selectedPlan.type === 'annual' && styles.selectedPlan,
                ]}
                onPress={() =>
                  setSelectedPlan({...selectedPlan, type: 'annual'})
                }>
                <Text
                  style={[
                    styles.planText,
                    selectedPlan.type === 'annual' && styles.selectedPlanText,
                  ]}>
                  Annual Plan
                </Text>
                <Text style={styles.planPrice}>
                  ${selectedPlan.annualPrice} / year
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              title={`Subscribe (${
                selectedPlan.type === 'monthly'
                  ? `$${selectedPlan.monthlyPrice} / month`
                  : `$${selectedPlan.annualPrice} / year`
              })`}
              onPress={handleSubscribe}
              containerStyle={styles.subscribeButton}
            />
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  navContainer: {
    // Add custom styles for the navigation bar if needed
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(20),
    backgroundColor:
      Platform.OS === 'ios' ? Colors.backgroundWhite : Colors.backgroundGrey,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.blackHeaderText,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  planButton: {
    flex: 1,
    padding: moderateScale(15),
    borderRadius: 8,
    backgroundColor: colors.backgroundGrey,
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedPlan: {
    backgroundColor: colors.backgroundBlue,
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  selectedPlanText: {
    color: Colors.white,
  },
  planPrice: {
    fontSize: 16,
    color: Colors.black,
    marginTop: 8,
  },
  subscribeButton: {
    marginTop: 20,
    backgroundColor: colors.backgroundBlue,
  },
});

export default Payment;
