// THIRD PARTY IMPORTS
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';

// LOCAL IMPORTS
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomImagePicker,
  CustomNavBar,
  CustomPhoneInput,
  CustomSwitch,
  CustomTextInput,
  ErrorPopup,
  ListDataPopup,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import ApiConstants from '../../constants/ApiConstants';
import Strings from '../../constants/Strings';
import {
  getCitiesOfState,
  getStatesOfCountry,
  postAddresses,
} from '../../redux/actions/addressActions';
import {
  clearAddressState,
  updateProfile,
  updateUser,
} from '../../redux/actions/userActions';
import Schema from '../../services/ValidationService';
import {ThemeStyles} from '../../theme';
import styles from './styles/EditProfileStyle';
const inputRef = {
  profileImage: createRef(),
  userName: createRef(),
  firstName: createRef(),
  lastName: createRef(),
  emailAddress: createRef(),
  phone: createRef(),
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

const UserDetailTextInput = ({
  params,
  setUserChanged,
  countryCode,
  setCountryCode,
  listCountries,
  userInfo,
}) => {
  return (
    <>
      <CustomTextInput
        ref={inputRef.firstName}
        autoCapitalize={'none'}
        keyboardType={'default'}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.firstName}
        title={Strings.firstName}
        returnKeyType={'next'}
        value={params.values.firstName}
        error={params.touched.firstName && params.errors.firstName}
        onBlur={params.handleBlur('firstName')}
        onChangeText={val => {
          params.setFieldValue('firstName', val);
          setUserChanged(true);
        }}
        onSubmitEditing={() => inputRef.lastName.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.lastName}
        autoCapitalize={'none'}
        keyboardType={'default'}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.lastName}
        title={Strings.lastName}
        returnKeyType={'next'}
        value={params.values.lastName}
        error={params.touched.lastName && params.errors.lastName}
        onBlur={params.handleBlur('lastName')}
        onChangeText={val => {
          params.setFieldValue('lastName', val);
          setUserChanged(true);
        }}
        onSubmitEditing={() => inputRef.emailAddress.current.focus()}
      />
      <CustomTextInput
        editable={!userInfo?.isSocialLogIn}
        ref={inputRef.emailAddress}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.emailAddress}
        title={Strings.emailAddress}
        value={params.values.emailAddress}
        error={params.touched.emailAddress && params.errors.emailAddress}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        caretHidden={false}
        returnKeyType={'next'}
        onBlur={params.handleBlur('emailAddress')}
        onChangeText={val => {
          params.setFieldValue('emailAddress', val);
          setUserChanged(true);
        }}
        onSubmitEditing={() => inputRef.phone.current.focus()}
      />
      <CustomPhoneInput
        ref={inputRef.phone}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.phone}
        title={Strings.phone}
        value={params.values.phone}
        error={params.touched.phone && params.errors.phone}
        returnKeyType={'done'}
        keyboardType={'phone-pad'}
        onBlur={params.handleBlur('phone')}
        onChangeText={val => {
          params.setFieldValue('phone', val);
          setUserChanged(true);
        }}
        countryCode={countryCode}
        setCountryCode={val => {
          setCountryCode(val);
          setUserChanged(true);
        }}
        listCountries={listCountries}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </>
  );
};

