import React, {useCallback, useState, useEffect} from 'react';
import {View, FlatList, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Strings} from '../../constants';
import {
  CustomNavBar,
  ErrorPopup,
  FastImageView,
  loaderRef,
  LocationItem,
  ScreenContainer,
  SuccessPopup,
} from '../../components';
import styles from './styles/MoveProductStyles';
import {moveProductToLocation} from '../../redux/actions/productActions';
import {Images} from '../../assets';

const MoveProductScreen = ({route, navigation}) => {
  const {selectedProducts} = route?.params;
  const [listFiltered, setFilterLocation] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {moveProductData, moveProductError} = useSelector(
    state => state.productReducer,
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let listNew = [];
      listLocations.map(location => {
        listNew.push({
          ...location,
          isSelected: false,
        });
      });
      listNew = listLocations.filter(
        selectedLocation =>
          !selectedProducts
            .map(sl => sl.location)
            .includes(selectedLocation.name),
      );
      setFilterLocation([...listNew]);
    });
    return () => unsubscribe();
  }, [listLocations, navigation, selectedProducts]);
  const handleActions = useCallback(() => navigation.goBack(), [navigation]);
  const handleMove = useCallback(() => {
    const locationId = listFiltered?.find(e => e.isSelected)?.id;
    if (locationId) {
      let productsId = [];
      selectedProducts.filter(value => productsId.push(value.productId));
      const productMoveData = {
        productsId,
        locationId,
      };
      loaderRef.current.show();
      dispatch(
        moveProductToLocation(productMoveData, (isSuccess, data) => {
          if (isSuccess) {
            setVisible(true);
          }
        }),
      );
    }
  }, [dispatch, listFiltered, selectedProducts]);
  const onOkayPress = useCallback(() => {
    setVisible(false);
    navigation.goBack();
  }, [navigation]);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <LocationItem
          {...{item, index, listFiltered, setFilterLocation}}
          isFromMove={true}
          isSelectionEnable={true}
        />
      );
    },
    [listFiltered],
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.selectLocation}
            isRightButton={true}
            rightButtonText={Strings.cancel}
            containerStyle={styles.headerContainer}
            headerTextStyle={styles.headerStyle}
            isSubtitleVisible={true}
            subtitle={Strings.moveProductToNewLocation}
            onAction={handleActions}
          />
          <View style={styles.topView}>
            <View style={styles.productView}>
              <FastImageView
                style={styles.leftImage}
                uri={selectedProducts[0]?.defaultImageUrl}
                defaultSource={Images.defaultImage}
              />
              <View style={styles.productDetail}>
                <Text style={styles.productTitle} numberOfLines={1}>
                  {`${selectedProducts[0]?.productName} ${
                    selectedProducts?.length > 1
                      ? `& ${selectedProducts?.length - 1} ${Strings.more}`
                      : ''
                  }`}
                </Text>
                <Text
                  style={
                    styles.productCount
                  }>{`${selectedProducts.length} ${Strings.products}`}</Text>
              </View>
            </View>
            <View style={styles.seperator} />
            <View style={styles.listContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={listFiltered}
                keyExtractor={item => item.id}
                style={styles.listContainer}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.bottomView}>
            <Pressable style={styles.buttonView} onPress={handleMove}>
              <Text style={styles.buttonText}>{Strings.move}</Text>
            </Pressable>
          </View>
          <SuccessPopup
            {...{isVisible, setVisible}}
            successText={moveProductData?.message}
            onOkPress={onOkayPress}
          />
          <ErrorPopup
            isVisible={isError}
            setVisible={setError}
            errorText={moveProductError}
          />
        </>
      )}
    />
  );
};
export default MoveProductScreen;
