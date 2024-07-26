import {CommonActions, StackActions} from '@react-navigation/native';
import {createRef} from 'react';
export const navigationRef = createRef();
export const currentScreen = createRef();

export function navigate(...props) {
  navigationRef.current.navigate(...props);
}

export function pop(screenCount = 0) {
  const popAction = StackActions.pop(screenCount);
  navigationRef.current?.dispatch(popAction);
}

export function reset(name, params) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name, params}],
  });
  navigationRef.current?.dispatch(resetAction);
}

export function replace(...props) {
  navigationRef.current.replace(...props);
}

export function goBack(params) {
  navigationRef.current?.canGoBack() && navigationRef.current?.goBack(params);
}
