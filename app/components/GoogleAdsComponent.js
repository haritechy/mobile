import React, {useCallback, useState} from 'react';
import {Platform, View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const GoogleAdsComponent = ({unitId, adContainerStyle, isHome = false}) => {
  const [isLoaded, setLoaded] = useState(true);
  if (Platform.OS === 'ios') {
    check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // This feature is not available (on this device / in this context
            break;
          case RESULTS.DENIED:
            // The permission has not been requested / is denied but requestable
            request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY).then(
              reqResult => {
                switch (reqResult) {
                  case RESULTS.GRANTED:
                    // The permission request is granted
                    break;
                  case RESULTS.BLOCKED:
                    // The permission request is denied and not requestable anymore
                    break;
                }
              },
            );
            break;
          case RESULTS.LIMITED:
            // The permission is limited: some actions are possible
            break;
          case RESULTS.GRANTED:
            // The permission is granted
            break;
          case RESULTS.BLOCKED:
            // The permission is denied and not requestable anymore
            break;
        }
      })
      .catch(error => {
        console.log('app transparency error', error);
      });
  }
  const onFailToLoad = useCallback(() => setLoaded(false), []);
  const onAddReceived = useCallback(() => setLoaded(true), []);
  return isLoaded ? (
    <>
      <View style={adContainerStyle}>
        <BannerAd
          unitId={unitId}
          size={
            isHome
              ? BannerAdSize.LARGE_BANNER
              : BannerAdSize.ANCHORED_ADAPTIVE_BANNER
          }
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={onAddReceived}
          onAdFailedToLoad={onFailToLoad}
        />
      </View>
    </>
  ) : null;
};
export default GoogleAdsComponent;
