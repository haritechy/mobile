import moment from 'moment';
import React from 'react';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import {AppConstants, Strings} from '../constants';
import styles from './styles/NotificationListItemStyles';

const CustomNotificationItem = ({item, onRead, onDelete, themedStyles}) => {
  const titleStyle = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const timeTextStyle = StyleSheet.compose(
    styles.timeText,
    themedStyles.placeholder,
  );
  const {dateFormats} = AppConstants;
  const renderSwipableContent = () => {
    return (
      <Pressable style={styles.deleteItem} onPress={onDelete(item)}>
        <Text style={styles.deleteText}>{Strings.delete}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.contentContainer}>
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderSwipableContent}>
          <Pressable style={styles.rowContainer} onPress={onRead(item)}>
            <View
              style={item.isRead ? styles.markReadDot : styles.unMarkReadDot}
            />
            <View style={styles.rightView}>
              <Text style={titleStyle} numberOfLines={3}>
                {item?.description || item?.title}
              </Text>
              <Text style={timeTextStyle}>
                {`${moment(item.createdOn).format(
                  dateFormats.dateMonth,
                )} • ${moment(item.createdOn).format(dateFormats.hrMinute)}`}
              </Text>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
      <View style={styles.separator} />
    </View>
  );
};
export default CustomNotificationItem;
