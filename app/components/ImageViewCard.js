import React, {useCallback} from 'react';
import {Image, Modal, Pressable, SafeAreaView, View} from 'react-native';
import {Icons} from '../assets';
import styles from './styles/ImageViewCardStyle';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
const ImageViewCard = ({isPreview, setPreview, imageUrl}) => {
  const handleClose = useCallback(() => setPreview(false), [setPreview]);
  return (
    <Modal
      visible={isPreview}
      transparent
      animationType="fade"
      onRequestClose={() => {}}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.imageCardContainer}>
          <ReactNativeZoomableView
            bindToBorders={true}
            zoomEnabled={true}
            maxZoom={4.0}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            style={styles.imageStyle}>
            <Image style={styles.imageStyle} source={{uri: imageUrl}} />
          </ReactNativeZoomableView>
          <Pressable style={styles.closeView} onPress={handleClose}>
            <Image source={Icons.cross} style={styles.closeIcn} />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ImageViewCard;
