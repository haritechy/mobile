import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Icons} from '../assets';
import {ThemeStyles} from '../theme';
import styles from './styles/FilterItemsStyles';
const LocationFilterItems = ({
  name,
  setVisible,
  listSelectedItems,
  setSelectedItems,
  listFilterItems,
  setFilterItems,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const selectedItemTextStyle = StyleSheet.compose(
    styles.selectedItemText,
    themedStyles.labelText,
  );
  const selectedItemViewStyle = StyleSheet.compose(
    styles.selectedItemView,
    themedStyles.themeBackground,
  );
  const cancelIcnStyle = StyleSheet.compose(
    styles.cancelIcn,
    themedStyles.navIcon,
  );
  const downIcnStyle = StyleSheet.compose(styles.downIcn, themedStyles.navIcon);
  const enableList = useCallback(() => {
    setVisible(prev => !prev);
  }, [setVisible]);
  const handleRemoveItems = useCallback(
    item => () => {
      const index = listSelectedItems.indexOf(item);
      if (index !== -1) {
        listSelectedItems.splice(index, 1);
        setSelectedItems([...listSelectedItems]);
        const listUpdated = listFilterItems.map(e => {
          return {
            ...e,
            isSelected: item?.id === e?.id ? false : e?.id,
          };
        });
        setFilterItems([...listUpdated]);
      }
    },
    [listFilterItems, listSelectedItems, setFilterItems, setSelectedItems],
  );
  return (
    <View style={styles.filterSelectionView}>
      {listSelectedItems.length === 0 ? (
        <Text style={styles.labelText}>{''}</Text>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {listSelectedItems.length > 0 ? (
          <View style={styles.selectedItemsContainer}>
            {listSelectedItems.map((item, i) => {
              return (
                <View key={i} style={selectedItemViewStyle}>
                  <Text numberOfLines={1} style={selectedItemTextStyle}>
                    {item[name]}
                  </Text>
                  <Pressable
                    style={styles.cancelView}
                    onPress={handleRemoveItems(item)}>
                    <Image
                      style={cancelIcnStyle}
                      source={Icons.crossCircleFill}
                    />
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
      <Pressable style={styles.downIconView} onPress={enableList}>
        <Image style={downIcnStyle} source={Icons.arrowDown} />
      </Pressable>
    </View>
  );
};

export default LocationFilterItems;
