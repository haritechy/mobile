import {useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Text, View, Modal, Pressable, Image, StyleSheet} from 'react-native';
import {Icons} from '../assets';
import {Strings} from '../constants';
import {ThemeStyles} from '../theme';
import styles from './styles/SortByPopupStyles';
const SortByPopup = ({isVisible, setVisible, sortBy, listSort, onSort}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const headerTextStyle = StyleSheet.compose(
    styles.headerText,
    themedStyles.labelText,
  );
  const sortNameStyle = StyleSheet.compose(
    styles.sortName,
    themedStyles.labelText,
  );
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => setVisible(!isVisible)}>
        <View style={modalViewStyle}>
          <Text style={headerTextStyle}>{Strings.sortBy}</Text>
          <View style={styles.listSort}>
            {listSort.map((e, index) => {
              const isSelected = e === sortBy;
              return (
                <Pressable
                  key={index}
                  style={styles.sortTypeView}
                  onPress={() => onSort(e)}>
                  <Text
                    style={isSelected ? styles.selectedType : sortNameStyle}>
                    {e.type}
                  </Text>
                  {isSelected && (
                    <Image source={Icons.sort} style={styles.sortIcn} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
export default SortByPopup;
