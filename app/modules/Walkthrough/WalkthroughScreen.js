import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles/WalkthroughStyles';

const WalkthroughScreen = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.logoStyle} source={item.image} />
      </View>
      <View style={styles.detailView}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </View>
  );
};
export default WalkthroughScreen;
