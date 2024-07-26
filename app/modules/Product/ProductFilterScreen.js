import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Keyboard, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomButton,
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  CategoryFilterDropdown,
  CategoryFilterItems,
  LocationFilterDropdown,
  LocationFilterItems,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {goBack} from '../../navigation/services/navigationServices';
import {
  getExistProductCategory,
  getProductData,
} from '../../redux/actions/productActions';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/ProductFilterStyles';

const ref = {
  fromPurchaseDate: createRef(),
  toPurchaseDate: createRef(),
  fromWarrantyExpiryDate: createRef(),
  toWarrantyExpiryDate: createRef(),
  location: createRef(),
  category: createRef(),
};

const LocationFilter = ({
  isLocationFilter,
  setLocationFilter,
  listLocations,
  listSelectedLocation,
  setSelectedLocation,
  listFilteredLocation,
  setFilteredLocation,
  themedStyles,
}) => {
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.filterView}>
      <Text style={filterTitleTextStyle}>{Strings.byLocation}</Text>
      <LocationFilterItems
        name="name"
        setVisible={setLocationFilter}
        listSelectedItems={listSelectedLocation}
        setSelectedItems={setSelectedLocation}
        listFilterItems={listFilteredLocation}
        setFilterItems={setFilteredLocation}
      />
      {isLocationFilter && (
        <LocationFilterDropdown
          name="name"
          isVisible={
            listLocations?.length > 0 ? isLocationFilter : !isLocationFilter
          }
          setVisible={setLocationFilter}
          listSelectedItems={listSelectedLocation}
          setSelectedItems={setSelectedLocation}
          listFilterItems={listFilteredLocation}
          setFilterItems={setFilteredLocation}
          data={listLocations}
        />
      )}
    </View>
  );
};

const CategoryFilter = ({
  isCategoryFilter,
  setCatFilter,
  listFilterCategory,
  listProductCategory,
  setFilterCategory,
  listSelectedCategory,
  setSelectedCategory,
  themedStyles,
}) => {
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.filterView}>
      <Text style={filterTitleTextStyle}>{Strings.byCategory}</Text>
      <CategoryFilterItems
        name="categoryName"
        setVisible={setCatFilter}
        listSelectedItems={listSelectedCategory}
        setSelectedItems={setSelectedCategory}
        listFilterItems={listFilterCategory}
        setFilterItems={setFilterCategory}
      />
      {isCategoryFilter && (
        <CategoryFilterDropdown
          name="categoryName"
          isVisible={isCategoryFilter}
          setVisible={setCatFilter}
          listSelectedItems={listSelectedCategory}
          setSelectedItems={setSelectedCategory}
          listFilterItems={listFilterCategory}
          setFilterItems={setFilterCategory}
          data={listProductCategory}
        />
      )}
    </View>
  );
};

