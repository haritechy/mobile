import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Strings} from '../../constants';
import styles from './styles/AboutStyles';
import {CustomNavBar, ScreenContainer} from '../../components';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../../theme';

const AboutScreen = ({navigation}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const infoTitleStyle = StyleSheet.compose(
    styles.subText,
    themedStyles.labelText,
  );
  const infoLabelStyle = StyleSheet.compose(
    styles.infoLabelText,
    themedStyles.labelText,
  );
  const infoValueStyle = StyleSheet.compose(
    styles.infoValueText,
    themedStyles.labelText,
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={Strings.about}
            containerStyle={styles.headerContainer}
          />
          <View style={styles.mainContainer}>
            <Text style={infoTitleStyle}>
              This app is registered to Melbeez, a Worldyn product
            </Text>
            <View style={styles.infoRow}>
              <Text style={infoLabelStyle}>Version</Text>
              <Text style={infoValueStyle}>{DeviceInfo.getVersion()}</Text>
            </View>
          </View>
        </>
      )}
    />
  );
};
export default AboutScreen;
