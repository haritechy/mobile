import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform, // Import Platform to handle platform-specific styles
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

import { Icons } from '../../assets';
import { CustomButton, CustomNavBar, ScreenContainer } from '../../components';
import colors from '../../theme/Colors';
import { Colors, moderateScale } from '../../theme';

const { width: screenWidth } = Dimensions.get('window');

const Payment = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);
  }, [navigation]);

  const handlePlanSelection = plan => {
    setSelectedPlan(plan);
  };

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={'Payment Plan'}
            isRightActionVisible={true}
            isBackVisible={true} // Show back button
            isRightButton={true}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.notifications]}
            onAction={handleActions}
            isNotificationCount={true}
            onBackPress={() => navigation.goBack()} // Handle back button press
          />
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Choose Your Subscription Plan</Text>
            <View style={styles.plansContainer}>
              <TouchableOpacity
                style={[
                  styles.planButton,
                  selectedPlan === 'monthly' && styles.selectedPlan,
                ]}
                onPress={() => handlePlanSelection('monthly')}>
                <Text
                  style={[
                    styles.planText,
                    selectedPlan === 'monthly' && styles.selectedPlanText,
                  ]}>
                  Monthly Plan
                </Text>
                <Text style={styles.planPrice}>$9.99 / month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.planButton,
                  selectedPlan === 'annual' && styles.selectedPlan,
                ]}
                onPress={() => handlePlanSelection('annual')}>
                <Text
                  style={[
                    styles.planText,
                    selectedPlan === 'annual' && styles.selectedPlanText,
                  ]}>
                  Annual Plan
                </Text>
                <Text style={styles.planPrice}>$99.99 / year</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              title={`Subscribe (${
                selectedPlan === 'monthly' ? '$9.99 / month' : '$99.99 / year'
              })`}
              onPress={() => navigation.navigate('TermsPayment')}
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
      Platform.OS === 'ios' ? Colors.backgroundWhite : Colors.backgroundGrey, // Different background colors for iOS and Android
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
    backgroundColor: colors.backgroundGrey, // Grey background for plan options
    marginHorizontal: 10,
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedPlan: {
    backgroundColor: colors.backgroundBlue, // Highlighted background color
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
    backgroundColor: colors.backgroundBlue, // Blue background color for the button
  },
});

export default Payment;
