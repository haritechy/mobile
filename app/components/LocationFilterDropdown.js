import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  Text,
  Modal,
  FlatList,
  View,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {Icons, ThemeStyles} from '../theme';
import styles from './styles/FilterDropdownStyles';

const LocationFilterDropdown = ({
  name,
  isVisible,
  setVisible,
  listFilterItems,
  setFilterItems,
  data,
  listSelectedItems,
  setSelectedItems,
}) => {
  useEffect(() => {
    if (listSelectedItems?.length > 0) {
      const listUpdated = listFilterItems?.map(e => {
        const selectedItem = listSelectedItems.find(c => c?.id === e?.id);
        return {
          ...e,
          isSelected: selectedItem?.id === e?.id,
        };
      });
      setFilterItems([...listUpdated]);
    } else {
      const listFiltered = data?.map(e => {
        return {...e, isSelected: false};
      });
      setFilterItems(listFiltered);
    }
  }, []);
  const handleSelectItem = category => {
    const listUpdated = listFilterItems.map(e => {
      return {
        ...e,
        isSelected:
          category?.id === e?.id ? !category?.isSelected : e?.isSelected,
      };
    });
    setFilterItems([...listUpdated]);
  };
  const handleConfirmation = useCallback(() => {
    setVisible(false);
    const listUpdated = listFilterItems.filter(e => e?.isSelected);
    setSelectedItems([...listUpdated]);
  }, [listFilterItems, setSelectedItems, setVisible]);
  const renderItem = ({item}) => {
    const itemTextStyle = StyleSheet.compose(
      styles.itemText,
      themedStyles.labelText,
    );
    const itemViewStyle = StyleSheet.compose(
      styles.itemView,
      themedStyles.themeBackground,
    );
    const selectIcnStyle = StyleSheet.compose(
      styles.selectIcn,
      themedStyles.navIcon,
    );
    return (
      <Pressable style={itemViewStyle} onPress={() => handleSelectItem(item)}>
        <Image
          style={item.isSelected ? styles.unSelectIcn : selectIcnStyle}
          source={
            item.isSelected
              ? Icons.checkFilledCircle
              : Icons.checkCircleUnselected
          }
        />
        <Text style={itemTextStyle}>{item[name]}</Text>
        <View style={styles.separator} />
      </Pressable>
    );
  };
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const flatListViewStyle = StyleSheet.compose(
    styles.flatListView,
    themedStyles.themeBackground,
  );
  const listTopView = StyleSheet.compose(
    styles.closeView,
    themedStyles.themeBackground,
  );
  const closeIcnStyle = StyleSheet.compose(
    styles.closeIcn,
    themedStyles.navIcon,
  );
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={() => {}}>
      <SafeAreaView style={styles.mainView}>
        <Pressable style={styles.modalContainer} onPress={handleConfirmation}>
          <View style={styles.dropdown}>
            <FlatList
              style={flatListViewStyle}
              data={listFilterItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={
                <Pressable style={listTopView} onPress={handleConfirmation}>
                  <Image source={Icons.cross} style={closeIcnStyle} />
                </Pressable>
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default LocationFilterDropdown;
