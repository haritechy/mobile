import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomButton,
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  CategoryFilterDropdown,
  CategoryFilterItems,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {getExistProductCategory} from '../../redux/actions/productActions';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/ProductDeliveryFilterStyles';

const ref = {
  fromPurchaseDate: createRef(),
  toPurchaseDate: createRef(),
  fromWarrantyExpiryDate: createRef(),
  toWarrantyExpiryDate: createRef(),
  category: createRef(),
};

const CategoryFilter = ({
  isCategoryFilter,
  setCatFilter,
  listFilterCategory,
  setFilterCategory,
  listProductCategory,
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
const ProductDeliveryFilterScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {productDeliveryFilter, onFilter} = route?.params || {};
  const [fromPurchaseDate, setFromPurchaseDate] = useState('');
  const [toPurchaseDate, setToPurchaseDate] = useState('');
  const [fromWarrantyExpiryDate, setFromWarrantyExpiryDate] = useState('');
  const [toWarrantyExpiryDate, setToWarrantyExpiryDate] = useState('');
  const [isFromPurchaseDate, showFromPurchaseDate] = useState(false);
  const [isToPurchaseDate, showToPurchaseDate] = useState(false);
  const [isFromWarrantyExpiryDate, showFromWarrantyExpiryDate] =
    useState(false);
  const [isToWarrantyExpiryDate, showToWarrantyExpiryDate] = useState(false);
  const [isCategoryFilter, setCatFilter] = useState(false);
  const [listSelectedCategory, setSelectedCategory] = useState([]);
  const [listFilterCategory, setFilterCategory] = useState([]);
  const {listProductCategory} = useSelector(state => state.productReducer);

  useEffect(() => {
    const listFiltered = listProductCategory?.map(e => {
      return {...e, isSelected: false};
    });
    setFilterCategory(listFiltered);
  }, [listProductCategory]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getExistProductCategory());
      productDeliveryFilter?.listCategoryFiltered?.length > 0 &&
        setSelectedCategory([...productDeliveryFilter?.listCategoryFiltered]);
      productDeliveryFilter?.purchaseDate &&
        setFromPurchaseDate(
          productDeliveryFilter?.purchaseDate?.fromPurchaseDate,
        );
      productDeliveryFilter?.purchaseDate &&
        setToPurchaseDate(productDeliveryFilter?.purchaseDate?.toPurchaseDate);
      productDeliveryFilter?.warrantyDate &&
        setFromWarrantyExpiryDate(
          productDeliveryFilter?.warrantyDate?.fromWarrantyExpiryDate,
        );
      productDeliveryFilter?.warrantyDate &&
        setToWarrantyExpiryDate(
          productDeliveryFilter?.warrantyDate?.toWarrantyExpiryDate,
        );
    });
    return () => unsubscribe();
  }, [dispatch, navigation, productDeliveryFilter]);
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
    dispatch({type: 'RESET_LOCATION_PRODUCT_FILTER'});
    setFromPurchaseDate('');
    setToPurchaseDate('');
    setFromWarrantyExpiryDate('');
    setToWarrantyExpiryDate('');
    setSelectedCategory([]);
  }, [dispatch]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
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
          />
          <View style={styles.topView}>
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
              onPress={() => {
                const isFiltered =
                  listSelectedCategory?.length > 0 ||
                  (fromPurchaseDate !== '' && toPurchaseDate !== '') ||
                  (fromWarrantyExpiryDate !== '' &&
                    toWarrantyExpiryDate !== '');
                if (isFiltered) {
                  const filterData = {
                    ...productDeliveryFilter,
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
              }}
            />
          </View>
        </View>
      )}
    />
  );
};

export default ProductDeliveryFilterScreen;
