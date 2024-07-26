import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  SafeAreaView,
  Image,
  Keyboard,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import CustomTextInput from './CustomTextInput';
import styles from './styles/CountryListPopupStyles';

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

const CountryListPopup = ({
  isVisible,
  setVisible,
  setCountryCode,
  listCountries,
}) => {
  const [listFiltered, setFilterData] = useState();
  const [searchText, setSearch] = useState('');
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const onSelect = useCallback(
    e => () => {
      setVisible(false);
      setCountryCode(`${e?.countryCode}`);
    },
    [setCountryCode, setVisible],
  );
  const onSearch = useCallback(
    val => {
      setSearch(val);
      if (val?.length) {
        const listNew = listCountries.filter(
          e =>
            e?.name.toLowerCase().includes(val.toLowerCase()) ||
            e?.countryCode.toLowerCase().includes(val.toLowerCase()),
        );
        setFilterData(listNew);
      } else {
        setFilterData(listCountries);
      }
    },
    [listCountries],
  );
  const onClearSearch = useCallback(() => {
    setSearch('');
    setFilterData(listCountries);
  }, [listCountries]);
  const handleClose = useCallback(() => {
    setVisible(false);
    setFilterData(listCountries);
  }, [listCountries, setVisible]);
  const modalStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const itemViewStyle = StyleSheet.compose(
    styles.countryItem,
    themedStyles.themeBackground,
  );
  const textItemStyle = StyleSheet.compose(
    styles.countryName,
    themedStyles.labelText,
  );
  const labelStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  const closeIcnStyle = StyleSheet.compose(
    styles.closeIcn,
    themedStyles.navIcon,
  );
  const renderItem = ({item, index}) => (
    <View key={index}>
      <Pressable style={itemViewStyle} onPress={onSelect(item)}>
        {/* <Image source={Icons.flagIndia} style={styles.flagIcon} /> */}
        <Text
          style={textItemStyle}>{`${item?.name}(${item?.countryCode})`}</Text>
      </Pressable>
      <View style={styles.seperator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable style={styles.modalContainer} onPress={handleClose}>
          <View style={modalStyle}>
            <View style={styles.topHeader}>
              <Text style={labelStyle}>{Strings.selectCountry}</Text>
              <Pressable onPress={handleClose}>
                <Image source={Icons.cross} style={closeIcnStyle} />
              </Pressable>
            </View>
            <View style={styles.listSort}>
              {listCountries?.length > 0 ? (
                <RenderSearch
                  {...{searchText, onSearch, onClearSearch, themedStyles}}
                />
              ) : null}
              <FlatList
                data={listFiltered?.length ? listFiltered : listCountries}
                renderItem={renderItem}
                keyboardShouldPersistTaps={'handled'}
                keyExtractor={item => item?.id}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};
export default CountryListPopup;