const PhysicalAddress = ({
  params,
  listCountries,
  setAddressChanged,
  setPStates,
  setPCities,
  listPStates,
  listPCities,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.infoView}>
        <Text style={styles.addressTypeText}>{Strings.physicalAddress}</Text>
      </View>
      <CustomTextInput
        ref={inputRef.pAddress1}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address1}
        title={Strings.address1}
        value={params.values.pAddress1}
        error={params.touched.pAddress1 && params.errors.pAddress1}
        returnKeyType={'next'}
        onBlur={params.handleBlur('pAddress1')}
        onChangeText={val => {
          params.setFieldValue('pAddress1', val);
          setAddressChanged(true);
        }}
        onSubmitEditing={() => inputRef.pAddress2.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.pAddress2}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address2}
        title={Strings.address2}
        value={params.values.pAddress2}
        error={params.touched.pAddress2 && params.errors.pAddress2}
        returnKeyType={'done'}
        onBlur={params.handleBlur('pAddress2')}
        onChangeText={val => {
          params.setFieldValue('pAddress2', val);
          setAddressChanged(true);
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
        error={params.touched.pCountry && params.errors.pCountry}
        onSelect={item => {
          params.setFieldValue('pCountry', item);
          setAddressChanged(true);
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
        }}
        style={styles.dropDownStyle}
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
          setAddressChanged(true);
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
          setAddressChanged(true);
        }}
        style={styles.dropDownStyle}
        isCity={true}
      />
      <CustomTextInput
        ref={inputRef.pZipCode}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.zipCode}
        title={Strings.zipCode}
        keyboardType={'phone-pad'}
        value={params.values.pZipCode}
        error={params.touched.pZipCode && params.errors.pZipCode}
        returnKeyType={'done'}
        onBlur={params.handleBlur('pZipCode')}
        onChangeText={val => {
          params.setFieldValue('pZipCode', val);
          setAddressChanged(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </>
  );
};
const MailingAddress = ({
  params,
  listCountries,
  setAddressChanged,
  setMStates,
  setMCities,
  listMStates,
  listMCities,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.infoView}>
        <Text style={styles.addressTypeText}>{Strings.mailingAddress}</Text>
      </View>
      <CustomTextInput
        ref={inputRef.mAddress1}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address1}
        title={Strings.address1}
        value={params.values.mAddress1}
        error={params.touched.mAddress1 && params.errors.mAddress1}
        returnKeyType={'next'}
        onBlur={params.handleBlur('mAddress1')}
        onChangeText={val => {
          params.setFieldValue('mAddress1', val);
          setAddressChanged(true);
        }}
        onSubmitEditing={() => inputRef.mAddress2.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.mAddress2}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.address2}
        title={Strings.address2}
        value={params.values.mAddress2}
        error={params.touched.mAddress2 && params.errors.mAddress2}
        returnKeyType={'done'}
        onBlur={params.handleBlur('mAddress2')}
        onChangeText={val => {
          params.setFieldValue('mAddress2', val);
          setAddressChanged(true);
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
        error={params.touched.mCountry && params.errors.mCountry}
        onSelect={item => {
          params.setFieldValue('mCountry', item);
          setAddressChanged(true);
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
          setAddressChanged(true);
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
          setAddressChanged(true);
        }}
        style={styles.dropDownStyle}
        isCity={true}
      />
      <CustomTextInput
        ref={inputRef.mZipCode}
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        floatingLabel={Strings.zipCode}
        title={Strings.zipCode}
        keyboardType={'phone-pad'}
        value={params.values.mZipCode}
        error={params.touched.mZipCode && params.errors.mZipCode}
        returnKeyType={'done'}
        onBlur={params.handleBlur('mZipCode')}
        onChangeText={val => {
          params.setFieldValue('mZipCode', val);
          setAddressChanged(true);
        }}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
    </>
  );
};

