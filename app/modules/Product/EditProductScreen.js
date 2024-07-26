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
  getExistProductCategory,
  removeProductImage,
  updateProductDetail,
} from '../../redux/actions/productActions';
import {Colors, Icons, ThemeStyles} from '../../theme';
import {
  errorType,
  formattedDate,
  validateProductFields,
} from '../../utils/helper';
import styles from './styles/EditScreenStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const inputRef = {
  location: createRef(),
  category: createRef(),
};

const productFormRef = createRef();

const EditProductScreen = ({navigation, route}) => {
  const {productDetail} = route?.params;
  // add Picture
  const [listImages, setImages] = useState([]);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [isDatePicker, setShowDatePicker] = useState(false);
  const [isImageChanged, setImageChanged] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [dynamicSchema, setDynamicSchema] = useState();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDateField, setDateField] = useState('');
  const [returnTypes, setReturnTypes] = useState(undefined);
  const [isReceipt, setReceipt] = useState(false);
  const [receiptImg, setReceiptImg] = useState('');
  const [inputsRef, setInputsRef] = useState(undefined);
  const [isDiscard, setDiscard] = useState(false);
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState(
    moment(productDetail?.purchaseDate).toDate(),
  );
  const dispatch = useDispatch();
  const {listProductCategory, editProductData} = useSelector(
    state => state.productReducer,
  );
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {selectedReceipt} = useSelector(state => state.receiptsReducer);
  const {userInfo} = useSelector(state => state.userReducer);
  const [editFormParams, setEditFormParams] = useState({
    location:
      listLocations?.find(
        location => location?.id === productDetail?.locationId,
      ) || undefined,
    category:
      {
        categoryId: productDetail?.categoryId,
        categoryName: productDetail?.categoryName,
      } || undefined,
  });
  useEffect(() => {
    let dynamicParams = {};
    JSON.parse(productDetail?.productFormData).map(editData => {
      dynamicParams[editData.Field] = editData.Value;
      productFormRef.current.setFieldValue(editData.Field, editData.Value);
      if (editData.Type === 'Dropdown') {
        const filterData = editData.DropdownData.find(
          filterType => editData.Value === filterType.Value,
        );
        console.log(editData.Field + ' ', filterData);
        dynamicParams[editData.Field] = filterData;
        productFormRef.current.setFieldValue(editData.Field, filterData);
      } else if (editData.Type === 'Number' && editData.Field === 'Price') {
        const priceValue = parseFloat(editData?.Value);
        const decimalPrice = `${priceValue?.toFixed(2)}`;
        productFormRef.current.setFieldValue(editData.Field, decimalPrice);
      }
    });
    setEditFormParams(prev => {
      return {
        ...prev,
        ...dynamicParams,
      };
    });
    const SchemaObject = Object.fromEntries(
      JSON.parse(productDetail?.productFormData).map(field => {
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
    setDynamicSchema(productSchema);
    if (productDetail?.productImages && !isImageChanged) {
      const listExistImages = [];
      productDetail?.productImages?.map(image =>
        listExistImages.push({
          ...image,
          isNew: false,
        }),
      );
      setImages([...listExistImages]);
    }
    const formData = JSON.parse(productDetail?.productFormData);
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
  }, [productDetail, isImageChanged]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getExistsLocation());
      dispatch(getExistProductCategory());
    });
    return () => unsubscribe();
  }, [dispatch, navigation, productDetail]);
  const editProduct = useCallback(
    data => {
      const {listFields, productImages = [], params, productId} = data;
      const productData = {
        locationId: params?.location?.id,
        categoryId: params?.category?.categoryId,
        formFields: listFields,
        files: productImages,
        productWarrantiesRequestModels: [],
        receiptId: selectedReceipt?.receiptId || 0,
        currency: userInfo?.currencyCode,
      };
      setSubmitFlag(true);
      loaderRef.current.show();
      dispatch(
        updateProductDetail(productId, productData, (isSuccess, response) => {
          if (isSuccess) {
            if (response?.result) {
              setVisible(true);
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
    [dispatch, selectedReceipt?.receiptId, userInfo?.currencyCode],
  );
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onSubmit = useCallback(
    params => {
      const productId = productDetail?.productId;
      let listFields = [];
      JSON.parse(productDetail?.productFormData)?.map(field => {
        let fieldValue = '';
        if (field.Type === 'Dropdown') {
          fieldValue = params[field?.Field]?.Value;
        } else if (field.Type === 'Number' && field?.Field === 'Price') {
          fieldValue = params[field?.Field] !== '' ? params[field?.Field] : '0';
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
      if (listImages?.length > 0 && isImageChanged) {
        setSubmitFlag(true);
        const listNewImages = listImages.filter(img => img?.isNew);
        dispatch(
          mediaUpload(
            '',
            AppConstants.mediaDriveName.Products,
            true,
            listNewImages,
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
                  editProduct({params, listFields, productId, productImages});
                }
              } else {
                setSubmitFlag(false);
              }
            },
          ),
        );
      } else {
        editProduct({params, listFields, productId, productImages: []});
      }
    },
    [dispatch, editProduct, isImageChanged, listImages, productDetail],
  );
  const handleEditReceipt = useCallback(() => {
    navigation.navigate(NavigationRoutes.SelectReceiptScreen, {
      receiptId: productDetail?.receiptId,
    });
  }, [navigation, productDetail?.receiptId]);
  const handleWarranty = useCallback(() => {
    const params = productFormRef.current.values;
    navigation.navigate(NavigationRoutes.EditWarrantyScreen, {
      productName: params?.Name || '',
      productId: productDetail?.productId,
    });
  }, [navigation, productDetail?.productId]);
  const onSelectImage = useCallback(
    response => {
      if (listImages?.length !== 4) {
        listImages.push({
          ...response?.assets[0],
          isNew: true,
        });
        setImages([...listImages]);
        setImageChanged(true);
      }
    },
    [listImages],
  );
  const handleDatePicker = useCallback(dateField => {
    setDateField(dateField);
    setShowDatePicker(prev => !prev);
  }, []);
  const handleSelectedDate = useCallback(
    selectedDate => {
      productFormRef.current.setFieldValue(currentDateField, selectedDate);
      setShowDatePicker(false);
      setSelectedPurchaseDate(moment(selectedDate).toDate());
    },
    [currentDateField],
  );
  const handleDeleteImage = useCallback(
    image => {
      const index = listImages.indexOf(image);
      if (index !== -1) {
        listImages.splice(index, 1);
        setImages([...listImages]);
        !image?.isNew &&
          dispatch(removeProductImage(productDetail?.productId, [image?.id]));
      }
    },
    [dispatch, listImages, productDetail?.productId],
  );
  const onOkayPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
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
  const rightArrowStyle = StyleSheet.compose(
    styles.rightArrow,
    themedStyles.navIcon,
  );
  const currentReceipt = () => {
    if (selectedReceipt) {
      return selectedReceipt?.name;
    }
    return productDetail?.receiptId ? Strings.editReceipt : Strings.addReceipt;
  };
  const onSubmitEvent = index => {
    const formData = JSON.parse(productDetail?.productFormData);
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
  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.mainContainer}>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.editProduct}
            containerStyle={styles.headerContainer}
            onBackPress={onBackPress}
          />
          <KeyboardAwareScrollView
            bounces={false}
            style={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            extraScrollHeight={40}
            enableOnAndroid={true}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}>
            <Formik
              innerRef={productFormRef}
              initialValues={editFormParams}
              validationSchema={dynamicSchema}
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
                        {...{onSelectImage, setImageChanged, handleDeleteImage}}
                        isMultiple={true}
                        data={listImages}
                        setImageList={setImages}
                        isEdit={true}
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
                        ref={inputRef.category}
                        placeholder={Strings.category}
                        data={listProductCategory}
                        labelName={'categoryName'}
                        labelId={'categoryId'}
                        selected={values.category}
                        isDisable={true}
                        error={touched.category && errors.category}
                        onSelect={item => {
                          setFieldValue('category', item);
                        }}
                        style={styles.dropDownStyle}
                      />
                      {productDetail?.productFormData?.length > 0
                        ? JSON.parse(productDetail?.productFormData).map(
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
                                      onChangeText={handleChange(input.Field)}
                                      onBlur={handleBlur(input.Field)}
                                      value={values[input.Field]}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      errorStyle={styles.errorStyle}
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
                                      onChangeText={handleChange(input.Field)}
                                      onBlur={handleBlur(input.Field)}
                                      value={values[input.Field]}
                                      error={
                                        input.IsRequired ||
                                        validateProductFields(input.Field)
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      errorStyle={styles.errorStyle}
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
                                      onChangeText={handleChange(input.Field)}
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
                                      labelId={'Id'}
                                      labelName={'Value'}
                                      selected={values[input.Field]}
                                      error={
                                        input.IsRequired
                                          ? touched[input.Field] &&
                                            errors[input.Field]
                                          : ''
                                      }
                                      onSelect={item => {
                                        setFieldValue([input.Field], item);
                                      }}
                                      style={styles.dropDownStyle}
                                    />
                                  );
                                case 'DateTime':
                                  return (
                                    <CustomTextInput
                                      ref={inputsRef ? inputsRef[i] : null}
                                      key={input.Id}
                                      placeholder={input.Placeholder}
                                      inputStyle={styles.inputTextArea}
                                      containerStyle={
                                        styles.inputContentContainer
                                      }
                                      editable={false}
                                      pointerEvents={'none'}
                                      rightIcon={Icons.calendarEvent}
                                      onChangeText={handleChange(input.Field)}
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
                        onPress={handleWarranty}>
                        <Text style={addReceiptTextStyle}>
                          {Strings.editWarranty}
                        </Text>
                        <Image
                          style={rightArrowStyle}
                          source={icons.arrowRight}
                        />
                      </Pressable>
                      <Pressable
                        style={styles.receiptButtonStyle}
                        onPress={handleEditReceipt}>
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
                          {currentReceipt()}
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
                          title={Strings.save}
                          disabled={isSubmitting}
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
                      successText={editProductData?.message}
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
export default EditProductScreen;
