import {loaderRef} from '../../components';
import {getCharts} from '../../services/Api';

// Get Charts Action
const getChartsData = onCallBack => {
  return dispatch => {
    getCharts().then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data?.result);
        if (response?.ok) {
          dispatch({
            type: 'GET_CHARTS',
            payload: response?.data,
          });
        } else {
          dispatch({type: 'ERROR', error: response?.data?.message});
        }
      },
      () => {
        loaderRef.current.hide();
      },
    );
  };
};
export {getChartsData};
