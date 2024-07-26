import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../assets';
import {
  CustomNavBar,
  CustomNotificationItem,
  DeleteConfirmationPopup,
  GoogleAdsComponent,
  loaderRef,
  ScreenContainer,
} from '../components';
import {AppConstants, NavigationRoutes, Strings} from '../constants';
import {
  getAllNotifications,
  markReadNotifications,
  removeNotifications,
} from '../redux/actions/notificationActions';
import {ThemeStyles} from '../theme';
import {getAddUnitId} from '../utils/helper';
import styles from './styles/NotificationStyle';

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyData}>{Strings.noNotificationsFound}</Text>
    </View>
  );
};
const ListHeader = ({handleReadAll, onDeleteAll}) => (
  <View style={styles.headerRow}>
    <Text
      style={styles.headerText}
      suppressHighlighting={true}
      onPress={handleReadAll}>
      {Strings.markAllAsRead}
    </Text>
    <Text style={styles.headerText}>{'  |  '}</Text>
    <Text
      style={styles.deleteAllText}
      suppressHighlighting={true}
      onPress={onDeleteAll}>
      {Strings.deleteAll}
    </Text>
  </View>
);

const NotificationScreen = ({navigation}) => {
  const [take, setTake] = useState(50);
  const [isDeletePopup, setDeletePopup] = useState(false);
  const dispatch = useDispatch();
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const {listNotifications, notificationPage} = useSelector(
    state => state.notificationReducer,
  );
  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.AlertAndNotification);
  }, [navigation]);

  const handleReadAll = useCallback(() => {
    const data = {
      id: 0,
      isRead: true,
      isReadAll: true,
    };
    loaderRef.current.show();
    dispatch(
      markReadNotifications(data, isSuccess => {
        if (isSuccess) {
          dispatch(getAllNotifications(take));
        }
      }),
    );
  }, [dispatch, take]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomNotificationItem
          {...{
            item,
            onRead,
            onDelete,
            themedStyles,
          }}
        />
      );
    },
    [onDelete, onRead, themedStyles],
  );
  const onEndReach = useCallback(() => {
    if (take < notificationPage?.count) {
      loaderRef.current.show();
      dispatch(getAllNotifications(take + 20));
      setTake(take + 20);
    }
  }, [dispatch, notificationPage?.count, take]);
  const onRead = useCallback(
    item => () => {
      if (!item?.isRead) {
        const data = {
          id: item?.notificationId,
          isRead: true,
          isReadAll: false,
        };
        loaderRef.current.show();
        dispatch(
          markReadNotifications(data, isSuccess => {
            if (isSuccess) {
              dispatch(getAllNotifications(take));
            }
          }),
        );
      }
    },
    [dispatch, take],
  );
  const onDelete = useCallback(
    item => () => {
      const notificationIds = [item?.notificationId];
      dispatch(
        removeNotifications(notificationIds, (isSuccess, response) => {
          if (isSuccess) {
            dispatch(getAllNotifications(take));
          }
        }),
      );
    },
    [dispatch, take],
  );
  const onDeleteAll = useCallback(() => setDeletePopup(true), []);
  const onConfirmDelete = useCallback(() => {
    setDeletePopup(false);
    const notificationIds = [];
    dispatch(
      removeNotifications(notificationIds, (isSuccess, response) => {
        if (isSuccess) {
          dispatch(getAllNotifications(take));
        }
      }),
    );
  }, [dispatch, take]);
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.notifications}
            isRightActionVisible={true}
            isBackVisible={true}
            isRightButton={true}
            containerStyle={styles.headerContainer}
            listRightIcons={[Icons.setting]}
            onAction={handleActions}
          />
          <View style={styles.mainView}>
            <FlatList
              style={styles.listContainer}
              contentContainerStyle={
                listNotifications?.length > 0 ? {} : styles.contentListContainer
              }
              bounces={false}
              data={listNotifications}
              keyExtractor={item => item.notificationId}
              renderItem={renderItem}
              ListHeaderComponent={
                listNotifications?.length > 0 ? (
                  <ListHeader
                    {...{
                      handleReadAll,
                      onDeleteAll,
                    }}
                  />
                ) : null
              }
              ListEmptyComponent={
                listNotifications != null && <ListEmptyComponent />
              }
              onEndReached={onEndReach}
              onEndReachedThreshold={0.1}
            />
            <GoogleAdsComponent
              adContainerStyle={styles.bannerView}
              unitId={getAddUnitId(AppConstants.Banners.Notification)}
            />
          </View>
          <DeleteConfirmationPopup
            isVisible={isDeletePopup}
            setVisible={setDeletePopup}
            title={Strings.deleteNotifications}
            message={Strings.sureToDeleteNotifications}
            onDelete={onConfirmDelete}
          />
        </>
      )}
    />
  );
};
export default NotificationScreen;
