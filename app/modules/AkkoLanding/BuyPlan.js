import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {Colors, moderateScale} from '../../theme';
import {CustomButton, CustomNavBar, ScreenContainer} from '../../components';
import colors from '../../theme/Colors';

export const BuyPlan = ({navigation}) => {
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const handleDummyPayment = () => {
    // Simulate a successful payment process
    Alert.alert(
      'Payment Simulated',
      'This is a dummy payment. No real transaction has occurred.',
    );
  };

  // Simple validation
  const validateFields = () => {
    const {name, number, expiry, cvv} = cardDetails;
    if (!name || !number || !expiry || !cvv) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }
    // You can add more sophisticated validation here
    return true;
  };

  const handlePayment = () => {
    if (validateFields()) {
      handleDummyPayment();
    }
  };

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={'Purchase Warranty'}
            isRightActionVisible={true}
            isBackVisible={true}
            isRightButton={true}
            containerStyle={styles.navContainer}
            onBackPress={() => navigation.goBack()}
            isNotificationCount={true}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Purchase Warranty</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={cardDetails.name}
                onChangeText={text =>
                  setCardDetails({...cardDetails, name: text})
                }
                returnKeyType="next"
                onSubmitEditing={() => this.cardNumberInput.focus()}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card number"
                keyboardType="numeric"
                value={cardDetails.number}
                onChangeText={text =>
                  setCardDetails({...cardDetails, number: text})
                }
                ref={input => (this.cardNumberInput = input)}
                returnKeyType="next"
                onSubmitEditing={() => this.expiryInput.focus()}
              />
            </View>

            <View style={[styles.row, styles.inputContainer]}>
              <View style={styles.halfContainer}>
                <Text style={styles.label}>Expiry Date (MM/YY)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, expiry: text})
                  }
                  ref={input => (this.expiryInput = input)}
                  returnKeyType="next"
                  onSubmitEditing={() => this.cvvInput.focus()}
                />
              </View>
              <View style={styles.halfContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  keyboardType="numeric"
                  value={cardDetails.cvv}
                  onChangeText={text =>
                    setCardDetails({...cardDetails, cvv: text})
                  }
                  ref={input => (this.cvvInput = input)}
                  returnKeyType="done"
                />
              </View>
            </View>

            <CustomButton
              title="Agree & Pay"
              onPress={handlePayment}
              style={styles.subscribeButton}
              textStyle={styles.subscribeButtonText}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(20),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.blackHeaderText,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: Colors.black,
  },
  input: {
    height: 50,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  subscribeButton: {
    marginTop: 20,
    backgroundColor: colors.backgroundBlue,
  },
  subscribeButtonText: {
    color: Colors.white, // White text color for the button
  },
});
