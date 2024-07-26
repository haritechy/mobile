import React, {useCallback, useMemo} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import styles from './styles/LocationItemStyles';
import {NavigationRoutes, Strings} from '../constants';
import {navigate} from '../navigation/services/navigationServices';
import {ThemeStyles} from '../theme';
import {useTheme} from '@react-navigation/native';
import {locationPlaceholder} from '../utils/helper';
import FastImageView from './FastImageView';

const LocationItem = ({
  item,
  index,
  isSelectionEnable = false,
  listFiltered = [],
  setFilterLocation = undefined,
  isFromMove = false,
}) => {
  const onPress = useCallback(() => {
    if (!isSelectionEnable) {
      navigate(NavigationRoutes.DeliveryLocationScreen, {
        locationDetail: item,
      });
    } else if (isSelectionEnable && isFromMove) {
      const listUpdated = listFiltered?.map(data => {
        return {...data, isSelected: false};
      });
      listUpdated[index].isSelected = true;
      setFilterLocation([...listUpdated]);
    } else if (!item.isDefault) {
      listFiltered[index].isSelected = !listFiltered[index].isSelected;
      setFilterLocation([...listFiltered]);
    }
  }, [
    index,
    isFromMove,
    isSelectionEnable,
    item,
    listFiltered,
    setFilterLocation,
  ]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const locationStateTextStyle = StyleSheet.compose(
    styles.locationStateText,
    themedStyles.placeholder,
  );
  const locationNameTextStyle = StyleSheet.compose(
    styles.locationNameText,
    themedStyles.labelText,
  );
  const qntityTextStyle = StyleSheet.compose(
    styles.qntityText,
    themedStyles.placeholder,
  );
  const selectIcnStyle = StyleSheet.compose(
    styles.selectIcn,
    themedStyles.navIcon,
  );
  const defaultIcnStyle = StyleSheet.compose(
    styles.selectIcn,
    themedStyles.navIcon,
  );
  const isDefault = item.isDefault;
  const isDefaultSelection = item.isDefault && isSelectionEnable && !isFromMove;
  const locationItemStyle = StyleSheet.compose(styles.container, [
    isDefaultSelection ? styles.itemLowOpacity : styles.itemHighOpacity,
    styles.container,
    themedStyles.themeBackground,
  ]);
  const currencyValue = item.currency || '';
  return (
    <View>
      <Pressable style={locationItemStyle} onPress={onPress}>
        {isSelectionEnable && (
          <View style={styles.selectImageView}>
            {(!isDefault || isFromMove) && (
              <Image
                style={item.isSelected ? styles.unSelectIcn : selectIcnStyle}
                source={
                  item.isSelected
                    ? Icons.checkFilledCircle
                    : Icons.checkCircleUnselected
                }
              />
            )}
          </View>
        )}
        <View style={styles.locationImageView}>
          <FastImageView
            style={styles.locationImage}
            uri={item?.image ? item?.image : undefined}
            defaultSource={locationPlaceholder(item?.typeOfProperty)}
          />
        </View>
        <View style={styles.locationDetailView}>
          <View style={styles.topAddressView}>
            <Text
              style={
                locationStateTextStyle
              }>{`${item.cityName}, ${item.stateName}`}</Text>
            {item?.isDefault ? (
              <Image style={defaultIcnStyle} source={Icons.defaultLocation} />
            ) : null}
          </View>
          <Text style={locationNameTextStyle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.priceView}>
            <Pressable style={styles.priceButton}>
              <Text style={styles.priceText}>
                {item?.totalProductsAmount != null
                  ? `${currencyValue} ${item.totalProductsAmount?.toFixed(2)}`
                  : `${currencyValue} ${0}`}
              </Text>
            </Pressable>
            <Text
              style={
                qntityTextStyle
              }>{`${item?.productsCount} ${Strings.products}`}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.seperator} />
    </View>
  );
};
export default LocationItem;
