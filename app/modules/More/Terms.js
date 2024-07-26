import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

// LOCAL IMPORTS
import {CustomNavBar, ScreenContainer} from '../../components';
import {Colors} from '../../theme';
import styles from './styles/TermsStyles';

const Terms = ({navigation, route}) => {
  const {webUrl, title} = route?.params;
  const RenderTermsServices = () => (
    <WebView
      startInLoadingState
      source={{
        uri: webUrl,
      }}
      style={styles.bottomContainer}
      renderLoading={() => {
        return (
          <ActivityIndicator
            size="large"
            color={Colors.black}
            style={styles.webViewIndicator}
          />
        );
      }}
    />
  );
  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            headerTextStyle={styles.headerStyle}
            title={title}
            containerStyle={styles.headerContainer}
          />
          <SafeAreaView style={styles.contentContainer}>
            {webUrl ? <RenderTermsServices /> : null}
          </SafeAreaView>
        </>
      )}
    />
  );
};
export default Terms;
