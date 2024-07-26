import React from 'react';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';
import {Platform} from 'react-native';

const CustomDatePicker = ({
  setDate,
  open,
  setOpen,
  minDate = undefined,
  maxDate = undefined,
  selectedDate,
}) => {
  const {mode} = useSelector(state => state.settingReducer);
  const getUtcDate = () =>
    new Date(
      new Date(selectedDate).getUTCFullYear(),
      new Date(selectedDate).getUTCMonth(),
      new Date(selectedDate).getUTCDate(),
      new Date(selectedDate).getUTCHours(),
      new Date(selectedDate).getUTCMinutes(),
      new Date(selectedDate).getUTCSeconds(),
    );
  const getTimeZoneDate = date => {
    const timeZone = RNLocalize.getTimeZone();
    const zoneDate = moment(date);
    return zoneDate.tz(timeZone).toDate();
  };
  return (
    <>
      <DatePicker
        mode="date"
        theme={Platform.OS === 'android' ? 'light' : mode}
        minimumDate={minDate ? getTimeZoneDate(minDate) : undefined}
        maximumDate={maxDate ? getTimeZoneDate(maxDate) : undefined}
        modal
        open={open}
        date={selectedDate ? getTimeZoneDate(selectedDate) : new Date()}
        onConfirm={date => {
          setOpen(false);
          const dateFormat = getTimeZoneDate(date);
          setDate(dateFormat);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default CustomDatePicker;
