import {useTheme} from '@react-navigation/native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {Colors, ThemeStyles} from '../theme';
import CustomTextInput from './CustomTextInput';
import ErrorView from './ErrorView';
import styles from './styles/ListDataStyles';
import {postAddCities} from '../redux/actions/addressActions';
import {useDispatch} from 'react-redux';

const RenderSearch = ({searchText, onSearch, onClearSearch, themedStyles}) => {
  const searchContainerStyle = StyleSheet.compose(
    styles.searchContainer,
    themedStyles.themeBackground,
  );
  return (
    <CustomTextInput
      placeholder={`${Strings.searchHere}...`}
      containerStyle={searchContainerStyle}
      inputStyle={styles.inputText}
      value={searchText}
      rightActionIcn={
        searchText?.length > 0 ? Icons.crossCircleFill : undefined
      }
      returnKeyType={'done'}
      onRightAction={onClearSearch}
      onChangeText={onSearch}
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  );
};

const EmptyView = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyData}>{Strings.noDataFound}</Text>
  </View>
);

const CityHeader = ({
  themedStyles,
  isCity,
  onOtherCityPress,
  isOtherCity,
  setOtherCityText,
  otherCityText,
  onAddCityPress,
  addCityError,
  stateId,
  isLoading,
}) => {
  const TextInPutContainerStyle = StyleSheet.compose(
    styles.otherCityContainer,
    themedStyles.themeBackground,
  );
  return (
    <>
      {isCity ? (
        <View style={styles.listHeaderView}>
          {stateId != null ? (
            <Pressable onPress={onOtherCityPress} style={styles.otherBtn}>
              <Text
                style={
                  styles.addLinkText
                }>{`${Strings.add} ${Strings.otherCity}`}</Text>
            </Pressable>
          ) : null}
          {isOtherCity ? (
            <>
              <View style={styles.otherCityTextInputView}>
                <CustomTextInput
                  placeholder={Strings.otherCity}
                  containerStyle={TextInPutContainerStyle}
                  inputStyle={styles.inputText}
                  value={otherCityText}
                  returnKeyType={'done'}
                  maxLength={30}
                  onChangeText={val => setOtherCityText(val)}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <Pressable onPress={onAddCityPress} style={styles.addOtherBtn}>
                  {isLoading ? (
                    <ActivityIndicator size={'small'} color={Colors.black} />
                  ) : (
                    <Text style={styles.textItem}>{Strings.save}</Text>
                  )}
                </Pressable>
              </View>
              {addCityError && (
                <Text style={styles.errorText}>{addCityError}</Text>
              )}
            </>
          ) : null}
        </View>
      ) : null}
    </>
  );
};
const ListDataPopup = forwardRef(
  (
    {
      data,
      label,
      placeholder,
      labelId,
      labelName,
      selected,
      onSelect,
      style,
      error,
      isDisable = false,
      isCurrency = false,
      isCity = false,
      stateId,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [searchText, setSearch] = useState('');
    const [otherCityText, setOtherCityText] = useState('');
    const [addCityError, setAddCityError] = useState('');
    const [isOtherCity, setOtherCity] = useState(false);
    const [listFiltered, setFilterData] = useState(data);
    const colors = useTheme();
    const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
    const dispatch = useDispatch();
    const buttonContainer = StyleSheet.compose(
      styles.button,
      style,
      error ? styles.errorBorder : {},
    );
    const modalStyle = StyleSheet.compose(
      styles.modalView,
      themedStyles.themeBackground,
    );
    const itemViewStyle = StyleSheet.compose(
      styles.itemView,
      themedStyles.themeBackground,
    );
    const placeHolderTextStyle = StyleSheet.compose(
      styles.placeHolderText,
      themedStyles.placeholder,
    );
    const labelStyle = StyleSheet.compose(
      styles.labelText,
      themedStyles.labelText,
    );
    const selectedTextStyle = StyleSheet.compose(
      styles.selectedText,
      themedStyles.labelText,
    );
    const textItemStyle = StyleSheet.compose(
      styles.textItem,
      themedStyles.labelText,
    );
    const closeIcnStyle = StyleSheet.compose(
      styles.closeIcn,
      themedStyles.navIcon,
    );
    useEffect(() => {
      setFilterData(data);
    }, [data]);
    const toggleDropdown = useCallback(() => setVisible(prev => !prev), []);
    const onSearch = useCallback(
      val => {
        setSearch(val);
        const listNew = data.filter(e =>
          isCurrency
            ? e[labelName].toLowerCase().includes(val.toLowerCase()) ||
              e.name.toLowerCase().includes(val.toLowerCase())
            : e[labelName].toLowerCase().includes(val.toLowerCase()),
        );
        setFilterData(listNew);
      },
      [data, isCurrency, labelName],
    );
    const onClearSearch = useCallback(() => {
      setSearch('');
      setFilterData(data);
    }, [data]);
    const onItemPress = useCallback(
      item => () => {
        onSelect(item);
        setVisible(false);
      },
      [onSelect],
    );
    const onOtherCityPress = useCallback(() => {
      setOtherCity(prev => !prev);
    }, []);

    const onAddCityPress = useCallback(() => {
      const cityValue = otherCityText.trim();
      const addCitiesData = {
        id: 0,
        stateId: stateId,
        cityName: cityValue,
      };
      setOtherCityText(cityValue);
      if (cityValue.length > 0) {
        setLoading(true);
        dispatch(
          postAddCities(addCitiesData, (isSuccess, addedCity) => {
            if (isSuccess && addedCity?.result) {
              setOtherCityText('');
              setOtherCity(false);
              onSelect(addedCity?.result);
              setVisible(false);
              setLoading(false);
            } else {
              setLoading(false);
              setAddCityError(addedCity?.message);
            }
          }),
        );
      } else {
        setAddCityError(Strings.enterCityName);
      }
    }, [dispatch, onSelect, otherCityText, stateId]);

    const handleClose = useCallback(() => {
      if (isCity) {
        setOtherCityText('');
        setAddCityError('');
        setOtherCity(false);
      }
      setSearch('');
      setVisible(false);
      setFilterData(data);
    }, [data, isCity]);
    const renderItem = ({item}) => (
      <>
        <Pressable style={itemViewStyle} onPress={onItemPress(item)}>
          <Text style={textItemStyle}>
            {isCurrency ? `${item.name}(${item[labelName]})` : item[labelName]}
          </Text>
        </Pressable>
        <View style={styles.seperator} />
      </>
    );
    const renderDropdown = () => {
      return (
        <SafeAreaView style={styles.container}>
          <Modal animationType="fade" transparent={true} visible={visible}>
            <Pressable style={styles.modalContainer} onPress={handleClose}>
              <View style={modalStyle}>
                <View style={styles.topHeader}>
                  <Text style={labelStyle}>{label}</Text>
                  <Pressable onPress={handleClose}>
                    <Image source={Icons.cross} style={closeIcnStyle} />
                  </Pressable>
                </View>
                {data?.length > 0 ? (
                  <RenderSearch
                    {...{searchText, onSearch, onClearSearch, themedStyles}}
                  />
                ) : null}
                <FlatList
                  data={listFiltered}
                  renderItem={renderItem}
                  keyboardShouldPersistTaps={'handled'}
                  keyExtractor={item => item[labelId]}
                  ListEmptyComponent={<EmptyView />}
                  ListHeaderComponent={
                    !listFiltered?.length ? (
                      <CityHeader
                        {...{
                          themedStyles,
                          isCity,
                          onOtherCityPress,
                          isOtherCity,
                          setOtherCityText,
                          otherCityText,
                          onAddCityPress,
                          addCityError,
                          stateId,
                          isLoading,
                          setLoading,
                        }}
                      />
                    ) : null
                  }
                />
              </View>
            </Pressable>
          </Modal>
        </SafeAreaView>
      );
    };
    return (
      <>
        <Pressable
          style={buttonContainer}
          disabled={isDisable}
          onPress={toggleDropdown}>
          <View>
            <Text style={placeHolderTextStyle}>{placeholder}</Text>
            {selected ? (
              <Text style={selectedTextStyle}>
                {isCurrency ? selected.currencyCode : selected[labelName]}
              </Text>
            ) : null}
          </View>
          <Image style={styles.downArrow} source={Icons.arrowDown} />
        </Pressable>
        {renderDropdown()}
        {error ? (
          <ErrorView {...{error}} errorStyle={styles.errorStyle} />
        ) : null}
      </>
    );
  },
);

export default ListDataPopup;
