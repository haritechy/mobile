import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  DiscardPopup,
  ErrorPopup,
  ImagePickerPopup,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import ApiConstants from '../../constants/ApiConstants';
import {goBack} from '../../navigation/services/navigationServices';
import {mediaUpload} from '../../redux/actions/commonActions';
import {
  addProductWarranty,
  getProductWarranty,
  updateProductWarranty,
} from '../../redux/actions/warrantyActions';
import schema from '../../services/ValidationService';
import {Metrics, ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/EditWarrantyStyles';

const warrantyRef = createRef();
const EditWarrantyScreen = ({navigation, route}) => {
  const {productId, productName} = route?.params;
  const [currentDateField, setDateField] = useState('');
  const [currentIndex, setFormIndex] = useState(0);
  const [wImageIndex, setImageIndex] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [successText, setSuccessMessage] = useState('');
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [prevPartIndex, setPartIndex] = useState(0);
  const [isPartAdded, setPartAdded] = useState(false);
  const [isPickerVisible, setDatePicker] = useState(false);
  const [isInitial, setInitial] = useState(true);
  const {listProductWarranties} = useSelector(state => state.warrantyReducer);
  const {userInfo} = useSelector(state => state.userReducer);
  const [isProductPart, setProductPart] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [isDiscard, setDiscard] = useState(false);
  const [allInputFields, setAllFields] = useState([
    {
      id: 0,
      productId: 0,
      name: productName,
      startDate: '',
      endDate: '',
      currency: userInfo?.currencyCode,
      price: null,
      provider: null,
      type: null,
      agreementNumber: null,
      imageUrl: null,
      isProduct: true,
    },
  ]);
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const actionSheetRef = createRef();
  const uploadButtonStyle = StyleSheet.compose(styles.uploadButtonStyle);
  const uploadSlipStyle = StyleSheet.compose(
    styles.uploadSlipText,
    themedStyles.labelText,
  );
  const attachmentIcn = StyleSheet.compose(
    styles.attachmentIcn,
    themedStyles.navIcon,
  );
  const productPartText = StyleSheet.compose(
    styles.productPartText,
    themedStyles.placeholder,
  );
  const addItemTextStyle = StyleSheet.compose(
    styles.addItemText,
    themedStyles.labelText,
  );
  const addIcnStyle = StyleSheet.compose(styles.addIcn, themedStyles.navIcon);
  const unCheckIcnStyle = StyleSheet.compose(
    styles.unCheckIcn,
    themedStyles.navWhiteIcon,
  );
  const warrantyPartLabelStyle = StyleSheet.compose(
    styles.warrantyPartLabel,
    themedStyles.labelText,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_UPLOAD_STATE'});
      loaderRef.current.show();
      dispatch(getProductWarranty(productId));
      setInitial(true);
    });
    return () => unsubscribe();
  }, [dispatch, navigation, productId]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardShow(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardShow(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    if (listProductWarranties?.length > 0 && isInitial) {
      let allFields = [];
      allFields = listProductWarranties?.map(e => {
        return {
          id: e?.productWarrantyId,
          productId: e?.productId,
          name: e?.name,
          startDate: e?.startDate,
          endDate: e?.endDate,
          currency: userInfo?.currencyCode,
          price: e?.price?.toFixed(2),
          provider: e?.provider,
          type: e?.type,
          agreementNumber: e?.agreementNumber,
          imageUrl: e?.imageUrl
            ? {fileName: e?.imageUrl?.split(`${ApiConstants.ImageBaseUrl}/`)[1]}
            : null,
          isProduct: e?.isProduct,
        };
      });
      setAllFields([...allFields]);
      warrantyRef.current.setValues(allFields);
      setInitial(false);
      setPartIndex(allFields?.length - 1);
      setProductPart(allFields?.length > 1);
    }
  }, [isInitial, listProductWarranties, userInfo]);
  const updateWarranty = useCallback(
    allData => {
      loaderRef.current.show();
      dispatch(
        updateProductWarranty(allData, (isUpdated, updateData) => {
          loaderRef.current.hide();
          if (isUpdated) {
            setVisible(true);
            setSuccessMessage(updateData?.message);
          } else {
            setError(true);
            setErrorMessage(updateData?.message);
          }
        }),
      );
    },
    [dispatch],
  );
  const onUpdateWarranty = useCallback(
    listImages => {
      let listUploadImages = [];
      if (listImages?.length > 0) {
        allInputFields.map(e => {
          listUploadImages.push({
            imageUrl: e?.imageUrl?.fileName || null,
          });
        });
        let listUploaded = listUploadImages.map((e, i) => {
          if (e?.imageUrl && !e?.imageUrl.includes('Warranty/')) {
            return {...e, index: i};
          } else {
            return undefined;
          }
        });
        loaderRef.current.show();
        dispatch(
          mediaUpload(
            '',
            AppConstants.mediaDriveName.Warranty,
            true,
            listImages,
            (isSuccess, uploadData) => {
              if (isSuccess) {
                if (uploadData?.length > 0) {
                  uploadData?.map(file => {
                    let i = 0;
                    while (i < listUploaded?.length) {
                      if (listUploaded[i] && !listUploaded[i]?.fileUrl) {
                        listUploaded[i] = {fileUrl: file?.fileUrl};
                        i = listUploaded?.length;
                      }
                      i++;
                    }
                  });
                  const allData = allInputFields.map((e, index) => {
                    return {
                      ...e,
                      imageUrl: listUploaded[index]
                        ? listUploaded[index]?.fileUrl
                        : e?.imageUrl?.fileName,
                      currency: userInfo?.currencyCode,
                      price: e?.price || null,
                      provider: e?.provider || null,
                      type: e?.type || null,
                      agreementNumber: e?.agreementNumber || null,
                    };
                  });
                  updateWarranty(allData);
                }
              }
            },
          ),
        );
      } else {
        const allData = allInputFields.map((e, index) => {
          return {
            ...e,
            imageUrl: e?.imageUrl?.fileName || null,
            currency: userInfo?.currencyCode,
            price: e?.price || null,
            provider: e?.provider || null,
            type: e?.type || null,
            agreementNumber: e?.agreementNumber || null,
          };
        });
        updateWarranty(allData);
      }
    },
    [allInputFields, dispatch, updateWarranty, userInfo?.currencyCode],
  );
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onSubmit = useCallback(
    params => {
      let listImages = [];
      params?.map(
        e =>
          e?.imageUrl?.fileName &&
          e?.imageUrl.isNew &&
          listImages.push(e?.imageUrl),
      );
      if (listProductWarranties?.length === 0) {
        if (listImages?.length > 0) {
          setSubmitFlag(true);
          loaderRef.current.show();
          dispatch(
            mediaUpload(
              '',
              AppConstants.mediaDriveName.Warranty,
              true,
              listImages,
              (isSuccess, uploadData) => {
                if (isSuccess) {
                  if (uploadData?.length > 0) {
                    let warrantyImages = [];
                    uploadData?.map((file, index) => {
                      warrantyImages.push({
                        id: 0,
                        fileUrl: file?.fileUrl,
                        fileSize: file?.fileSize,
                        isDefault: index === 0,
                        fieldId: listImages[index]?.fieldId,
                      });
                    });
                    const allData = allInputFields.map((e, index) => {
                      return {
                        ...e,
                        imageUrl:
                          warrantyImages.find(img => img?.fieldId === index)
                            ?.fileUrl || e?.imageUrl,
                        productId: productId,
                        currency: userInfo?.currencyCode,
                        price: e?.price || null,
                        provider: e?.provider || null,
                        type: e?.type || null,
                        agreementNumber: e?.agreementNumber || null,
                      };
                    });
                    loaderRef.current.show();
                    dispatch(
                      addProductWarranty(allData, (isSuccess, postData) => {
                        if (isSuccess) {
                          setVisible(true);
                          setSuccessMessage(postData?.message);
                        } else {
                          setError(true);
                          setErrorMessage(postData?.message);
                        }
                      }),
                    );
                  }
                } else {
                  setSubmitFlag(false);
                }
              },
            ),
          );
        } else {
          const allData = allInputFields.map((e, index) => {
            return {
              ...e,
              imageUrl: e?.imageUrl || null,
              productId: productId,
              currency: userInfo?.currencyCode,
              price: e?.price || null,
              provider: e?.provider || null,
              type: e?.type || null,
              agreementNumber: e?.agreementNumber || null,
            };
          });
          setSubmitFlag(true);
          loaderRef.current.show();
          dispatch(
            addProductWarranty(allData, (isSuccess, postData) => {
              if (isSuccess) {
                setVisible(true);
                setSuccessMessage(postData?.message);
              } else {
                setSubmitFlag(false);
                setError(true);
                setErrorMessage(postData?.message);
              }
            }),
          );
        }
      } else if (isPartAdded) {
        let partImages = [];
        allInputFields.map((e, index) => {
          if (index > prevPartIndex) {
            e?.imageUrl?.fileName &&
              e?.imageUrl.isNew &&
              partImages.push(e?.imageUrl);
          }
        });
        if (partImages?.length > 0) {
          setSubmitFlag(true);
          loaderRef.current.show();
          dispatch(
            mediaUpload(
              '',
              AppConstants.mediaDriveName.Warranty,
              true,
              partImages,
              (isSuccess, uploadData) => {
                if (isSuccess) {
                  if (uploadData?.length > 0) {
                    let warrantyImages = [];
                    uploadData?.map((file, index) => {
                      warrantyImages.push({
                        id: 0,
                        fileUrl: file?.fileUrl,
                        fileSize: file?.fileSize,
                        isDefault: index === 0,
                        fieldId: partImages[index]?.fieldId,
                      });
                    });
                    const partFields = [];
                    allInputFields.map((e, index) => {
                      index > prevPartIndex &&
                        partFields.push({
                          ...e,
                          imageUrl:
                            warrantyImages.find(img => img?.fieldId === index)
                              ?.fileUrl || e?.imageUrl,
                          productId: productId,
                          currency: userInfo?.currencyCode,
                          price: e?.price || null,
                          provider: e?.provider || null,
                          type: e?.type || null,
                          agreementNumber: e?.agreementNumber || null,
                        });
                    });
                    loaderRef.current.show();
                    dispatch(
                      addProductWarranty(partFields, (isSuccess, postData) => {
                        if (isSuccess) {
                          setVisible(true);
                          setSuccessMessage(postData?.message);
                        } else {
                          setError(true);
                          setErrorMessage(postData?.message);
                        }
                      }),
                    );
                  }
                } else {
                  setSubmitFlag(false);
                }
              },
            ),
          );
        } else {
          setSubmitFlag(true);
          const partFields = [];
          allInputFields.map((e, index) => {
            index > prevPartIndex &&
              partFields.push({
                ...e,
                productId: productId,
                imageUrl: e?.imageUrl,
                currency: userInfo?.currencyCode,
                price: e?.price || null,
                provider: e?.provider || null,
                type: e?.type || null,
                agreementNumber: e?.agreementNumber || null,
              });
          });
          loaderRef.current.show();
          dispatch(
            addProductWarranty(partFields, (isSuccess, postData) => {
              if (isSuccess) {
                onUpdateWarranty(listImages);
              } else {
                setSubmitFlag(false);
                setError(true);
                setErrorMessage(postData?.message);
              }
            }),
          );
        }
      } else {
        onUpdateWarranty(listImages);
      }
    },
    [
      listProductWarranties?.length,
      isPartAdded,
      dispatch,
      allInputFields,
      productId,
      userInfo?.currencyCode,
      prevPartIndex,
      onUpdateWarranty,
    ],
  );
  const handleProductPart = useCallback(() => {
    if (!isProductPart) {
      setProductPart(prev => !prev);
      !isProductPart ? setPartAdded(true) : setPartAdded(false);
    }
  }, [isProductPart]);
  const handleAddPart = () => {
    const values = [...allInputFields];
    values.push({
      id: 0,
      productId: productId,
      name: '',
      startDate: '',
      endDate: '',
      currency: userInfo?.currencyCode,
      price: null,
      provider: null,
      type: null,
      agreementNumber: null,
      imageUrl: null,
      isProduct: false,
      fieldId: allInputFields?.length,
    });
    setAllFields([...values]);
    warrantyRef.current.setValues(values);
    setPartAdded(true);
  };
  const handleDatePicker = useCallback((dateField, index) => {
    setDateField(dateField);
    setFormIndex(index);
    setDatePicker(prev => !prev);
  }, []);
  const handleSelectedDate = useCallback(
    selectedDate => {
      setDatePicker(false);
      const values = [...allInputFields];
      values[currentIndex][currentDateField] = selectedDate;
      setAllFields(values);
      warrantyRef.current.setTouched({
        ...warrantyRef.current.touched,
        [values[currentIndex][currentDateField]]: true,
      });
    },
    [allInputFields, currentDateField, currentIndex],
  );
  const onSelectImage = useCallback(
    res => {
      const values = [...allInputFields];
      values[wImageIndex].imageUrl = {
        ...res?.assets[0],
        isNew: true,
        fieldId: wImageIndex,
      };
      setAllFields(values);
      warrantyRef.current.setValues(values);
    },
    [allInputFields, wImageIndex],
  );
  const openImagePicker = useCallback(
    slipIndex => {
      actionSheetRef.current.show();
      setImageIndex(slipIndex);
    },
    [actionSheetRef],
  );
  const handleValueChange = (name, index, value) => {
    const values = [...allInputFields];
    values[index][name] = value;
    setAllFields(values);
    warrantyRef.current.setValues([...values]);
    warrantyRef.current.setTouched({
      ...warrantyRef.current.touched,
      [values[index][name]]: true,
    });
  };
  const warrantyMinDate = () => {
    switch (currentDateField) {
      case 'startDate':
        return undefined;
      case 'endDate':
        if (allInputFields[currentIndex]?.startDate !== '') {
          return allInputFields[currentIndex]?.startDate;
        } else {
          return new Date();
        }
      default:
        return undefined;
    }
  };
  const warrantyMaxDate = () => {
    switch (currentDateField) {
      case 'startDate':
        if (allInputFields[currentIndex]?.endDate !== '') {
          return allInputFields[currentIndex]?.endDate;
        } else {
          return undefined;
        }
      case 'endDate':
        return undefined;
      default:
        break;
    }
  };
  const onOkayPress = useCallback(() => {
    setVisible(false);
    navigation.goBack();
  }, [navigation]);
  const fieldPlaceholder = () => `${Strings.price} (${userInfo?.currencyCode})`;
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.editWarranty}
            headerTextStyle={styles.headerTextStyle}
            containerStyle={styles.headerContainer}
            onBackPress={onBackPress}
          />
          <ScrollView
            style={styles.warrantyContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={
              keyboardShow
                ? {
                    paddingBottom: Metrics.screenHeight * 0.4,
                    ...styles.scrollContainer,
                  }
                : styles.scrollContainer
            }>
            <Formik
              initialValues={allInputFields}
              innerRef={warrantyRef}
              validationSchema={schema.addWarranty}
              onSubmit={onSubmit}>
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => {
                return (
                  <>
                    {allInputFields?.map((field, index) => {
                      return (
                        <View key={index}>
                          {index === 0 ? (
                            <Text style={warrantyPartLabelStyle}>
                              {Strings.productWarranty}
                            </Text>
                          ) : null}
                          {index === 1 ? (
                            <Text style={warrantyPartLabelStyle}>
                              {Strings.warrantyPart}
                            </Text>
                          ) : null}
                          <CustomTextInput
                            keyboardType={'default'}
                            floatingLabel={
                              index === 0
                                ? Strings.productName
                                : Strings.warrantyPartName
                            }
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContentContainer}
                            value={field?.name}
                            error={errors[index]?.name}
                            onChangeText={val =>
                              handleValueChange('name', index, val)
                            }
                          />
                          <View style={styles.warrantyDateView}>
                            <View style={styles.dateFlex}>
                              <CustomTextInput
                                floatingLabel={Strings.warrantyStart}
                                inputStyle={styles.inputText}
                                containerStyle={styles.flexDateContainer}
                                value={formattedDate(field?.startDate)}
                                editable={false}
                                pointerEvents={'none'}
                                rightIcon={Icons.calendarEvent}
                                error={errors[index]?.startDate}
                                onPress={() =>
                                  handleDatePicker('startDate', index)
                                }
                              />
                            </View>
                            <View style={styles.dateFlex}>
                              <CustomTextInput
                                floatingLabel={Strings.warrantyEnd}
                                inputStyle={styles.inputText}
                                containerStyle={styles.flexDateContainer}
                                value={formattedDate(field?.endDate)}
                                editable={false}
                                pointerEvents={'none'}
                                rightIcon={Icons.calendarEvent}
                                error={errors[index]?.endDate}
                                onPress={() =>
                                  handleDatePicker('endDate', index)
                                }
                              />
                            </View>
                          </View>
                          <CustomTextInput
                            keyboardType={'numeric'}
                            floatingLabel={fieldPlaceholder()}
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContentContainer}
                            value={field?.price?.toString()}
                            error={errors[index]?.price}
                            onBlur={handleBlur('price')}
                            onChangeText={val =>
                              handleValueChange('price', index, val)
                            }
                          />
                          <CustomTextInput
                            keyboardType={'default'}
                            floatingLabel={Strings.warrantyProvider}
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContentContainer}
                            value={field?.provider}
                            error={errors[index]?.provider}
                            onBlur={handleBlur('provider')}
                            onChangeText={val =>
                              handleValueChange('provider', index, val)
                            }
                          />
                          <CustomTextInput
                            keyboardType={'default'}
                            floatingLabel={Strings.warrantyType}
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContentContainer}
                            value={field?.type}
                            error={errors[index]?.type}
                            onBlur={handleBlur('type')}
                            onChangeText={val =>
                              handleValueChange('type', index, val)
                            }
                          />
                          <CustomTextInput
                            keyboardType={'default'}
                            floatingLabel={Strings.warrantyServiceNumber}
                            inputStyle={styles.inputText}
                            containerStyle={styles.inputContentContainer}
                            value={field?.agreementNumber}
                            error={errors[index]?.agreementNumber}
                            onBlur={handleBlur('agreementNumber')}
                            onChangeText={val =>
                              handleValueChange('agreementNumber', index, val)
                            }
                          />
                          <Pressable
                            style={uploadButtonStyle}
                            onPress={() => openImagePicker(index)}>
                            <Image
                              style={attachmentIcn}
                              source={Icons.attachment}
                            />
                            <Text style={uploadSlipStyle} numberOfLines={2}>
                              {field?.imageUrl
                                ? field?.imageUrl?.fileName
                                : Strings.addWarrantySlip}
                            </Text>
                          </Pressable>
                          {errors[index]?.imageUrl ? (
                            <Text style={styles.errorText}>
                              {errors[index].imageUrl}
                            </Text>
                          ) : null}
                          {index === 0 && (
                            <Pressable
                              style={styles.productPartRow}
                              onPress={handleProductPart}>
                              <Text style={productPartText}>
                                {`${Strings.productHasPartWarranty}?`}
                              </Text>
                              {isProductPart ? (
                                <Image
                                  style={
                                    isProductPart
                                      ? styles.checkIcn
                                      : unCheckIcnStyle
                                  }
                                  source={Icons.checkbox}
                                />
                              ) : (
                                <View style={styles.viewCheckIcon} />
                              )}
                            </Pressable>
                          )}
                        </View>
                      );
                    })}
                    {isProductPart ? (
                      <Pressable
                        style={styles.addItemView}
                        onPress={handleAddPart}>
                        <Image style={addIcnStyle} source={Icons.plus} />
                        <Text style={addItemTextStyle} numberOfLines={2}>
                          {Strings.addItem}
                        </Text>
                      </Pressable>
                    ) : null}
                    <Pressable
                      disabled={isSubmitting}
                      style={styles.submitButtonStyle}
                      onPress={handleSubmit}>
                      <Text style={styles.saveText}>{Strings.save}</Text>
                    </Pressable>
                    {isPickerVisible ? (
                      <CustomDatePicker
                        setDate={handleSelectedDate}
                        open={isPickerVisible}
                        setOpen={setDatePicker}
                        minDate={warrantyMinDate()}
                        maxDate={warrantyMaxDate()}
                        selectedDate={values[currentIndex][currentDateField]}
                      />
                    ) : null}
                    <ImagePickerPopup
                      ref={actionSheetRef}
                      onSelectImage={onSelectImage}
                    />
                  </>
                );
              }}
            </Formik>
            <SuccessPopup
              {...{isVisible, setVisible}}
              successText={successText}
              onOkPress={onOkayPress}
            />
            <ErrorPopup
              isVisible={isError}
              setVisible={setError}
              errorText={errorMessage}
            />
            <DiscardPopup
              isVisible={isDiscard}
              setVisible={setDiscard}
              {...{onDiscardPress}}
            />
          </ScrollView>
        </>
      )}
    />
  );
};
export default EditWarrantyScreen;
