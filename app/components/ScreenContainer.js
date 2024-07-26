import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors, Images, ThemeStyles} from '../theme';
import styles from './styles/ScreenContainerStyles';

// Useful component when you need to set background image or gradient effect to all screens
const ScreenContainer = ({
  renderContent,
  containerStyle,
  bottomLayer = false,
}) => {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(Colors.transparent);
  }
  const {mode} = useSelector(state => state.settingReducer);
  return (
    <View style={[containerStyle, styles.container]}>
      <ImageBackground
        resizeMode="cover"
        source={
          mode === 'light' ? Images.appBackground : Images.appBackgroundDark
        }
        style={styles.appBackgroundStyle}
      />
      {renderContent()}
      {bottomLayer && <SafeAreaView style={styles.footerArea} />}
    </View>
  );
};

ScreenContainer.propTypes = {
  renderContent: PropTypes.func,
  containerStyle: PropTypes.object,
  bottomLayer: PropTypes.bool,
};

export default ScreenContainer;
