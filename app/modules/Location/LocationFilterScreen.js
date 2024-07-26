import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {
  createRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  CategoryFilterDropdown,
  CategoryFilterItems,
  CustomButton,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {listPropertyType} from '../../constants/Mockdata';
import {goBack} from '../../navigation/services/navigationServices';
import {getExistsLocation} from '../../redux/actions/locationsActions';
import {getExistProductCategory} from '../../redux/actions/productActions';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/LocationFilterStyles';

const ref = {
  fromDate: createRef(),
  toDate: createRef(),
  category: createRef(),
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
const DateFilter = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  isFromDate,
  showFromDate,
  isToDate,
  showToDate,
  handleFromDate,
  handleToDate,
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
          ref={ref.fromDate}
          floatingLabel={Strings.from}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(fromDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showFromDate(!isFromDate)}
          onChangeText={val => setFromDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <CustomTextInput
          ref={ref.toDate}
          floatingLabel={Strings.to}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={formattedDate(toDate)}
          editable={false}
          pointerEvents={'none'}
          rightIcon={Icons.calendarEvent}
          onPress={() => showToDate(!isToDate)}
          onChangeText={val => setToDate(val)}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      {isFromDate ? (
        <CustomDatePicker
          selectedDate={fromDate}
          setDate={handleFromDate}
          open={isFromDate}
          setOpen={showFromDate}
          minDate={undefined}
          maxDate={toDate !== '' ? toDate : undefined}
        />
      ) : null}
      {isToDate ? (
        <CustomDatePicker
          selectedDate={toDate}
          setDate={handleToDate}
          open={isToDate}
          setOpen={showToDate}
          minDate={fromDate !== '' ? fromDate : undefined}
          maxDate={undefined}
        />
      ) : null}
    </View>
  );
};
const RenderPropertyFilter = ({
  listFilteredType,
  setFilterTypes,
  themedStyles,
}) => {
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  const typeTextStyle = StyleSheet.compose(
    styles.typeText,
    themedStyles.labelText,
  );
  const typeIcnStyle = StyleSheet.compose(
    styles.typeIcn,
    themedStyles.navWhiteIcon,
  );
  return (
    <View style={styles.filter}>
      <Text style={filterTitleTextStyle}>{Strings.typeOfProperty}</Text>
      <View style={styles.propertyFilterView}>
        {listPropertyType.map((property, i) => {
          return (
            <Pressable
              key={i}
              style={[
                styles.propertyTypeView,
                listFilteredType[i]?.isSelected ? styles.selectedView : {},
              ]}
              onPress={() => {
                if (listFilteredType?.length > 0) {
                  listFilteredType[i].isSelected =
                    !listFilteredType[i]?.isSelected;
                  setFilterTypes([...listFilteredType]);
                }
              }}>
              <Image
                style={[
                  typeIcnStyle,
                  listFilteredType[i]?.isSelected ? styles.selectedIcn : {},
                ]}
                source={property.icon}
              />
              <Text style={typeTextStyle}>{property?.type}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const LocationFilterScreen = ({route, navigation}) => {
  const {locationFilter, onFilter} = route?.params;
  const [isCategoryFilter, setCatFilter] = useState(false);
  const [listFilteredType, setFilterTypes] = useState([]);
  const [listSelectedCategory, setSelectedCategory] = useState([]);
  const [listFilterCategory, setFilterCategory] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isFromDate, showFromDate] = useState(false);
  const [isToDate, showToDate] = useState(false);
  const [take, setTake] = useState(10);
  const dispatch = useDispatch();
  const {listProductCategory} = useSelector(state => state.productReducer);
  const {locationSortBy} = useSelector(state => state.locationsReducer);
  useEffect(() => {
    const listFiltered = listProductCategory?.map(e => {
      return {...e, isSelected: false};
    });
    setFilterCategory(listFiltered);
  }, [listProductCategory]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getExistProductCategory());
      locationFilter?.listType?.length > 0 &&
        setFilterTypes([...locationFilter?.listType]);
      locationFilter?.listCategory?.length > 0 &&
        setSelectedCategory([...locationFilter?.listCategory]);
      locationFilter?.warrantyDate &&
        setFromDate(locationFilter?.warrantyDate?.fromDate);
      locationFilter?.warrantyDate &&
        setToDate(locationFilter?.warrantyDate?.toDate);
    });
    return () => unsubscribe();
  }, [
    dispatch,
    listFilterCategory,
    listSelectedCategory,
    locationFilter,
    navigation,
  ]);
  useEffect(() => {
    let listNewProperty = [];
    listPropertyType.map(property => {
      listNewProperty.push({
        ...property,
        isSelected: false,
      });
    });
    setFilterTypes(listNewProperty);
  }, []);
  const handleFromDate = date => {
    setFromDate(moment(date).format(AppConstants.dateFormats.reverseDate));
  };
  const handleToDate = date => {
    setToDate(moment(date).format(AppConstants.dateFormats.reverseDate));
  };
  const handleAction = useCallback(() => {
    dispatch({type: 'RESET_FILTER'});
    setFromDate('');
    setToDate('');
    setSelectedCategory([]);
    let listNewProperty = [];
    listPropertyType.map(property => {
      listNewProperty.push({
        ...property,
        isSelected: false,
      });
    });
    setFilterTypes(listNewProperty);
    dispatch(getExistsLocation(take, '', locationSortBy, null));
  }, [dispatch, locationSortBy, take]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const onBack = useCallback(() => {
    const isTypeChanged = listFilteredType.find(e => e?.isSelected);
    const isFiltered =
      isTypeChanged ||
      listSelectedCategory?.length > 0 ||
      (fromDate !== '' && toDate !== '');
    if (isFiltered) {
      const filterData = {
        ...locationFilter,
        listType: listFilteredType,
        listCategory: listSelectedCategory,
        warrantyDate: {fromDate, toDate},
      };
      navigation.goBack();
      onFilter(filterData);
    }
  }, [
    fromDate,
    listSelectedCategory,
    listFilteredType,
    locationFilter,
    navigation,
    onFilter,
    toDate,
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
          <ScrollView style={styles.topView}>
            <RenderPropertyFilter
              {...{
                listFilteredType,
                setFilterTypes,
                themedStyles,
              }}
            />
            <View style={styles.spaceBox} />
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
            <DateFilter
              {...{
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                isFromDate,
                showFromDate,
                isToDate,
                showToDate,
                handleFromDate,
                handleToDate,
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

export default LocationFilterScreen;
