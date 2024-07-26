import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {object} from 'yup';
import icons from '../../assets/icons';
import {
  AddImagePicker,
  CustomButton,
  CustomDatePicker,
  CustomDropDown,
  CustomNavBar,
  CustomTextInput,
  DiscardPopup,
  ErrorPopup,
  ImageViewCard,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {goBack} from '../../navigation/services/navigationServices';
import {mediaUpload} from '../../redux/actions/commonActions';
import {getExistsLocation} from '../../redux/actions/locationsActions';
import {
  addProduct,
  getCategoryFormData,
  getExistProductCategory,
} from '../../redux/actions/productActions';
import Schema from '../../services/ValidationService';
import {Colors, Icons, ThemeStyles} from '../../theme';
import {
  errorType,
  formattedDate,
  validateProductFields,
} from '../../utils/helper';
import styles from './styles/AddProductStyle';

const inputRef = {
  productName: createRef(),
  location: createRef(),
  category: createRef(),
  type: createRef(),
  serialNo: createRef(),
  purchaseDate: createRef(),
  modelNo: createRef(),
  manufacturer: createRef(),
  yearOfManufacture: createRef(),
  vendorName: createRef(),
  price: createRef(),
  description: createRef(),
  miscNote: createRef(),
  receipt: createRef(),
};

const productFormRef = createRef();

const AddProductScreen = ({route, navigation}) => {
  const {
    isFromScan = false,
    qrData,
    barCodeNumber,
    isFromDelivery = false,
    locationDetail,
  } = route?.params || {};
  // add Picture
  const [listImages, setImages] = useState([]);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [formBuilderData, setFormData] = useState([]);
  const [formSchema, setFormSchema] = useState();
  const [inputsRef, setInputsRef] = useState(undefined);
  const [returnTypes, setReturnTypes] = useState(undefined);
  const [isDatePicker, setShowDatePicker] = useState(false);
  const [isInitial, setInitial] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDateField, setDateField] = useState('');
  const [isDynamicSchema, setDynamicSchema] = useState(false);
  const [isReceipt, setReceipt] = useState(false);
  const [receiptImg, setReceiptImg] = useState('');
  const [isDiscard, setDiscard] = useState(false);
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState('');
  const dispatch = useDispatch();
  const {listProductCategory, categoryFormData, addedWarranty} = useSelector(
    state => state.productReducer,
  );
  const {userInfo} = useSelector(state => state.userReducer);
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {addProductData} = useSelector(state => state.productReducer);
  const {selectedReceipt} = useSelector(state => state.receiptsReducer);
  const handleSelection = useCallback(() => {
    navigation.navigate(NavigationRoutes.SelectReceiptScreen);
  }, [navigation]);
  const handleWarrantySelection = useCallback(() => {
    const params = productFormRef.current.values;
    navigation.navigate(NavigationRoutes.AddWarrantyScreen, {
      productName: params?.Name || '',
    });
  }, [navigation]);
  const [inputParams, setInputParams] = useState({
    location: isFromDelivery
      ? locationDetail
      : listLocations?.find(location => location?.isDefault) || undefined,
    category: undefined,
  });
  useEffect(() => {
    if (isInitial) {
      dispatch(getExistsLocation());
      dispatch(
        getExistProductCategory((isSuccess, listCategories) => {
          if (isSuccess) {
            if (isFromScan) {
              let qrCategory;
              for (let i = 0; i < qrData?.category?.length; i++) {
                qrCategory = listCategories?.find(
                  e => e?.categoryName === qrData?.category[i],
                );
                if (qrCategory) {
                  break;
                }
              }
              const category = qrCategory ? qrCategory?.categoryName : 'Other';
              const otherCategory = listCategories?.find(
                e => e?.categoryName === category,
              );
              otherCategory && onSelectCategory(otherCategory);
            }
          } else {
            loaderRef.current.hide();
          }
        }),
      );
      setInitial(false);
    }
  }, [dispatch, isFromScan, isInitial, onSelectCategory, qrData?.category]);
  const onSelectImage = useCallback(
    response => {
      if (listImages?.length !== 4) {
        listImages.push(response?.assets[0]);
        setImages([...listImages]);
      }
    },
    [listImages],
  );
  const onSelectCategory = useCallback(
    category => {
      productFormRef.current.setFieldValue('category', category);
      loaderRef.current.show();
      dispatch(
        getCategoryFormData(category?.categoryId, categoryJsonData => {
          if (categoryJsonData[0]?.formBuilderData?.length > 0) {
            let dynamicInputs = {};
            setFormData(JSON.parse(categoryJsonData[0].formBuilderData));
            if (isFromScan) {
              JSON.parse(categoryJsonData[0].formBuilderData).map(input => {
                switch (input?.Field) {
                  case 'Name':
                    dynamicInputs[input?.Field] = qrData?.title;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.title || '',
                    );
                    break;
                  case 'ManufacturerName':
                    dynamicInputs[input?.Field] = qrData?.manufacturer;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.manufacturer || '',
                    );
                    break;
                  case 'VendorName':
                    dynamicInputs[input?.Field] = qrData?.author;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.author || '',
                    );
                    break;
                  case 'Description':
                    dynamicInputs[input?.Field] = qrData?.description;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.description || '',
                    );
                    break;
                  case 'ModelNumber':
                    const modelNo =
                      qrData?.features[0]?.split(':')[0] === 'Model Number'
                        ? qrData?.features[0]?.split(':')[1].trim()
                        : '';
                    dynamicInputs[input?.Field] =
                      qrData?.attributes?.model || modelNo;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.attributes?.model || modelNo || '',
                    );
                    break;
                  case 'SerialNumber':
                    dynamicInputs[input?.Field] = qrData?.attributes?.asin;
                    productFormRef.current.setFieldValue(
                      input?.Field,
                      qrData?.attributes?.asin || '',
                    );
                    break;
                  default:
                    dynamicInputs[input?.Field] = '';
                    productFormRef.current.setFieldValue(input?.Field, '');
                    break;
                }
              });
            } else {
              const formData = JSON.parse(categoryJsonData[0].formBuilderData);
              const refs = formData.map(() => createRef());
              setInputsRef(refs);
              const allReturnTypes = formData.map((e, index) => {
                if (index === formData?.length - 1) {
                  return 'done';
                } else if (
                  formData[index + 1].Type === 'Dropdown' ||
                  formData[index + 1].Type === 'DateTime'
                ) {
                  return 'done';
                } else if (formData[index].Type === 'Number') {
                  return 'done';
                } else {
                  return 'next';
                }
              });
              setReturnTypes(allReturnTypes);
              formData.map(input => {
                dynamicInputs[input?.Field] = '';
                productFormRef.current.setFieldValue(input?.Field, '');
              });
            }
          }
        }),
      );
      setDynamicSchema(false);
    },
    [dispatch, isFromScan, qrData],
  );
  const addToProduct = useCallback(
    data => {
      const {listFields, productImages = [], params} = data;
      const productData = {
        locationId: params?.location?.id,
        categoryId: params?.category?.categoryId,
        formFields: listFields,
        files: productImages,
        productWarrantiesRequestModels:
          addedWarranty?.length > 0 ? addedWarranty : [],
        receiptId: selectedReceipt?.receiptId || 0,
        currency: userInfo?.currencyCode,
        barCodeNumber: barCodeNumber,
        barCodeData: isFromScan ? JSON.stringify(qrData) : null,
      };
      setSubmitFlag(true);
      loaderRef.current.show();
      dispatch(
        addProduct(productData, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result) {
              setVisible(true);
              setImages([]);
              productFormRef.current.resetForm();
            } else {
              setSubmitFlag(false);
              setError(true);
              setErrorMessage(response?.message);
            }
          } else {
            setError(true);
            setErrorMessage(response?.message || Strings.somethingWentWrong);
            setSubmitFlag(false);
          }
        }),
      );
    },
    [
      addedWarranty,
      barCodeNumber,
      dispatch,
      isFromScan,
      qrData,
      selectedReceipt?.receiptId,
      userInfo?.currencyCode,
    ],
  );
  const invokeDynamicValidation = useCallback(() => {
    const params = productFormRef.current.values;
    setDynamicSchema(true);
    setInputParams(params);
    const thisForm = productFormRef.current;
    formBuilderData?.map(input => {
      if (input?.IsRequired) {
        if (!params[input.Field] && thisForm.touched[input.Field]) {
          productFormRef.current.setFieldError(
            input.Field,
            input?.RequiredMessage || input.Field + ' is required',
          );
        }
      } else {
        productFormRef.current.setFieldError(input.Field, '');
      }
    });
    const SchemaObject = Object.fromEntries(
      formBuilderData.map(field => {
        return field?.IsRequired || validateProductFields(field.Field)
          ? [field.Field, errorType(field?.Type, field.Field)]
          : [];
      }),
    );
    const productSchema = object().shape({
      ['location']: errorType('location'),
      ['category']: errorType('category'),
      ...SchemaObject,
    });
    setFormSchema(productSchema);
  }, [formBuilderData]);
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onSubmit = useCallback(
    params => {
      if (isDynamicSchema) {
        let listFields = [];
        formBuilderData?.map(field => {
          let fieldValue = '';
          if (field.Type === 'Dropdown') {
            fieldValue = params[field?.Field]?.Value;
          } else if (field.Type === 'Number' && field?.Field === 'Price') {
            fieldValue =
              params[field?.Field] !== '' ? params[field?.Field] : '0';
          } else {
            fieldValue = params[field?.Field];
          }
          const fieldData = {
            id: field?.Id,
            field: field?.Field,
            value: fieldValue,
            type: field?.Type,
            isRequired: field?.IsRequired,
            requiredMessage: field?.RequiredMessage,
            placeholder: field?.Placeholder,
            sequence: field?.Sequence,
            dropdownData: field?.DropdownData,
          };
          listFields.push(fieldData);
        });
        if (listImages?.length > 0) {
          setSubmitFlag(true);
          dispatch(
            mediaUpload(
              '',
              AppConstants.mediaDriveName.Products,
              true,
              listImages,
              (isSuccess, uploadData) => {
                if (isSuccess) {
                  if (uploadData?.length > 0) {
                    let productImages = [];
                    uploadData?.map((file, index) => {
                      productImages.push({
                        id: 0,
                        fileUrl: file?.fileUrl,
                        fileSize: file?.fileSize,
                        isDefault: index === 0,
                      });
                    });
                    addToProduct({params, listFields, productImages});
                  }
                } else {
                  setSubmitFlag(false);
                }
              },
            ),
          );
        } else {
          addToProduct({params, listFields});
        }
      } else {
        invokeDynamicValidation();
      }
    },
    [
      addToProduct,
      dispatch,
      formBuilderData,
      invokeDynamicValidation,
      isDynamicSchema,
      listImages,
    ],
  );
  const handleDatePicker = useCallback(dateField => {
    setDateField(dateField);
    setShowDatePicker(prev => !prev);
  }, []);
  const handleSelectedDate = useCallback(
    selectedDate => {
      productFormRef.current.setFieldValue(
        currentDateField,
        moment(selectedDate).format(AppConstants.dateFormats.reverseDate),
      );
      setShowDatePicker(false);
      setSelectedPurchaseDate(
        moment(selectedDate).format(AppConstants.dateFormats.reverseDate),
      );
    },
    [currentDateField],
  );
  const handleValueChange = (name, value) => {
    const values = productFormRef.current.values;
    values[name] = value;
    setInputParams(values);
    productFormRef.current.setTouched({
      ...productFormRef.current.touched,
      [values[name]]: true,
    });
    !isDynamicSchema && invokeDynamicValidation();
  };
  const fieldPlaceholder = input => {
    const {Field} = AppConstants.Product;
    switch (input.Field) {
      case Field.Price:
        return `${input.Placeholder} (${userInfo?.currencyCode})`;
      case Field.ManufactureYear:
        return `${input.Placeholder} (YYYY)`;
      default:
        return input.Placeholder;
    }
  };
  const onOkayPress = useCallback(() => {
    setVisible(false);
    isFromScan ? navigation.pop(2) : navigation.goBack();
  }, [navigation, isFromScan]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const infoTextStyle = StyleSheet.compose(
    styles.infoText,
    themedStyles.labelText,
  );
  const addReceiptTextStyle = StyleSheet.compose(
    styles.addReceiptText,
    themedStyles.labelText,
  );
  const addWarrantyTextStyle = StyleSheet.compose(
    styles.addWarrantyText,
    themedStyles.labelText,
  );
  const rightArrowStyle = StyleSheet.compose(
    styles.rightArrow,
    themedStyles.navIcon,
  );
  const onSubmitEvent = index => {
    const formData = JSON.parse(categoryFormData[0].formBuilderData);
    if (formData?.length - 1 === index) {
      Keyboard.dismiss();
    } else {
      const isDateOrDropdown =
        formData[index + 1].Type === 'Dropdown' ||
        formData[index + 1].Type === 'DateTime';
      isDateOrDropdown
        ? Keyboard.dismiss()
        : inputsRef[index + 1].current.focus();
    }
  };
  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.mainContainer}>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.addProduct}
            containerStyle={styles.headerContainer}
            onBackPress={onBackPress}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={'handled'}>
            <Formik
              innerRef={productFormRef}
              initialValues={inputParams}
              validationSchema={
                isDynamicSchema ? formSchema : Schema.addProduct
              }
              onSubmit={onSubmit}>
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
              }) => {
                return (
                  <View style={styles.container}>
                    <View style={styles.addProductView}>
                      <AddImagePicker
                        {...{onSelectImage}}
                        isMultiple={true}
                        data={listImages}
                        setImageList={setImages}
                      />
                    </View>
                    <View style={styles.infoView}>
                      <Text style={infoTextStyle}>
                        {Strings.enterProductDetails}
                      </Text>
                    </View>
                    <View style={styles.basicInfoView}>
                      <CustomDropDown
                        ref={inputRef.location}
                        placeholder={Strings.selectLocation}
                        data={listLocations}
                        labelName={'name'}
                        labelId={'id'}
                        selected={values.location}
                        error={touched.location && errors.location}
                        onSelect={item => {
                          setFieldValue('location', item);
                        }}
                        style={styles.dropDownStyle}
                      />
                      <CustomDropDown
                        placeholder={Strings.category}
                        labelId={'categoryId'}
                        labelName={'categoryName'}
                        data={listProductCategory}
                        selected={values.category}
                        error={touched.category && errors.category}
                        onSelect={onSelectCategory}
                        style={styles.dropDownStyle}
                      />
                      {categoryFormData?.length > 0
                        ? JSON.parse(categoryFormData[0].formBuilderData).map(
                            (input, i) => {
                              switch (input.Type) {
                                case 'Text':
                                  return (
                                    <CustomTextInput
                                      ref={inputsRef ? inputsRef[i] : null}
                                      key={input.Id}
                                      inputStyle={styles.inputText}
                                      containerStyle={
                                        styles.inputContentContainer
                                      }
                                      keyboardType="default"
                                      returnKeyType={
                                        returnTypes && returnTypes[i]
                                      }
                                      floatingLabel={input.Placeholder}
                                      onChangeText={val => {
                                        handleValueChange(input.Field, val);
                                      }}
                                      onBlur={handleBlur(input.Field)}
                                      value={values[input.Field]}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      onSubmitEditing={() => onSubmitEvent(i)}
                                    />
                                  );
                                case 'Number':
                                  return (
                                    <CustomTextInput
                                      ref={inputsRef ? inputsRef[i] : null}
                                      key={input.Id}
                                      inputStyle={styles.inputText}
                                      containerStyle={
                                        styles.inputContentContainer
                                      }
                                      keyboardType={'decimal-pad'}
                                      returnKeyType={
                                        returnTypes && returnTypes[i]
                                      }
                                      floatingLabel={fieldPlaceholder(input)}
                                      onChangeText={val => {
                                        handleValueChange(input.Field, val);
                                      }}
                                      onBlur={handleBlur(input.Field)}
                                      value={values[input.Field]}
                                      error={
                                        input.IsRequired ||
                                        validateProductFields(input.Field)
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      onSubmitEditing={() => onSubmitEvent(i)}
                                    />
                                  );
                                case 'TextArea':
                                  return (
                                    <CustomTextInput
                                      ref={inputsRef ? inputsRef[i] : null}
                                      multiline
                                      key={input.Id}
                                      inputStyle={styles.inputTextArea}
                                      containerStyle={
                                        styles.inputTextAreaContentContainer
                                      }
                                      keyboardType="default"
                                      returnKeyType={
                                        returnTypes && returnTypes[i]
                                      }
                                      placeholder={input.Placeholder}
                                      placeholderTextColor={Colors.dustGrey}
                                      onChangeText={val => {
                                        handleValueChange(input.Field, val);
                                      }}
                                      onBlur={handleBlur(input.Field)}
                                      value={values[input.Field]}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                    />
                                  );
                                case 'Dropdown':
                                  return (
                                    <CustomDropDown
                                      ref={inputsRef ? inputsRef[i] : null}
                                      key={input.Id}
                                      placeholder={input.Placeholder}
                                      data={input.DropdownData}
                                      labelName={'Value'}
                                      labelId={'Id'}
                                      selected={values[input.Field]}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      onSelect={item => {
                                        handleValueChange(input.Field, item);
                                      }}
                                      style={styles.dropDownStyle}
                                    />
                                  );
                                case 'DateTime':
                                  return (
                                    <CustomTextInput
                                      ref={inputsRef ? inputsRef[i] : null}
                                      key={input.Id}
                                      floatingLabel={input.Placeholder}
                                      inputStyle={styles.inputText}
                                      containerStyle={
                                        styles.inputContentContainer
                                      }
                                      editable={false}
                                      pointerEvents={'none'}
                                      rightIcon={Icons.calendarEvent}
                                      onChangeText={val => {
                                        handleValueChange(input.Field, val);
                                      }}
                                      onBlur={handleBlur(input.Field)}
                                      value={formattedDate(values[input.Field])}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      onPress={() =>
                                        handleDatePicker(input.Field)
                                      }
                                    />
                                  );
                                default:
                                  return null;
                              }
                            },
                          )
                        : null}
                      {errors.receipt && touched.receipt ? (
                        <View style={styles.receiptErrorView}>
                          <Text style={styles.errorReceiptText}>
                            {errors.receipt}
                          </Text>
                        </View>
                      ) : null}
                      <Pressable
                        style={styles.receiptButtonStyle}
                        onPress={handleSelection}>
                        {selectedReceipt ? (
                          <Pressable
                            style={styles.imgPreViewButton}
                            onPress={() => {
                              setReceipt(!isReceipt);
                              setReceiptImg(selectedReceipt?.imageUrl);
                            }}>
                            <Image
                              style={styles.previewReceiptImg}
                              source={{uri: selectedReceipt?.imageUrl}}
                            />
                          </Pressable>
                        ) : null}
                        <Text style={addReceiptTextStyle} numberOfLines={2}>
                          {selectedReceipt
                            ? selectedReceipt?.name
                            : Strings.addReceipt}
                        </Text>
                        <Image
                          style={rightArrowStyle}
                          source={icons.arrowRight}
                        />
                      </Pressable>
                      <Pressable
                        style={styles.receiptButtonStyle}
                        onPress={handleWarrantySelection}>
                        <Text style={addWarrantyTextStyle} numberOfLines={2}>
                          {addedWarranty
                            ? addedWarranty[0]?.name
                            : Strings.addWarranty}
                        </Text>
                        <Image
                          style={rightArrowStyle}
                          source={icons.arrowRight}
                        />
                      </Pressable>
                      <CustomDatePicker
                        setDate={handleSelectedDate}
                        open={isDatePicker}
                        setOpen={setShowDatePicker}
                        maxDate={new Date()}
                        selectedDate={selectedPurchaseDate}
                      />
                      <View style={styles.submitView}>
                        <CustomButton
                          style={styles.submitButtonStyle}
                          onPress={handleSubmit}
                          disabled={isSubmitting}
                          title={Strings.save}
                        />
                      </View>
                    </View>
                    <ImageViewCard
                      imageUrl={receiptImg}
                      isPreview={isReceipt}
                      setPreview={setReceipt}
                    />
                    <ErrorPopup
                      isVisible={isError}
                      setVisible={setError}
                      errorText={errorMessage}
                    />
                    <SuccessPopup
                      {...{isVisible, setVisible}}
                      successText={addProductData?.message}
                      onOkPress={onOkayPress}
                    />
                    <DiscardPopup
                      isVisible={isDiscard}
                      setVisible={setDiscard}
                      {...{onDiscardPress}}
                    />
                  </View>
                );
              }}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      )}
    />
  );
};
export default AddProductScreen;