const EditProfile = ({navigation, route}) => {
  const editForm = useRef(null);
  const {userDetail, listAddress} = route?.params;
  const [countryCode, setCountryCode] = useState(userDetail?.countyCode);
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {listCountries, postAddressError} = useSelector(
    state => state.addressReducer,
  );
  const {userInfo} = useSelector(state => state.userReducer);
  const [selectedProfile, setProfile] = useState('');
  const [listPStates, setPStates] = useState(undefined);
  const [listPCities, setPCities] = useState(undefined);
  const [listMStates, setMStates] = useState(undefined);
  const [listMCities, setMCities] = useState(undefined);
  const [isEnabled, setIsEnabled] = useState(
    userDetail?.userAddresses[0]?.isSameMailingAddress,
  );
  const [isError, setError] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successText, setSuccessMessage] = useState('');
  const [isProfileChanged, setProfileChanged] = useState(false);
  const [isUserChanged, setUserChanged] = useState(false);
  const [isAddressChanged, setAddressChanged] = useState(false);
  useEffect(() => {
    if (listAddress[0]?.country) {
      dispatch(
        getStatesOfCountry(
          listAddress[0]?.country?.id,
          (isSuccess, listData) => {
            if (isSuccess) {
              setPStates(listData);
              if (listAddress[0]?.state) {
                dispatch(
                  getCitiesOfState(
                    listAddress[0]?.state?.id,
                    (isSuccess, listData) => {
                      if (isSuccess) {
                        setPCities(listData);
                      }
                    },
                  ),
                );
              }
            }
          },
        ),
      );
    }
    if (listAddress[1]?.country) {
      dispatch(
        getStatesOfCountry(
          listAddress[1]?.country?.id,
          (isSuccess, listData) => {
            if (isSuccess) {
              setMStates(listData);
              if (listAddress[1]?.state) {
                dispatch(
                  getCitiesOfState(
                    listAddress[1]?.state?.id,
                    (isSuccess, listData) => {
                      if (isSuccess) {
                        setMCities(listData);
                      }
                    },
                  ),
                );
              }
            }
          },
        ),
      );
    }
  }, [dispatch, listAddress]);
  const onSelectImage = useCallback(response => {
    setProfile(response?.assets[0]);
    editForm.current.setFieldValue('profileImage', response?.assets[0]);
    setProfileChanged(true);
  }, []);
  const handleAction = () => {
    editForm.current?.handleSubmit();
  };
  const updateUserAddress = useCallback(
    params => {
      const addressData = [
        {
          id: listAddress[0]?.id,
          addressLine1: params?.pAddress1,
          addressLine2: params?.pAddress2,
          countryId: params?.pCountry?.id,
          stateId: params?.pState?.id,
          cityId: params?.pCity?.id,
          zipCode: params?.pZipCode,
          image: null,
          typeOfProperty: 1,
          isDefault: true,
          isSameMailingAddress: isEnabled,
        },
        {
          id: listAddress[1]?.id,
          addressLine1: isEnabled ? params?.pAddress1 : params?.mAddress1,
          addressLine2: isEnabled ? params?.pAddress2 : params?.mAddress2,
          cityId: isEnabled ? params?.pCity?.id : params?.mCity?.id,
          zipCode: isEnabled ? params?.pZipCode : params?.mZipCode,
          stateId: isEnabled ? params?.pState?.id : params?.mState?.id,
          countryId: isEnabled ? params?.pCountry?.id : params?.mCountry?.id,
          image: null,
          typeOfProperty: 2,
          isDefault: false,
          isSameMailingAddress: isEnabled,
        },
      ];
      loaderRef.current.show();
      dispatch(
        postAddresses(addressData, (isSuccess, updateData) => {
          if (isSuccess) {
            setVisible(true);
            setSuccessMessage(updateData?.message);
          } else {
            setError(true);
            setErrorMessage(postAddressError);
          }
        }),
      );
    },
    [dispatch, isEnabled, listAddress, postAddressError],
  );
  const updatePersonalInfo = useCallback(
    data => {
      const {params, profileUrl} = data;
      const editData = {
        userName: params?.userName.trim(),
        firstName: params?.firstName,
        lastName: params?.lastName,
        email: params?.emailAddress,
        countryCode: countryCode,
        phoneNumber: params?.phone,
        profileUrl: profileUrl ? profileUrl : params?.profileImage,
      };
      loaderRef.current.show();
      dispatch(
        updateUser(editData, (isSuccess, updateData) => {
          if (isSuccess && isAddressChanged) {
            updateUserAddress(params);
          } else if (isSuccess) {
            setVisible(true);
            setSuccessMessage(updateData?.message);
          } else {
            setError(true);
            setErrorMessage(updateData?.message);
          }
        }),
      );
    },
    [countryCode, dispatch, isAddressChanged, updateUserAddress],
  );
  const handleSubmit = useCallback(
    params => {
      if (isProfileChanged) {
        loaderRef.current.show();
        dispatch(
          updateProfile(selectedProfile, (isSuccess, uploadData) => {
            if (isSuccess) {
              updatePersonalInfo({
                params,
                profileUrl: uploadData.fileUrl,
              });
            }
          }),
        );
      } else if (isUserChanged) {
        let profileUrl = '';
        if (params?.profileImage) {
          profileUrl = params?.profileImage.split(
            `${ApiConstants.ImageBaseUrl}/`,
          )[1];
        }
        updatePersonalInfo({params, profileUrl});
      } else if (isAddressChanged) {
        updateUserAddress(params);
      }
    },
    [
      dispatch,
      isAddressChanged,
      isProfileChanged,
      isUserChanged,
      selectedProfile,
      updatePersonalInfo,
      updateUserAddress,
    ],
  );
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setAddressChanged(true);
  };
  const onOkayPress = useCallback(() => {
    dispatch(clearAddressState());
    dispatch({type: 'CLEAR_PROFILE_STATE'});
    setVisible(false);
    navigation.goBack();
  }, [dispatch, navigation]);
  const infoHeaderStyle = StyleSheet.compose(
    styles.detailTitle,
    themedStyles.placeholder,
  );
  const infoHeaderIcon = StyleSheet.compose(
    styles.personalInfoIcon,
    themedStyles.navIcon,
  );
  const addressToggleLabel = StyleSheet.compose(
    styles.labelStyle,
    themedStyles.defaultText,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            isRightButton={true}
            headerTextStyle={styles.headerStyle}
            containerStyle={styles.headerContainer}
            title={Strings.profile}
            isBackVisible={true}
            rightButtonText={Strings.done}
            onAction={handleAction}
            rightButtonTextStyle={
              isProfileChanged || isUserChanged || isAddressChanged
                ? null
                : styles.buttonText
            }
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.container}>
              <Formik
                innerRef={editForm}
                initialValues={{
                  profileImage: userDetail?.profileUrl,
                  userName: userDetail?.username || '',
                  firstName: userDetail?.firstName || '',
                  lastName: userDetail?.lastName || '',
                  emailAddress: userDetail?.email || '',
                  phone: userDetail?.phoneNumber || '',
                  pAddress1: listAddress[0]?.addressLine1 || '',
                  pAddress2: listAddress[0]?.addressLine2 || '',
                  pCountry: listAddress[0]?.country || undefined,
                  pState: listAddress[0]?.state || undefined,
                  pCity: listAddress[0]?.city || undefined,
                  pZipCode: listAddress[0]?.zipCode || '',
                  mAddress1: listAddress[1]?.addressLine1 || '',
                  mAddress2: listAddress[1]?.addressLine2 || '',
                  mCountry: listAddress[1]?.country || undefined,
                  mState: listAddress[1]?.state || undefined,
                  mCity: listAddress[1]?.city || undefined,
                  mZipCode: listAddress[1]?.zipCode || '',
                }}
                validationSchema={
                  isEnabled
                    ? Schema.editProfile
                    : Schema.editProfileWithMailAddress
                }
                onSubmit={handleSubmit}>
                {({...params}) => (
                  <>
                    <View style={styles.avatarView}>
                      <CustomImagePicker
                        {...{onSelectImage, selectedProfile, themedStyles}}
                        profileUrl={params?.values?.profileImage}
                      />
                    </View>
                    {params.errors.profileImage ? (
                      <Text style={styles.errorText}>
                        {params.errors.profileImage}
                      </Text>
                    ) : null}
                    <CustomTextInput
                      ref={inputRef.userName}
                      autoCapitalize={'none'}
                      keyboardType={'default'}
                      inputStyle={styles.userInputText}
                      containerStyle={styles.userInputView}
                      isBorder={false}
                      placeholder={Strings.userName}
                      returnKeyType={'next'}
                      value={params.values.userName}
                      error={params.touched.userName && params.errors.userName}
                      errorStyle={styles.userNameError}
                      onBlur={params.handleBlur('userName')}
                      onChangeText={val => {
                        params.setFieldValue('userName', val);
                        setUserChanged(true);
                      }}
                      onSubmitEditing={() => inputRef.firstName.current.focus()}
                    />
                    <View style={[styles.contentContainerStyle]}>
                      <View style={styles.headerView}>
                        <Image source={Icons.user} style={infoHeaderIcon} />
                        <Text style={infoHeaderStyle}>
                          {Strings.personalInfo}
                        </Text>
                      </View>
                      <UserDetailTextInput
                        {...{
                          params,
                          setUserChanged,
                          countryCode,
                          setCountryCode,
                          listCountries,
                          userInfo,
                        }}
                      />
                      <View style={styles.headerView}>
                        <Image
                          source={Icons.savedAddress}
                          style={infoHeaderIcon}
                        />
                        <Text style={infoHeaderStyle}>
                          {Strings.savedAddress}
                        </Text>
                      </View>
                      <PhysicalAddress
                        {...{
                          params,
                          listCountries,
                          setAddressChanged,
                          setPStates,
                          setPCities,
                          listPStates,
                          listPCities,
                        }}
                      />
                      <View style={styles.switchButton}>
                        <Pressable
                          style={styles.rowContainer}
                          onPress={() => {
                            toggleSwitch();
                          }}>
                          <View style={styles.leftView}>
                            <Text style={addressToggleLabel}>
                              {Strings.sameAsPhysicalAddress}
                            </Text>
                          </View>
                          <View style={styles.toggleView}>
                            <CustomSwitch
                              isEnabled={isEnabled}
                              toggleSwitch={toggleSwitch}
                              style={
                                isEnabled
                                  ? styles.toggleStyle
                                  : styles.disableToggleStyle
                              }
                            />
                          </View>
                        </Pressable>
                      </View>
                      {!isEnabled && (
                        <MailingAddress
                          {...{
                            params,
                            listCountries,
                            setAddressChanged,
                            setMStates,
                            setMCities,
                            listMStates,
                            listMCities,
                          }}
                        />
                      )}
                    </View>
                  </>
                )}
              </Formik>
              <ErrorPopup
                isVisible={isError}
                setVisible={setError}
                errorText={errorMessage}
              />
              <SuccessPopup
                {...{isVisible, setVisible}}
                successText={successText}
                onOkPress={onOkayPress}
              />
            </View>
          </KeyboardAwareScrollView>
        </>
      )}
    />
  );
};

export default EditProfile;
