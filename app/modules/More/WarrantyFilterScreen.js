import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {createRef, useMemo, useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  CustomButton,
  ScreenContainer,
  CategoryFilterDropdown,
  CategoryFilterItems,
  CustomDropDown,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {listWarrantyStatus} from '../../constants/Mockdata';
import {getExistProductCategory} from '../../redux/actions/productActions';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/WarrantyFilterStyles';

const ref = {
  fromDate: createRef(),
  toDate: createRef(),
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

const WarrantyFilterScreen = ({route, navigation}) => {
  const {warrantyFilter, onFilter} = route?.params || {};
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentDateType, setDateType] = useState('');
  const [status, setStatus] = useState(
    warrantyFilter?.warrantyStatus || undefined,
  );
  const [isDateVisible, setDatePicker] = useState(false);
  const [isCategoryFilter, setCatFilter] = useState(false);
  const [listSelectedCategory, setSelectedCategory] = useState([]);
  const [listFilterCategory, setFilterCategory] = useState([]);
  const dispatch = useDispatch();
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
      warrantyFilter?.listCategoryFiltered?.length > 0 &&
        setSelectedCategory([...warrantyFilter?.listCategoryFiltered]);
      warrantyFilter?.warrantyDate &&
        setFromDate(warrantyFilter?.warrantyDate?.fromDate);
      warrantyFilter?.warrantyDate &&
        setToDate(warrantyFilter?.warrantyDate?.toDate);
    });
    return () => unsubscribe();
  }, [dispatch, navigation, warrantyFilter]);
  const onDatePress = dateType => {
    setDateType(dateType);
    setDatePicker(true);
  };
  const handleDateSelection = date => {
    const selectedDate = moment(date).format(
      AppConstants.dateFormats.reverseDate,
    );
    if (currentDateType === 'start') {
      setFromDate(selectedDate);
    } else {
      setToDate(selectedDate);
    }
  };
  const handleAction = useCallback(() => {
    dispatch({type: 'RESET_WARRANTY_FILTER'});
    setSelectedCategory([]);
    setFromDate('');
    setToDate('');
    setStatus(undefined);
  }, [dispatch]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  const warrantyMinDate = () => {
    switch (currentDateType) {
      case 'start':
        return undefined;
      case 'end':
        return fromDate !== '' ? fromDate : undefined;
    }
  };
  const warrantyMaxDate = () => {
    switch (currentDateType) {
      case 'start':
        return toDate !== '' ? toDate : undefined;
      case 'end':
        return undefined;
    }
  };
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
            <View style={styles.filterView}>
              <Text style={filterTitleTextStyle}>
                {Strings.byWarrantyExpiryDate}
              </Text>
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
                  onPress={() => onDatePress('start')}
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
                  onPress={() => onDatePress('end')}
                />
              </View>
              <CustomDropDown
                placeholder={Strings.status}
                data={listWarrantyStatus}
                labelName={'value'}
                labelId={'id'}
                selected={status}
                onSelect={item => {
                  setStatus(item);
                }}
                style={styles.dropDownStyle}
              />
              <CustomDatePicker
                setDate={handleDateSelection}
                open={isDateVisible}
                selectedDate={currentDateType === 'start' ? fromDate : toDate}
                setOpen={setDatePicker}
                minDate={warrantyMinDate()}
                maxDate={warrantyMaxDate()}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            <CustomButton
              title={Strings.applyFilter}
              style={styles.buttonContainer}
              onPress={() => {
                const isFiltered =
                  listSelectedCategory?.length > 0 ||
                  status !== undefined ||
                  (fromDate !== '' && toDate !== '');
                if (isFiltered) {
                  const filterData = {
                    ...warrantyFilter,
                    listCategoryFiltered: listSelectedCategory,
                    warrantyDate: {fromDate, toDate},
                    warrantyStatus: status,
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

export default WarrantyFilterScreen;
