import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmDeletePopup,
  CustomNavBar,
  CustomProductCell,
  CustomTextInput,
  ErrorPopup,
  GoogleAdsComponent,
  loaderRef,
  MoreComponent,
  ScreenContainer,
  SortByPopup,
  SortFilterComponent,
  SuccessPopup,
} from '../../components';
import {listProductSortBy, productMoreOption} from '../../constants/Mockdata';
import {navigate} from '../../navigation/services/navigationServices';
import {getExistsLocation} from '../../redux/actions/locationsActions';
import {
  deleteFromProducts,
  getProductData,
} from '../../redux/actions/productActions';
import {Icons, ThemeStyles, moderateScale} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from '../Product/styles/ProductStyles';
import updateSoftInputMode from '../../hooks/updateSoftInputMode';
import FeedItem from './FeedItem';

const FeedScreen = ({navigation, route}) => {
  const isFromHome = route?.params?.isFromHome;
  const dispatch = useDispatch();
  const [take, setTake] = useState(10);
  const [isInitial, setInitial] = useState(true);
  const [searchText, setSearch] = useState('');
  const [isVisible, setVisible] = useState(false);

  const [isAllSelected, setSelectAll] = useState(false);

  const [listFiltered, setFilterProduct] = useState([]);
  const [isSelectionEnable, setSelection] = useState(false);
  const [isFromFilter, setFromFilter] = useState(false);

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {listProductData, productSortBy, productFilter, productPageDetail} =
    useSelector(state => state.productReducer);
  const {listLocations} = useSelector(state => state.locationsReducer);
  const {enableAdjustPan, disableAdjustPan} = updateSoftInputMode();
  const colors = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      console.log('product tabPress called');
    });
    return () => unsubscribe();
  }, [navigation]);
  useEffect(() => {
    if (isInitial) {
      loaderRef.current.show();
      dispatch(getProductData(take, '', productSortBy, productFilter));
      setInitial(false);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: 'CLEAR_PRODUCT_STATE'});
      dispatch({type: 'CLEAR_WARRANTY_STATE'});
      dispatch({type: 'CLEAR_RECEIPT_STATE'});
      dispatch({type: 'SELECT_RECEIPT', receipt: null});
      dispatch(getExistsLocation());
      if (!isFromFilter) {
        setFilterProduct([]);
        setSelection(false);
        setSearch('');
        dispatch(getProductData(take, '', productSortBy, productFilter));
      }
    });
    return () => unsubscribe();
  }, [
    dispatch,
    isFromFilter,
    isInitial,
    navigation,
    productFilter,
    productSortBy,
    take,
  ]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFromFilter(false);
    });
    return () => unsubscribe();
  }, [dispatch, navigation]);
  useFocusEffect(
    useCallback(() => {
      enableAdjustPan();
      return () => disableAdjustPan();
    }, [disableAdjustPan, enableAdjustPan]),
  );

  const handleActions = useCallback(
    val => {
      setSelectAll(false);
      if (!isSelectionEnable) {
        setVisible(true);
      } else {
        setSelection(false);
      }
    },
    [isSelectionEnable],
  );

  // Dummy data for FeedItem
  const dummyData = [
    {
      id: '1',
      author: 'Author 1',
      title: 'Beautiful Landscape',
      description: 'A beautiful landscape with mountains and a lake.',
      imageUrl:
        'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      author: 'Author 2',
      title: 'New iPhone Release',
      description: 'The latest iPhone model has just been released.',
      imageUrl:
        'https://www.apple.com/v/iphone/home/bv/images/meta/iphone__ky2k6x5u6vue_og.png',
      avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '3',
      author: 'Author 3',
      title: 'Stunning Sunset',
      description: 'A stunning sunset over the ocean.',
      imageUrl:
        'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: '4',
      author: 'Author 4',
      title: 'City at Night',
      description: 'The city lights up beautifully at night.',
      imageUrl:
        'https://images.pexels.com/photos/556667/pexels-photo-556667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: '5',
      author: 'Author 5',
      title: 'Mountain Hiking',
      description: 'An exhilarating hike in the mountains.',
      imageUrl:
        'https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      id: '6',
      author: 'Author 6',
      title: 'Delicious Cuisine',
      description: 'A plate of delicious gourmet cuisine.',
      imageUrl:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      id: '7',
      author: 'Author 7',
      title: 'Calm Beach',
      description: 'A calm and serene beach scene.',
      imageUrl:
        'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      id: '8',
      author: 'Author 8',
      title: 'Artistic Graffiti',
      description: 'Colorful and creative graffiti art.',
      imageUrl:
        'https://images.pexels.com/photos/1782842/pexels-photo-1782842.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      id: '9',
      author: 'Author 9',
      title: 'Winter Wonderland',
      description: 'A snowy landscape that looks like a winter wonderland.',
      imageUrl:
        'https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
    },
    {
      id: '10',
      author: 'Author 10',
      title: 'Forest Trail',
      description: 'A peaceful trail through a dense forest.',
      imageUrl:
        'https://images.pexels.com/photos/256701/pexels-photo-256701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
  ];

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            title={Strings.feed}
            isRightActionVisible={
              listProductData?.length > 0 && !isSelectionEnable
            }
            isBackVisible={true}
            isRightButton={isSelectionEnable}
            rightButtonText={Strings.done}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.moreVerticalCircle]}
            onAction={handleActions}
            onBackPress={() => navigation.goBack()} // Handle back button press
          />

          {/* FlatList to display FeedItems */}
          <FlatList
            data={dummyData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <FeedItem
                author={item.author}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl} // Pass imageUrl prop
                avatarUrl={item.avatarUrl}
              />
            )}
            contentContainerStyle={styles.feedList}
          />
          <Pressable
            style={styles.plusIconView}
            onPress={() => {
              if (listLocations?.length > 0) {
                navigate(NavigationRoutes.FeedUploadScreen);
              } else {
                setError(true);
                setErrorMessage(Strings.noLocationError);
              }
            }}>
            <Icon name="add" size={moderateScale(25)} />
          </Pressable>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Products)}
          />
        </>
      )}
    />
  );
};

export default FeedScreen;
