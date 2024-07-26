import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets';
import {
  CustomNavBar,
  GoogleAdsComponent,
  ScreenContainer,
} from '../../components';
import {AppConstants, Strings, ThemeDataSource} from '../../constants';
import {switchTheme} from '../../redux/actions/settingActions';
import {ThemeStyles} from '../../theme';
import {getAddUnitId} from '../../utils/helper';
import styles from './styles/ThemeStyle';

const ThemeScreen = () => {
  const {mode} = useSelector(state => state.settingReducer);
  const [selectedIndex, setSelectedIndex] = useState(mode === 'dark' ? 0 : 1);
  const dispatch = useDispatch();
  useEffect(() => console.log('current theme mode ', mode), [mode]);
  const handleSelection = useCallback(
    index => {
      console.log('selected index', index);
      setSelectedIndex(index);
      dispatch(switchTheme(index === 0 ? 'dark' : 'light'));
    },
    [dispatch],
  );
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const themeLabel = StyleSheet.compose(
    styles.titleText,
    themedStyles.labelText,
  );
  const seperatorStyle = StyleSheet.compose(
    styles.separator,
    themedStyles.seperator,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.theme}
            containerStyle={styles.headerContainer}
          />
          <View style={styles.contentContainer}>
            {ThemeDataSource.map((ele, index) => {
              const isSelected = index === selectedIndex;
              return (
                <View key={index} style={styles.radioButton}>
                  <Pressable
                    style={styles.rowContainer}
                    onPress={() => handleSelection(index)}>
                    <View style={styles.leftView}>
                      <Text style={themeLabel}>{ele.value}</Text>
                    </View>
                    <Image
                      source={
                        isSelected ? Icons.radioSelected : Icons.radioUnSelected
                      }
                      style={
                        isSelected ? styles.selectedIcon : styles.unSelectedIcon
                      }
                    />
                  </Pressable>
                  <View style={seperatorStyle} />
                </View>
              );
            })}
          </View>
          <GoogleAdsComponent
            adContainerStyle={styles.bannerView}
            unitId={getAddUnitId(AppConstants.Banners.Theme)}
          />
        </>
      )}
    />
  );
};
export default ThemeScreen;
