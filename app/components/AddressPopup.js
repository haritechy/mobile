import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {createRef, useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../assets';
import {AppConstants, Strings} from '../constants';
import {privacyPreference} from '../constants/Mockdata';
import {
  getCitiesOfState,
  getStatesOfCountry,
  postAddresses,
} from '../redux/actions/addressActions';
import {updateAllNotificationPreference} from '../redux/actions/notificationActions';
import {
  setVerificationReminder,
  updateUser,
} from '../redux/actions/userActions';
import Schema from '../services/ValidationService';
import {ThemeStyles} from '../theme';
import CustomButton from './CustomButton';
import CustomPhoneInput from './CustomPhoneInput';
import CustomTextInput from './CustomTextInput';
import ErrorPopup from './ErrorPopup';
import ListDataPopup from './ListDataPopup';
import {loaderRef} from './Loader';
import styles from './styles/AddressPopupStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const inputRef = {
  phone: createRef(),
  currency: createRef(),
  pAddress1: createRef(),
  pAddress2: createRef(),
  pCountry: createRef(),
  pState: createRef(),
  pCity: createRef(),
  pZipCode: createRef(),
  mAddress1: createRef(),
  mAddress2: createRef(),
  mCountry: createRef(),
  mState: createRef(),
  mCity: createRef(),
  mZipCode: createRef(),
};
const PhysicalAddress = ({
  params,
  listCountries,
  setPStates,
  setPCities,
  listPStates,
  listPCities,
  setPhysicalAddress,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <CustomTextInput
        ref={inputRef.pAddress1}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address1}
        title={Strings.address1}
        value={params.values.pAddress1}
        error={params.touched.pAddress1 && params.errors.pAddress1}
        returnKeyType={'next'}
        onBlur={params.handleBlur('pAddress1')}
        onChangeText={val => {
          params.setFieldValue('pAddress1', val);
          setPhysicalAddress(true);
        }}
        onSubmitEditing={() => inputRef.pAddress2.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.pAddress2}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address2}
        title={Strings.address2}
        value={params.values.pAddress2}
        error={params.touched.pAddress2 && params.errors.pAddress2}
        returnKeyType={'done'}
        onBlur={params.handleBlur('pAddress2')}
        onChangeText={val => {
          params.setFieldValue('pAddress2', val);
          setPhysicalAddress(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <ListDataPopup
        ref={inputRef.pCountry}
        label={Strings.selectCountry}
        placeholder={Strings.country}
        data={listCountries}
        labelName={'name'}
        labelId={'id'}
        selected={params.values.pCountry}
        error={params.errors.pCountry}
        onSelect={item => {
          params.setFieldValue('pCountry', item);
          dispatch(
            getStatesOfCountry(item?.id, (isSuccess, listData) => {
              params.setFieldValue('pState', undefined);
              params.setFieldValue('pCity', undefined);
              if (isSuccess) {
                setPStates(listData);
                setPCities([]);
              }
            }),
          );
          setPhysicalAddress(true);
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
      />
      <ListDataPopup
        ref={inputRef.pState}
        label={Strings.selectState}
        placeholder={Strings.state}
        data={listPStates}
        labelName={'stateName'}
        labelId={'id'}
        selected={params.values.pState}
        error={params.errors.pState}
        onSelect={item => {
          params.setFieldValue('pState', item);
          dispatch(
            getCitiesOfState(item?.id, (isSuccess, listData) => {
              params.setFieldValue('pCity', undefined);
              if (isSuccess) {
                setPCities(listData);
              }
            }),
          );
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
      />
      <ListDataPopup
        ref={inputRef.pCity}
        label={Strings.selectCity}
        placeholder={Strings.city}
        data={listPCities}
        labelName={'cityName'}
        labelId={'id'}
        selected={params.values.pCity}
        stateId={params?.values?.pState?.id}
        error={params.errors.pCity}
        onSelect={item => {
          params.setFieldValue('pCity', item);
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
        isCity={true}
      />
      <CustomTextInput
        ref={inputRef.pZipCode}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.zipCode}
        title={Strings.zipCode}
        keyboardType={'phone-pad'}
        value={params.values.pZipCode}
        error={params.errors.pZipCode && params.touched.pZipCode}
        returnKeyType={'done'}
        onBlur={params.handleBlur('pZipCode')}
        onChangeText={val => {
          params.setFieldValue('pZipCode', val);
          setPhysicalAddress(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </>
  );
};

const MailingAddress = ({
  params,
  listCountries,
  setMStates,
  setMCities,
  listMStates,
  listMCities,
  setMailingAddress,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.headerView}>
        <Text
          style={
            styles.detailTitle
          }>{`${Strings.mailingAddress} (${Strings.optional})`}</Text>
      </View>
      <CustomTextInput
        ref={inputRef.mAddress1}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address1}
        title={Strings.address1}
        value={params.values.mAddress1}
        error={params.touched.mAddress1 && params.errors.mAddress1}
        returnKeyType={'next'}
        onBlur={params.handleBlur('mAddress1')}
        onChangeText={val => {
          params.setFieldValue('mAddress1', val);
          setMailingAddress(true);
        }}
        onSubmitEditing={() => inputRef.mAddress2.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.mAddress2}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address2}
        title={Strings.address2}
        value={params.values.mAddress2}
        error={params.touched.mAddress2 && params.errors.mAddress2}
        returnKeyType={'done'}
        onBlur={params.handleBlur('mAddress2')}
        onChangeText={val => {
          params.setFieldValue('mAddress2', val);
          setMailingAddress(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <ListDataPopup
        ref={inputRef.mCountry}
        label={Strings.selectCountry}
        placeholder={Strings.country}
        data={listCountries}
        labelName={'name'}
        labelId={'id'}
        selected={params.values.mCountry}
        error={params.errors.mCountry}
        onSelect={item => {
          params.setFieldValue('mCountry', item);
          dispatch(
            getStatesOfCountry(item?.id, (isSuccess, listData) => {
              params.setFieldValue('mState', undefined);
              params.setFieldValue('mCity', undefined);
              if (isSuccess) {
                setMStates(listData);
                setMCities([]);
              }
            }),
          );
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
      />
      <ListDataPopup
        ref={inputRef.mState}
        label={Strings.selectState}
        placeholder={Strings.state}
        data={listMStates}
        labelName={'stateName'}
        labelId={'id'}
        selected={params.values.mState}
        error={params.errors.mState}
        onSelect={item => {
          params.setFieldValue('mState', item);
          dispatch(
            getCitiesOfState(item?.id, (isSuccess, listData) => {
              params.setFieldValue('mCity', undefined);
              if (isSuccess) {
                setMCities(listData);
              }
            }),
          );
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
      />
      <ListDataPopup
        ref={inputRef.mCity}
        label={Strings.selectCity}
        placeholder={Strings.city}
        data={listMCities}
        labelName={'cityName'}
        labelId={'id'}
        selected={params.values.mCity}
        stateId={params?.values?.mState?.id}
        error={params.errors.mCity}
        onSelect={item => {
          params.setFieldValue('mCity', item);
        }}
        style={styles.dropDownStyle}
        dropDownContainer={styles.dropDownStyle}
        isCity={true}
      />
      <CustomTextInput
        ref={inputRef.mZipCode}
        inputStyle={styles.textInput}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.zipCode}
        title={Strings.zipCode}
        keyboardType={'phone-pad'}
        value={params.values.mZipCode}
        error={params.errors.mZipCode && params.touched.mZipCode}
        returnKeyType={'done'}
        onBlur={params.handleBlur('mZipCode')}
        onChangeText={val => {
          params.setFieldValue('mZipCode', val);
          setMailingAddress(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </>
  );
};
const AddressPopup = ({isVisible, setVisible}) => {
  const dispatch = useDispatch();
  const AddressPopupForm = useRef(null);
  const [isSameAddress, setSameAddress] = useState(false);
  const [isPhysicalAddress, setPhysicalAddress] = useState(false);
  const [isMailingAddress, setMailingAddress] = useState(false);
  const [isMarketing, setMarketing] = useState(true);
  const [isThirdParty, setThirdParty] = useState(true);
  const [isBiometrics, setBiometrics] = useState(true);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [listPStates, setPStates] = useState();
  const [listPCities, setPCities] = useState();
  const [listMStates, setMStates] = useState();
  const [listMCities, setMCities] = useState();
  const [countryCode, setCountryCode] = useState('+1');
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const {listCountries} = useSelector(state => state.addressReducer);
  const {notificationPreferenceData} = useSelector(
    state => state.notificationReducer,
  );
  const {userInfo} = useSelector(state => state.userReducer);
  const onSameAddressClick = useCallback(
    () => setSameAddress(prev => !prev),
    [],
  );
  const onMarketing = useCallback(() => setMarketing(prev => !prev), []);
  const onThirdParty = useCallback(() => setThirdParty(prev => !prev), []);
  const onBiometrics = useCallback(() => setBiometrics(prev => !prev), []);
  const onSubmit = useCallback(
    params => {
      const userData = {
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        countryCode: userInfo?.isSocialLogIn
          ? countryCode
          : userInfo?.countryCode,
        phoneNumber: userInfo?.isSocialLogIn
          ? params?.phone
          : userInfo?.phoneNumber,
        userName: userInfo?.username,
        profileUrl: null,
        currencyCode: params?.currency?.currencyCode,
      };
      setSubmitFlag(true);
      dispatch(
        updateUser(userData, (isSuccess, updateData) => {
          if (isSuccess && updateData?.result) {
            dispatch(
              setVerificationReminder(0, async isDone => {
                if (isDone) {
                  dispatch({
                    type: 'UPDATE_USERINFO',
                    data: {
                      ...userInfo,
                      currencyCode: userData?.currencyCode,
                      countryCode: userData?.countryCode,
                      phoneNumber: userData?.phoneNumber,
                    },
                  });
                  dispatch({type: 'FIRST_ATTEMPT'});
                  setVisible(false);
                  await AsyncStorage.removeItem(AppConstants.IS_ASYNC_USER);
                }
              }),
            );
          } else {
            setError(true);
            setErrorMessage(updateData?.message || Strings.somethingWentWrong);
            setSubmitFlag(false);
          }
        }),
      );
      const addressData = [
        {
          id: 0,
          addressLine1: params?.pAddress1,
          addressLine2: params?.pAddress2,
          countryId: params?.pCountry?.id,
          stateId: params?.pState?.id,
          cityId: params?.pCity?.id,
          zipCode: params?.pZipCode,
          image: null,
          typeOfProperty: 1,
          isDefault: true,
          isSameMailingAddress: isSameAddress,
        },
        {
          id: 0,
          addressLine1: isSameAddress ? params?.pAddress1 : params?.mAddress1,
          addressLine2: isSameAddress ? params?.pAddress2 : params?.mAddress2,
          cityId: isSameAddress ? params?.pCity?.id : params?.mCity?.id,
          zipCode: isSameAddress ? params?.pZipCode : params?.mZipCode,
          stateId: isSameAddress ? params?.pState?.id : params?.mState?.id,
          countryId: isSameAddress
            ? params?.pCountry?.id
            : params?.mCountry?.id,
          image: null,
          typeOfProperty: 2,
          isDefault: false,
          isSameMailingAddress: isSameAddress,
        },
      ];
      loaderRef.current.show();
      const preferenceData = {
        ...notificationPreferenceData,
        isMarketingValueAlert: isMarketing,
        isBiometricAllowed: isBiometrics,
        isThirdPartyServiceAllowed: isThirdParty,
      };
      dispatch(
        updateAllNotificationPreference(preferenceData, isUpdated => {
          if (isUpdated) {
            dispatch(postAddresses(addressData));
          }
        }),
      );
    },
    [
      countryCode,
      dispatch,
      isBiometrics,
      isMarketing,
      isSameAddress,
      isThirdParty,
      notificationPreferenceData,
      setSubmitFlag,
      setVisible,
      userInfo,
    ],
  );
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const headerTextStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  const descriptionTextStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const setSchema = () => {
    const otherSchema = userInfo?.isSocialLogIn
      ? Schema.currencyPhone
      : Schema.currency;
    if (!isSameAddress) {
      if (isPhysicalAddress && isMailingAddress) {
        return Yup.object({
          ...Schema.addressPopupMailingAddress,
          ...otherSchema,
        });
      } else {
        if (isPhysicalAddress) {
          return Yup.object({
            ...Schema.addressPopupPhysicalAddress,
            ...otherSchema,
          });
        } else if (isMailingAddress) {
          return Yup.object({
            ...Schema.mailingAddress,
            ...otherSchema,
          });
        } else {
          return Yup.object(otherSchema);
        }
      }
    } else {
      return Yup.object(otherSchema);
    }
  };
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={modalViewStyle}>
            <KeyboardAwareScrollView
              bounces={false}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              enableAutomaticScroll={true}
              extraScrollHeight={40}
              enableOnAndroid={true}
              keyboardShouldPersistTaps={'handled'}>
              <View style={styles.headerView} />
              <Formik
                innerRef={AddressPopupForm}
                initialValues={{
                  currency: undefined,
                  phone: '',
                  pAddress1: '',
                  pAddress2: '',
                  pCountry: undefined,
                  pState: undefined,
                  pCity: undefined,
                  pZipCode: '',
                  mAddress1: '',
                  mAddress2: '',
                  mCountry: undefined,
                  mState: undefined,
                  mCity: undefined,
                  mZipCode: '',
                }}
                validationSchema={setSchema}
                onSubmit={onSubmit}>
                {({...params}) => {
                  return (
                    <>
                      {userInfo?.isSocialLogIn ? (
                        <>
                          <Text
                            style={
                              styles.requiredText
                            }>{`${Strings.required} *`}</Text>
                          <CustomPhoneInput
                            ref={inputRef.phone}
                            inputStyle={styles.inputStyle}
                            floatingLabel={Strings.phone}
                            title={Strings.phone}
                            value={params.values.phone}
                            error={params.touched.phone && params.errors.phone}
                            returnKeyType={'done'}
                            keyboardType={'phone-pad'}
                            onBlur={params.handleBlur('phone')}
                            onChangeText={val => {
                              params.setFieldValue('phone', val);
                            }}
                            countryCode={countryCode}
                            setCountryCode={val => setCountryCode(val)}
                            listCountries={listCountries}
                            onSubmitEditing={() => Keyboard.dismiss()}
                          />
                        </>
                      ) : null}
                      <Text
                        style={
                          styles.requiredCurrencyText
                        }>{`${Strings.required} *`}</Text>
                      <ListDataPopup
                        isCurrency
                        label={Strings.selectCurrency}
                        placeholder={Strings.currency}
                        data={listCountries}
                        labelName={'currencyCode'}
                        labelId={'id'}
                        selected={params.values?.currency}
                        error={
                          params.touched.currency && params.errors.currency
                        }
                        onSelect={item => {
                          params.setFieldValue('currency', item);
                        }}
                        style={styles.dropDownStyle}
                      />
                      <Text style={headerTextStyle}>
                        {Strings.enterAddressDetails}
                      </Text>
                      <Text style={styles.detailTitle}>
                        {`${Strings.physicalAddress} (${Strings.optional})`}
                      </Text>
                      <PhysicalAddress
                        {...{
                          params,
                          listCountries,
                          setPStates,
                          setPCities,
                          listPStates,
                          listPCities,
                          setPhysicalAddress,
                        }}
                      />
                      <Pressable
                        style={styles.termsView}
                        onPress={onSameAddressClick}>
                        {isSameAddress ? (
                          <Image
                            style={styles.checkIcon}
                            source={Icons.checkbox}
                          />
                        ) : (
                          <View style={styles.viewCheckIcon} />
                        )}
                        <Text style={descriptionTextStyle}>
                          {Strings.sameAsPhysicalAddress}
                        </Text>
                      </Pressable>
                      {isSameAddress ? null : (
                        <MailingAddress
                          {...{
                            params,
                            listCountries,
                            setMStates,
                            setMCities,
                            listMStates,
                            listMCities,
                            setMailingAddress,
                          }}
                        />
                      )}
                      {
                        // TO DO In Next Phase
                        /* <Pressable style={styles.termsView} onPress={onMarketing}>
                        <Image
                          style={styles.checkIcon}
                          source={
                            isMarketing ? Icons.checkbox : Icons.checkboxUncheck
                          }
                        />
                        <Text style={descriptionTextStyle}>
                          {privacyPreference.allowMarketing}
                        </Text>
                      </Pressable> */
                      }
                      <Pressable
                        style={styles.termsView}
                        onPress={onThirdParty}>
                        {isThirdParty ? (
                          <Image
                            style={styles.checkIcon}
                            source={Icons.checkbox}
                          />
                        ) : (
                          <View style={styles.viewCheckIcon} />
                        )}
                        <Text style={descriptionTextStyle}>
                          {privacyPreference.allowThirdParty}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={styles.termsView}
                        onPress={onBiometrics}>
                        {isBiometrics ? (
                          <Image
                            style={styles.checkIcon}
                            source={Icons.checkbox}
                          />
                        ) : (
                          <View style={styles.viewCheckIcon} />
                        )}
                        <Text style={descriptionTextStyle}>
                          {privacyPreference.allowBiometrics}
                        </Text>
                      </Pressable>
                      <CustomButton
                        title={`${Strings.save} & ${Strings.next}`}
                        style={styles.buttonContainer}
                        onPress={params.handleSubmit}
                        disabled={isSubmitting}
                      />
                    </>
                  );
                }}
              </Formik>
              <ErrorPopup
                isVisible={isError}
                setVisible={setError}
                errorText={errorMessage}
              />
            </KeyboardAwareScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default AddressPopup;
