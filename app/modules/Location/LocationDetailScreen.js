import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomNavBar,
  CustomSwitch,
  DeleteConfirmationPopup,
  ErrorPopup,
  FastImageView,
  GoogleAdsComponent,
  MoreComponent,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import ApiConstants from '../../constants/ApiConstants';
import {listMoreOption, listPropertyType} from '../../constants/Mockdata';
import {deleteLocationInfo, getKeyFromValue} from '../../constants/Util';
import {
  deleteExistsLocation,
  selectLocation,
  updateLocation,
} from '../../redux/actions/locationsActions';
import {ThemeStyles} from '../../theme';
import {getAddUnitId, locationPlaceholder} from '../../utils/helper';
import styles from './styles/LocationDetailStyles';

const LocationDetail = ({
  selectedLocation,
  onToggleSwitch,
  isDefault,
  themedStyles,
}) => {
  const titleTextStyle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const labelTextStyle = StyleSheet.compose(
    styles.labelText,
    themedStyles.labelText,
  );
  const labelValueTextStyle = StyleSheet.compose(
    styles.labelValueText,
    themedStyles.labelText,
  );
  const setDefaultTextStyle = StyleSheet.compose(
    styles.setDefaultText,
    themedStyles.labelText,
  );

  return (
    <View style={styles.detailContainer}>
      <FastImageView
        uri={selectedLocation?.image}
        style={styles.locationImage}
        defaultSource={locationPlaceholder(selectedLocation?.typeOfProperty)}
      />
      <Text style={titleTextStyle}>{selectedLocation?.name}</Text>
      <View style={styles.detailRowView}>
        <View style={styles.detailColumView}>
          <Text style={labelTextStyle}>{Strings.address1}</Text>
          <Text numberOfLines={3} style={labelValueTextStyle}>
            {selectedLocation?.addressLine1}
          </Text>
        </View>
        {selectedLocation?.addressLine2 ? (
          <View style={styles.detailColumView}>
            <Text style={labelTextStyle}>{Strings.address2}</Text>
            <Text numberOfLines={3} style={labelValueTextStyle}>
              {selectedLocation?.addressLine2}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.detailRowView}>
        <View style={styles.detailColumView}>
          <Text style={labelTextStyle}>{Strings.country}</Text>
          <Text style={labelValueTextStyle}>
            {selectedLocation?.countryName}
          </Text>
        </View>
        <View style={styles.detailColumView}>
          <Text style={labelTextStyle}>{Strings.state}</Text>
          <Text style={labelValueTextStyle}>{selectedLocation?.stateName}</Text>
        </View>
      </View>
      <View style={styles.detailRowView}>
        <View style={styles.detailColumView}>
          <Text style={labelTextStyle}>{Strings.city}</Text>
          <Text style={labelValueTextStyle}>{selectedLocation?.cityName}</Text>
        </View>
        <View style={styles.detailColumView}>
          <Text style={labelTextStyle}>{Strings.zipCode}</Text>
          <Text style={labelValueTextStyle}>{selectedLocation?.zipCode}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.columnView}>
        <Text style={labelTextStyle}>{Strings.typeOfProperty}</Text>
        <Text style={labelValueTextStyle}>
          {getKeyFromValue(
            AppConstants.PropertyType,
            selectedLocation?.typeOfProperty,
          )}
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.toggleView}>
        <Text style={setDefaultTextStyle}>{Strings.setAsDefault}</Text>
        <CustomSwitch
          isEnabled={isDefault}
          style={isDefault ? styles.toggleStyle : styles.disableToggleStyle}
          toggleSwitch={onToggleSwitch()}
          disabled={isDefault}
        />
      </View>
    </View>
  );
};
const LocationDetailScreen = ({route, navigation}) => {
  const {selectedLocation} = useSelector(state => state.locationsReducer);
  const {locationDetail} = route?.params;
  const [isVisible, setVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [isDefault, setIsDefault] = useState(selectedLocation?.isDefault);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const deleteInfo = useMemo(
    () => deleteLocationInfo(selectedLocation),
    [selectedLocation],
  );
  const colors = useTheme();
  const dispatch = useDispatch();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const onDelete = useCallback(() => {
    setDeletePopup(false);
    dispatch(
      deleteExistsLocation([selectedLocation?.id], (isSuccess, response) => {
        if (isSuccess) {
          setDeleted(true);
          setDeletedText(response?.message);
        }
      }),
    );
  }, [dispatch, selectedLocation]);
  const onOkayPress = useCallback(() => {
    setDeleted(false);
    navigation.pop(2);
  }, [navigation]);
  const handleSelectOption = useCallback(
    item => () => {
      setVisible(false);
      switch (item.id) {
        case 1:
          const country = {
            id: selectedLocation?.countryId,
            name: selectedLocation?.countryName,
          };
          const state = {
            id: selectedLocation?.stateId,
            stateName: selectedLocation?.stateName,
          };
          const city = {
            id: selectedLocation?.cityId,
            cityName: selectedLocation?.cityName,
          };
          const propertyType = listPropertyType.filter(
            ele => ele?.id === selectedLocation?.typeOfProperty,
          );
          navigation.navigate(NavigationRoutes.AddLocationScreen, {
            isEdit: true,
            locationDetail: {
              ...selectedLocation,
              country,
              state,
              city,
              propertyType: propertyType[0],
            },
          });
          break;
        case 2:
          if (selectedLocation?.isDefault) {
            setErrorVisible(prev => !prev);
          } else {
            setDeletePopup(true);
          }
          break;
        default:
          break;
      }
    },
    [selectedLocation, navigation],
  );
  const onToggleSwitch = useCallback(
    () => () => {
      const locationPayload = {
        id: locationDetail?.id,
        name: selectedLocation.name,
        addressLine1: selectedLocation.addressLine1,
        addressLine2: selectedLocation.addressLine2,
        cityId: selectedLocation?.cityId,
        cityName: selectedLocation?.cityName,
        zipCode: selectedLocation?.zipCode,
        stateId: selectedLocation?.stateId,
        stateName: selectedLocation?.stateName,
        countryId: selectedLocation?.countryId,
        countryName: selectedLocation?.countryName,
        image: selectedLocation?.image?.split(
          `${ApiConstants.ImageBaseUrl}/`,
        )[1],
        typeOfProperty: selectedLocation.typeOfProperty,
        isDefault: !isDefault,
      };
      dispatch(
        updateLocation(locationPayload, (isSuccess, response) => {
          if (isSuccess) {
            dispatch(
              selectLocation({
                ...locationPayload,
                image: selectedLocation?.image,
              }),
            );
          }
        }),
      );
      setIsDefault(prev => !prev);
    },
    [dispatch, isDefault, locationDetail?.id, selectedLocation],
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <View style={styles.contentContainer}>
            <CustomNavBar
              isRightActionVisible={true}
              listRightIcons={[Icons.moreVerticalCircle]}
              onAction={val => setVisible(true)}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <LocationDetail
                {...{
                  selectedLocation,
                  onToggleSwitch,
                  isDefault,
                  themedStyles,
                }}
              />
            </ScrollView>
            <MoreComponent
              listOptions={listMoreOption}
              {...{isVisible, setVisible}}
              onSelect={handleSelectOption}
            />
            <DeleteConfirmationPopup
              isVisible={isDeletePopup}
              setVisible={setDeletePopup}
              data={selectedLocation}
              isLocation={true}
              title={Strings.deleteLocation}
              message={deleteInfo.description}
              {...{onDelete}}
            />
            <ErrorPopup
              isVisible={isErrorVisible}
              setVisible={setErrorVisible}
              errorText={Strings.youCant}
            />
          </View>
          <SuccessPopup
            isVisible={isDeleted}
            setVisible={setDeleted}
            successText={deletedText}
            onOkPress={onOkayPress}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.LocationDetail)}
          />
        </>
      )}
    />
  );
};

export default LocationDetailScreen;
