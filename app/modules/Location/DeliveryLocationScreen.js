import {useTheme} from '@react-navigation/native';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  ConfirmDeletePopup,
  CustomProductCell,
  CustomTextInput,
  FastImageView,
  GoogleAdsComponent,
  loaderRef,
  MoreComponent,
  ScreenContainer,
  SortByPopup,
  SortFilterComponent,
  SuccessPopup,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {listProductSortBy, locationMoreOption} from '../../constants/Mockdata';
import {goBack, navigate} from '../../navigation/services/navigationServices';
import {selectLocation} from '../../redux/actions/locationsActions';
import {
  deleteFromProducts,
  getLocationProductData,
} from '../../redux/actions/productActions';
import {ThemeStyles, moderateScale} from '../../theme';
import {getAddUnitId, locationPlaceholder} from '../../utils/helper';
import styles from './styles/DeliveryLocationStyles';
import {useFocusEffect} from '@react-navigation/native';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';
const inputRef = {
  searchDelivery: createRef(),
};

const SearchNavBar = ({
  isBackVisible,
  themedStyles,
  containerStyle,
  isRightButton,
  rightButtonText,
  onAction,
  searchText,
  onSearch,
}) => {
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
    themedStyles.placeholder,
  );
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const headerContainer = StyleSheet.compose(styles.header, [containerStyle]);
  const backIconStyle = StyleSheet.compose(styles.backButtonStyle, [
    styles.leftIcon,
    themedStyles.navIcon,
  ]);
  const mainViewStyle = StyleSheet.compose(styles.mainView);
  const centerViewStyle = StyleSheet.compose(
    styles.centerView,
    isBackVisible && styles.centerFlex,
  );
  const RightView = () => {
    if (!isRightButton) {
      return (
        <Pressable style={styles.iconView} onPress={onAction}>
          <Image
            source={Icons.moreVerticalCircle}
            style={StyleSheet.compose(styles.iconStyle, themedStyles.navIcon)}
          />
        </Pressable>
      );
    } else {
      return isRightButton ? (
        <Pressable style={styles.buttonView} onPress={onAction}>
          <Text style={styles.rightIconButtonText}>{rightButtonText}</Text>
        </Pressable>
      ) : null;
    }
  };
  return (
    <SafeAreaView style={mainViewStyle}>
      <>
        <View style={headerContainer}>
          {isBackVisible ? (
            <Pressable
              style={styles.backButtonContainer}
              onPress={() => {
                goBack();
              }}>
              <Image source={Icons.backArrow} style={backIconStyle} />
            </Pressable>
          ) : null}
          <View style={centerViewStyle}>
            <CustomTextInput
              ref={inputRef.search}
              autoCapitalize={'none'}
              keyboardType={'default'}
              containerStyle={searchContainerStyle}
              inputStyle={inputTextStyle}
              placeholder={Strings.search}
              value={searchText}
              leftIcon={Icons.search}
              returnKeyType={'done'}
              onChangeText={onSearch}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
          <View style={styles.actionContainer}>{<RightView />}</View>
        </View>
      </>
    </SafeAreaView>
  );
};
const ListEmptyComponent = ({themedStyles}) => {
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noProduct}</Text>
    </View>
  );
};
const RenderLocationItem = ({
  mergedData,
  handleLocationPress,
  themedStyles,
}) => {
  const locationViewStyle = StyleSheet.compose(
    styles.locationView,
    themedStyles.themeBackground,
  );
  const locationHeaderTextStyle = StyleSheet.compose(
    styles.locationHeader,
    themedStyles.placeholder,
  );
  const locationIcnStyle = StyleSheet.compose(
    styles.locationIcn,
    themedStyles.navIcon,
  );
  const locationNameTextStyle = StyleSheet.compose(
    styles.locationName,
    themedStyles.labelText,
  );
  const locationAddressStyle = StyleSheet.compose(
    styles.locationAddress,
    themedStyles.placeholder,
  );
  return (
    <>
      <Text style={locationHeaderTextStyle}>{mergedData?.name}</Text>
      <Pressable style={locationViewStyle} onPress={handleLocationPress}>
        <View style={styles.leftView}>
          <FastImageView
            uri={mergedData?.image}
            style={styles.leftImage}
            defaultSource={locationPlaceholder(mergedData?.typeOfProperty)}
          />
        </View>
        <View style={styles.locationDetail}>
          <Text style={locationNameTextStyle} numberOfLines={1}>
            {mergedData?.name}
          </Text>
          <View style={styles.addressView}>
            <Image style={locationIcnStyle} source={Icons.locationPin} />
            <Text numberOfLines={3} style={locationAddressStyle}>
              {`${mergedData?.addressLine1}, ${mergedData?.addressLine2}, ${mergedData?.cityName} - ${mergedData?.zipCode}, ${mergedData?.stateName}, ${mergedData?.countryName}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const DeliveryLocationScreen = ({navigation, route}) => {
  const productCall = useRef(null);
  const {locationDetail} = route?.params;
  const id = locationDetail?.id;
  const [searchText, setSearch] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isSortVisible, setSortPopup] = useState(false);
  const [isSelectionEnable, setSelection] = useState(false);
  const [listFiltered, setFilterProduct] = useState([]);
  const [isFromFilter, setFromFilter] = useState(false);
  const [isVisibleDelete, setDeletePopup] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const [itemType, setItemType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const dispatch = useDispatch();
  const {selectedLocation} = useSelector(state => state.locationsReducer);
  const {listLocationProducts, productSortBy, productDeliveryFilter} =
    useSelector(state => state.productReducer);
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  const mergedData = {...locationDetail, ...selectedLocation};
  useEffect(() => {
    locationDetail && dispatch(selectLocation(locationDetail));
  }, [dispatch, locationDetail]);

  const handleActions = useCallback(() => {
    if (!isSelectionEnable) {
      listLocationProducts?.length > 0 && setVisible(true);
    } else {
      setSelection(false);
    }
  }, [isSelectionEnable, listLocationProducts]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomProductCell
          {...{item, index, isSelectionEnable, listFiltered, setFilterProduct}}
        />
      );
    },
    [isSelectionEnable, listFiltered],
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_PRODUCT_STATE'});
      dispatch({type: 'SELECT_RECEIPT', receipt: null});
      if (!isFromFilter) {
        setFilterProduct([]);
        setSelection(false);
        // Temporary added setTimeout to avoid loader issue
        productCall.current = setTimeout(() => {
          loaderRef.current.show();
          dispatch(
            getLocationProductData(
              id,
              searchText,
              productSortBy,
              productDeliveryFilter,
            ),
          );
        }, 500);
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    isFromFilter,
    navigation,
    id,
    productDeliveryFilter,
    productSortBy,
    searchText,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
      clearTimeout(productCall.current);
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
    dispatch(
      getLocationProductData(
        id,
        searchText,
        productSortBy,
        productDeliveryFilter,
      ),
    );
  }, [dispatch, id, productDeliveryFilter, productSortBy, searchText]);
  const handleSortBy = useCallback(() => setSortPopup(true), []);
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
  const onFilter = useCallback(
    filter => {
      loaderRef.current.show();
      dispatch(
        getLocationProductData(id, searchText, productSortBy, filter, false),
      );
      setFromFilter(true);
    },
    [dispatch, id, productSortBy, searchText],
  );
  const handleFilter = useCallback(
    () =>
      navigate(NavigationRoutes.ProductDeliveryFilterScreen, {
        productDeliveryFilter,
        onFilter,
        isFromProduct: false,
      }),
    [onFilter, productDeliveryFilter],
  );
  const handleSelectOption = useCallback(
    data => () => {
      let listNew = [];
      setVisible(false);
      setItemType(data.type);
      setSelection(true);
      listLocationProducts.map(product => {
        listNew.push({
          ...product,
          isSelected: false,
        });
      });
      setFilterProduct([...listNew]);
    },
    [listLocationProducts],
  );
  const handleSelectAll = useCallback(() => {
    let listNew = [];
    listLocationProducts.map(product => {
      listNew.push({
        ...product,
        isSelected: true,
      });
    });
    setFilterProduct([...listNew]);
  }, [listLocationProducts]);
  const handleDelete = useCallback(() => {
    const selectedProducts = listFiltered.filter(value => value.isSelected);
    selectedProducts?.length > 0 && setDeletePopup(true);
  }, [listFiltered]);
  const handleLocationPress = useCallback(
    () =>
      navigation.navigate(NavigationRoutes.LocationDetailScreen, {
        locationDetail,
      }),
    [locationDetail, navigation],
  );
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
      dispatch(
        getLocationProductData(id, searchText, sortType, productDeliveryFilter),
      );
      setSortBy(e);
    },
    [dispatch, id, productDeliveryFilter, searchText],
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(
        getLocationProductData(id, val, productSortBy, productDeliveryFilter),
      );
    },
    [dispatch, id, productDeliveryFilter, productSortBy],
  );
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const listTitleTextStyle = StyleSheet.compose(
    styles.listTitle,
    themedStyles.placeholder,
  );
  const selectOperationViewStyle = StyleSheet.compose(
    styles.selectOperationView,
    themedStyles.themeBackground,
  );

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <SearchNavBar
            {...{themedStyles, onSearch, searchText}}
            isBackVisible={true}
            isRightActionVisible={true}
            isRightButton={isSelectionEnable}
            rightButtonText={Strings.done}
            onAction={handleActions}
          />
          <RenderLocationItem
            {...{mergedData, handleLocationPress, themedStyles}}
          />
          <View style={styles.listContainer}>
            <Text style={listTitleTextStyle}>{Strings.products}</Text>
            <SortFilterComponent
              {...{handleSortBy, handleFilter, sortBy}}
              isFilter={productDeliveryFilter}
            />
            <FlatList
              style={styles.listContainer}
              contentContainerStyle={
                listLocationProducts?.length > 0
                  ? {}
                  : styles.contentListContainer
              }
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={isSelectionEnable ? listFiltered : listLocationProducts}
              keyExtractor={item => item.productId}
              renderItem={renderItem}
              ListEmptyComponent={
                listLocationProducts != null && (
                  <ListEmptyComponent {...{themedStyles}} />
                )
              }
            />
          </View>
          {isSelectionEnable && (
            <View style={selectOperationViewStyle}>
              <Pressable style={styles.buttonView} onPress={handleSelectAll}>
                <Text style={styles.buttonText}>{Strings.selectAll}</Text>
              </Pressable>
              <Pressable
                style={styles.buttonView}
                onPress={itemType === 'delete' && handleDelete}>
                <Text style={styles.buttonText}>
                  {itemType === 'delete' && Strings.delete}
                </Text>
              </Pressable>
            </View>
          )}
          {!isSelectionEnable && (
            <Pressable
              style={styles.plusIconView}
              onPress={() => {
                navigation.navigate(NavigationRoutes.ScanQrCodeScreen, {
                  isFromDelivery: true,
                  locationDetail,
                });
              }}>
              <Icon name="add" size={moderateScale(25)} />
            </Pressable>
          )}
          <SortByPopup
            isVisible={isSortVisible}
            setVisible={setSortPopup}
            {...{sortBy, setSortBy, onSort}}
            listSort={listProductSortBy}
          />
          <ConfirmDeletePopup
            isVisible={isVisibleDelete}
            setVisible={setDeletePopup}
            onDelete={handleConfirmDelete}
            type={AppConstants.deleteTypes.Product}
          />
          <MoreComponent
            listOptions={locationMoreOption}
            {...{isVisible, setVisible}}
            onSelect={handleSelectOption}
          />
          <SuccessPopup
            isVisible={isDeleted}
            setVisible={setDeleted}
            successText={deletedText}
            onOkPress={onOkayPress}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.DeliveryLocation)}
          />
        </>
      )}
    />
  );
};
export default DeliveryLocationScreen;
