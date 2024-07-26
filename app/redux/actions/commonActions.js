import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {uploadMediaFile} from '../../services/Api';

// Media Upload Action
const mediaUpload = (
  selectedFile,
  driveName,
  isMultiple = false,
  listImages = [],
  onCallBack = undefined,
) => {
  return dispatch => {
    uploadMediaFile(selectedFile, driveName, listImages, isMultiple).then(
      response => {
        loaderRef.current.hide();
        onCallBack &&
          onCallBack(
            response?.ok,
            isMultiple ? response?.data : response?.data[0],
          );
        if (response?.ok) {
          dispatch({
            type: 'UPLOAD_MEDIA_SUCCESS',
            payload: isMultiple ? response?.data : response?.data[0],
          });
        } else {
          dispatch({
            type: 'UPLOAD_MEDIA_FAIL',
            error: response?.data?.message || Strings.somethingWentWrong,
          });
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

export {mediaUpload};
