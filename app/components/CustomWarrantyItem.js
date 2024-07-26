import React from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import {Colors, Images, Metrics} from '../theme';
import {getExpireDetail} from './../utils/helper';
import {AppConstants, NavigationRoutes, Strings} from '../constants';
import {navigate} from '../navigation/services/navigationServices';
import styles from './styles/WarrantyItemStyles';
import FastImageView from './FastImageView';

const CustomWarrantyItem = ({item, themedStyles}) => {
  const navigateTo = (detail, expireData) => {
    navigate(NavigationRoutes.WarrantyDetailScreen, {
      detail: detail,
      expireDetail: expireData,
    });
  };
  const productNameStyle = StyleSheet.compose(
    styles.descriptionText,
    themedStyles.labelText,
  );
  const expireOnStyle = StyleSheet.compose(
    styles.expiredOnText,
    themedStyles.labelText,
  );
  const expireDetail = getExpireDetail(item.startDate, item.endDate);
  const expireLeftStyle = StyleSheet.compose(styles.expireLeftText, [
    themedStyles.labelText,
    !expireDetail && styles.expireText,
  ]);
  const rightIconStyle = StyleSheet.compose(
    styles.rightIcon,
    themedStyles.labelText,
  );
  return (
    <View style={styles.contentContainer}>
      <Pressable
        style={styles.rowContainer}
        onPress={() => {
          navigateTo(item, expireDetail);
        }}>
        <View style={styles.leftView}>
          <FastImageView
            style={styles.leftImage}
            uri={item?.productImageUrl}
            defaultSource={Images.defaultImage}
          />
        </View>
        <View style={styles.centerView}>
          <Text style={productNameStyle}>{item.productName}</Text>
          <Text style={expireOnStyle}>{`${Strings.willExpiredOn} On ${moment(
            item.endDate,
          ).format(AppConstants.dateFormats.monthDateFormat)}`}</Text>
          <Text style={expireLeftStyle}>
            {expireDetail
              ? `${expireDetail.duration} ${Strings.left}`
              : Strings.expired}
          </Text>
          <Progress.Bar
            style={styles.progressStyle}
            progress={expireDetail ? expireDetail.progress : 1}
            color={expireDetail ? expireDetail.color : Colors.unfilledRed}
            unfilledColor={
              expireDetail ? expireDetail.unfieldColor : Colors.filledExpired
            }
            width={Metrics.screenWidth * 0.6}
            height={12}
            borderRadius={5}
            borderWidth={0}
          />
        </View>
        <View style={styles.rightView}>
          <Icon
            name="angle-right"
            size={16}
            color={Colors.lightGrey}
            style={rightIconStyle}
          />
        </View>
      </Pressable>
      <View style={styles.seperator} />
    </View>
  );
};
export default CustomWarrantyItem;
