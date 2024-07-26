import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, FlatList, StyleSheet, Keyboard, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons, ThemeStyles} from '../../theme';
import {NavigationRoutes, Strings} from '../../constants';
import {
  CustomWarrantyItem,
  CustomNavBar,
  CustomTextInput,
  ScreenContainer,
  loaderRef,
} from '../../components';
import styles from './styles/WarrantyListStyles';
import {useTheme} from '@react-navigation/native';
import {getAllWarranties} from '../../redux/actions/warrantyActions';

const inputRef = {
  search: createRef(),
};
const ListEmptyComponent = ({searchText, isFromFilter, themedStyles}) => {
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noWarrantyCard}</Text>
    </View>
  );
};
const WarrantyListScreen = ({navigation}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
    themedStyles.placeholder,
  );
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const [searchText, setSearch] = useState('');
  const [take, setTake] = useState(10);
  const [isFromFilter, setFromFilter] = useState(false);
  const [isInitial, setInitial] = useState(false);
  const dispatch = useDispatch();
  const {listWarranties, warrantyFilter, warrantyPage} = useSelector(
    state => state.warrantyReducer,
  );
  useEffect(() => {
    if (isInitial) {
      loaderRef.current.show();
      dispatch(getAllWarranties(searchText, warrantyFilter, take));
      setInitial(false);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isFromFilter) {
        dispatch(getAllWarranties(searchText, warrantyFilter, take));
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    isFromFilter,
    isInitial,
    navigation,
    searchText,
    take,
    warrantyFilter,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);
  const onFilter = useCallback(
    filter => {
      dispatch(getAllWarranties(searchText, filter, take));
      setFromFilter(true);
    },
    [dispatch, searchText, take],
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(getAllWarranties(val.trim(), warrantyFilter, take));
    },
    [dispatch, warrantyFilter, take],
  );
  const onEndReach = useCallback(() => {
    if (take < warrantyPage?.count) {
      loaderRef.current.show();
      dispatch(getAllWarranties(searchText, warrantyFilter, take + 10));
      setTake(take + 10);
    }
  }, [dispatch, searchText, take, warrantyFilter, warrantyPage]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <CustomWarrantyItem
          {...{
            item,
            index,
            themedStyles,
          }}
        />
      );
    },
    [themedStyles],
  );
  const handleAction = useCallback(() => {
    navigation.navigate(NavigationRoutes.WarrantyFilterScreen, {
      warrantyFilter,
      onFilter,
    });
  }, [navigation, onFilter, warrantyFilter]);
  return (
    <ScreenContainer
      renderContent={() => (
        <View style={styles.mainContainer}>
          <CustomNavBar
            containerStyle={styles.headerContainer}
            headerTextStyle={styles.headerStyle}
            title={Strings.warrantyList}
            isRightActionVisible={true}
            listRightIcons={[Icons.filterIcon]}
            onAction={handleAction}
          />
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
          <FlatList
            style={styles.listContainer}
            contentContainerStyle={
              listWarranties?.length > 0 ? {} : styles.contentListContainer
            }
            bounces={false}
            data={listWarranties}
            keyExtractor={item => item?.productWarrantyId}
            renderItem={renderItem}
            ListEmptyComponent={
              listWarranties != null && (
                <ListEmptyComponent
                  {...{searchText, isFromFilter, themedStyles}}
                />
              )
            }
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
          />
        </View>
      )}
    />
  );
};

export default WarrantyListScreen;
