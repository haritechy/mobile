import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Text, View, FlatList, Image, Pressable, StyleSheet} from 'react-native';
import {NavigationRoutes, Strings} from '../../constants';
import {
  CustomNavBar,
  CustomTextInput,
  ImageViewCard,
  loaderRef,
  ScreenContainer,
} from '../../components';
import styles from './styles/SelectReceiptStyles';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {getAllReceipts} from '../../redux/actions/receiptsActions';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../../theme';

const ListEmptyComponent = ({themedStyles}) => {
  const emptyDataStyle = StyleSheet.compose(
    styles.emptyData,
    themedStyles.labelText,
  );
  return (
    <View style={styles.emptyContainer}>
      <Text style={emptyDataStyle}>{Strings.noReceiptFound}</Text>
    </View>
  );
};

const SelectReceiptScreen = ({navigation, route}) => {
  const {receiptId = undefined} = route?.params || {};
  const [isInitial, setInitial] = useState(true);
  const [searchText, setSearch] = useState('');
  const [isViewReceipt, setViewReceipt] = useState(false);
  const [receiptImg, setReceiptImg] = useState('');
  const [take, setTake] = useState(50);
  const [currentSelectedReceipt, setReceipt] = useState(undefined);
  const dispatch = useDispatch();
  const {listReceipts, selectedReceipt, receiptPage} = useSelector(
    state => state.receiptsReducer,
  );
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const receiptNameStyle = StyleSheet.compose(
    styles.receiptName,
    themedStyles.labelText,
  );
  const unSelectIcnStyle = StyleSheet.compose(
    styles.unSelectIcn,
    themedStyles.navWhiteIcon,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus called');
      dispatch({type: 'CLEAR_RECEIPT_STATE'});
      dispatch({type: 'CLEAR_UPLOAD_STATE'});
      dispatch(getAllReceipts(take, ''));
    });
    return () => unsubscribe();
  }, [dispatch, navigation, take]);
  useEffect(() => {
    if (isInitial && listReceipts?.length > 0) {
      if (selectedReceipt) {
        const existReceipt = listReceipts?.find(
          e => e?.receiptId === selectedReceipt?.receiptId,
        );
        setReceipt(existReceipt);
      } else {
        const existReceipt = listReceipts?.find(
          e => e?.receiptId === receiptId,
        );
        setReceipt(existReceipt);
      }
      setInitial(false);
    }
  }, [dispatch, isInitial, listReceipts, receiptId, selectedReceipt]);

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.AddReceiptScreen);
  }, [navigation]);
  const onSave = useCallback(() => {
    if (currentSelectedReceipt) {
      dispatch({type: 'SELECT_RECEIPT', receipt: currentSelectedReceipt});
      navigation.goBack();
    }
  }, [currentSelectedReceipt, dispatch, navigation]);
  const onSelection = useCallback(item => () => setReceipt(item), []);
  const renderItem = useCallback(
    ({item, index}) => {
      const isSelected = currentSelectedReceipt?.receiptId === item?.receiptId;
      return (
        <Pressable
          key={index}
          style={styles.receiptItem}
          onPress={onSelection(item)}>
          <View style={styles.leftView}>
            <Text
              numberOfLines={2}
              style={receiptNameStyle}
              onPress={() => {
                setViewReceipt(!isViewReceipt);
                setReceiptImg(item?.imageUrl);
              }}>
              {item?.name}
            </Text>
          </View>
          <Image
            style={isSelected ? styles.selectIcn : unSelectIcnStyle}
            source={
              isSelected ? Icons.checkFilledCircle : Icons.checkCircleUnselected
            }
          />
        </Pressable>
      );
    },
    [
      currentSelectedReceipt?.receiptId,
      isViewReceipt,
      onSelection,
      receiptNameStyle,
      unSelectIcnStyle,
    ],
  );
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
    themedStyles.placeholder,
  );
  const inputTextStyle = StyleSheet.compose(
    styles.inputText,
    themedStyles.inputText,
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      dispatch(getAllReceipts(take, val.trim()));
    },
    [dispatch, take],
  );
  const onEndReach = useCallback(() => {
    if (take < receiptPage?.count) {
      loaderRef.current.show();
      dispatch(getAllReceipts(take + 20, searchText));
      setTake(take + 20);
    }
  }, [dispatch, receiptPage?.count, searchText, take]);
  return (
    <ScreenContainer
      renderContent={() => (
        <Fragment>
          <CustomNavBar
            containerStyle={styles.headerContainer}
            title={Strings.receipt}
            isRightActionVisible={true}
            listRightIcons={[Icons.plus]}
            onAction={handleActions}
          />
          <CustomTextInput
            autoCapitalize={'none'}
            keyboardType={'default'}
            placeholder={Strings.search}
            containerStyle={searchContainerStyle}
            inputStyle={inputTextStyle}
            value={searchText}
            isTitleVisible={false}
            leftIcon={Icons.search}
            onChangeText={onSearch}
          />
          <View style={styles.mainContainer}>
            <View style={styles.listContainer}>
              <FlatList
                data={listReceipts}
                keyExtractor={item => item.receiptId}
                renderItem={renderItem}
                ListEmptyComponent={
                  listReceipts != null && (
                    <ListEmptyComponent {...{themedStyles}} />
                  )
                }
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentListContainer}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.1}
              />
            </View>
            <View style={styles.bottomView}>
              <Pressable style={styles.submitButtonStyle} onPress={onSave}>
                <Text style={styles.saveText}>{Strings.save}</Text>
              </Pressable>
            </View>
          </View>
          <ImageViewCard
            imageUrl={receiptImg}
            isPreview={isViewReceipt}
            setPreview={setViewReceipt}
          />
        </Fragment>
      )}
    />
  );
};
export default SelectReceiptScreen;
