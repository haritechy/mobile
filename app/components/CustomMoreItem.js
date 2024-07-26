import React from 'react';
import {Image, Text, Pressable, View, StyleSheet} from 'react-native';
import {NavigationRoutes, Strings} from '../constants';
import {navigate} from '../navigation/services/navigationServices';
import {Icons} from '../theme';
import styles from './styles/MoreItemStyles';

const CustomMoreItem = ({item, setVisible, themedStyles}) => {
  const navigateTo = async ({item}) => {
    switch (item.title) {
      case Strings.accountSettings:
        return navigate(NavigationRoutes.AccountSettings, {themedStyles});
      case Strings.helpAndSupport:
        return navigate(NavigationRoutes.HelpSupportScreen);
      case Strings.about:
        return navigate(NavigationRoutes.AboutScreen);
      case Strings.receiptsList:
        return navigate(NavigationRoutes.ReceiptsListScreen);
      case Strings.warrantyList:
        return navigate(NavigationRoutes.WarrantyListScreen);
      case Strings.feed:
        return navigate(NavigationRoutes.FeedScreen);
      case Strings.contact:
        return navigate(NavigationRoutes.ContactUsScreen);
      case Strings.logout:
        setVisible(true);
        break;
      default:
        break;
    }
  };
  const itemText = StyleSheet.compose(styles.titleText, themedStyles.labelText);
  const seperator = StyleSheet.compose(
    styles.separator,
    themedStyles.seperator,
  );
  const rigtArrowStyle = StyleSheet.compose(
    styles.rightIcn,
    themedStyles.navIcon,
  );
  return (
    <View style={styles.contentContainer}>
      <Pressable
        style={styles.rowContainer}
        onPress={() => {
          navigateTo({item});
        }}>
        <View style={styles.leftView}>
          <Image source={item.icon} style={styles.leftIcon} />
          <Text style={itemText}>{item.title}</Text>
        </View>
        <Image source={Icons.arrowRight} style={rigtArrowStyle} />
      </Pressable>
      <View style={seperator} />
    </View>
  );
};
export default CustomMoreItem;
