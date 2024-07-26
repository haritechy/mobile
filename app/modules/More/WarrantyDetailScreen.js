import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, Pressable, StyleSheet, ScrollView} from 'react-native';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteConfirmationPopup,
  FastImageView,
  ImageViewCard,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import CustomNavBar from '../../components/CustomNavBar';
import {NavigationRoutes, Strings} from '../../constants';
import {
  deleteProductWarranty,
  getProductWarranty,
} from '../../redux/actions/warrantyActions';
import {Colors, Icons, Images, Metrics, ThemeStyles} from '../../theme';
import {formattedDate, getExpireDetail} from '../../utils/helper';
import styles from './styles/WarrantyDetailStyles';

const WarrantyDetail = ({
  expireDetail,
  warrantyImageUrl,
  onViewCard,
  themedStyles,
}) => {
  const expireLeftText = StyleSheet.compose(
    styles.expireLeftText,
    !expireDetail ? styles.expireText : themedStyles.labelText,
  );
  return (
    <View style={styles.detailView}>
      <Pressable onPress={() => onViewCard(warrantyImageUrl)}>
        <FastImageView
          uri={warrantyImageUrl}
          style={styles.itemImage}
          defaultSource={Images.defaultImage}
        />
      </Pressable>
      <Text style={expireLeftText}>
        {expireDetail
          ? `${expireDetail.duration} ${Strings.left}`
          : `${Strings.expired}`}
      </Text>
      <Progress.Bar
        style={styles.progressStyle}
        progress={expireDetail ? expireDetail.progress : 1}
        color={expireDetail ? expireDetail.color : Colors.unfilledRed}
        unfilledColor={
          expireDetail ? expireDetail.unfieldColor : Colors.filledExpired
        }
        width={Metrics.screenWidth - 50}
        height={10}
        borderRadius={5}
      />
    </View>
  );
};

