import {useTheme} from '@react-navigation/native';
import React, {
  createRef,
  forwardRef,
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
} from 'react-native';
import {Icons} from '../assets';
import {ThemeStyles} from '../theme';
import ErrorView from './ErrorView';
import styles from './styles/CustomDropDownStyles';

const CustomDropDown = forwardRef(
  (
    {
      data,
      placeholder,
      labelId,
      labelName,
      selected,
      onSelect,
      style,
      error,
      dropDownContainer = {},
      isDisable = false,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [listFiltered, setFilterData] = useState(data);
    const DropdownButton = createRef();
    const [dropdownTop, setDropdownTop] = useState(0);
    const colors = useTheme();
    const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
    const buttonContainer = StyleSheet.compose(
      styles.button,
      style,
      error ? styles.errorBorder : {},
    );
    const itemViewStyle = StyleSheet.compose(
      styles.itemView,
      themedStyles.themeBackground,
    );
    const placeHolderTextStyle = StyleSheet.compose(
      styles.placeHolderText,
      themedStyles.placeholder,
    );
    const selectedTextStyle = StyleSheet.compose(
      styles.selectedText,
      themedStyles.labelText,
    );
    const textItemStyle = StyleSheet.compose(
      styles.textItem,
      themedStyles.labelText,
    );
    const dropDownStyle = StyleSheet.compose(
      styles.dropdown,
      dropDownContainer,
    );
    const toggleDropdown = () => {
      visible ? setVisible(false) : openDropdown();
    };
    useEffect(() => {
      setFilterData(data);
    }, [data]);
    const openDropdown = () => {
      DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);
      });
      setVisible(true);
    };
    const onItemPress = item => {
      onSelect(item);
      setVisible(false);
    };
    const renderItem = ({item}) => (
      <Pressable style={itemViewStyle} onPress={() => onItemPress(item)}>
        <Text style={textItemStyle}>{item[labelName]}</Text>
      </Pressable>
    );
    const renderDropdown = () => {
      return (
        <Modal visible={visible} transparent animationType="none">
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={[dropDownStyle, {top: dropdownTop}]}>
              <FlatList
                data={listFiltered}
                renderItem={renderItem}
                keyExtractor={item => item[labelId]}
              />
            </View>
          </Pressable>
        </Modal>
      );
    };
    return (
      <>
        <Pressable
          ref={DropdownButton}
          style={buttonContainer}
          disabled={isDisable}
          onPress={toggleDropdown}>
          {renderDropdown()}
          <View>
            <Text style={placeHolderTextStyle}>{placeholder}</Text>
            {selected ? (
              <Text style={selectedTextStyle}>{selected[labelName]}</Text>
            ) : null}
          </View>
          <Image style={styles.downArrow} source={Icons.arrowDown} />
        </Pressable>
        {error ? (
          <ErrorView {...{error}} errorStyle={styles.errorStyle} />
        ) : null}
      </>
    );
  },
);

export default CustomDropDown;
