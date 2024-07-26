import React, {useMemo, useCallback} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {Strings} from '../../constants';
import styles from './styles/HelpSupportStyles';
import {CustomNavBar, ScreenContainer} from '../../components';
import {useTheme} from '@react-navigation/native';
import {ThemeStyles} from '../../theme';

const HelpSupportScreen = ({navigation}) => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const supportLabelStyle = StyleSheet.compose(
    styles.supportLabelText,
    themedStyles.labelText,
  );
  const connectLabelStyle = StyleSheet.compose(
    styles.connectLabelText,
    themedStyles.labelText,
  );
  const onMailTo = useCallback(
    mailTo => async () => {
      await Linking.openURL(`mailto:${mailTo}`)
        .then(() => null)
        .catch(() => null);
    },
    [],
  );
  const renderContent = useCallback(
    () => (
      <>
        <CustomNavBar
          headerTextStyle={styles.headerStyle}
          title={Strings.helpAndSupport}
          containerStyle={styles.headerContainer}
        />
        <View style={styles.mainContainer}>
          <Text style={supportLabelStyle}>
            For any support required on the application please send an email to
            <Text
              suppressHighlighting={true}
              onPress={onMailTo('customerservice@melbeez.com')}
              style={styles.emailText}>
              {' customerservice@melbeez.com'}
            </Text>
          </Text>
          <Text style={connectLabelStyle}>
            To contact our sales team for advertisement or partnership please
            send an email to
            <Text
              suppressHighlighting={true}
              onPress={onMailTo('sales@melbeez.com')}
              style={styles.emailText}>
              {' sales@melbeez.com'}
            </Text>
          </Text>
        </View>
      </>
    ),
    [connectLabelStyle, onMailTo, supportLabelStyle],
  );

  return <ScreenContainer renderContent={renderContent} />;
};
export default HelpSupportScreen;
