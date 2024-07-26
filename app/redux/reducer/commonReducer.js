const commonState = {
  uploadFileError: null,
  uploadFileData: null,
};

function commonReducer(state = commonState, action) {
  switch (action.type) {
    case 'UPLOAD_MEDIA_SUCCESS':
      return {
        ...state,
        uploadFileData: action.payload,
        uploadFileError: null,
      };
    case 'UPLOAD_MEDIA_FAIL':
      return {
        ...state,
        uploadFileData: null,
        uploadFileError: action?.error,
      };
    case 'CLEAR_UPLOAD_STATE':
      return {...commonState};
    default:
      return state;
  }
}

export default commonReducer;
