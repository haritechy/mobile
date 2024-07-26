import React from 'react';
import {Image, Text, Pressable, View, StyleSheet} from 'react-native';
import styles from './styles/ReceiptItemStyles';
import {Icons} from '../assets';
import {NavigationRoutes, Strings} from '../constants';
import {useCallback} from 'react';
import {getReceiptProducts} from '../redux/actions/receiptsActions';
import FastImageView from './FastImageView';
import {formattedUtcDate} from '../utils/helper';
const CustomReceiptItem = ({
  item,
  index,
  navigation,
  isSelectionEnable = false,
  listFiltered,
  setFilterReceipts,
  themedStyles,
  dispatch,
}) => {
  const titleTextStyle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const countTextStyle = StyleSheet.compose(
    styles.productCountText,
    themedStyles.placeholder,
  );
  const dateTextStyle = StyleSheet.compose(
    styles.dateText,
    themedStyles.labelText,
  );
  const dateValueStyle = StyleSheet.compose(
    styles.dateValueText,
    themedStyles.placeholder,
  );
  const selectIcnStyle = StyleSheet.compose(
    styles.selectIcn,
    themedStyles.navIcon,
  );
  const onPress = useCallback(() => {
    if (!isSelectionEnable) {
      dispatch(
        getReceiptProducts(item?.receiptId, (isSuccess, receiptDetail) => {
          if (isSuccess && receiptDetail) {
            navigation.navigate(NavigationRoutes.ReceiptDetailScreen, {
              receiptId: item?.receiptId,
              receiptDetail: receiptDetail,
            });
          }
        }),
      );
      navigation.navigate(NavigationRoutes.ReceiptDetailScreen, {
        receiptId: item?.receiptId,
        receiptImage: item?.imageUrl,
      });
    } else {
      listFiltered[index].isSelected = !listFiltered[index].isSelected;
      setFilterReceipts([...listFiltered]);
    }
  }, [
    dispatch,
    index,
    isSelectionEnable,
    item,
    listFiltered,
    navigation,
    setFilterReceipts,
  ]);
  return (
    <View style={styles.contentContainer}>
      <Pressable style={styles.rowContainer} onPress={onPress}>
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
        <View style={styles.leftView}>
          <FastImageView
            style={styles.leftImage}
            uri={item?.imageUrl}
            defaultSource={Icons.document}
          />
        </View>
        <View style={styles.centerView}>
          <Text style={titleTextStyle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text
            style={countTextStyle}
            numberOfLines={
              1
            }>{`${item?.productAsscociatedCount} ${Strings.productsAssociated}`}</Text>
          <Text style={dateTextStyle} numberOfLines={1}>
            {Strings.purchaseDate}
            <Text style={dateValueStyle}>
              {` ${formattedUtcDate(item?.purchaseDate)}`}
            </Text>
          </Text>
        </View>
        <View style={styles.rightView}>
          <Image source={Icons.arrowRight} style={styles.rightIcon} />
        </View>
      </Pressable>
      <View style={styles.seperator} />
    </View>
  );
};
export default CustomReceiptItem;
