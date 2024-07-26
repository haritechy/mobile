import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/SortFilterStyles';
const SortFilterComponent = ({
  handleSortBy,
  handleFilter,
  sortBy,
  isFilter,
}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const sortIcnStyle = StyleSheet.compose(styles.sortIcn, themedStyles.navIcon);
  const sortByTextStyle = StyleSheet.compose(
    styles.sortByText,
    themedStyles.labelText,
  );
  const sortTypeTextStyle = StyleSheet.compose(
    styles.sortTypeText,
    themedStyles.placeholder,
  );

  return (
    <View style={styles.topSortFilterView}>
      <Pressable style={styles.sortFilterSubView} onPress={handleSortBy}>
        {sortBy !== '' ? <View style={styles.sortSignal} /> : null}
        <Image style={sortIcnStyle} source={Icons.sort} />
        <View style={styles.sortColumView}>
          <Text style={sortByTextStyle}>{Strings.sortBy}</Text>
          <Text style={sortTypeTextStyle}>
            {sortBy ? sortBy.type : Strings.applySort}
          </Text>
        </View>
      </Pressable>
      <View style={styles.verticalSeperator} />
      <Pressable style={styles.sortFilterSubView} onPress={handleFilter}>
        {isFilter ? <View style={styles.sortSignal} /> : null}
        <Image style={sortIcnStyle} source={Icons.filter} />
        <View style={styles.sortColumView}>
          <Text style={sortByTextStyle}>{Strings.filter}</Text>
          <Text style={sortTypeTextStyle}>{Strings.applyFilter}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SortFilterComponent;
