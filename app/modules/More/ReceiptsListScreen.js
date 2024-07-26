import {useFocusEffect, useTheme} from '@react-navigation/native';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomNavBar,
  CustomReceiptItem,
  CustomTextInput,
  GoogleAdsComponent,
  loaderRef,
  MoreComponent,
  ScreenContainer,
  SortByPopup,
  SortFilterComponent,
} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {listReceiptSortBy, locationMoreOption} from '../../constants/Mockdata';
import {getAllReceipts} from '../../redux/actions/receiptsActions';
import {Icons, ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/ReceiptsListStyles';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  search: createRef(),
};

const ListEmptyComponent = ({themedStyles}) => {
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noReceiptFound}</Text>
    </View>
  );
};

const ReceiptsListScreen = ({navigation}) => {
  const [searchText, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [take, setTake] = useState(10);
  const [isVisible, setVisible] = useState(false);
  const [isInitial, setInitial] = useState(false);
  const [isSelectionEnable, setSelection] = useState(false);
  const [isSortVisible, setSortPopup] = useState(false);
  const [isFromFilter, setFromFilter] = useState(false);
  const [listFiltered, setFilterReceipts] = useState([]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const dispatch = useDispatch();
  const {listReceipts, receiptSortBy, receiptFilter, receiptPage} = useSelector(
    state => state.receiptsReducer,
  );
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  useEffect(() => {
    if (isInitial) {
      loaderRef.current.show();
      getAllReceipts(take, searchText, receiptSortBy, receiptFilter);
      setInitial(false);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isFromFilter) {
        dispatch(
          getAllReceipts(take, searchText, receiptSortBy, receiptFilter),
        );
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    isFromFilter,
    isInitial,
    navigation,
    receiptFilter,
    receiptSortBy,
    searchText,
    take,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
    });
    return () => unsubscribe();
  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      enableAdjustPan();
      return () => disableAdjustPan();
    }, [disableAdjustPan, enableAdjustPan]),
  );
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
    themedStyles.placeholder,
  );
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const onFilter = useCallback(
    filter => {
      dispatch(getAllReceipts(take, searchText, receiptSortBy, filter));
      setFromFilter(true);
    },
    [dispatch, receiptSortBy, searchText, take],
  );
  const handleSortBy = useCallback(() => setSortPopup(true), []);
  const handleFilter = useCallback(
    () =>
      navigation.navigate(NavigationRoutes.ReceiptFilterScreen, {
        receiptFilter,
        onFilter,
      }),
    [navigation, onFilter, receiptFilter],
  );
  const onEndReach = useCallback(() => {
    if (take < receiptPage?.count) {
      loaderRef.current.show();
      dispatch(
        getAllReceipts(take + 10, searchText, receiptSortBy, receiptFilter),
      );
      setTake(take + 10);
    }
  }, [take, receiptPage, dispatch, searchText, receiptSortBy, receiptFilter]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomReceiptItem
          {...{
            item,
            index,
            navigation,
            isSelectionEnable,
            listFiltered,
            setFilterReceipts,
            themedStyles,
            dispatch,
          }}
        />
      );
    },
    [dispatch, isSelectionEnable, listFiltered, navigation, themedStyles],
  );
  const onSort = useCallback(
    e => {
      setSortPopup(false);
      let sortType = '';
      switch (e.id) {
        case 1:
          sortType = 'createdOn desc';
          break;
        case 2:
          sortType = 'purchaseDate desc';
          break;
        case 3:
          sortType = 'purchaseDate asc';
          break;
        default:
          sortType = '';
          break;
      }
      dispatch(getAllReceipts(take, searchText, sortType, receiptFilter));
      setSortBy(e);
    },
    [dispatch, receiptFilter, searchText, take],
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(getAllReceipts(take, val.trim(), receiptSortBy, receiptFilter));
    },
    [dispatch, receiptFilter, receiptSortBy, take],
  );
  const handleDeleteItems = useCallback(
    () => () => {
      const listNew = [];
      setVisible(false);
      setSelection(true);
      listReceipts.map(receipt => {
        listNew.push({
          ...receipt,
          isSelected: false,
        });
      });
      setFilterReceipts([...listNew]);
    },
    [listReceipts],
  );
  const handleAction = useCallback(() => {
    if (!isSelectionEnable) {
      setVisible(true);
    } else {
      setSelection(false);
    }
  }, [isSelectionEnable]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <View style={styles.mainContainer}>
            <CustomNavBar
              containerStyle={styles.headerContainer}
              headerTextStyle={styles.headerStyle}
              title={Strings.receiptsList}
              isRightActionVisible={
                listReceipts?.length > 0 && !isSelectionEnable
              }
              isRightButton={isSelectionEnable}
              rightButtonText={Strings.done}
              onAction={handleAction}
            />
            {!isSelectionEnable ? (
              <>
                <CustomTextInput
                  ref={inputRef.search}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  placeholder={Strings.search}
                  containerStyle={searchContainerStyle}
                  inputStyle={inputTextStyle}
                  value={searchText}
                  isTitleVisible={false}
                  leftIcon={Icons.search}
                  onChangeText={onSearch}
                />
                <SortFilterComponent
                  {...{handleSortBy, handleFilter, sortBy}}
                  isFilter={receiptFilter}
                />
              </>
            ) : null}
            <FlatList
              data={isSelectionEnable ? listFiltered : listReceipts}
              keyExtractor={item => item.receiptId}
              renderItem={renderItem}
              ListEmptyComponent={
                listReceipts != null && (
                  <ListEmptyComponent {...{themedStyles}} />
                )
              }
              bounces={false}
              style={styles.listContainer}
              contentContainerStyle={
                listReceipts?.length > 0 ? {} : styles.contentListContainer
              }
              onEndReached={onEndReach}
              onEndReachedThreshold={0.1}
            />
            <SortByPopup
              isVisible={isSortVisible}
              setVisible={setSortPopup}
              {...{sortBy, setSortBy, onSort}}
              listSort={listReceiptSortBy}
            />
            <MoreComponent
              listOptions={locationMoreOption}
              {...{isVisible, setVisible}}
              onSelect={handleDeleteItems}
            />
          </View>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.ReceiptList)}
          />
        </>
      )}
    />
  );
};

export default ReceiptsListScreen;
