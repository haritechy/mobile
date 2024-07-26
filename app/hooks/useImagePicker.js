import {useEffect, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {ApiStrings, Strings} from '../constants';
import {userSelectors} from '../redux/ProfileRedux';
import {ToastShow} from '../services/Utils';
import styles from './styles/useImagePicker';

// Displays optimistic UI assuming image will be fetched successfully
const displayOptimisticUI = setButtonText => {
  setButtonText(Strings.next);
};

// Displays fallback UI in case an error is thrown
const displayFallbackUI = setButtonText => {
  setButtonText(Strings.uploadProfilePictureButton);
};

const handleImageResponse = (imageResponse, setEditedImage) => {
  if (imageResponse) {
    setEditedImage({
      uri: imageResponse.path,
      width: imageResponse.width,
      height: imageResponse.height,
      mime: imageResponse.mime,
    });
  }
};

const handleImageError = (error, image, setButtonText) => {
  if (!image) {
    displayFallbackUI(setButtonText);
  }
  if (!(error.toString() === ApiStrings.cancelledImageSelectionError)) {
    ToastShow({
      text: error.toString(),
      buttonText: Strings.okayToast,
    });
  }
};

export const useImagePicker = ({
  selectedOption,
  setSelectedOption,
  setButtonText = () => {},
  image,
}) => {
  const userProfile = useSelector(userSelectors.userProfile);
  const [editedImage, setEditedImage] = useState();
  useEffect(() => {
    const getImage = async () => {
      try {
        let imageResponse = null;
        if (selectedOption === Strings.camera) {
          displayOptimisticUI(setButtonText);
          setSelectedOption(null);
          imageResponse = await ImageCropPicker.openCamera({
            ...styles.croppedImage,
            cropping: true,
          });
          handleImageResponse(imageResponse, setEditedImage);
        } else if (selectedOption === Strings.photos) {
          displayOptimisticUI(setButtonText);
          setSelectedOption(null);
          imageResponse = await ImageCropPicker.openPicker({
            ...styles.croppedImage,
            cropping: true,
          });
          handleImageResponse(imageResponse, setEditedImage);
        }
      } catch (e) {
        handleImageError(e, editedImage, setButtonText);
      }
    };

    getImage();
  }, [selectedOption, setSelectedOption, image, setButtonText, editedImage]);
  return {editedImage};
};
