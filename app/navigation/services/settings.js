import React from 'react';
import {Image} from 'react-native';
import {Colors, Icons} from '../../theme';
import styles from '../styles/AppNavigationStyles';

const renderImage = () => {
  return <Image source={Icons.backArrow} />;
};

export const stackScreenOptions = {
  headerBackTitleVisible: false,
  headerLeftContainerStyle: styles.backButtonStyle,
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
  headerTitleStyle: styles.headerText,
  headerStyle: styles.headerStyle,
  headerBackImage: renderImage,
  cardStyle: {
    backgroundColor: Colors.white,
  },
  headerShadowVisible: false,
  headerShown: false,
  headerTitle: '',
};
