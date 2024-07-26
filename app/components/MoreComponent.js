import {useTheme} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  Text,
  View,
  Modal,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import {ThemeStyles} from '../theme';
import styles from './styles/MoreStyles';
const MoreComponent = ({listOptions, isVisible, setVisible, onSelect}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const optionTextStyle = StyleSheet.compose(
    styles.optionText,
    themedStyles.labelText,
  );
  const modalViewStyle = StyleSheet.compose(
    styles.modalView,
    themedStyles.themeBackground,
  );
  const optionIconStyle = StyleSheet.compose(styles.backButtonStyle, [
    styles.optionIcon,
    themedStyles.navIcon,
  ]);
  const renderItem = useCallback(
    item => (
      <Pressable style={styles.optionItem} onPress={onSelect(item.item)}>
        <Text style={optionTextStyle}>{item.item.name}</Text>
        <Image style={optionIconStyle} source={item.item.icon} />
      </Pressable>
    ),
    [onSelect, optionIconStyle, optionTextStyle],
  );
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setVisible(!isVisible)}>
          <View style={modalViewStyle}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listOptions}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default MoreComponent;
