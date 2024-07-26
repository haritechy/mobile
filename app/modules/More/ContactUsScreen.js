import React, {createRef, useMemo, useState} from 'react';
import {View, Pressable, Image, Text, StyleSheet} from 'react-native';
import {Icons} from '../../assets';
import {AppConstants, Strings} from '../../constants';
import {
  CustomNavBar,
  CustomTextInput,
  ErrorPopup,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import styles from './styles/ContactUsStyles';
import {Formik} from 'formik';
import {useCallback} from 'react';
import schema from '../../services/ValidationService';
import {useDispatch, useSelector} from 'react-redux';
import {contactUs} from '../../redux/actions/contactUsActions';
import {imageSelection} from '../../services/Utils';
import {mediaUpload} from '../../redux/actions/commonActions';
import {ThemeStyles} from '../../theme';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {getAddUnitId} from '../../utils/helper';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  subject: createRef(),
  detail: createRef(),
};

const contactRef = createRef();

const RenderContactForm = ({
  params,
  handleChange,
  attachment,
  onRemoveAttachment,
  themedStyles,
}) => {
  const attachmentTextStyle = StyleSheet.compose(
    styles.attachmentText,
    themedStyles.labelText,
  );
  const attachmentIcnStyle = StyleSheet.compose(
    styles.attachmentIcn,
    themedStyles.navIcon,
  );
  const cancelIcnStyle = StyleSheet.compose(
    styles.cancelIcn,
    themedStyles.navIcon,
  );
  return (
    <View>
      <CustomTextInput
        ref={inputRef.subject}
        autoCapitalize={'none'}
        keyboardType={'default'}
        containerStyle={styles.subjectContainer}
        inputStyle={styles.subjectInputText}
        value={params?.values?.subject}
        leftText={`${Strings.subject}: `}
        leftTextStyle={styles.subjectText}
        isBorder={false}
        error={params.touched.subject && params.errors.subject}
        errorStyle={styles.errorStyle}
        onBlur={params.handleBlur('subject')}
        onChangeText={val => {
          params.setFieldValue('subject', val);
          handleChange();
        }}
        onSubmitEditing={() => inputRef.detail.current.focus()}
      />
      <CustomTextInput
        ref={inputRef.detail}
        autoCapitalize={'none'}
        keyboardType={'default'}
        multiline
        placeholder={Strings.typeYourMessageHere}
        containerStyle={styles.detailContainer}
        inputStyle={styles.inputText}
        value={params?.values?.detail}
        error={params.touched.detail && params.errors.detail}
        errorStyle={styles.errorStyle}
        isTitleVisible={false}
        onBlur={params.handleBlur('detail')}
        onChangeText={val => {
          params.setFieldValue('detail', val);
          handleChange();
        }}
      />
      {attachment?.fileName ? (
        <>
          <View style={styles.attachmentViewStyle}>
            <Image style={attachmentIcnStyle} source={Icons.attachment} />
            <Text style={attachmentTextStyle} numberOfLines={2}>
              {attachment?.fileName}
            </Text>
            <Pressable style={styles.cancelView} onPress={onRemoveAttachment}>
              <Image style={cancelIcnStyle} source={Icons.cross} />
            </Pressable>
          </View>
          {params.errors.attachment ? (
            <Text style={styles.errorText}>{params.errors.attachment}</Text>
          ) : null}
        </>
      ) : null}
    </View>
  );
};
const ContactUsScreen = ({navigation}) => {
  const [actionIcon, setIcon] = useState(Icons.arrowUpCircleUnfill);
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attachment, setAttachment] = useState(undefined);
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {contactUsData} = useSelector(state => state.contactUsReducer);
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  useFocusEffect(
    useCallback(() => {
      enableAdjustPan();
      return () => disableAdjustPan();
    }, [disableAdjustPan, enableAdjustPan]),
  );
  const handleAction = useCallback(
    index => {
      if (index === 0) {
        handleAttachment();
      } else {
        contactRef.current.handleSubmit();
      }
    },
    [handleAttachment],
  );
  const handleChange = useCallback(() => {
    if (contactRef?.current?.isValid) {
      setIcon(Icons.arrowUpCircleFill);
    } else {
      setIcon(Icons.arrowUpCircleUnfill);
    }
  }, []);
  const postContactData = useCallback(
    contactData => {
      loaderRef.current.show();
      dispatch(
        contactUs(contactData, (isSuccess, responseData) => {
          if (isSuccess) {
            contactRef.current.resetForm();
            setAttachment(null);
            setVisible(true);
          } else {
            setError(true);
            setErrorMessage(
              responseData?.message || Strings.somethingWentWrong,
            );
          }
        }),
      );
    },
    [dispatch],
  );
  const handleSubmit = useCallback(
    params => {
      if (attachment?.fileName) {
        loaderRef.current.show();
        dispatch(
          mediaUpload(
            attachment,
            AppConstants.mediaDriveName.ContactUs,
            false,
            [],
            (isSuccess, uploadData) => {
              if (isSuccess) {
                if (uploadData?.isSuccess) {
                  const contactData = {
                    id: 0,
                    subject: params?.subject,
                    message: params?.detail,
                    image: uploadData?.fileUrl,
                    attachImageName: uploadData?.fileUrl,
                  };
                  loaderRef.current.hide();
                  postContactData(contactData);
                }
              } else {
                setError(true);
                setErrorMessage(
                  uploadData?.message || Strings.somethingWentWrong,
                );
              }
            },
          ),
        );
      } else {
        const contactData = {
          id: 0,
          subject: params?.subject,
          message: params?.detail,
        };
        postContactData(contactData);
      }
    },
    [dispatch, postContactData, attachment],
  );
  const handleAttachment = useCallback(() => {
    imageSelection(false)
      .then(res => {
        setAttachment(res?.assets[0]);
        contactRef.current.setFieldValue('attachment', res?.assets[0]);
      })
      .catch(err => console.log('err ', err));
  }, []);
  const onRemoveAttachment = useCallback(() => {
    setAttachment(null);
  }, []);
  const onOkayPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <View style={styles.contentContainer}>
            <CustomNavBar
              title={Strings.contactUs}
              isRightActionVisible={true}
              listRightIcons={[Icons.attachment, actionIcon]}
              containerStyle={styles.headerContainer}
              onAction={handleAction}
              headerTextStyle={styles.headerStyle}
            />
            <Formik
              initialValues={{
                subject: '',
                detail: '',
                attachment: undefined,
              }}
              innerRef={contactRef}
              validationSchema={schema.contactUs}
              onSubmit={handleSubmit}>
              {({...params}) => (
                <RenderContactForm
                  {...{
                    params,
                    handleChange,
                    attachment,
                    onRemoveAttachment,
                    themedStyles,
                  }}
                />
              )}
            </Formik>
            <SuccessPopup
              {...{isVisible, setVisible}}
              successText={contactUsData?.message}
              onOkPress={onOkayPress}
            />
            <ErrorPopup
              isVisible={isError}
              setVisible={setError}
              errorText={errorMessage}
            />
          </View>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.ContactUs)}
          />
        </>
      )}
    />
  );
};
export default ContactUsScreen;
