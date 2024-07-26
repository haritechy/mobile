/**
 * App Environments and Third party configuration
 * @IMPORTANT DO NOT CHANGE @ENVIRONMENT value manually
 * @ENVIRONMENT Change the environment based on server configuration by the below commands:
 * For the Production environment: yarn set-env-prod || npm run set-env-prod
 * For the Stage environment: yarn set-env-dev || npm run set-env-dev
 * @return {Object} CONFIG[ENVIRONMENT]
 */
import {create} from 'apisauce';
import ApiConstants from '../constants/ApiConstants';
export const ENVIRONMENT = 'stage';

const CONFIG = {
  stage: {
    GOOGLE_WEB_CLIENT_ID:
      '980439302051-k5n94pggigc9ia545u3htkkj87o5hajo.apps.googleusercontent.com',
    GOOGLE_CLIENT_ID_ANDROID:
      '980439302051-m3h1olfpg07p9ebqv17qlgv1i0lbj76f.apps.googleusercontent.com',
    GOOGLE_CLIENT_ID_IOS:
      '980439302051-s755kco1uukc63bs1lmjc3j25720v3kd.apps.googleusercontent.com',
  },
  prod: {
    GOOGLE_WEB_CLIENT_ID:
      '980439302051-k5n94pggigc9ia545u3htkkj87o5hajo.apps.googleusercontent.com',
    GOOGLE_CLIENT_ID_ANDROID:
      '980439302051-m3h1olfpg07p9ebqv17qlgv1i0lbj76f.apps.googleusercontent.com',
    GOOGLE_CLIENT_ID_IOS:
      '980439302051-s755kco1uukc63bs1lmjc3j25720v3kd.apps.googleusercontent.com',
  },
};

// Configure api with apisause
export const api = create({
  baseURL: ApiConstants.ApiBaseUrl,
  headers: {'Content-Type': 'application/json'},
  timeout: 30000,
});

export default CONFIG[ENVIRONMENT];
