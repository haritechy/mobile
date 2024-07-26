import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React, {createRef, useMemo, useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomDatePicker,
  CustomNavBar,
  CustomTextInput,
  CustomButton,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings} from '../../constants';
import {ThemeStyles} from '../../theme';
import {formattedDate} from '../../utils/helper';
import styles from './styles/ReceiptFilterStyles';

const ref = {
  fromDate: createRef(),
  toDate: createRef(),
  category: createRef(),
};

const ReceiptFilterScreen = ({route, navigation}) => {
  const {receiptFilter, onFilter} = route?.params;
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentDateType, setDateType] = useState('');
  const [isDateVisible, setDatePicker] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      receiptFilter?.purchaseDate &&
        setFromDate(receiptFilter?.purchaseDate?.fromDate);
      receiptFilter?.purchaseDate &&
        setToDate(receiptFilter?.purchaseDate?.toDate);
    });
    return () => unsubscribe();
  }, [dispatch, receiptFilter, navigation]);
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
    dispatch({type: 'RESET_RECEIPT_FILTER'});
    setFromDate('');
    setToDate('');
  }, [dispatch]);
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const filterTitleTextStyle = StyleSheet.compose(
    styles.filterTitleText,
    themedStyles.placeholder,
  );
  const purchaseMinDate = () => {
    switch (currentDateType) {
      case 'start':
        return undefined;
      case 'end':
        return fromDate !== '' ? fromDate : undefined;
    }
  };
  const purchaseMaxDate = () => {
    switch (currentDateType) {
      case 'start':
        return toDate !== '' ? toDate : new Date();
      case 'end':
        return new Date();
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
            <View style={styles.filterView}>
              <Text style={filterTitleTextStyle}>{Strings.byPurchaseDate}</Text>
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
              <CustomDatePicker
                setDate={handleDateSelection}
                open={isDateVisible}
                selectedDate={currentDateType === 'start' ? fromDate : toDate}
                setOpen={setDatePicker}
                minDate={purchaseMinDate()}
                maxDate={purchaseMaxDate()}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            <CustomButton
              title={Strings.applyFilter}
              style={styles.buttonContainer}
              onPress={() => {
                const isFiltered = fromDate !== '' && toDate !== '';
                if (isFiltered) {
                  const filterData = {
                    ...receiptFilter,
                    purchaseDate: {fromDate, toDate},
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

export default ReceiptFilterScreen;
