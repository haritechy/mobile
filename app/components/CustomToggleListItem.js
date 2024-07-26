import React, {useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import {Strings} from '../constants';
import CustomSwitch from './CustomSwitch';
import styles from './styles/ToggleListItemStyle';

const CustomToggleListItem = ({
  item,
  notificationPreferenceData,
  onToggleChange,
  themedStyles,
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleTitle = StyleSheet.compose(
    styles.detailTitle,
    themedStyles.labelText,
  );
  const notificationStatus = () => {
    const status = notificationPreferenceData;
    switch (item?.subTitle) {
      case Strings.warrantyExpiry:
        return status?.isWarrantyExpireAlert;
      case Strings.locationUpdate:
        return status?.isLocationUpdateAlert;
      case Strings.productUpdate:
        return status?.isProductUpdateAlert;
      case Strings.deviceActivation:
        return status?.isDeviceActivationAlert;
      case Strings.marketingAlert:
        return status?.isMarketingValueAlert;
      case Strings.pushNotification:
        return status?.isPushNotification;
      case Strings.emailNotification:
        return status?.isEmailNotification;
      case Strings.textNotification:
        return status?.isTextNotification;
      default:
        return false;
    }
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.switchButton}>
        <Pressable
          style={styles.rowContainer}
          onPress={() => onToggleChange(item)}>
          <View style={styles.leftView}>
            <Text style={toggleTitle}>{item.subTitle}</Text>
          </View>
          <View style={styles.toggleView}>
            <CustomSwitch
              isEnabled={notificationStatus()}
              toggleSwitch={() => onToggleChange(item)}
              style={isEnabled ? styles.toggleStyle : styles.disableToggleStyle}
            />
          </View>
        </Pressable>
        <View style={styles.separator} />
      </View>
    </View>
  );
};
export default CustomToggleListItem;
