import React, {useCallback, useMemo} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {Icons, Images} from '../assets';
import styles from './styles/CustomProductCellStyle';
import {NavigationRoutes, Strings} from '../constants';
import {navigate} from '../navigation/services/navigationServices';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../theme';
import FastImageView from './FastImageView';
import {formattedUtcDate, priceCurrency} from '../utils/helper';

const CustomProductCell = ({
  item,
  index,
  isSelectionEnable = false,
  listFiltered = [],
  setFilterProduct = undefined,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const productLocationTextStyle = StyleSheet.compose(
    styles.productLocationText,
    themedStyles.placeholder,
  );
  const productNameTextStyle = StyleSheet.compose(
    styles.productNameText,
    themedStyles.labelText,
  );
  const purchasedLabelTextStyle = StyleSheet.compose(
    styles.purchasedLabelText,
    themedStyles.labelText,
  );
  const purchasedDateTextStyle = StyleSheet.compose(
    styles.purchasedDateText,
    themedStyles.placeholder,
  );
  const unitTextStyle = StyleSheet.compose(
    styles.unitText,
    themedStyles.placeholder,
  );
  const selectIcnStyle = StyleSheet.compose(
    styles.selectIcn,
    themedStyles.navIcon,
  );
  const moreIcnStyle = StyleSheet.compose(styles.moreIcn, themedStyles.navIcon);
  const onPress = useCallback(() => {
    if (isSelectionEnable) {
      listFiltered[index].isSelected = !listFiltered[index].isSelected;
      setFilterProduct([...listFiltered]);
    } else {
      navigate(NavigationRoutes.ProductDetailScreen, {
        productId: item?.productId,
      });
    }
  }, [index, isSelectionEnable, item, listFiltered, setFilterProduct]);
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        {isSelectionEnable && (
          <View style={styles.selectImageView}>
            <Image
              style={item.isSelected ? styles.unSelectIcn : selectIcnStyle}
              source={
                item.isSelected
                  ? Icons.checkFilledCircle
                  : Icons.checkCircleUnselected
              }
            />
          </View>
        )}
        <View style={styles.cellImageViewStyle}>
          <FastImageView
            style={styles.productImage}
            uri={item?.defaultImageUrl ? item?.defaultImageUrl : ''}
            defaultSource={Images.defaultImage}
          />
        </View>
        <View style={styles.productDetailViewStyle}>
          <Text style={productLocationTextStyle}>{item.location}</Text>
          <Text style={productNameTextStyle} numberOfLines={2}>
            {item.productName}
          </Text>
          <Text style={purchasedLabelTextStyle}>
            {`${Strings.purchasedOn}: `}
            <Text style={purchasedDateTextStyle}>
              {formattedUtcDate(item?.purchaseDate)}
            </Text>
          </Text>
          <View style={styles.priceView}>
            <Pressable style={styles.priceButton}>
              <Text style={styles.priceText}>{`${
                item.currency
              } ${item.price?.toFixed(2)}`}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
      <View style={styles.seperator} />
    </View>
  );
};
export default CustomProductCell;