const PurchaseDateFilter = ({
  fromPurchaseDate,
  setFromPurchaseDate,
  toPurchaseDate,
  setToPurchaseDate,
  isFromPurchaseDate,
  showFromPurchaseDate,
  isToPurchaseDate,
  showToPurchaseDate,
  handleFromPurchaseDate,
  handleToPurchaseDate,
  themedStyles,
}) => {
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.filterView}>
      <Text style={filterTitleTextStyle}>{Strings.byPurchaseDate}</Text>
      <View style={styles.filterDateView}>
        <CustomTextInput
          ref={ref.fromPurchaseDate}
          floatingLabel={Strings.from}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(fromPurchaseDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showFromPurchaseDate(!isFromPurchaseDate)}
          onChangeText={val => setFromPurchaseDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <CustomTextInput
          ref={ref.toDate}
          floatingLabel={Strings.to}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(toPurchaseDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showToPurchaseDate(!isToPurchaseDate)}
          onChangeText={val => setToPurchaseDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      {isFromPurchaseDate ? (
        <CustomDatePicker
          selectedDate={fromPurchaseDate}
          setDate={handleFromPurchaseDate}
          open={isFromPurchaseDate}
          setOpen={showFromPurchaseDate}
          minDate={undefined}
          maxDate={toPurchaseDate !== '' ? toPurchaseDate : new Date()}
        />
      ) : null}
      {isToPurchaseDate ? (
        <CustomDatePicker
          selectedDate={toPurchaseDate}
          setDate={handleToPurchaseDate}
          open={isToPurchaseDate}
          setOpen={showToPurchaseDate}
          minDate={fromPurchaseDate !== '' ? fromPurchaseDate : undefined}
          maxDate={new Date()}
        />
      ) : null}
    </View>
  );
};
const WarrantyExpiryDateFilter = ({
  fromWarrantyExpiryDate,
  setFromWarrantyExpiryDate,
  toWarrantyExpiryDate,
  setToWarrantyExpiryDate,
  isFromWarrantyExpiryDate,
  showFromWarrantyExpiryDate,
  isToWarrantyExpiryDate,
  showToWarrantyExpiryDate,
  handleFromWarrantyExpiryDate,
  handleToWarrantyExpiryDate,
  themedStyles,
}) => {
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  return (
    <View style={styles.filterView}>
      <Text style={filterTitleTextStyle}>{Strings.byWarrantyExpiryDate}</Text>
      <View style={styles.filterDateView}>
        <CustomTextInput
          ref={ref.fromWarrantyExpiryDate}
          floatingLabel={Strings.from}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(fromWarrantyExpiryDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showFromWarrantyExpiryDate(!isFromWarrantyExpiryDate)}
          onChangeText={val => setFromWarrantyExpiryDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <CustomTextInput
          ref={ref.toDate}
          floatingLabel={Strings.to}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(toWarrantyExpiryDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showToWarrantyExpiryDate(!isToWarrantyExpiryDate)}
          onChangeText={val => setToWarrantyExpiryDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      {isFromWarrantyExpiryDate ? (
        <CustomDatePicker
          selectedDate={fromWarrantyExpiryDate}
          setDate={handleFromWarrantyExpiryDate}
          open={isFromWarrantyExpiryDate}
          setOpen={showFromWarrantyExpiryDate}
          minDate={undefined}
          maxDate={
            toWarrantyExpiryDate !== '' ? toWarrantyExpiryDate : undefined
          }
        />
      ) : null}
      {isToWarrantyExpiryDate ? (
        <CustomDatePicker
          selectedDate={toWarrantyExpiryDate}
          setDate={handleToWarrantyExpiryDate}
          open={isToWarrantyExpiryDate}
          setOpen={showToWarrantyExpiryDate}
          minDate={
            fromWarrantyExpiryDate !== '' ? fromWarrantyExpiryDate : undefined
          }
          maxDate={undefined}
        />
      ) : null}
    </View>
  );
};
const ProductFilterScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {productFilter, onFilter} = route?.params || {};
  const [fromPurchaseDate, setFromPurchaseDate] = useState('');
  const [toPurchaseDate, setToPurchaseDate] = useState('');
  const [fromWarrantyExpiryDate, setFromWarrantyExpiryDate] = useState('');
  const [toWarrantyExpiryDate, setToWarrantyExpiryDate] = useState('');
  const [isFromPurchaseDate, showFromPurchaseDate] = useState(false);
  const [isToPurchaseDate, showToPurchaseDate] = useState(false);
  const [take, setTake] = useState(10);
  const [isFromWarrantyExpiryDate, showFromWarrantyExpiryDate] =
    useState(false);
  const [isToWarrantyExpiryDate, showToWarrantyExpiryDate] = useState(false);
  const [isLocationFilter, setLocationFilter] = useState(false);
  const [isCategoryFilter, setCatFilter] = useState(false);
  const [listSelectedCategory, setSelectedCategory] = useState([]);
  const [listFilterCategory, setFilterCategory] = useState([]);

  const [listSelectedLocation, setSelectedLocation] = useState([]);
  const [listFilteredLocation, setFilteredLocation] = useState([]);
  const {listProductCategory} = useSelector(state => state.productReducer);
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {productSortBy} = useSelector(state => state.productReducer);
  useEffect(() => {
    const listFiltered = listProductCategory?.map(e => {
      return {...e, isSelected: false};
    });
    setFilterCategory(listFiltered);
  }, [listProductCategory]);
  useEffect(() => {
    const listFiltered = listLocations?.map(e => {
      return {...e, isSelected: false};
    });
    setFilteredLocation(listFiltered);
  }, [listLocations]);
  useEffect(() => {
    dispatch(getExistProductCategory());
    const unsubscribe = navigation.addListener('focus', () => {
      productFilter?.listLocationFiltered?.length > 0 &&
        setSelectedLocation([...productFilter?.listLocationFiltered]);
      productFilter?.listCategoryFiltered?.length > 0 &&
        setSelectedCategory([...productFilter?.listCategoryFiltered]);
      productFilter?.purchaseDate &&
        setFromPurchaseDate(productFilter?.purchaseDate?.fromPurchaseDate);
      productFilter?.purchaseDate &&
        setToPurchaseDate(productFilter?.purchaseDate?.toPurchaseDate);
      productFilter?.warrantyDate &&
        setFromWarrantyExpiryDate(
          productFilter?.warrantyDate?.fromWarrantyExpiryDate,
        );
      productFilter?.warrantyDate &&
        setToWarrantyExpiryDate(
          productFilter?.warrantyDate?.toWarrantyExpiryDate,
        );
    });
    return () => unsubscribe();
  }, [dispatch, navigation, productFilter]);
  const handleFromPurchaseDate = date => {
    setFromPurchaseDate(
      moment(date).format(AppConstants.dateFormats.reverseDate),
    );
  };
  const handleToPurchaseDate = date => {
    setToPurchaseDate(
      moment(date).format(AppConstants.dateFormats.reverseDate),
    );
  };
  const handleFromWarrantyExpiryDate = date => {
    setFromWarrantyExpiryDate(
      moment(date).format(AppConstants.dateFormats.reverseDate),
    );
  };
  const handleToWarrantyExpiryDate = date => {
    setToWarrantyExpiryDate(
      moment(date).format(AppConstants.dateFormats.reverseDate),
    );
  };
  const handleAction = useCallback(() => {
    dispatch({type: 'RESET_PRODUCT_FILTER'});
    setFromPurchaseDate('');
    setToPurchaseDate('');
    setFromWarrantyExpiryDate('');
    setToWarrantyExpiryDate('');
    setSelectedLocation([]);
    setSelectedCategory([]);
    dispatch(getProductData(take, '', productSortBy, null));
  }, [dispatch, productSortBy, take]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const onBack = useCallback(() => {
    const isFiltered =
      listSelectedLocation?.length > 0 ||
      listSelectedCategory?.length > 0 ||
      (fromPurchaseDate !== '' && toPurchaseDate !== '') ||
      (fromWarrantyExpiryDate !== '' && toWarrantyExpiryDate !== '');
    if (isFiltered) {
      const filterData = {
        ...productFilter,
        listLocationFiltered: listSelectedLocation,
        listCategoryFiltered: listSelectedCategory,
        purchaseDate: {fromPurchaseDate, toPurchaseDate},
        warrantyDate: {
          fromWarrantyExpiryDate,
          toWarrantyExpiryDate,
        },
      };
      navigation.goBack();
      onFilter(filterData);
    }
  }, [
    listSelectedCategory,
    fromPurchaseDate,
    toPurchaseDate,
    fromWarrantyExpiryDate,
    toWarrantyExpiryDate,
    productFilter,
    listSelectedLocation,
    navigation,
    onFilter,
  ]);

  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.contentContainer}>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            containerStyle={styles.headerContainer}
            title={Strings.filter}
            isRightActionVisible={false}
            isRightButton={true}
            rightButtonText={Strings.reset}
            onAction={handleAction}
            onBackPress={goBack}
          />
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <LocationFilter
              {...{
                isLocationFilter,
                setLocationFilter,
                listLocations,
                listSelectedLocation,
                setSelectedLocation,
                listFilteredLocation,
                setFilteredLocation,
                themedStyles,
              }}
            />
            <CategoryFilter
              {...{
                isCategoryFilter,
                setCatFilter,
                listFilterCategory,
                setFilterCategory,
                listProductCategory,
                listSelectedCategory,
                setSelectedCategory,
                themedStyles,
              }}
            />
            <PurchaseDateFilter
              {...{
                productFilter,
                fromPurchaseDate,
                setFromPurchaseDate,
                toPurchaseDate,
                setToPurchaseDate,
                isFromPurchaseDate,
                showFromPurchaseDate,
                isToPurchaseDate,
                showToPurchaseDate,
                handleFromPurchaseDate,
                handleToPurchaseDate,
                themedStyles,
              }}
            />
            <WarrantyExpiryDateFilter
              {...{
                productFilter,
                fromWarrantyExpiryDate,
                setFromWarrantyExpiryDate,
                toWarrantyExpiryDate,
                setToWarrantyExpiryDate,
                isFromWarrantyExpiryDate,
                showFromWarrantyExpiryDate,
                isToWarrantyExpiryDate,
                showToWarrantyExpiryDate,
                handleFromWarrantyExpiryDate,
                handleToWarrantyExpiryDate,
                themedStyles,
              }}
            />
            <CustomButton
              title={Strings.applyFilter}
              style={styles.buttonContainer}
              onPress={onBack}
            />
          </ScrollView>
        </View>
      )}
    />
  );
};

export default ProductFilterScreen;
