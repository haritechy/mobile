import {createRef, useCallback, useRef} from 'react';
import {Keyboard} from 'react-native';

const getReturnKeyType = key => {
  if (key === 'submit') {
    return 'done';
  }
  if (key) {
    return 'next';
  }
  return 'default';
};

export const useFormFields = (
  initialState,
  {nextField = {}, errors = {}, onSubmit = () => {}} = {},
) => {
  const ref = useRef();

  if (!ref.current) {
    ref.current = {};
    Object.keys(initialState).forEach(key => {
      ref.current[key] = createRef();
    });
  }

  const submitEditing = useCallback(
    key => async () => {
      if (nextField?.[key] === 'submit') {
        Keyboard.dismiss();
        onSubmit({});
      } else if (nextField?.[key]) {
        if (errors[key]?.message) {
          onSubmit({});
        } else {
          ref.current[nextField[key]]?.current?.focus();
        }
      }
    },
    [nextField, errors, onSubmit],
  );

  const inputFields = useCallback(
    key => ({
      ref: ref.current[key],
      returnKeyType: getReturnKeyType(nextField?.[key]),
      onSubmitEditing: submitEditing(key),
      error: errors[key]?.message,
    }),
    [errors, nextField, submitEditing],
  );

  return {
    inputFields,
    onSubmit,
  };
};
