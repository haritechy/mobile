import React from 'react';
import {Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {Colors} from '../theme';

const FastImageView = ({style, uri, defaultSource}) => {
  const {mode} = useSelector(state => state.settingReducer);

  const defaultTintColor = mode === 'light' ? Colors.black : Colors.white;
  const defaultStyle = StyleSheet.compose(style, {tintColor: defaultTintColor});
  return uri ? (
    <FastImage
      style={style}
      source={
        uri
          ? {
              uri: uri,
              priority: FastImage.priority.high,
            }
          : defaultSource
      }
      resizeMode={FastImage.resizeMode.cover}
      defaultSource={defaultSource}
    />
  ) : (
    <Image source={defaultSource} style={defaultStyle} />
  );
};

export default FastImageView;
