import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {Colors, moderateScale} from '../../theme';
import {CustomButton, CustomNavBar, ScreenContainer} from '../../components';
import colors from '../../theme/Colors';

export const BuyPlan = ({route, navigation}) => {
  const {planName, planAmount} = route.params;

  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const handleConfirmDate = date => {
    setExpiryDate(date);
    setCardDetails({
      ...cardDetails,
      expiry: `${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`,
    });
    toggleDatePicker();
  };

  const validateFields = () => {
    const {name, number, expiry, cvv} = cardDetails;
    let valid = true;
    let tempErrors = {};

    if (!name) {
      tempErrors.name = 'Name is required';
      valid = false;
    }
    if (!number) {
      tempErrors.number = 'Card number is required';
      valid = false;
    }
    if (!expiry) {
      tempErrors.expiry = 'Expiry date is required';
      valid = false;
    }
    if (!cvv) {
      tempErrors.cvv = 'CVV is required';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handlePayment = () => {
    if (validateFields()) {
      toggleModal();
    }
  };

  const handleGPay = () => {
    // Implement Google Pay logic here
    Alert.alert('Google Pay', 'Google Pay option selected.');
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
            <View style={styles.planDetailsContainer}>
              <Text style={styles.planName}>{planName}</Text>
              <Text style={styles.planAmount}>{planAmount}</Text>
            </View>

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
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
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
              {errors.number && (
                <Text style={styles.errorText}>{errors.number}</Text>
              )}
            </View>

            <View style={[styles.row, styles.inputContainer]}>
              <View style={styles.halfContainer}>
                <Text style={styles.label}>Expiry Date (MM/YY)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onFocus={toggleDatePicker}
                />
                {errors.expiry && (
                  <Text style={styles.errorText}>{errors.expiry}</Text>
                )}
                <DatePicker
                  modal
                  open={isDatePickerVisible}
                  date={expiryDate}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={toggleDatePicker}
                  title="Select Expiry Date"
                  confirmText="Confirm"
                  cancelText="Cancel"
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
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>

            <CustomButton
              title="Agree & Pay"
              onPress={handlePayment}
              style={styles.subscribeButton}
              textStyle={styles.subscribeButtonText}
            />

            {/* Google Pay Button */}
            {/* <TouchableOpacity style={styles.gPayButton} onPress={handleGPay}>
              <Text style={styles.gPayButtonText}>Pay with Google Pay</Text>
            </TouchableOpacity> */}

            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}> Congratulations! </Text>
                <Text style={styles.modalText}>
                  Welcome to Akko You purchased the {planName} plan to cover{' '}
                  {planAmount} products. Do you want to add eligible products
                  from Melbeez to your Akko Coverage?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <CustomButton
                    title="Skip"
                    onPress={toggleModal}
                    style={styles.modalButton}
                  />
                  <CustomButton
                    title="Yes"
                    onPress={() => {
                      navigation.navigate('Products');
                      toggleModal();
                    }}
                    style={styles.modalButton}
                  />
                </View>
              </View>
            </Modal>
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
  planDetailsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  planAmount: {
    fontSize: 16,
    color: Colors.black,
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
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  subscribeButton: {
    marginTop: 20,
    backgroundColor: colors.backgroundBlue,
  },
  subscribeButtonText: {
    color: Colors.white, // White text color for the button
  },
  gPayButton: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  gPayButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  modalText: {
    fontSize: 16,
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: Colors.white,
  },
});
