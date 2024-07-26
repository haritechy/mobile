import PropTypes from 'prop-types';
import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../theme';
import {Strings} from '../constants';
import styles from './styles/CustomSocialMediaButtonStyle';
const CustomSocialMediaButton = ({
  signinOption,
  onPress,
  image,
  containerStyle,
  textStyle,
  imageStyle,
  tintColor,
}) => {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <Image source={image} style={[styles.image, imageStyle]} />
      <Text style={[styles.signinText, textStyle]}>
        {signinOption === 'Email'
          ? Strings.signinUsingEmail
          : `Continue with ${signinOption}`}
      </Text>
      <View style={styles.iconForwardContainer}>
        <Icon
          name="arrow-forward-ios"
          size={20}
          style={styles.arrowIconStyle}
          color={tintColor ? tintColor : Colors.black}
        />
      </View>
    </Pressable>
  );
};

CustomSocialMediaButton.propTypes = {
  image: PropTypes.number,
  onPress: PropTypes.func,
};
export default CustomSocialMediaButton;
