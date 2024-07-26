import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddImagePicker,
  CustomButton,
  CustomDropDown,
  CustomNavBar,
  CustomSwitch,
  CustomTextInput,
  DiscardPopup,
  ErrorPopup,
  ListDataPopup,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import ApiConstants from '../../constants/ApiConstants';
import {listPropertyType} from '../../constants/Mockdata';
import {goBack} from '../../navigation/services/navigationServices';
import {mediaUpload} from '../../redux/actions/commonActions';
import {
  addLocation,
  selectLocation,
  updateLocation,
} from '../../redux/actions/locationsActions';
import Schema from '../../services/ValidationService';
import {ThemeStyles} from '../../theme';
import styles from './styles/AddLocationStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getCitiesOfState,
  getStatesOfCountry,
} from '../../redux/actions/addressActions';
const inputRef = {
  locationName: createRef(),
  address1: createRef(),
  address2: createRef(),
  city: createRef(),
  country: createRef(),
  zipCode: createRef(),
  state: createRef(),
  typesOfProperty: createRef(),
};

const locationsRef = createRef();

const AddLocationScreen = ({route}) => {
  const {isEdit, locationDetail} = route?.params;
  // add Picture
  const [selectedImage, setLocationImage] = useState('');
  const [isImageChanged, setImageChanged] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    isEdit ? locationDetail?.isDefault : false,
  );
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isDiscard, setDiscard] = useState(false);
  const [listFilterState, setListFilterState] = useState(undefined);
  const [listFilterCity, setListFilterCity] = useState(undefined);
  const dispatch = useDispatch();
  const {postLocationData, editLocationData, listLocations} = useSelector(
    state => state.locationsReducer,
  );
  const {listCountries} = useSelector(state => state.addressReducer);
  useEffect(() => {
    if (isEdit) {
      if (locationDetail?.country) {
        dispatch(
          getStatesOfCountry(
            locationDetail?.country?.id,
            (isSuccess, listData) => {
              if (isSuccess) {
                setListFilterState(listData);
                if (locationDetail?.state) {
                  dispatch(
                    getCitiesOfState(
                      locationDetail?.state?.id,
                      (isSuccess, listData) => {
                        if (isSuccess) {
                          setListFilterCity(listData);
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
    }
  }, [dispatch, isEdit, locationDetail?.country, locationDetail?.state]);
  const toggleSwitch = useCallback(
    setFieldValue => () => {
      setIsEnabled(previousState => {
        setFieldValue('setAsDefault', !previousState);
        return !previousState;
      });
    },
    [],
  );
  const onSelectImage = useCallback(response => {
    locationsRef.current.setFieldValue('locationImage', response?.assets[0]);
    setLocationImage(response?.assets[0]);
    setImageChanged(true);
  }, []);
  const locationData = isEdit
    ? {
        locationImage: locationDetail?.image,
        locationName: locationDetail?.name,
        city: locationDetail?.city,
        state: locationDetail?.state,
        country: locationDetail?.country,
        zipCode: locationDetail?.zipCode,
        address1: locationDetail?.addressLine1,
        address2: locationDetail?.addressLine2,
        typeOfProperty: locationDetail?.propertyType,
        setAsDefault: locationDetail?.isDefault,
      }
    : {
        locationImage: null,
        locationName: '',
        city: undefined,
        state: undefined,
        country: undefined,
        zipCode: '',
        address1: '',
        address2: '',
        typeOfProperty: undefined,
        setAsDefault: listLocations?.length === 0 ? true : false,
      };
  const addLocationData = useCallback(
    data => {
      const {params, imageUrl, id} = data;
      const locationPayload = {
        id: id,
        name: params.locationName,
        addressLine1: params.address1,
        addressLine2: params.address2,
        cityId: params.city.id,
        cityName: params.city.cityName,
        zipCode: params.zipCode,
        stateId: params.state.id,
        stateName: params.state.stateName,
        countryId: params.country.id,
        countryName: params.country.name,
        image: imageUrl ? imageUrl : params.locationImage,
        typeOfProperty: params.typeOfProperty.id,
        isDefault: listLocations?.length === 0 ? true : params.setAsDefault,
      };
      loaderRef.current.show();
      dispatch(
        isEdit
          ? updateLocation(locationPayload, (isSuccess, response) => {
              if (isSuccess) {
                if (response?.result) {
                  locationsRef.current.resetForm();
                  setVisible(true);
                } else {
                  setErrorMessage(response?.message);
                  setErrorVisible(true);
                }
              } else {
                setErrorMessage(
                  response?.message || Strings.somethingWentWrong,
                );
                setErrorVisible(true);
              }
            })
          : addLocation(locationPayload, (isSuccess, response) => {
              if (isSuccess) {
                if (response?.result) {
                  setVisible(true);
                } else {
                  setErrorMessage(response?.message);
                  setErrorVisible(true);
                }
              } else {
                setErrorMessage(
                  response?.message || Strings.somethingWentWrong,
                );
                setErrorVisible(true);
              }
            }),
      );
      if (isEdit) {
        const image = `${ApiConstants.ImageBaseUrl}/${locationPayload?.image}`;
        dispatch(selectLocation({...locationPayload, image}));
      }
    },
    [dispatch, isEdit, listLocations],
  );
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onSubmit = useCallback(
    params => {
      if (isImageChanged) {
        loaderRef.current.show();
        dispatch(
          mediaUpload(
            selectedImage,
            AppConstants.mediaDriveName.Locations,
            false,
            [],
            (isSuccess, uploadData) => {
              console.log('uploadData ', uploadData);
              if (isSuccess) {
                if (uploadData?.isSuccess) {
                  const id = isEdit ? locationDetail?.id : 0;
                  addLocationData({params, imageUrl: uploadData.fileUrl, id});
                }
              }
            },
          ),
        );
      } else {
        const id = isEdit ? locationDetail?.id : 0;
        let locationUrl = null;
        if (params?.locationImage && isEdit) {
          locationUrl = params?.locationImage.split(
            `${ApiConstants.ImageBaseUrl}/`,
          )[1];
        }
        addLocationData({params, imageUrl: locationUrl, id});
      }
    },
    [
      addLocationData,
      dispatch,
      isEdit,
      isImageChanged,
      locationDetail,
      selectedImage,
    ],
  );
  const onOkayPress = useCallback(() => {
    dispatch({type: 'CLEAR_EDIT_LOCATION'});
    dispatch({type: 'CLEAR_UPLOAD_STATE'});
    goBack();
  }, [dispatch]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const detailHeaderTextStyle = StyleSheet.compose(
    styles.detailHeaderText,
    themedStyles.inputText,
  );
  const setDefaultTextStyle = StyleSheet.compose(
    styles.setDefaultText,
    themedStyles.labelText,
  );
  const setLocationImageUrl = locationImage => {
    if (isEdit) {
      return locationImage?.fileName ? locationImage?.uri : locationImage;
    } else {
      return selectedImage?.uri;
    }
  };
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={isEdit ? Strings.editLocation : Strings.addLocation}
            containerStyle={styles.headerContainer}
            onBackPress={onBackPress}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            enableResetScrollToCoords={false}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'never'}>
            <Formik
              innerRef={locationsRef}
              initialValues={locationData}
              validationSchema={Schema.addLocation}
              onSubmit={onSubmit}>
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
              }) => {
                return (
                  <>
                    <View style={styles.alignStyle}>
                      <AddImagePicker
                        {...{onSelectImage}}
                        data={selectedImage?.uri}
                        imageUrl={setLocationImageUrl(values?.locationImage)}
                      />
                      {errors.locationImage ? (
                        <Text style={styles.errorText}>
                          {errors.locationImage}
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.locationDetails}>
                      <Text style={detailHeaderTextStyle}>
                        {Strings.enterLocationDetails}
                      </Text>
                    </View>
                    <View style={styles.bottomView}>
                      <CustomTextInput
                        ref={inputRef.locationName}
                        autoCapitalize={'none'}
                        keyboardType={'default'}
                        floatingLabel={Strings.locationName}
                        inputStyle={styles.inputText}
                        containerStyle={styles.inputContentContainer}
                        value={values.locationName}
                        isTitleVisible={false}
                        error={touched.locationName && errors.locationName}
                        onBlur={handleBlur('locationName')}
                        onChangeText={handleChange('locationName')}
                        onSubmitEditing={() =>
                          inputRef.address1.current.focus()
                        }
                      />
                      <CustomTextInput
                        ref={inputRef.address1}
                        autoCapitalize={'none'}
                        keyboardType={'default'}
                        floatingLabel={Strings.address1}
                        inputStyle={styles.inputText}
                        containerStyle={styles.inputContentContainer}
                        value={values.address1}
                        isTitleVisible={false}
                        error={touched.address1 && errors.address1}
                        onBlur={handleBlur('address1')}
                        onChangeText={handleChange('address1')}
                        onSubmitEditing={() =>
                          inputRef.address2.current.focus()
                        }
                      />
                      <CustomTextInput
                        ref={inputRef.address2}
                        autoCapitalize={'none'}
                        keyboardType={'default'}
                        floatingLabel={Strings.address2}
                        inputStyle={styles.inputText}
                        containerStyle={styles.inputContentContainer}
                        value={values.address2}
                        isTitleVisible={false}
                        error={touched.address2 && errors.address2}
                        onBlur={handleBlur('address2')}
                        onChangeText={handleChange('address2')}
                        onSubmitEditing={() => inputRef.zipCode.current.focus()}
                      />
                      <ListDataPopup
                        ref={inputRef.country}
                        label={Strings.selectCountry}
                        placeholder={Strings.country}
                        data={listCountries}
                        labelName={'name'}
                        labelId={'id'}
                        selected={values.country}
                        error={touched.country && errors.country}
                        onSelect={item => {
                          setFieldValue('country', item);
                          dispatch(
                            getStatesOfCountry(
                              item?.id,
                              (isSuccess, listData) => {
                                setFieldValue('state', undefined);
                                setFieldValue('city', undefined);
                                if (isSuccess) {
                                  setListFilterState(listData);
                                  setListFilterCity([]);
                                }
                              },
                            ),
                          );
                        }}
                        style={styles.dropDownStyle}
                      />
                      <ListDataPopup
                        ref={inputRef.state}
                        label={Strings.selectState}
                        placeholder={Strings.state}
                        data={listFilterState}
                        labelName={'stateName'}
                        labelId={'id'}
                        selected={values.state}
                        error={errors.state}
                        onSelect={item => {
                          setFieldValue('state', item);
                          dispatch(
                            getCitiesOfState(
                              item?.id,
                              (isSuccess, listData) => {
                                setFieldValue('city', undefined);
                                if (isSuccess) {
                                  setListFilterCity(listData);
                                }
                              },
                            ),
                          );
                        }}
                        style={styles.dropDownStyle}
                      />
                      <ListDataPopup
                        ref={inputRef.city}
                        label={Strings.selectCity}
                        placeholder={Strings.city}
                        data={listFilterCity}
                        labelName={'cityName'}
                        labelId={'id'}
                        selected={values.city}
                        stateId={values?.state?.id}
                        error={errors.city}
                        onSelect={item => {
                          setFieldValue('city', item);
                        }}
                        style={styles.dropDownStyle}
                        isCity={true}
                      />
                      <CustomTextInput
                        ref={inputRef.zipCode}
                        autoCapitalize={'none'}
                        keyboardType={'numeric'}
                        floatingLabel={Strings.zipCode}
                        inputStyle={styles.inputText}
                        containerStyle={styles.inputContentContainer}
                        value={values.zipCode}
                        isTitleVisible={false}
                        error={touched.zipCode && errors.zipCode}
                        onBlur={handleBlur('zipCode')}
                        onChangeText={handleChange('zipCode')}
                        onSubmitEditing={() => Keyboard.dismiss()}
                      />
                      <CustomDropDown
                        ref={inputRef.typesOfProperty}
                        placeholder={Strings.typeOfProperty}
                        data={listPropertyType}
                        labelName={'type'}
                        labelId={'id'}
                        selected={values.typeOfProperty}
                        error={touched.typeOfProperty && errors.typeOfProperty}
                        onSelect={item => {
                          setFieldValue('typeOfProperty', item);
                        }}
                        style={styles.dropDownStyle}
                      />
                      <View style={styles.toggleView}>
                        <Text style={setDefaultTextStyle}>
                          {Strings.setAsDefault}
                        </Text>
                        <View style={styles.toggleButtonView}>
                          <CustomSwitch
                            isEnabled={isEnabled}
                            toggleSwitch={toggleSwitch(setFieldValue)}
                            style={
                              isEnabled
                                ? styles.toggleStyle
                                : styles.disableToggleStyle
                            }
                            disabled={
                              locationDetail?.isDefault === true ? true : false
                            }
                          />
                        </View>
                      </View>
                      <View style={styles.submitView}>
                        <CustomButton
                          style={styles.submitButtonStyle}
                          onPress={handleSubmit}
                          title={Strings.save}
                        />
                      </View>
                    </View>
                  </>
                );
              }}
            </Formik>
          </KeyboardAwareScrollView>
          {isVisible && (
            <SuccessPopup
              {...{isVisible, setVisible}}
              successText={
                isEdit ? editLocationData?.message : postLocationData?.message
              }
              onOkPress={onOkayPress}
            />
          )}
          {isErrorVisible && (
            <ErrorPopup
              isVisible={isErrorVisible}
              setVisible={setErrorVisible}
              errorText={errorMessage}
            />
          )}
          <DiscardPopup
            isVisible={isDiscard}
            setVisible={setDiscard}
            {...{onDiscardPress}}
          />
        </>
      )}
    />
  );
};
export default AddLocationScreen;
