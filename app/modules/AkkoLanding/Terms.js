import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';

// LOCAL IMPORTS
import { CustomNavBar, ScreenContainer } from '../../components';
import { Colors } from '../../theme';
import styles from '../More/styles/TermsStyles';

const TermsPayment = ({ route, navigation }) => {
  const [agreed, setAgreed] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const { planName, planAmount } = route.params || {}; // Get plan details from route params

  const webUrl = 'https://example.com/terms-and-conditions'; // Replace with your actual URL

  const handleAgreementToggle = () => {
    setAgreed(prevAgreed => !prevAgreed);
  };

  const handleAccept = () => {
    if (agreed) {
      setAccepted(true);
      // Pass the plan details to the BuyPlan screen
      navigation.navigate('BuyPlan', {
        planName,
        planAmount,
      });
    } else {
      alert('You must agree to the terms and conditions before accepting.');
    }
  };

  const handleProceed = () => {
    if (accepted) {
      navigation.navigate('PaymentPage'); // Replace 'PaymentPage' with your actual payment page route
    } else {
      alert('You must accept the terms and conditions before proceeding.');
    }
  };

  const RenderTermsServices = () => (
    <WebView
      startInLoadingState
      source={{ uri: webUrl }}
      style={styles.bottomContainer}
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          color={Colors.black}
          style={styles.webViewIndicator}
        />
      )}
    />
  );

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title="Terms & Conditions"
            containerStyle={styles.headerContainer}
          />
          <SafeAreaView style={styles.contentContainer}>
            <RenderTermsServices />
            <View style={localStyles.agreementContainer}>
              <TouchableOpacity
                style={localStyles.checkbox}
                onPress={handleAgreementToggle}>
                {agreed && <View style={localStyles.checkboxTick} />}
              </TouchableOpacity>
              <Text style={localStyles.agreementText}>
                I agree to the{' '}
                <Text style={localStyles.linkText} onPress={() => {}}>
                  Terms & Conditions
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={[
                localStyles.acceptButton,
                {
                  backgroundColor: agreed
                    ? Colors.appThemeColor
                    : Colors.primary,
                },
              ]}
              onPress={handleAccept}
              disabled={!agreed}>
              <Text
                style={[
                  localStyles.buttonText,
                  { color: agreed ? Colors.black : 'transparent' },
                ]}>
                Accept
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                localStyles.proceedButton,
                { backgroundColor: accepted ? Colors.primary : Colors.disabled },
              ]}
              onPress={handleProceed}
              disabled={!accepted}
            >
              <Text style={localStyles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity> */}
          </SafeAreaView>
        </>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10, // Extra padding for iOS
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: Colors.white,
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: Colors.blue,
  },
  agreementText: {
    fontSize: 16,
    color: Colors.black,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  acceptButton: {
    backgroundColor: Colors.backgroundBlue,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  proceedButton: {
    backgroundColor: Colors.backgroundBlue,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TermsPayment;
