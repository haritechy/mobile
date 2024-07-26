import {loaderRef} from '../../components';
import {Strings} from '../../constants';
import {postContactUs} from '../../services/Api';

// Contact Us Action
const contactUs = (contactData, onCallBack) => {
  return dispatch => {
    postContactUs(contactData).then(
      response => {
        loaderRef.current.hide();
        onCallBack && onCallBack(response?.ok, response?.data);
        if (response?.ok) {
          dispatch({
            type: 'CONTACT_SUCCESS',
            payload: response?.data,
          });
        } else {
          dispatch({
            type: 'CONTACT_FAIL',
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

export {contactUs};
