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
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {object} from 'yup';
import {
  AddImagePicker,
  CustomButton,
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
import {addProduct} from '../../redux/actions/productActions';
import Schema from '../../services/ValidationService';
import {ThemeStyles} from '../../theme';
import styles from '../Product/styles/AddProductStyle';

const FeedUploadScreen = ({route, navigation}) => {
  const {
    isFromScan = false,
    qrData,
    barCodeNumber,
    isFromDelivery = false,
    locationDetail,
  } = route?.params || {};
  const [listImages, setImages] = useState([]);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDiscard, setDiscard] = useState(false);

  const dispatch = useDispatch();
  const {addedWarranty} = useSelector(state => state.productReducer);
  const {userInfo} = useSelector(state => state.userReducer);
  const {selectedReceipt} = useSelector(state => state.receiptsReducer);

  const productFormRef = createRef();

  const onSubmit = useCallback(
    params => {
      let listFields = [];
      let productImages = [];

      if (listImages.length > 0) {
        setSubmitFlag(true);
        dispatch(
          mediaUpload(
            '',
            AppConstants.mediaDriveName.Products,
            true,
            listImages,
            (isSuccess, uploadData) => {
              if (isSuccess) {
                uploadData.forEach((file, index) => {
                  productImages.push({
                    id: 0,
                    fileUrl: file.fileUrl,
                    fileSize: file.fileSize,
                    isDefault: index === 0,
                  });
                });
                addToProduct({params, listFields, productImages});
              } else {
                setSubmitFlag(false);
              }
            },
          ),
        );
      } else {
        addToProduct({params, listFields});
      }
    },
    [addToProduct, dispatch, listImages],
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

  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onOkayPress = useCallback(() => {
    setVisible(false);
    isFromScan ? navigation.pop(2) : navigation.goBack();
  }, [navigation, isFromScan]);

  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);

  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.mainContainer}>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.feed}
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
              initialValues={{author: '', title: '', description: ''}}
              validationSchema={Schema.addProduct}
              onSubmit={onSubmit}>
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
              }) => (
                <View style={styles.container}>
                  <View style={styles.addProductView}>
                    <AddImagePicker
                      onSelectImage={response =>
                        setImages([...listImages, response.assets[0]])
                      }
                      isMultiple
                      data={listImages}
                      setImageList={setImages}
                    />
                  </View>
                  <View style={styles.infoView}>
                    <Text style={themedStyles.labelText}>
                      {Strings.enterFeedDeatails}
                    </Text>
                  </View>
                  <View style={styles.basicInfoView}>
                    <CustomTextInput
                      key="author"
                      inputStyle={styles.inputText}
                      containerStyle={styles.inputContentContainer}
                      keyboardType="default"
                      returnKeyType="next"
                      floatingLabel={Strings.author}
                      onChangeText={handleChange('author')}
                      onBlur={handleBlur('author')}
                      value={values.author}
                      error={touched.author && errors.author}
                    />
                    <CustomTextInput
                      key="title"
                      inputStyle={styles.inputText}
                      containerStyle={styles.inputContentContainer}
                      keyboardType="default"
                      returnKeyType="next"
                      floatingLabel={Strings.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      error={touched.title && errors.title}
                    />
                    <CustomTextInput
                      key="description"
                      inputStyle={styles.inputTextArea}
                      containerStyle={styles.inputTextAreaContentContainer}
                      keyboardType="default"
                      returnKeyType="done"
                      multiline
                      floatingLabel={Strings.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      error={touched.description && errors.description}
                    />
                    <View style={styles.submitView}>
                      <CustomButton
                        style={styles.submitButtonStyle}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        title={Strings.upload}
                      />
                    </View>
                  </View>
                  <ImageViewCard
                    imageUrl=""
                    isPreview={false}
                    setPreview={() => {}}
                  />
                  <ErrorPopup
                    isVisible={isError}
                    setVisible={setError}
                    errorText={errorMessage}
                  />
                  <SuccessPopup
                    isVisible={isVisible}
                    setVisible={setVisible}
                    successText=""
                    onOkPress={onOkayPress}
                  />
                  <DiscardPopup
                    isVisible={isDiscard}
                    setVisible={setDiscard}
                    onDiscardPress={onDiscardPress}
                  />
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      )}
    />
  );
};

export default FeedUploadScreen;
