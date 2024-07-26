import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomNavBar,
  ErrorPopup,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {navigate} from '../../navigation/services/navigationServices';
import {
  getUser,
  sendVerificationToEmail,
  sendVerificationToPhone,
} from '../../redux/actions/userActions';
import {Colors, Icons, Images, ThemeStyles, moderateScale} from '../../theme';
import {getAddressType, getAddUnitId, setNumberMask} from '../../utils/helper';
import styles from './styles/ProfileScreenStyles';

const RenderProfile = ({userData, profileNameStyle, profileContainerStyle}) => (
  <View style={styles.profileView}>
    <View style={profileContainerStyle}>
      <Image
        style={styles.profileImage}
        source={
          userData?.profileUrl
            ? {uri: userData?.profileUrl}
            : Images.emptyProfile
        }
        defaultSource={Images.emptyProfile}
      />
    </View>
    <Text style={profileNameStyle}>{`${userData?.username}`}</Text>
  </View>
);

const RenderEmailInfo = ({
  userData,
  handleEmailVerification,
  nameLabelStyle,
  nameValueStyle,
}) => (
  <View style={styles.emailInfoContainer}>
    <View style={styles.emailView}>
      <Text style={nameLabelStyle}>{Strings.email}</Text>
      <View style={styles.emailRowView}>
        <View style={styles.emailTextView}>
          <Text numberOfLines={2} style={nameValueStyle}>
            {userData?.email}
          </Text>
        </View>
        {userData?.emailConfirmed ? (
          <View style={styles.verifiedView}>
            <Image source={Icons.verified} style={styles.verifiedIcon} />
            <Text style={styles.verifiedText}>{Strings.verified}</Text>
          </View>
        ) : (
          <Pressable
            style={styles.arrowRightButton}
            onPress={handleEmailVerification}>
            <Text style={styles.arrowRightText}>{Strings.clickToVerify}</Text>
            <Icon
              name="chevron-thin-right"
              size={moderateScale(25)}
              color={Colors.linkBlue}
            />
          </Pressable>
        )}
      </View>
      {userData?.emailConfirmed ? null : (
        <View style={styles.pendingVerificationView}>
          <Image source={Icons.exclamationCircle} style={styles.pendingIcon} />
          <Text style={styles.pendingVerificationText}>
            {Strings.pendingVerification}
          </Text>
        </View>
      )}
    </View>
  </View>
);

