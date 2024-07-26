import {Platform} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';

const updateSoftInputMode = () => {
  const enableAdjustPan = () => {
    if (Platform.OS === 'android') {
      AvoidSoftInput.setAdjustPan();
      AvoidSoftInput.setEnabled(true);
    }
  };
  const disableAdjustPan = () => {
    if (Platform.OS === 'android') {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    }
  };
  return {
    enableAdjustPan,
    disableAdjustPan,
  };
};
export default updateSoftInputMode;
