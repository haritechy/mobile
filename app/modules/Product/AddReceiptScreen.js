import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {AppConstants, Strings} from '../../constants';
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
import styles from './styles/AddReceiptStyles';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {Formik} from 'formik';
import moment from 'moment';
import schema from '../../services/ValidationService';
import {addReceipt, editReceipt} from '../../redux/actions/receiptsActions';
import {mediaUpload} from '../../redux/actions/commonActions';
import {Metrics, ThemeStyles} from '../../theme';
import {goBack} from '../../navigation/services/navigationServices';
import {useTheme} from '@react-navigation/native';
import {formattedDate} from '../../utils/helper';
import ApiConstants from '../../constants/ApiConstants';

const inputRef = {
  receiptName: createRef(),
  purchaseDate: createRef(),
};
const receiptRef = createRef();
const AddReceiptScreen = ({navigation, route}) => {
  const {isEdit = false, receiptDetail = undefined} = route?.params || {};
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const actionSheetRef = createRef();
  const [receiptData, setReceipt] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const [isSubmitting, setSubmitFlag] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isImageChanged, setImageChanged] = useState(false);
  const [isPickerVisible, setDatePicker] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [isDiscard, setDiscard] = useState(false);
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
  const addUpdateReceipt = useCallback(
    request => {
      const {params, uploadedUrl} = request;
      const data = {
        receiptId: isEdit ? receiptDetail?.receiptId : 0,
        receiptName: params?.receiptName,
        receiptImageUrl: uploadedUrl
          ? uploadedUrl
          : params?.receiptImage.split(`${ApiConstants.ImageBaseUrl}/`)[1],
        purchaseDate: moment(params?.purchaseDate).format(
          AppConstants.dateFormats.reverseDate,
        ),
      };
      if (isEdit) {
        dispatch(
          editReceipt(data, (isUpdated, response) => {
            if (isUpdated) {
              setSuccess(true);
              setSuccessMessage(response?.message);
            } else {
              setSubmitFlag(false);
            }
          }),
        );
      } else {
        dispatch(
          addReceipt(data, (isAdded, response) => {
            if (isAdded) {
              setSuccess(true);
              setSuccessMessage(response?.message);
            } else {
              setSubmitFlag(false);
            }
          }),
        );
      }
    },
    [dispatch, isEdit, receiptDetail?.receiptId],
  );
  const onBackPress = useCallback(() => setDiscard(true), []);
  const onDiscardPress = useCallback(() => {
    setDiscard(false);
    goBack();
  }, []);
  const onSubmit = useCallback(
    params => {
      loaderRef.current.show();
      if (isImageChanged) {
        setSubmitFlag(true);
        dispatch(
          mediaUpload(
            receiptData,
            AppConstants.mediaDriveName.ProductReceipts,
            false,
            [],
            (isSuccess, uploadData) => {
              if (isSuccess) {
                if (uploadData?.isSuccess) {
                  const uploadedUrl = uploadData?.fileUrl;
                  addUpdateReceipt({params, uploadedUrl});
                } else {
                  setSubmitFlag(false);
                }
              } else {
                setError(true);
                setErrorMessage(
                  uploadData?.message || Strings.somethingWentWrong,
                );
                setSubmitFlag(false);
              }
            },
          ),
        );
      } else {
        setSubmitFlag(true);
        addUpdateReceipt({params});
      }
    },
    [addUpdateReceipt, dispatch, isImageChanged, receiptData],
  );
  const onSelectImage = useCallback(res => {
    setReceipt(res?.assets[0]);
    receiptRef.current.setFieldValue('receiptImage', res?.assets[0]);
    setImageChanged(true);
  }, []);
  const openImagePicker = useCallback(
    () => actionSheetRef.current.show(),
    [actionSheetRef],
  );
  const handleDate = useCallback(date => {
    receiptRef.current.setFieldValue('purchaseDate', date);
  }, []);
  const receiptInitData = isEdit
    ? {
        receiptImage: receiptDetail?.imageUrl,
        receiptName: receiptDetail?.name,
        purchaseDate: moment(receiptDetail?.purchaseDate).toDate(),
      }
    : {
        receiptImage: '',
        receiptName: '',
        purchaseDate: '',
      };
  const currentReceiptImage = () =>
    receiptData?.uri ? receiptData?.uri : receiptDetail?.imageUrl;
  const onOkayPress = useCallback(() => {
    setSuccess(false);
    navigation.goBack();
  }, [navigation]);
  const cameraIcnStyle = StyleSheet.compose(
    styles.cameraIcn,
    themedStyles.navIcon,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={isEdit ? Strings.editReceipt : Strings.addReceipt}
            onBackPress={onBackPress}
          />
          <ScrollView
            style={styles.receiptContainer}
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
              initialValues={receiptInitData}
              innerRef={receiptRef}
              validationSchema={schema.addReceipt}
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
                    <View>
                      <Pressable
                        style={styles.imagePickerContainer}
                        onPress={openImagePicker}>
                        {currentReceiptImage() ? (
                          <Image
                            style={styles.imagePicker}
                            source={{uri: currentReceiptImage()}}
                          />
                        ) : (
                          <Pressable
                            style={styles.cameraView}
                            onPress={openImagePicker}>
                            <Image
                              style={cameraIcnStyle}
                              source={Icons.camera}
                            />
                            <Text style={styles.addPhotoText}>
                              {Strings.addPhoto}
                            </Text>
                          </Pressable>
                        )}
                      </Pressable>
                      {errors.receiptImage ? (
                        <Text style={styles.errorText}>
                          {errors.receiptImage}
                        </Text>
                      ) : null}
                      <ImagePickerPopup
                        ref={actionSheetRef}
                        onSelectImage={onSelectImage}
                      />
                      <CustomTextInput
                        ref={inputRef.receiptName}
                        autoCapitalize={'none'}
                        keyboardType={'default'}
                        placeholder={Strings.addTagNameForReceipt}
                        inputStyle={styles.inputText}
                        containerStyle={styles.inputContentContainer}
                        value={values.receiptName}
                        isTitleVisible={false}
                        error={touched.receiptName && errors.receiptName}
                        onBlur={handleBlur('receiptName')}
                        onChangeText={val => {
                          setFieldValue('receiptName', val);
                        }}
                        onSubmitEditing={() =>
                          inputRef.purchaseDate.current.focus()
                        }
                      />
                      <CustomTextInput
                        ref={inputRef.purchaseDate}
                        floatingLabel={Strings.purchaseDate}
                        inputStyle={styles.inputText}
                        containerStyle={styles.dateContainer}
                        value={formattedDate(values.purchaseDate)}
                        editable={false}
                        pointerEvents={'none'}
                        error={touched.purchaseDate && errors.purchaseDate}
                        rightIcon={Icons.calendarEvent}
                        onPress={() => setDatePicker(prev => !prev)}
                        onChangeText={handleChange('purchaseDate')}
                        onSubmitEditing={() => Keyboard.dismiss()}
                      />
                      <Pressable
                        style={styles.submitButtonStyle}
                        disabled={isSubmitting}
                        onPress={handleSubmit}>
                        <Text style={styles.saveText}>{Strings.save}</Text>
                      </Pressable>
                    </View>
                    {isPickerVisible ? (
                      <CustomDatePicker
                        selectedDate={values.purchaseDate}
                        setDate={handleDate}
                        open={isPickerVisible}
                        setOpen={setDatePicker}
                        maxDate={new Date()}
                      />
                    ) : null}
                  </>
                );
              }}
            </Formik>
            <SuccessPopup
              isVisible={isSuccess}
              setVisible={setSuccess}
              successText={successMessage}
              onOkPress={onOkayPress}
            />
            <DiscardPopup
              isVisible={isDiscard}
              setVisible={setDiscard}
              {...{onDiscardPress}}
            />
            <ErrorPopup
              isVisible={isError}
              setVisible={setError}
              errorText={errorMessage}
            />
          </ScrollView>
        </>
      )}
    />
  );
};
export default AddReceiptScreen;