const WarrantyPartsDetail = ({
  listProductWarranties,
  onViewCard,
  themedStyles,
  onWarrantyDelete,
}) => {
  const detailLabelTextStyle = StyleSheet.compose(
    styles.detailLabel,
    themedStyles.placeholder,
  );
  const titleTextStyle = StyleSheet.compose(
    styles.itemText,
    themedStyles.labelText,
  );
  const labelTextStyle = StyleSheet.compose(
    styles.labelText,
    themedStyles.labelText,
  );
  const valueTextStyle = StyleSheet.compose(
    styles.valueText,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.partsDetailView}>
      {listProductWarranties?.map((item, index) => (
        <View key={index}>
          {index === 1 ? (
            <Text style={detailLabelTextStyle}>
              {Strings.productHasPartWarranty}
            </Text>
          ) : null}
          {index === 0 ? (
            <Text style={detailLabelTextStyle}>{Strings.warrantyDetail}</Text>
          ) : null}
          <Text style={titleTextStyle}>{item?.name}</Text>
          <View style={styles.detailRowView}>
            <Text style={labelTextStyle}>{Strings.purchaseDate}</Text>
            <Text style={valueTextStyle}>
              {formattedDate(item?.purchaseDate)}
            </Text>
          </View>
          {item?.provider ? (
            <View style={styles.detailRowView}>
              <Text style={labelTextStyle}>{Strings.warrantyProvider}</Text>
              <Text style={valueTextStyle}>{item?.provider}</Text>
            </View>
          ) : null}
          <View style={styles.detailRowView}>
            <Text style={labelTextStyle}>{Strings.warrantyStart}</Text>
            <Text style={valueTextStyle}>{formattedDate(item?.startDate)}</Text>
          </View>
          <View style={styles.detailRowView}>
            <Text style={labelTextStyle}>{Strings.warrantyEnd}</Text>
            <Text style={valueTextStyle}>{formattedDate(item?.endDate)}</Text>
          </View>
          {item?.price ? (
            <View style={styles.detailRowView}>
              <Text style={labelTextStyle}>{Strings.price}</Text>
              <Text style={valueTextStyle}>{`${
                item?.currency
              } ${item?.price?.toFixed(2)}`}</Text>
            </View>
          ) : null}
          {item?.type ? (
            <View style={styles.detailRowView}>
              <Text style={labelTextStyle}>{Strings.warrantyType}</Text>
              <Text style={valueTextStyle}>{item?.type}</Text>
            </View>
          ) : null}
          {item?.agreementNumber ? (
            <View style={[styles.detailRowView, styles.transparentBorder]}>
              <Text style={labelTextStyle}>
                {Strings.warrantyServiceNumber}
              </Text>
              <Text style={valueTextStyle}>{item?.agreementNumber}</Text>
            </View>
          ) : null}
          {index > 0 ? (
            <Pressable
              style={styles.viewWarrantyCard}
              onPress={() => onViewCard(item?.imageUrl)}>
              <Text style={styles.viewWarrantyText}>
                {Strings.viewWarrantyCard}
              </Text>
            </Pressable>
          ) : null}
          <Pressable
            style={styles.deleteButton}
            onPress={() => onWarrantyDelete(item?.productWarrantyId)}>
            <Text
              numberOfLines={1}
              style={
                styles.deleteText
              }>{`${Strings.delete} for ${item?.name}`}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const WarrantyDetailScreen = ({navigation, route}) => {
  const {detail} = route.params || {};
  const {listProductWarranties} = useSelector(state => state.warrantyReducer);
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const [deleteWarrantyId, setDeleteWarrantyId] = useState(null);
  const [expireDetail, setExpireData] = useState(undefined);
  const [warrantyImageUrl, setWarrantyImage] = useState(undefined);
  const [cardImage, setCardImage] = useState('');
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProductWarranty(detail?.productId));
    });
    return () => unsubscribe();
  }, [detail, dispatch, navigation]);
  useEffect(() => {
    if (listProductWarranties?.length > 0) {
      const productWarranty = listProductWarranties?.find(e => e?.isProduct);
      const expireData = getExpireDetail(
        productWarranty?.startDate,
        productWarranty?.endDate,
      );
      setExpireData(expireData);
      setWarrantyImage(productWarranty?.imageUrl);
    }
  }, [listProductWarranties]);
  const handleAction = useCallback(() => {
    navigation.navigate(NavigationRoutes.EditWarrantyScreen, {
      productId: detail?.productId,
    });
  }, [navigation, detail]);
  const onViewCard = useCallback(
    imageUrl => {
      if (imageUrl) {
        setCardImage(imageUrl);
        setVisible(true);
      }
    },
    [setCardImage, setVisible],
  );
  const onDelete = useCallback(() => {
    setDeletePopup(false);
    dispatch(
      deleteProductWarranty(deleteWarrantyId, (isSuccess, response) => {
        if (isSuccess) {
          setDeleted(true);
          setDeletedText(response?.message);
          dispatch(getProductWarranty(detail?.productId));
        }
      }),
    );
  }, [deleteWarrantyId, detail?.productId, dispatch]);
  const onOkayPress = useCallback(() => {
    setDeleted(false);
    if (listProductWarranties?.length === 0) {
      navigation.goBack();
    }
  }, [listProductWarranties?.length, navigation]);
  const onWarrantyDelete = useCallback(warrantyId => {
    setDeletePopup(true);
    setDeleteWarrantyId(warrantyId);
  }, []);
  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.contentContainer}>
          <CustomNavBar
            headerTextStyle={styles.headerTextStyle}
            title={Strings.warrantyDetail}
            isRightActionVisible
            listRightIcons={[Icons.editSquare]}
            onAction={handleAction}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <WarrantyDetail
              {...{expireDetail, warrantyImageUrl, onViewCard, themedStyles}}
            />
            {listProductWarranties?.length > 0 && (
              <WarrantyPartsDetail
                {...{
                  listProductWarranties,
                  onViewCard,
                  themedStyles,
                  onWarrantyDelete,
                }}
              />
            )}
          </ScrollView>
          <DeleteConfirmationPopup
            isVisible={isDeletePopup}
            setVisible={setDeletePopup}
            title={Strings.deleteWarranty}
            message={Strings.sureToDeleteWarranty}
            {...{onDelete}}
          />
          <SuccessPopup
            isVisible={isDeleted}
            setVisible={setDeleted}
            successText={deletedText}
            onOkPress={onOkayPress}
          />
          <ImageViewCard
            isPreview={isVisible}
            setPreview={setVisible}
            imageUrl={cardImage}
          />
        </View>
      )}
    />
  );
};

export default WarrantyDetailScreen;