const RenderPhoneInfo = ({
  userData,
  handlePhoneVerification,
  nameLabelStyle,
  nameValueStyle,
}) => (
  <View style={styles.emailInfoContainer}>
    <View style={styles.emailView}>
      <Text style={nameLabelStyle}>{Strings.phone}</Text>
      <View style={styles.emailRowView}>
        <View style={styles.emailTextView}>
          <Text style={nameValueStyle}>{`${
            userData?.countyCode
          } ${setNumberMask(userData?.phoneNumber)}`}</Text>
        </View>
        {userData?.phoneNumberConfirmed ? (
          <View style={styles.verifiedView}>
            <Image source={Icons.verified} style={styles.verifiedIcon} />
            <Text style={styles.verifiedText}>{Strings.verified}</Text>
          </View>
        ) : (
          <Pressable
            style={styles.arrowRightButton}
            onPress={handlePhoneVerification}>
            <Text style={styles.arrowRightText}>{Strings.clickToVerify}</Text>
            <Icon
              name="chevron-thin-right"
              size={moderateScale(25)}
              color={Colors.linkBlue}
            />
          </Pressable>
        )}
      </View>
      {userData?.phoneNumberConfirmed ? null : (
        <View style={styles.pendingVerificationView}>
          <Image source={Icons.exclamationCircle} style={styles.pendingIcon} />
          <Text style={styles.pendingVerificationText}>
            {Strings.pendingVerification}
          </Text>
        </View>
      )}
    </View>
  </View>
);

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);

  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {userData} = useSelector(state => state.userReducer);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successText, setSuccessText] = useState('');
  useEffect(() => {
    loaderRef.current.show();
    dispatch(getUser());
    return navigation.addListener('focus', _e => {
      dispatch(getUser());
    });
  }, [dispatch, navigation]);
  const handlePhoneVerification = useCallback(() => {
    dispatch({type: 'CLEAR_PROFILE_STATE'});
    loaderRef.current.show();
    dispatch(
      sendVerificationToPhone(
        userData?.countyCode,
        userData?.phoneNumber,
        (isSuccess, data) => {
          if (isSuccess && data?.result) {
            setVisible(true);
            setSuccessText(data?.message);
          } else {
            setError(true);
            setErrorMessage(data?.message);
          }
        },
      ),
    );
  }, [dispatch, userData]);
  const handleEmailVerification = useCallback(() => {
    dispatch({type: 'CLEAR_PROFILE_STATE'});
    loaderRef.current.show();
    dispatch(
      sendVerificationToEmail(userData?.email, (isSuccess, data) => {
        if (isSuccess && data?.result) {
          setVisible(true);
          setSuccessText(data?.message);
        } else {
          setError(true);
          setErrorMessage(data?.message);
        }
      }),
    );
  }, [dispatch, userData]);
  const handleAction = useCallback(() => {
    let addressData = [];
    if (userData?.userAddresses?.length > 0) {
      const physicalAddress = userData?.userAddresses.filter(
        ele => ele?.typeOfProperty === AppConstants.addressType.Physical,
      );
      const mailingAddress = userData?.userAddresses.filter(
        ele => ele?.typeOfProperty === AppConstants.addressType.Mailing,
      );
      const pCountry = {
        id: physicalAddress[0]?.countryId,
        name: physicalAddress[0]?.countryName,
      };
      const pState = {
        id: physicalAddress[0]?.stateId,
        stateName: physicalAddress[0]?.stateName,
      };
      const pCity = {
        id: physicalAddress[0]?.cityId,
        cityName: physicalAddress[0]?.cityName,
      };
      const mCountry = {
        id: mailingAddress[0]?.countryId,
        name: mailingAddress[0]?.countryName,
      };
      const mState = {
        id: mailingAddress[0]?.stateId,
        stateName: mailingAddress[0]?.stateName,
      };
      const mCity = {
        id: mailingAddress[0]?.cityId,
        cityName: mailingAddress[0]?.cityName,
      };
      addressData = [
        {
          id: physicalAddress[0]?.addressId,
          addressLine1: physicalAddress[0]?.addressLine1,
          addressLine2: physicalAddress[0]?.addressLine2,
          zipCode: physicalAddress[0]?.zipCode,
          country: pCountry,
          state: pState,
          city: pCity,
        },
        {
          id: mailingAddress[0]?.addressId,
          addressLine1: mailingAddress[0]?.addressLine1,
          addressLine2: mailingAddress[0]?.addressLine2,
          zipCode: mailingAddress[0]?.zipCode,
          country: mCountry,
          state: mState,
          city: mCity,
        },
      ];
    }
    navigate(NavigationRoutes.EditProfile, {
      userDetail: userData,
      listAddress: addressData,
    });
  }, [userData]);
  const profileNameStyle = StyleSheet.compose(
    styles.profileText,
    themedStyles.defaultText,
  );
  const infoHeaderIcon = StyleSheet.compose(
    styles.personalInfoIcon,
    themedStyles.navIcon,
  );
  const infoHeaderStyle = StyleSheet.compose(
    styles.headerTitle,
    themedStyles.placeholder,
  );
  const noAddressTextStyle = StyleSheet.compose(
    styles.noAddressText,
    themedStyles.placeholder,
  );
  const nameLabelStyle = StyleSheet.compose(
    styles.nameLabel,
    themedStyles.placeholder,
  );
  const nameValueStyle = StyleSheet.compose(
    styles.nameText,
    themedStyles.defaultText,
  );
  const addresLabelStyle = StyleSheet.compose(
    styles.addressTypeText,
    themedStyles.placeholder,
  );
  const addressValueStyle = StyleSheet.compose(
    styles.addressText,
    themedStyles.defaultText,
  );
  const profileContainerStyle = StyleSheet.compose(
    styles.profileContainer,
    themedStyles.inputBorder,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            containerStyle={styles.headerContainer}
            title={Strings.profile}
            isRightActionVisible
            rightButtonText={Strings.done}
            listRightIcons={[Icons.editSquare]}
            onAction={handleAction}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {userData ? (
              <View style={styles.container}>
                <RenderProfile
                  {...{userData, profileNameStyle, profileContainerStyle}}
                />
                <View style={styles.infoHeader}>
                  <Image source={Icons.user} style={infoHeaderIcon} />
                  <Text style={infoHeaderStyle}>{Strings.personalInfo}</Text>
                </View>
                {userData?.firstName ? (
                  <View style={styles.nameView}>
                    <Text style={nameLabelStyle}>{Strings.firstName}</Text>
                    <Text
                      numberOfLines={1}
                      style={nameValueStyle}>{`${userData?.firstName}`}</Text>
                  </View>
                ) : null}
                {userData?.lastName ? (
                  <View style={styles.nameView}>
                    <Text style={nameLabelStyle}>{Strings.lastName}</Text>
                    <Text
                      numberOfLines={1}
                      style={nameValueStyle}>{`${userData?.lastName}`}</Text>
                  </View>
                ) : null}
                <RenderEmailInfo
                  {...{
                    userData,
                    handleEmailVerification,
                    nameLabelStyle,
                    nameValueStyle,
                  }}
                />
                {userData?.phoneNumber && (
                  <RenderPhoneInfo
                    {...{
                      userData,
                      handlePhoneVerification,
                      nameLabelStyle,
                      nameValueStyle,
                    }}
                  />
                )}

                <View style={styles.separator} />
                {userData?.userAddresses?.length > 0 ? (
                  <>
                    <View style={styles.infoHeader}>
                      <Image
                        source={Icons.savedAddress}
                        style={infoHeaderIcon}
                      />
                      <Text style={infoHeaderStyle}>
                        {Strings.savedAddress}
                      </Text>
                    </View>
                    {userData?.userAddresses.map((address, index) => {
                      return (
                        <View key={index} style={styles.addrressContainer}>
                          <View style={styles.addressView}>
                            <Text style={addresLabelStyle}>
                              {getAddressType(address?.typeOfProperty)}
                            </Text>
                            <Text style={addressValueStyle}>
                              {`${address?.addressLine1.trim()}, ${
                                address?.addressLine2
                              }, ${address?.zipCode}, ${address?.cityName}, ${
                                address?.stateName
                              }, ${address?.countryName}`}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <View style={styles.noAddressMainView}>
                      <Image
                        source={Icons.savedAddress}
                        style={infoHeaderIcon}
                      />
                      <Text style={infoHeaderStyle}>
                        {Strings.savedAddress}
                      </Text>
                    </View>
                    <View style={styles.noAddressView}>
                      <Text style={noAddressTextStyle}>
                        {Strings.noAddress}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ) : null}
            <SuccessPopup
              {...{isVisible, setVisible}}
              successText={successText}
            />
            <ErrorPopup
              isVisible={isError}
              setVisible={setError}
              errorText={errorMessage}
            />
          </ScrollView>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Profile)}
          />
        </>
      )}
    />
  );
};
export default ProfileScreen;
