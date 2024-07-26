import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {
  ConfirmDeletePopup,
  CustomNavBar,
  CustomProductCell,
  ImageViewCard,
  MoreComponent,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import styles from './styles/ReceiptDetailStyles';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteReceiptAction,
  getReceiptProducts,
} from '../../redux/actions/receiptsActions';
import {useTheme} from '@react-navigation/native';
import {Icons, Images, ThemeStyles} from '../../theme';
import {receiptMoreOption} from '../../constants/Mockdata';
import {formattedDate} from '../../utils/helper';

const ReceiptDetailScreen = ({navigation, route}) => {
  const {receiptId, isViewReceipt = false} = route?.params;
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isConfirmDelete, setConfirmShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isMoreOption, setMoreOption] = useState(false);
  const colors = useTheme();
  const {receiptDetail} = useSelector(state => state.receiptsReducer);
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getReceiptProducts(receiptId));
    });
    return () => unsubscribe();
  }, [dispatch, navigation, receiptId]);

  const onImgTap = useCallback(() => {
    setVisible(true);
  }, []);
  const handleConfirmDelete = useCallback(() => {
    setConfirmShow(false);
    dispatch(
      deleteReceiptAction(receiptId, (isDeleted, response) => {
        if (isDeleted) {
          setSuccess(true);
          setSuccessMessage(response?.message);
        }
      }),
    );
  }, [dispatch, receiptId]);
  const handleDeleteReceipt = useCallback(
    data => () => {
      setMoreOption(false);
      if (data?.type === 'edit') {
        navigation.navigate(NavigationRoutes.AddReceiptScreen, {
          isEdit: true,
          receiptDetail,
        });
      } else {
        setConfirmShow(true);
      }
    },
    [navigation, receiptDetail],
  );
  const onOkayPress = useCallback(() => {
    setSuccess(false);
    navigation.goBack();
  }, [navigation]);
  const handleAction = useCallback(() => setMoreOption(true), []);
  const renderItem = useCallback(({item, index}) => {
    return (
      <CustomProductCell
        {...{
          item,
          index,
        }}
      />
    );
  }, []);
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyData}>{Strings.noProduct}</Text>
    </View>
  );
  const titleTextStyle = StyleSheet.compose(
    styles.titleText,
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
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            containerStyle={styles.headerContainer}
            isRightActionVisible={true}
            listRightIcons={[Icons.moreVerticalCircle]}
            onAction={handleAction}
          />
          <View style={styles.mainContainer}>
            <Text numberOfLines={2} style={titleTextStyle}>
              {receiptDetail?.name}
            </Text>
            <Pressable style={styles.receiptContainer} onPress={onImgTap}>
              <Image
                source={{uri: receiptDetail?.imageUrl}}
                style={styles.receiptImage}
                defaultSource={Images.defaultImage}
              />
            </Pressable>
            {!isViewReceipt ? (
              <FlatList
                contentContainerStyle={
                  receiptDetail?.productDetails?.length > 0
                    ? {}
                    : styles.contentListContainer
                }
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={receiptDetail?.productDetails}
                keyExtractor={item => item.productId}
                renderItem={renderItem}
                ListEmptyComponent={<ListEmptyComponent />}
              />
            ) : (
              <View style={styles.detailRowView}>
                <Text style={labelTextStyle}>{Strings.purchaseDate}</Text>
                <Text style={valueTextStyle}>
                  {formattedDate(receiptDetail?.purchaseDate)}
                </Text>
              </View>
            )}
            <ImageViewCard
              isPreview={isVisible}
              setPreview={setVisible}
              imageUrl={receiptDetail?.imageUrl}
            />
            <MoreComponent
              listOptions={receiptMoreOption}
              isVisible={isMoreOption}
              setVisible={setMoreOption}
              onSelect={handleDeleteReceipt}
            />
            <SuccessPopup
              isVisible={isSuccess}
              setVisible={setSuccess}
              successText={successMessage}
              onOkPress={onOkayPress}
            />
            <ConfirmDeletePopup
              isVisible={isConfirmDelete}
              setVisible={setConfirmShow}
              onDelete={handleConfirmDelete}
              type={AppConstants.deleteTypes.Receipt}
            />
          </View>
        </>
      )}
    />
  );
};
export default ReceiptDetailScreen;
