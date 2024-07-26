import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
// LOCAL IMPORTS
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmDeletePopup,
  CustomNavBar,
  CustomProductCell,
  CustomTextInput,
  ErrorPopup,
  GoogleAdsComponent,
  loaderRef,
  MoreComponent,
  ScreenContainer,
  SortByPopup,
  SortFilterComponent,
  SuccessPopup,
} from '../../components';
import {listProductSortBy, productMoreOption} from '../../constants/Mockdata';
import {navigate} from '../../navigation/services/navigationServices';
import {getExistsLocation} from '../../redux/actions/locationsActions';
import {
  deleteFromProducts,
  getProductData,
} from '../../redux/actions/productActions';
import {Icons, ThemeStyles, moderateScale} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/ProductStyles';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  search: createRef(),
};
const ListEmptyComponent = ({searchText, productFilter, themedStyles}) => {
  const isFiltered = productFilter
    ? typeof productFilter === 'object'
      ? Object.keys(productFilter).length > 0
      : productFilter?.length > 0
    : false;
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  const noDataStyle = StyleSheet.compose(
    styles.addProduct,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noProduct}</Text>
      {searchText.length > 0 || isFiltered ? null : (
        <Text style={noDataStyle}>{Strings.addProductItem}</Text>
      )}
    </View>
  );
};
const ProductScreen = ({navigation, route}) => {
  const isFromHome = route?.params?.isFromHome;
  const dispatch = useDispatch();
  const [take, setTake] = useState(10);
  const [isInitial, setInitial] = useState(true);
  const [searchText, setSearch] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isSortVisible, setSortPopup] = useState(false);
  const [isAllSelected, setSelectAll] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [itemType, setItemType] = useState('');
  const [isVisibleDelete, setDeletePopup] = useState(false);
  const [listFiltered, setFilterProduct] = useState([]);
  const [isSelectionEnable, setSelection] = useState(false);
  const [isFromFilter, setFromFilter] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {listProductData, productSortBy, productFilter, productPageDetail} =
    useSelector(state => state.productReducer);
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
    themedStyles.placeholder,
  );
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const selectOperationViewStyle = StyleSheet.compose(
    styles.selectOperationView,
    themedStyles.themeBackground,
  );
  const buttonTextStyle = StyleSheet.compose(
    listLocations?.length > 1 ? styles.buttonText : styles.disableButtonText,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      console.log('product tabPress called');
    });
    return () => unsubscribe();
  }, [navigation]);
  useEffect(() => {
    if (isInitial) {
      loaderRef.current.show();
      dispatch(getProductData(take, '', productSortBy, productFilter));
      setInitial(false);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_PRODUCT_STATE'});
      dispatch({type: 'CLEAR_WARRANTY_STATE'});
      dispatch({type: 'CLEAR_RECEIPT_STATE'});
      dispatch({type: 'SELECT_RECEIPT', receipt: null});
      dispatch(getExistsLocation());
      if (!isFromFilter) {
        setFilterProduct([]);
        setSelection(false);
        setSearch('');
        dispatch(getProductData(take, '', productSortBy, productFilter));
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    isFromFilter,
    isInitial,
    navigation,
    productFilter,
    productSortBy,
    take,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);
  useFocusEffect(
    useCallback(() => {
      enableAdjustPan();
      return () => disableAdjustPan();
    }, [disableAdjustPan, enableAdjustPan]),
  );
  const onOkayPress = useCallback(() => {
    setDeleted(false);
    dispatch(getProductData(take, searchText, productSortBy, productFilter));
  }, [dispatch, productFilter, productSortBy, searchText, take]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomProductCell
          {...{
            item,
            index,
            isSelectionEnable,
            listFiltered,
            setFilterProduct,
          }}
        />
      );
    },
    [isSelectionEnable, listFiltered],
  );
  const handleActions = useCallback(
    val => {
      setSelectAll(false);
      if (!isSelectionEnable) {
        setVisible(true);
      } else {
        setSelection(false);
      }
    },
    [isSelectionEnable],
  );
  const onFilter = useCallback(
    filter => {
      loaderRef.current.show();
      dispatch(getProductData(take, searchText, productSortBy, filter));
      setFromFilter(true);
    },
    [dispatch, productSortBy, searchText, take],
  );
  const handleSortBy = useCallback(() => setSortPopup(true), []);
  const handleFilter = useCallback(
    () =>
      navigate(NavigationRoutes.ProductFilterScreen, {
        productFilter,
        onFilter,
        isFromProduct: true,
      }),
    [onFilter, productFilter],
  );
  const handleSelectOption = useCallback(
    data => () => {
      let listNew = [];
      setVisible(false);
      setItemType(data.type);
      setSelection(!isSelectionEnable);
      listProductData.map(product => {
        listNew.push({
          ...product,
          isSelected: false,
        });
      });
      setFilterProduct([...listNew]);
    },
    [isSelectionEnable, listProductData],
  );
  const handleSelectAll = useCallback(() => {
    let listNew = [];
    listProductData.map(product => {
      listNew.push({
        ...product,
        isSelected: isAllSelected ? false : true,
      });
    });
    setFilterProduct([...listNew]);
    setSelectAll(prev => !prev);
  }, [listProductData, isAllSelected]);
  const handleDelete = useCallback(() => {
    const selectedProducts = listFiltered.filter(value => value.isSelected);
    selectedProducts?.length > 0 && setDeletePopup(true);
  }, [listFiltered]);
  const handleMove = useCallback(() => {
    const selectedProducts = listFiltered.filter(value => value.isSelected);
    listLocations?.length > 1
      ? selectedProducts?.length > 0 &&
        navigation.navigate(NavigationRoutes.MoveProductScreen, {
          selectedProducts,
        })
      : null;
  }, [listFiltered, listLocations?.length, navigation]);
  const handleConfirmDelete = useCallback(() => {
    setDeletePopup(false);
    let productIds = [];
    listFiltered.map(
      value => value.isSelected && productIds.push(value.productId),
    );
    dispatch(
      deleteFromProducts(productIds, (isSuccess, response) => {
        setSelection(false);
        if (isSuccess) {
          setDeleted(true);
          setDeletedText(response?.message);
        }
      }),
    );
  }, [dispatch, listFiltered]);

  const onSort = useCallback(
    e => {
      setSortPopup(false);
      let sortType = '';
      switch (e.id) {
        case 1:
          sortType = 'productName';
          break;
        case 2:
          sortType = 'createdOn desc';
          break;
        case 3:
          sortType = 'purchaseDate desc';
          break;
        case 4:
          sortType = 'purchaseDate asc';
          break;
        default:
          sortType = '';
          break;
      }
      dispatch(getProductData(take, searchText, sortType, productFilter));
      setSortBy(e);
    },
    [dispatch, take, productFilter, searchText],
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(getProductData(take, val.trim(), productSortBy, productFilter));
    },
    [dispatch, take, productFilter, productSortBy],
  );
  const onEndReach = useCallback(() => {
    if (take < productPageDetail?.count) {
      loaderRef.current.show();
      dispatch(
        getProductData(take + 10, searchText, productSortBy, productFilter),
      );
      setTake(take + 10);
    }
  }, [
    dispatch,
    productFilter,
    productPageDetail,
    productSortBy,
    searchText,
    take,
  ]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.products}
            isRightActionVisible={
              listProductData?.length > 0 && !isSelectionEnable
            }
            isBackVisible={isFromHome ? true : false}
            isRightButton={isSelectionEnable}
            rightButtonText={Strings.done}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.moreVerticalCircle]}
            onAction={handleActions}
          />
          {(listProductData?.length > 0 || searchText !== '') &&
            !isSelectionEnable && (
              <CustomTextInput
                ref={inputRef.search}
                autoCapitalize={'none'}
                keyboardType={'default'}
                containerStyle={searchContainerStyle}
                inputStyle={inputTextStyle}
                placeholder={Strings.search}
                value={searchText}
                isTitleVisible={false}
                leftIcon={Icons.search}
                returnKeyType={'done'}
                onChangeText={onSearch}
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            )}
          {!isSelectionEnable ? (
            <SortFilterComponent
              {...{handleSortBy, handleFilter, sortBy}}
              isFilter={
                productFilter
                  ? typeof productFilter === 'object'
                    ? Object.keys(productFilter).length > 0
                    : productFilter?.length > 0
                  : false
              }
            />
          ) : null}
          <FlatList
            style={styles.listContainer}
            contentContainerStyle={styles.contentListContainer}
            bounces={false}
            data={isSelectionEnable ? listFiltered : listProductData}
            keyExtractor={item => item.productId}
            renderItem={renderItem}
            ListEmptyComponent={
              listProductData != null && (
                <ListEmptyComponent
                  {...{searchText, productFilter, themedStyles}}
                />
              )
            }
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
          />
          {isSelectionEnable && (
            <View style={selectOperationViewStyle}>
              <Pressable style={styles.buttonView} onPress={handleSelectAll}>
                <Text style={styles.buttonText}>
                  {isAllSelected ? Strings.unSelectAll : Strings.selectAll}
                </Text>
              </Pressable>
              <Pressable
                style={styles.buttonView}
                onPress={itemType === 'delete' ? handleDelete : handleMove}>
                <Text
                  style={
                    itemType === 'delete' ? styles.buttonText : buttonTextStyle
                  }>
                  {itemType === 'delete' ? Strings.delete : Strings.move}
                </Text>
              </Pressable>
            </View>
          )}
          {!isSelectionEnable && (
            <Pressable
              style={styles.plusIconView}
              onPress={() => {
                if (listLocations?.length > 0) {
                  navigate(NavigationRoutes.ScanQrCodeScreen);
                } else {
                  setError(true);
                  setErrorMessage(Strings.noLocationError);
                }
              }}>
              <Icon name="add" size={moderateScale(25)} />
            </Pressable>
          )}
          <MoreComponent
            listOptions={productMoreOption}
            {...{isVisible, setVisible}}
            onSelect={handleSelectOption}
          />
          <ConfirmDeletePopup
            isVisible={isVisibleDelete}
            setVisible={setDeletePopup}
            onDelete={handleConfirmDelete}
            type={AppConstants.deleteTypes.Product}
          />
          <SortByPopup
            isVisible={isSortVisible}
            setVisible={setSortPopup}
            {...{sortBy, setSortBy, onSort}}
            listSort={listProductSortBy}
          />
          <ErrorPopup
            isVisible={isError}
            setVisible={setError}
            errorText={errorMessage}
          />
          <SuccessPopup
            isVisible={isDeleted}
            setVisible={setDeleted}
            successText={deletedText}
            onOkPress={onOkayPress}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Products)}
          />
        </>
      )}
    />
  );
};
export default ProductScreen;
