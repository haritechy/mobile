import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons, Images} from '../../assets';
import {
  CarouselComponent,
  CustomNavBar,
  DeleteConfirmationPopup,
  ErrorPopup,
  GoogleAdsComponent,
  MoreComponent,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {listMoreOption} from '../../constants/Mockdata';
import {
  deleteFromProducts,
  getProductDetailData,
} from '../../redux/actions/productActions';
import {getReceiptProducts} from '../../redux/actions/receiptsActions';
import {ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/ProductDetailStyles';

const snapRef = createRef();

const ProductDetail = ({productDetail, themedStyles, userInfo}) => {
  const productData = productDetail?.productFormData;

  const productLocationTextStyle = StyleSheet.compose(
    styles.productLocationText,
    themedStyles.placeholder,
  );
  const productNameTextStyle = StyleSheet.compose(
    styles.productNameText,
    themedStyles.labelText,
  );
  const labelTextStyle = StyleSheet.compose(
    styles.labelText,
    themedStyles.labelText,
  );
  const valueTextStyle = StyleSheet.compose(
    styles.valueText,
    themedStyles.labelText,
  );
  const defaultImageStyle = StyleSheet.compose(
    styles.defaultImage,
    themedStyles.navWhiteIcon,
  );
  const fieldValue = jsonData => {
    if (jsonData?.Field === 'PurchaseDate') {
      return moment(jsonData?.Value).format(
        AppConstants.dateFormats.monthDateFormat,
      );
    } else if (jsonData.Field === 'Price') {
      const priceValue = parseFloat(jsonData?.Value);
      return `${userInfo?.currencyCode} ${priceValue?.toFixed(2)}`;
    } else if (jsonData.Field === 'Description') {
      const descValue = jsonData?.Value;
      return `${descValue?.replace(/\n|\r/g, '')}`;
    } else if (jsonData.Field === 'Notes') {
      const notesValue = jsonData?.Value;
      return `${notesValue?.replace(/\n|\r/g, '')}`;
    }
    return jsonData?.Value;
  };
  return (
    <View style={styles.detailContainer}>
      {productDetail?.productImages?.length > 0 ? (
        <CarouselComponent
          ref={snapRef}
          listSnaps={productDetail?.productImages}
        />
      ) : (
        <View style={styles.defaultImgView}>
          <Image source={Images.defaultImage} style={defaultImageStyle} />
        </View>
      )}
      <Text style={productLocationTextStyle}>{productDetail?.location}</Text>
      <Text style={productNameTextStyle} numberOfLines={2}>
        {productDetail.productName}
      </Text>
      <View style={styles.detailRowView}>
        <Text style={labelTextStyle}>{Strings.category}</Text>
        <Text numberOfLines={2} lineBreakMode={'tail'} style={valueTextStyle}>
          {productDetail?.categoryName}
        </Text>
      </View>
      {productData?.length > 0
        ? JSON.parse(productData).map((jsonData, index) => {
            return jsonData?.Value ? (
              <View key={index}>
                <View style={styles.detailRowView}>
                  <Text style={labelTextStyle}>{jsonData?.Placeholder}</Text>
                  <Text
                    numberOfLines={3}
                    lineBreakMode={'tail'}
                    style={valueTextStyle}>
                    {fieldValue(jsonData)}
                  </Text>
                </View>
                <View style={styles.separator} />
              </View>
            ) : null;
          })
        : null}
    </View>
  );
};
const ProductDetailScreen = ({route, navigation}) => {
  const {productId} = route.params;
  const [isVisible, setVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const dispatch = useDispatch();

  const {productDetail} = useSelector(state => state.productReducer);
  const {userInfo} = useSelector(state => state.userReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_PRODUCT_STATE'});
      dispatch({type: 'CLEAR_UPLOAD_STATE'});
      dispatch({type: 'SELECT_RECEIPT', receipt: null});
      dispatch(getProductDetailData(productId));
    });
    return () => unsubscribe();
  }, [dispatch, navigation, productId]);

  const onOkayPress = useCallback(() => {
    setDeleted(false);
    navigation.goBack();
  }, [navigation]);
  const handleSelectOption = useCallback(
    item => () => {
      setVisible(false);
      switch (item.id) {
        case 1:
          navigation.navigate(NavigationRoutes.EditProductScreen, {
            productDetail,
          });
          break;
        case 2:
          if (productDetail?.isDefault) {
            setErrorVisible(prev => !prev);
          } else {
            setDeletePopup(true);
          }
          break;
        default:
          break;
      }
    },
    [navigation, productDetail],
  );
  const onDelete = useCallback(() => {
    setDeletePopup(false);
    dispatch(
      deleteFromProducts([productId], (isSuccess, response) => {
        if (isSuccess) {
          setDeleted(true);
          setDeletedText(response?.message);
        }
      }),
    );
  }, [dispatch, productId]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const handleViewWarranty = useCallback(() => {
    const detail = {
      productId: productDetail?.productId,
      productImageUrl:
        productDetail?.productImages?.length > 0
          ? (productDetail?.productImages.find(img => img?.isDefault)).imageUrl
          : null,
    };
    navigation.navigate(NavigationRoutes.WarrantyDetailScreen, {
      detail,
      isFromProduct: true,
    });
  }, [navigation, productDetail]);
  const handleViewReceipt = useCallback(() => {
    dispatch(
      getReceiptProducts(
        productDetail?.receiptId,
        (isSuccess, receiptDetail) => {
          if (isSuccess && receiptDetail) {
            navigation.navigate(NavigationRoutes.ReceiptDetailScreen, {
              isViewReceipt: true,
              receiptId: productDetail?.receiptId,
              receiptDetail: receiptDetail,
            });
          }
        },
      ),
    );
  }, [dispatch, navigation, productDetail?.receiptId]);
  const rightArrowIcon = StyleSheet.compose(
    styles.rightArrow,
    themedStyles.navWhiteIcon,
  );
  const viewWarrantyTextStyle = StyleSheet.compose(
    styles.viewWarrantyText,
    themedStyles.defaultText,
  );
  const viewWarrantyStyle = StyleSheet.compose(
    styles.viewWarrantyBtnStyle,
    !productDetail?.hasWarranty ? styles.warrantyDisable : {},
  );
  const viewReceiptStyle = StyleSheet.compose(
    styles.viewWarrantyBtnStyle,
    !productDetail?.receiptId ? styles.warrantyDisable : {},
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
              {productDetail ? (
                <>
                  <ProductDetail {...{productDetail, themedStyles, userInfo}} />
                  <Pressable
                    style={viewWarrantyStyle}
                    disabled={!productDetail?.hasWarranty}
                    onPress={handleViewWarranty}>
                    <Text style={viewWarrantyTextStyle}>
                      {Strings.viewWarranty}
                    </Text>
                    <Image style={rightArrowIcon} source={Icons.arrowRight} />
                  </Pressable>
                  <Pressable
                    style={viewReceiptStyle}
                    disabled={!productDetail?.receiptId}
                    onPress={handleViewReceipt}>
                    <Text style={viewWarrantyTextStyle}>
                      {Strings.viewReceipt}
                    </Text>
                    <Image style={rightArrowIcon} source={Icons.arrowRight} />
                  </Pressable>
                </>
              ) : null}
            </ScrollView>
            <MoreComponent
              listOptions={listMoreOption}
              {...{isVisible, setVisible}}
              onSelect={handleSelectOption}
            />
            <DeleteConfirmationPopup
              isVisible={isDeletePopup}
              setVisible={setDeletePopup}
              title={Strings.deleteProduct}
              message={Strings.sureToDeleteProduct}
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
            unitId={getAddUnitId(AppConstants.Banners.ProductDetail)}
          />
        </>
      )}
    />
  );
};

export default ProductDetailScreen;
