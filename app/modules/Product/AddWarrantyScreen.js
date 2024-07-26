import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  DiscardPopup,
  ImagePickerPopup,
  ScreenContainer,
  loaderRef,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {goBack} from '../../navigation/services/navigationServices';
import {mediaUpload} from '../../redux/actions/commonActions';
import schema from '../../services/ValidationService';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/AddWarrantyStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const warrantyRef = createRef();
const AddWarrantyScreen = ({navigation, route}) => {
  const {productName} = route?.params;
  const [currentDateField, setDateField] = useState('');
  const [currentIndex, setFormIndex] = useState(0);
  const [wImageIndex, setImageIndex] = useState(0);
  const [isPickerVisible, setDatePicker] = useState(false);
  const {addedWarranty} = useSelector(state => state.productReducer);
  const {userInfo} = useSelector(state => state.userReducer);
  const [isProductPart, setProductPart] = useState(addedWarranty?.length > 0);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [isDiscard, setDiscard] = useState(false);
  const [allInputFields, setAllFields] = useState(
    addedWarranty?.length > 0
      ? addedWarranty
      : [
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
            agreementNumber: '',
            imageUrl: null,
            isProduct: true,
            fieldId: 0,
          },
        ],
  );
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
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
  const actionSheetRef = createRef();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      addedWarranty?.length > 0 && setAllFields(addedWarranty);
    });
    return () => unsubscribe();
  }, [addedWarranty, dispatch, navigation]);
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    dispatch({type: 'SAVE_WARRANTY', data: null});
    goBack();
  }, [dispatch]);
  const onSubmit = useCallback(
    params => {
      let listImages = [];
      params?.map(e => e?.imageUrl?.fileName && listImages.push(e?.imageUrl));
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
                    };
                  });
                  dispatch({type: 'SAVE_WARRANTY', data: allData});
                  navigation.goBack();
                }
              } else {
                setSubmitFlag(false);
              }
            },
          ),
        );
      } else {
        setSubmitFlag(true);
        const allData = allInputFields.map((e, index) => {
          return {
            ...e,
            imageUrl: e?.imageUrl || null,
          };
        });
        dispatch({type: 'SAVE_WARRANTY', data: allData});
        navigation.goBack();
      }
    },
    [dispatch, navigation, allInputFields],
  );
  const handleProductPart = useCallback(() => {
    setProductPart(prev => !prev);
    const values = [allInputFields[0]];
    warrantyRef.current.setValues(values);
    setAllFields([...values]);
  }, [allInputFields]);
  const handleAddPart = () => {
    const values = [...allInputFields];
    values.push({
      name: '',
      startDate: '',
      endDate: '',
      currency: userInfo?.currencyCode,
      price: null,
      provider: null,
      type: null,
      agreementNumber: '',
      imageUrl: null,
      isProduct: false,
      fieldId: allInputFields?.length,
    });
    warrantyRef.current.setValues(values);
    setAllFields([...values]);
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
      values[wImageIndex].imageUrl = {...res?.assets[0], fieldId: wImageIndex};
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
  const fieldPlaceholder = () => `${Strings.price} (${userInfo?.currencyCode})`;
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.addWarranty}
            headerTextStyle={styles.headerTextStyle}
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
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}>
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
                            value={field.name}
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
                                value={formattedDate(field.startDate)}
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
                                value={formattedDate(field.endDate)}
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
                            value={field.price}
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
                            value={field.provider}
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
                            value={field.type}
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
                            value={field.agreementNumber}
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
                                ? field?.imageUrl?.fileName || field?.imageUrl
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
                      style={styles.submitButtonStyle}
                      disabled={isSubmitting}
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
                        selectedDate={
                          allInputFields[currentIndex]?.startDate
                            ? allInputFields[currentIndex]?.startDate
                            : values[currentIndex][currentDateField]
                        }
                      />
                    ) : null}
                    <ImagePickerPopup
                      ref={actionSheetRef}
                      onSelectImage={onSelectImage}
                    />
                    <DiscardPopup
                      isVisible={isDiscard}
                      setVisible={setDiscard}
                      {...{onDiscardPress}}
                    />
                  </>
                );
              }}
            </Formik>
          </KeyboardAwareScrollView>
        </>
      )}
    />
  );
};
export default AddWarrantyScreen;
