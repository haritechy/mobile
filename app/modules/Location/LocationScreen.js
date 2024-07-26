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
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
// LOCAL IMPORTS
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmDeletePopup,
  CustomNavBar,
  CustomTextInput,
  GoogleAdsComponent,
  loaderRef,
  LocationItem,
  MoreComponent,
  ScreenContainer,
  SortByPopup,
  SortFilterComponent,
  SuccessPopup,
} from '../../components';
import {listLocationSort, locationMoreOption} from '../../constants/Mockdata';
import {navigate} from '../../navigation/services/navigationServices';
import {
  deleteExistsLocation,
  getExistsLocation,
} from '../../redux/actions/locationsActions';
import {Icons, ThemeStyles, moderateScale} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/LocationScreenStyle';
import {useFocusEffect} from '@react-navigation/native';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';

const inputRef = {
  search: createRef(),
};

const ListEmptyComponent = ({searchText, locationFilter, themedStyles}) => {
  const isFiltered = locationFilter
    ? typeof locationFilter === 'object'
      ? Object.keys(locationFilter).length > 0
      : locationFilter?.length > 0
    : false;
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  const noDataStyle = StyleSheet.compose(
    styles.addLocation,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noLocation}</Text>
      {searchText.length > 0 || isFiltered ? null : (
        <Text style={noDataStyle}>{Strings.addLocationItem}</Text>
      )}
    </View>
  );
};

const LocationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchText, setSearch] = useState('');
  const [itemType, setItemType] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isInitial, setInitial] = useState(true);
  const [take, setTake] = useState(10);
  const [isSortVisible, setSortPopup] = useState(false);
  const [isVisibleDelete, setDeletePopup] = useState(false);
  const [listFiltered, setFilterLocation] = useState([]);
  const [isSelectionEnable, setSelection] = useState(false);
  const [isAllSelected, setSelectAll] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [deletedText, setDeletedText] = useState('');
  const [isFromFilter, setFromFilter] = useState(false);
  const locationCall = useRef(null);
  const {listLocations, locationSortBy, locationFilter, locationPageDetail} =
    useSelector(state => state.locationsReducer);
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  const [sortBy, setSortBy] = useState('');
  useEffect(() => {
    if (isInitial) {
      loaderRef.current.show();
      dispatch(getExistsLocation(take, '', locationSortBy, locationFilter));
      setInitial(false);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_LOCATIONS_STATE'});
      dispatch({type: 'CLEAR_UPLOAD_STATE'});
      if (!isFromFilter) {
        setSearch('');
        dispatch(getExistsLocation(take, '', locationSortBy, locationFilter));
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    locationFilter,
    locationSortBy,
    navigation,
    isFromFilter,
    take,
    isInitial,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
      clearTimeout(locationCall.current);
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
      getExistsLocation(take, searchText, locationSortBy, locationFilter),
    );
  }, [dispatch, locationFilter, locationSortBy, searchText, take]);
  const handleActions = useCallback(
    val => {
      if (!isSelectionEnable) {
        setVisible(true);
      } else {
        setSelection(false);
        setSelectAll(false);
      }
    },
    [isSelectionEnable],
  );

  const handleSortBy = useCallback(() => setSortPopup(true), []);
  const onFilter = useCallback(
    filter => {
      loaderRef.current.show();
      dispatch(getExistsLocation(take, searchText, locationSortBy, filter));
      setFromFilter(true);
    },
    [dispatch, locationSortBy, searchText, take],
  );
  const handleFilter = useCallback(
    () =>
      navigate(NavigationRoutes.LocationFilterScreen, {
        locationFilter,
        onFilter,
      }),
    [locationFilter, onFilter],
  );
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <LocationItem
          {...{
            item,
            index,
            isSelectionEnable,
            listFiltered,
            setFilterLocation,
          }}
        />
      );
    },
    [isSelectionEnable, listFiltered],
  );
  const handleSelectOption = useCallback(
    data => () => {
      let listNew = [];
      setVisible(false);
      setItemType(data.type);
      setSelection(prev => !prev);
      listLocations.map(location => {
        listNew.push({
          ...location,
          isSelected: false,
        });
      });
      setFilterLocation([...listNew]);
    },
    [listLocations],
  );
  const handleSelectAll = useCallback(() => {
    let listNew = [];
    listLocations.map(location => {
      if (isAllSelected) {
        listNew.push({
          ...location,
          isSelected: false,
        });
      } else {
        listNew.push({
          ...location,
          isSelected: !location?.isDefault,
        });
      }
    });
    setFilterLocation([...listNew]);
    setSelectAll(prev => !prev);
  }, [listLocations, isAllSelected]);

  const handleDelete = useCallback(() => {
    let selectedLocations = listFiltered.filter(value => value.isSelected);
    selectedLocations?.length > 0 && setDeletePopup(true);
  }, [listFiltered]);
  const handleConfirmDelete = useCallback(() => {
    setDeletePopup(false);
    let locationIds = [];
    listFiltered.filter(
      value =>
        value.isSelected && !value?.isDefault && locationIds.push(value.id),
    );
    loaderRef.current.show();
    dispatch(
      deleteExistsLocation(locationIds, (isSuccess, response) => {
        setSelection(false);
        if (isSuccess) {
          setDeleted(true);
          setDeletedText(response?.message);
        } else {
          loaderRef.current.hide();
        }
      }),
    );
  }, [dispatch, listFiltered]);
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(
        getExistsLocation(take, val.trim(), locationSortBy, locationFilter),
      );
    },
    [dispatch, locationFilter, locationSortBy, take],
  );
  const onSort = useCallback(
    e => {
      setSortPopup(false);
      let sortType = '';
      switch (e.id) {
        case 1:
          sortType = 'name';
          break;
        case 2:
          sortType = 'updatedOn desc';
          break;
        default:
          sortType = '';
          break;
      }
      dispatch(getExistsLocation(take, searchText, sortType, locationFilter));
      setSortBy(e);
    },
    [dispatch, locationFilter, searchText, take],
  );
  const onEndReach = useCallback(() => {
    if (take < locationPageDetail?.count) {
      loaderRef.current.show();
      dispatch(
        getExistsLocation(
          take + 10,
          searchText,
          locationSortBy,
          locationFilter,
        ),
      );
      setTake(take + 10);
    }
  }, [
    dispatch,
    locationFilter,
    locationPageDetail,
    locationSortBy,
    searchText,
    take,
  ]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
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
          <CustomNavBar
            title={Strings.locations}
            isRightActionVisible={
              listLocations?.length > 0 && !isSelectionEnable
            }
            isBackVisible={false}
            isRightButton={isSelectionEnable}
            rightButtonText={Strings.done}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.moreVerticalCircle]}
            onAction={handleActions}
          />
          {(listLocations?.length > 0 || searchText !== '') &&
            !isSelectionEnable && (
              <>
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
              </>
            )}
          {!isSelectionEnable ? (
            <SortFilterComponent
              {...{handleSortBy, handleFilter, sortBy}}
              isFilter={
                locationFilter
                  ? typeof locationFilter === 'object'
                    ? Object.keys(locationFilter).length > 0
                    : locationFilter?.length > 0
                  : false
              }
            />
          ) : null}
          <FlatList
            style={styles.listContainer}
            contentContainerStyle={styles.contentListContainer}
            bounces={false}
            data={isSelectionEnable ? listFiltered : listLocations}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
              listLocations != null && (
                <ListEmptyComponent
                  {...{searchText, locationFilter, themedStyles}}
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
              <Pressable style={styles.buttonView} onPress={handleDelete}>
                <Text style={styles.buttonText}>
                  {itemType === 'delete' ? Strings.delete : Strings.move}
                </Text>
              </Pressable>
            </View>
          )}
          <MoreComponent
            listOptions={locationMoreOption}
            {...{isVisible, setVisible}}
            onSelect={handleSelectOption}
          />
          {isVisibleDelete && (
            <ConfirmDeletePopup
              isVisible={isVisibleDelete}
              setVisible={setDeletePopup}
              onDelete={handleConfirmDelete}
              type={AppConstants.deleteTypes.Location}
            />
          )}
          {isSortVisible && (
            <SortByPopup
              isVisible={isSortVisible}
              setVisible={setSortPopup}
              {...{sortBy, setSortBy, onSort}}
              listSort={listLocationSort}
            />
          )}
          {!isSelectionEnable && (
            <Pressable
              style={styles.plusIconView}
              onPress={() => {
                navigate(NavigationRoutes.AddLocationScreen, {isEdit: false});
              }}>
              <Icon name="add" size={moderateScale(25)} />
            </Pressable>
          )}
          <SuccessPopup
            isVisible={isDeleted}
            setVisible={setDeleted}
            successText={deletedText}
            onOkPress={onOkayPress}
          />
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Locations)}
          />
        </>
      )}
    />
  );
};
export default LocationScreen;
