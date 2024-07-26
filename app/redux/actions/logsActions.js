import {loaderRef} from '../../components';
import {barCodeScanLog, sendErrorLog} from '../../services/Api';

// POST Error Logs Action
const postErrorLog = (error, onCallBack) => {
  const logData = {
    trackId: null,
    isWeb: false,
    errorLineNo: null,
    exceptionMsg: error,
    exceptionType: null,
    exceptionDetail: null,
    path: null,
    createdOn: new Date(),
  };
  return dispatch => {
    sendErrorLog(logData).then(
      response => {
        loaderRef.current.hide();
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};

const postBarCodeLog = (logData, onCallBack) => {
  return dispatch => {
    barCodeScanLog(logData).then(
      response => {
        loaderRef.current.hide();
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};
export {postErrorLog, postBarCodeLog};
