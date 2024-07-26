import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert, Platform} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {loaderRef} from '../../../components';
import {AppEnvironment} from '../../../config';
import {NavigationRoutes, Strings} from '../../../constants';
import {reset} from '../../../navigation/services/navigationServices';
import {clearAll, loginFromExternal} from '../../../redux/actions/userActions';
import {postErrorLog} from '../../../redux/actions/logsActions';
async function googleSignIn(dispatch, handleSocialLogin) {
  try {
    GoogleSignin.configure({
      webClientId: AppEnvironment.GOOGLE_WEB_CLIENT_ID,
      scopes: ['profile', 'email'],
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      androidClientId: AppEnvironment.GOOGLE_CLIENT_ID_ANDROID,
      iosClientId: AppEnvironment.GOOGLE_CLIENT_ID_IOS,
      offlineAccess: true,
    });
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(result => {
        const googleData = {
          userName: result?.additionalUserInfo?.username || result?.user?.email,
          firstName: result?.additionalUserInfo?.profile?.given_name,
          lastName: result?.additionalUserInfo?.profile?.family_name,
          email: result?.user?.email,
          phoneNumber: result?.user?.phoneNumber,
          providerId: result?.user?.uid,
          provider: 'google',
          profileUrl: result?.user?.photoURL,
        };
        dispatch(clearAll());
        loaderRef.current.show();
        dispatch(
          loginFromExternal(googleData, 'google', (isSuccess, responseData) =>
            handleSocialLogin({isSuccess, responseData}),
          ),
        );
      })
      .catch(err =>
        dispatch(
          postErrorLog(
            `${Platform.OS}: ${Strings.googleLogin}  ${err.toString()}`,
          ),
        ),
      );
  } catch (error) {
    console.log('Error no googleSignIn ', error);
    dispatch(
      postErrorLog(
        `${Platform.OS}: ${Strings.googleLogin}  ${error.toString()}`,
      ),
    );
  }
}
async function facebookLogin(dispatch, handleSocialLogin) {
  try {
    await LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login Canceled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken, dispatch, handleSocialLogin);
          });
        }
      },
      function (error) {
        console.log('facebook Login fail with error: ' + error);
        dispatch(
          postErrorLog(
            `${Platform.OS}: ${Strings.facebookLogin} ${error.toString()}`,
          ),
        );
      },
    );
  } catch (error) {
    console.log('Error no facebookLogin ', error);
    dispatch(
      postErrorLog(
        `${Platform.OS}: ${Strings.facebookLogin} ${error.toString()}`,
      ),
    );
  }
}

function getInfoFromToken(token, dispatch, handleSocialLogin) {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name, first_name, last_name, birthday, email, picture',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {token, parameters: PROFILE_REQUEST_PARAMS},
    (error, result) => {
      if (error) {
        console.log('Login Info has an error:', error);
      } else {
        if (result.isCancelled) {
          console.log('Login cancelled');
        }
        if (result.email === undefined) {
          Alert.alert(
            'Error',
            'To continue Melbeez please allow access to your email',
            [{text: 'OK'}],
          );
        } else {
          const fbData = {
            userName: result?.email,
            firstName: result?.first_name,
            lastName: result?.last_name,
            email: result?.email,
            phoneNumber: null,
            providerId: result?.id,
            provider: 'facebook',
            profileUrl: result?.picture?.data?.url,
          };
          dispatch(clearAll());
          loaderRef.current.show();
          dispatch(
            loginFromExternal(fbData, 'facebook', (isSuccess, responseData) =>
              handleSocialLogin({isSuccess, responseData}),
            ),
          );
        }
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
}

const loginWithFirebase = (email, password) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      AsyncStorage.setItem('isLoggedIn', 'true');
      AsyncStorage.setItem('user', JSON.stringify(result));
      reset(NavigationRoutes.HomeTabs, {user: result});
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};

async function appleAuthentication(dispatch, handleSocialLogin) {
  try {
    if (appleAuth.isSupported) {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      // Sign the user in with the credential
      return auth()
        .signInWithCredential(appleCredential)
        .then(result => {
          const userInfo = result?.additionalUserInfo;
          const appleData = {
            userName: userInfo?.username,
            firstName: null,
            lastName: null,
            email: userInfo?.profile?.email,
            phoneNumber: null,
            providerId: identityToken,
            provider: 'apple',
            profileUrl: null,
          };
          dispatch(clearAll());
          loaderRef.current.show();
          dispatch(
            loginFromExternal(appleData, 'apple', (isSuccess, responseData) =>
              handleSocialLogin({isSuccess, responseData}),
            ),
          );
        })
        .catch(err =>
          dispatch(
            postErrorLog(
              `${Platform.OS}: ${Strings.appleLogin} ${err.toString()}`,
            ),
          ),
        );
    } else {
      Alert.alert('Apple authentication is not supported on this device');
    }
  } catch (err) {
    console.log('apple err from catch', err);
    dispatch(
      postErrorLog(`${Platform.OS}: ${Strings.appleLogin} ${err.toString()}`),
    );
  }
}

export {googleSignIn, facebookLogin, loginWithFirebase, appleAuthentication};
