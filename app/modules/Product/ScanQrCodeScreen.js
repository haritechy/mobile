import React, {createRef, useCallback, useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import icons from '../../assets/icons';
import {QrCodeErrorPopup, CustomNavBar, loaderRef} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import styles from './styles/ScanQrCodeStyles';
import {useDispatch} from 'react-redux';
import {getScannedProducts} from '../../redux/actions/productActions';
import {postBarCodeLog} from '../../redux/actions/logsActions';

const ScanQrCodeScreen = ({navigation, route}) => {
  const {isFromDelivery, locationDetail} = route?.params || {};
  const scanner = createRef();
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const onScanCode = useCallback(
    e => {
      loaderRef.current.show();
      dispatch(
        getScannedProducts(e?.data, (isSuccess, data) => {
          let barCodeLogData = {
            barCode: e?.data,
            title: data?.title || null,
            status:
              isSuccess && data
                ? AppConstants.statusTypes.Success
                : AppConstants.statusTypes.Fail,
            errorMessage: data ? null : Strings.productScanError,
          };
          dispatch(postBarCodeLog(barCodeLogData));
          if (isSuccess && data) {
            loaderRef.current.hide();
            navigation.goBack();
            isFromDelivery
              ? navigation.navigate(NavigationRoutes.AddProductScreen, {
                  isFromScan: true,
                  qrData: data,
                  barCodeNumber: e?.data,
                  locationDetail,
                  isFromDelivery,
                })
              : navigation.navigate(NavigationRoutes.AddProductScreen, {
                  isFromScan: true,
                  qrData: data,
                  barCodeNumber: e?.data,
                });
          } else {
            loaderRef.current.hide();
            setVisible(true);
          }
        }),
      );
    },
    [dispatch, isFromDelivery, locationDetail, navigation],
  );
  const handleAlbumClick = useCallback(
    () => console.log('handleAlbumClick call'),
    [],
  );
  const handleSkip = useCallback(() => {
    navigation.goBack();
    isFromDelivery
      ? navigation.navigate(NavigationRoutes.AddProductScreen, {
          locationDetail,
          isFromDelivery,
        })
      : navigation.navigate(NavigationRoutes.AddProductScreen);
  }, [isFromDelivery, locationDetail, navigation]);
  const handleTorchClick = useCallback(() => setVisible(true), []);
  const onManualEntry = useCallback(() => {
    setVisible(false);
    navigation.goBack();
    isFromDelivery
      ? navigation.navigate(NavigationRoutes.AddProductScreen, {
          locationDetail,
          isFromDelivery,
        })
      : navigation.navigate(NavigationRoutes.AddProductScreen);
  }, [isFromDelivery, locationDetail, navigation]);
  const onCancel = useCallback(() => {
    setVisible(false);
    scanner.current.reactivate();
  }, [scanner]);
  return (
    <View style={styles.contentContainer}>
      <CustomNavBar
        backIcon={icons.cross}
        title={Strings.scanQrBarCode}
        headerTextStyle={styles.headerText}
        leftIconStyle={styles.backIcon}
      />
      <QRCodeScanner
        showMarker
        ref={scanner}
        reactivateTimeout={5000}
        flashMode={RNCamera.Constants.FlashMode.auto}
        cameraContainerStyle={styles.cameraContainer}
        cameraStyle={styles.cameraStyle}
        markerStyle={styles.markerStyle}
        fadeIn
        onRead={onScanCode}
      />
      <View style={styles.bottomContainer}>
        <Pressable style={styles.skipButtonView} onPress={handleSkip}>
          <Text style={styles.skipbuttonText}>
            {Strings.skipAndEnterDetailManually}
          </Text>
        </Pressable>
        {/* <View style={styles.bottomButtonsView}>
          <Pressable style={styles.iconView} onPress={handleAlbumClick}>
            <Image style={styles.qrIcon} source={Icons.gallery} />
          </Pressable>
          <Pressable style={styles.iconView} onPress={handleTorchClick}>
            <Image style={styles.qrIcon} source={Icons.torch} />
          </Pressable>
        </View> */}
      </View>
      <QrCodeErrorPopup {...{isVisible, setVisible, onCancel, onManualEntry}} />
    </View>
  );
};
export default ScanQrCodeScreen;
